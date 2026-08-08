import { createHash } from 'node:crypto';
import { promises as fs } from 'node:fs';
import path from 'node:path';

const CONTENT_ROOT = 'src/content/blog';
const OUTPUT_ROOT = 'public/media/blogger';
const REPORT_PATH = process.env.BLOGGER_MEDIA_REPORT ?? 'reports/blogger-media-migration.json';
const MAX_FILE_BYTES = Number(process.env.BLOGGER_MEDIA_MAX_FILE_BYTES ?? 24 * 1024 * 1024);
const MAX_TOTAL_BYTES = Number(process.env.BLOGGER_MEDIA_MAX_TOTAL_BYTES ?? 450 * 1024 * 1024);
const MAX_UNIQUE_FILES = Number(process.env.BLOGGER_MEDIA_MAX_FILES ?? 12000);
const CONCURRENCY = Math.max(1, Math.min(12, Number(process.env.BLOGGER_MEDIA_CONCURRENCY ?? 6)));
const FETCH_ATTEMPTS = 3;

const BLOGGER_URL_RE = /https:\/\/(?:blogger\.googleusercontent\.com|(?:\d+\.)?bp\.blogspot\.com|lh\d+\.googleusercontent\.com)\/[^\s"'<>\)]+/g;
const BLOGGER_HOST_RE = /^(?:blogger\.googleusercontent\.com|(?:\d+\.)?bp\.blogspot\.com|lh\d+\.googleusercontent\.com)$/i;
const SIZE_SEGMENT_RE = /^(?:s\d+|w\d+-h\d+)(?:-[A-Za-z0-9_-]+)*$/i;
const FALLBACK_SIZE_SEGMENTS = ['s0', 's1600', 's1200', 's1024', 's800', 's640', 's480', 's320'];

const report = {
  startedAt: new Date().toISOString(),
  contentFiles: 0,
  filesWithBloggerMedia: 0,
  remoteReferences: 0,
  canonicalImages: 0,
  downloadedCanonicalImages: 0,
  uniqueLocalFiles: 0,
  totalLocalBytes: 0,
  rewrittenFiles: 0,
  failedImages: [],
  failures: [],
};

const formatMiB = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MiB`;

async function walkFiles(root) {
  const out = [];
  const entries = await fs.readdir(root, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(root, entry.name);
    if (entry.isDirectory()) out.push(...await walkFiles(fullPath));
    else if (/\.(?:md|mdx)$/i.test(entry.name)) out.push(fullPath);
  }
  return out.sort();
}

function normalizeRemoteUrl(raw) {
  return raw.replaceAll('&amp;', '&');
}

function canonicalImageKey(raw) {
  const normalized = normalizeRemoteUrl(raw);
  const url = new URL(normalized);
  if (!BLOGGER_HOST_RE.test(url.hostname)) throw new Error(`Unsupported media host: ${url.hostname}`);

  const segments = url.pathname.split('/');
  for (let index = segments.length - 2; index >= 0; index -= 1) {
    if (SIZE_SEGMENT_RE.test(segments[index])) {
      segments[index] = '__SIZE__';
      break;
    }
  }

  return `${url.hostname.toLowerCase()}${segments.join('/')}`;
}

function candidateScore(raw) {
  try {
    const { pathname } = new URL(normalizeRemoteUrl(raw));
    const segments = pathname.split('/');
    for (let index = segments.length - 2; index >= 0; index -= 1) {
      const segment = segments[index];
      const square = segment.match(/^s(\d+)/i);
      if (square) return Number(square[1]) ** 2;
      const rectangle = segment.match(/^w(\d+)-h(\d+)/i);
      if (rectangle) return Number(rectangle[1]) * Number(rectangle[2]);
    }
  } catch {
    // Invalid URLs will fail during download and be reported there.
  }
  return 0;
}

function expandCandidateVariants(raw) {
  const normalized = normalizeRemoteUrl(raw);
  const variants = new Set([normalized]);

  try {
    const url = new URL(normalized);
    const segments = url.pathname.split('/');
    let sizeIndex = -1;
    for (let index = segments.length - 2; index >= 0; index -= 1) {
      if (SIZE_SEGMENT_RE.test(segments[index])) {
        sizeIndex = index;
        break;
      }
    }

    if (sizeIndex >= 0) {
      for (const size of FALLBACK_SIZE_SEGMENTS) {
        const clone = new URL(url);
        const cloneSegments = clone.pathname.split('/');
        cloneSegments[sizeIndex] = size;
        clone.pathname = cloneSegments.join('/');
        variants.add(clone.toString());
      }

      const clone = new URL(url);
      const cloneSegments = clone.pathname.split('/');
      cloneSegments.splice(sizeIndex, 1);
      clone.pathname = cloneSegments.join('/');
      variants.add(clone.toString());
    }
  } catch {
    // Keep the original candidate so the normal fetch path reports the error.
  }

  return [...variants];
}

function sniffRasterImage(buffer, contentType = '') {
  const type = contentType.split(';', 1)[0].trim().toLowerCase();

  if (buffer.length >= 12 && buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46 && buffer[8] === 0x57 && buffer[9] === 0x45 && buffer[10] === 0x42 && buffer[11] === 0x50) {
    return { ext: 'webp', mime: 'image/webp' };
  }
  if (buffer.length >= 8 && buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47 && buffer[4] === 0x0d && buffer[5] === 0x0a && buffer[6] === 0x1a && buffer[7] === 0x0a) {
    return { ext: 'png', mime: 'image/png' };
  }
  if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return { ext: 'jpg', mime: 'image/jpeg' };
  }
  if (buffer.length >= 6) {
    const gif = buffer.subarray(0, 6).toString('ascii');
    if (gif === 'GIF87a' || gif === 'GIF89a') return { ext: 'gif', mime: 'image/gif' };
  }
  if (buffer.length >= 12 && buffer.subarray(4, 8).toString('ascii') === 'ftyp') {
    const brand = buffer.subarray(8, 12).toString('ascii').toLowerCase();
    if (brand === 'avif' || brand === 'avis') return { ext: 'avif', mime: 'image/avif' };
  }
  if (buffer.length >= 2 && buffer[0] === 0x42 && buffer[1] === 0x4d) {
    return { ext: 'bmp', mime: 'image/bmp' };
  }

  if (type === 'image/svg+xml' || buffer.subarray(0, Math.min(buffer.length, 256)).toString('utf8').includes('<svg')) {
    throw new Error('SVG media is intentionally rejected for safe static hosting; manual review is required.');
  }
  throw new Error(`Response is not a recognized safe raster image${type ? ` (${type})` : ''}.`);
}

async function fetchWithRetry(url) {
  let lastError;
  for (let attempt = 1; attempt <= FETCH_ATTEMPTS; attempt += 1) {
    try {
      const response = await fetch(url, {
        redirect: 'follow',
        headers: {
          'user-agent': 'HAKAMIQ-Blogger-Media-Migration/1.1',
          accept: 'image/avif,image/webp,image/png,image/jpeg,image/gif,image/bmp;q=0.9,*/*;q=0.1',
        },
        signal: AbortSignal.timeout(45_000),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const declaredLength = Number(response.headers.get('content-length') ?? 0);
      if (declaredLength > MAX_FILE_BYTES) {
        throw new Error(`Declared file size ${formatMiB(declaredLength)} exceeds safe limit ${formatMiB(MAX_FILE_BYTES)}.`);
      }

      const buffer = Buffer.from(await response.arrayBuffer());
      if (!buffer.length) throw new Error('Empty response body.');
      if (buffer.length > MAX_FILE_BYTES) {
        throw new Error(`Downloaded file size ${formatMiB(buffer.length)} exceeds safe limit ${formatMiB(MAX_FILE_BYTES)}.`);
      }

      const imageType = sniffRasterImage(buffer, response.headers.get('content-type') ?? '');
      return { buffer, imageType, finalUrl: response.url };
    } catch (error) {
      lastError = error;
      if (attempt < FETCH_ATTEMPTS) await new Promise((resolve) => setTimeout(resolve, 500 * attempt));
    }
  }
  throw lastError;
}

async function ensureReportDirectory() {
  await fs.mkdir(path.dirname(REPORT_PATH), { recursive: true });
}

async function writeReport(extra = {}) {
  await ensureReportDirectory();
  await fs.writeFile(REPORT_PATH, `${JSON.stringify({ ...report, ...extra }, null, 2)}\n`, 'utf8');
}

const files = await walkFiles(CONTENT_ROOT);
report.contentFiles = files.length;

const fileContents = new Map();
const groups = new Map();

for (const file of files) {
  const content = await fs.readFile(file, 'utf8');
  fileContents.set(file, content);
  const matches = [...content.matchAll(BLOGGER_URL_RE)].map((match) => match[0]);
  if (!matches.length) continue;

  report.filesWithBloggerMedia += 1;
  report.remoteReferences += matches.length;

  for (const raw of matches) {
    const key = canonicalImageKey(raw);
    let group = groups.get(key);
    if (!group) {
      group = { key, references: new Set(), candidates: new Set(), files: new Set() };
      groups.set(key, group);
    }
    group.references.add(raw);
    group.files.add(file);
    for (const candidate of expandCandidateVariants(raw)) group.candidates.add(candidate);
  }
}

report.canonicalImages = groups.size;
console.log(`Blogger media inventory: ${report.contentFiles} article files, ${report.filesWithBloggerMedia} with Blogger media, ${report.remoteReferences} URL references, ${report.canonicalImages} canonical images.`);

if (!groups.size) {
  await writeReport({ completedAt: new Date().toISOString(), note: 'No Blogger-hosted media references found.' });
  console.log('No Blogger media migration is required.');
  process.exit(0);
}

if (groups.size > MAX_UNIQUE_FILES) {
  const message = `Migration aborted: ${groups.size} canonical images exceed the safe ceiling of ${MAX_UNIQUE_FILES}. Use object storage instead of committing this volume to the repository.`;
  report.failures.push(message);
  await writeReport({ completedAt: new Date().toISOString() });
  throw new Error(message);
}

await fs.mkdir(OUTPUT_ROOT, { recursive: true });

const replacementByReference = new Map();
const writtenHashes = new Map();
const failedGroups = [];
let totalBytes = 0;
let cursor = 0;
const groupList = [...groups.values()];

async function migrateGroup(group) {
  const candidates = [...group.candidates].sort((a, b) => candidateScore(b) - candidateScore(a));
  const candidateErrors = [];

  for (const candidate of candidates) {
    try {
      const { buffer, imageType } = await fetchWithRetry(candidate);
      const hash = createHash('sha256').update(buffer).digest('hex');
      const relativePath = path.posix.join('media', 'blogger', hash.slice(0, 2), `${hash}.${imageType.ext}`);
      const publicPath = `/${relativePath}`;

      if (!writtenHashes.has(hash)) {
        const nextTotal = totalBytes + buffer.length;
        if (nextTotal > MAX_TOTAL_BYTES) {
          const fatal = new Error(`Total localized media would exceed ${formatMiB(MAX_TOTAL_BYTES)}; repository migration stopped before commit.`);
          fatal.fatalMigration = true;
          throw fatal;
        }
        const diskPath = path.join('public', ...relativePath.split('/'));
        await fs.mkdir(path.dirname(diskPath), { recursive: true });
        await fs.writeFile(diskPath, buffer);
        writtenHashes.set(hash, { publicPath, bytes: buffer.length });
        totalBytes = nextTotal;
      }

      const resolved = writtenHashes.get(hash).publicPath;
      for (const reference of group.references) replacementByReference.set(reference, resolved);
      report.downloadedCanonicalImages += 1;
      return;
    } catch (error) {
      if (error?.fatalMigration) throw error;
      candidateErrors.push(`${candidate}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  const failure = {
    key: group.key,
    files: [...group.files],
    sourceReferences: [...group.references],
    attempts: candidates.length,
    errors: candidateErrors,
  };
  failedGroups.push(failure);
}

