import { promises as fs } from 'node:fs';
import path from 'node:path';

const BLOG_ROOT = 'src/content/blog';
const STATIC_PAGES = 'src/data/blogger-pages.json';
const LOCAL_MEDIA_ROOT = 'public/media/blogger';
const PACKAGE_PATH = 'package.json';
const REMOTE_BLOGGER_MEDIA_RE = /https:\/\/(?:blogger\.googleusercontent\.com|(?:\d+\.)?bp\.blogspot\.com|lh\d+\.googleusercontent\.com)\//i;

async function walk(root) {
  const entries = await fs.readdir(root, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(root, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full));
    else files.push(full);
  }
  return files;
}

const errors = [];
const articleFiles = (await walk(BLOG_ROOT)).filter((file) => /\.(?:md|mdx)$/i.test(file));
let remoteMediaReferences = 0;
let localMediaReferences = 0;

for (const file of articleFiles) {
  const content = await fs.readFile(file, 'utf8');
  if (REMOTE_BLOGGER_MEDIA_RE.test(content)) {
    remoteMediaReferences += 1;
    errors.push(`${file} still contains Blogger-hosted media.`);
  }
  localMediaReferences += (content.match(/\/media\/blogger\/[0-9a-f]{2}\/[0-9a-f]{64}\.(?:avif|bmp|gif|jpe?g|png|webp)/gi) ?? []).length;
}

const pageSnapshot = await fs.readFile(STATIC_PAGES, 'utf8');
if (REMOTE_BLOGGER_MEDIA_RE.test(pageSnapshot)) {
  errors.push(`${STATIC_PAGES} still contains Blogger-hosted media.`);
}

let localMediaFiles = [];
try {
  localMediaFiles = (await walk(LOCAL_MEDIA_ROOT)).filter((file) => /\.(?:avif|bmp|gif|jpe?g|png|webp)$/i.test(file));
} catch {
  errors.push(`${LOCAL_MEDIA_ROOT} is missing.`);
}

if (localMediaReferences > 0 && localMediaFiles.length === 0) {
  errors.push('Localized Blogger media is referenced but no local media files exist.');
}

const packageJson = JSON.parse(await fs.readFile(PACKAGE_PATH, 'utf8'));
for (const scriptName of ['predev', 'prebuild', 'build']) {
  const command = packageJson.scripts?.[scriptName] ?? '';
  if (/sync-blogger-pages|import:blogger-pages|sync:blogger-pages/i.test(command)) {
    errors.push(`${scriptName} must not fetch Blogger pages during normal development/build.`);
  }
}

if (errors.length) {
  for (const error of errors) console.error(`BLOGGER INDEPENDENCE ERROR: ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Blogger independence: pass | ${articleFiles.length} articles | ${localMediaFiles.length} local media files | ${localMediaReferences} local media references | static pages snapshot present.`);
}