async function worker() {
  while (true) {
    const index = cursor;
    cursor += 1;
    if (index >= groupList.length) return;
    await migrateGroup(groupList[index]);
    if ((index + 1) % 50 === 0 || index + 1 === groupList.length) {
      console.log(`Processed ${index + 1}/${groupList.length} canonical images; downloaded ${report.downloadedCanonicalImages}; unique local bytes: ${formatMiB(totalBytes)}.`);
    }
  }
}

try {
  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, groupList.length) }, () => worker()));
} catch (error) {
  report.failures.push(error instanceof Error ? error.message : String(error));
  report.uniqueLocalFiles = writtenHashes.size;
  report.totalLocalBytes = totalBytes;
  await writeReport({ completedAt: new Date().toISOString(), failedImages: failedGroups });
  throw error;
}

report.uniqueLocalFiles = writtenHashes.size;
report.totalLocalBytes = totalBytes;
report.failedImages = failedGroups;

if (failedGroups.length) {
  const message = `Migration stopped safely: ${failedGroups.length} canonical Blogger image(s) could not be recovered after exhausting known size variants. No article URLs were rewritten and no media commit will be created.`;
  report.failures.push(message);
  await writeReport({ completedAt: new Date().toISOString() });
  console.error(message);
  for (const failure of failedGroups.slice(0, 20)) console.error(`- ${failure.files.join(', ')} :: ${failure.key}`);
  throw new Error(message);
}

for (const [file, originalContent] of fileContents) {
  let content = originalContent;
  for (const [remote, local] of replacementByReference) {
    if (content.includes(remote)) content = content.split(remote).join(local);
  }
  if (content !== originalContent) {
    await fs.writeFile(file, content, 'utf8');
    report.rewrittenFiles += 1;
  }
}

const leftovers = [];
for (const file of files) {
  const content = await fs.readFile(file, 'utf8');
  const remaining = [...content.matchAll(BLOGGER_URL_RE)].map((match) => match[0]);
  if (remaining.length) leftovers.push({ file, count: remaining.length, sample: remaining.slice(0, 3) });
}

if (leftovers.length) {
  const message = `Migration validation failed: ${leftovers.length} content file(s) still contain Blogger media URLs.`;
  report.failures.push(message);
  await writeReport({ completedAt: new Date().toISOString(), leftovers });
  throw new Error(message);
}

await writeReport({ completedAt: new Date().toISOString() });
console.log(`Blogger media migration complete: ${report.downloadedCanonicalImages} canonical images -> ${report.uniqueLocalFiles} unique local files, ${formatMiB(report.totalLocalBytes)}, ${report.rewrittenFiles} article files rewritten.`);
