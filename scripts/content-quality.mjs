import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const contentRoot = path.join(root, 'src', 'content', 'blog');
const args = process.argv.slice(2);
const strict = args.includes('--strict');
const jsonIndex = args.indexOf('--json');
const jsonPath = jsonIndex >= 0 && args[jsonIndex + 1] ? path.resolve(root, args[jsonIndex + 1]) : null;

const issues = [];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(fullPath));
    else if (/\.(md|mdx)$/i.test(entry.name)) files.push(fullPath);
  }
  return files.sort();
}

function parseScalar(value = '') {
  const input = value.trim();
  if (!input) return '';
  if (input.startsWith("'") && input.endsWith("'")) return input.slice(1, -1).replace(/''/g, "'");
  if (input.startsWith('"') && input.endsWith('"')) {
    try { return JSON.parse(input); } catch { return input.slice(1, -1); }
  }
  return input;
}

function parseDocument(source) {
  const match = source.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n|$)/);
  if (!match) return { frontmatter: '', body: source, title: '', description: '' };
  const frontmatter = match[1];
  const field = (name) => {
    const fieldMatch = frontmatter.match(new RegExp(`^${name}:\\s*(.*)$`, 'm'));
    return parseScalar(fieldMatch?.[1] ?? '');
  };
  return {
    frontmatter,
    body: source.slice(match[0].length),
    title: field('title'),
    description: field('description'),
  };
}

function decodeEntities(value) {
  return value
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)));
}

function normalize(value = '') {
  return decodeEntities(value.replace(/<[^>]+>/g, ' '))
    .normalize('NFKC')
    .replace(/[\u064B-\u065F\u0670]/g, '')
    .replace(/[أإآ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLocaleLowerCase('ar');
}

function addIssue(file, severity, code, message, details = {}) {
  issues.push({ file, severity, code, message, ...details });
}

function extractHeadings(body) {
  const values = [];
  for (const match of body.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)) {
    values.push({ level: Number(match[1]), text: match[2] });
  }
  for (const match of body.matchAll(/^\s{0,3}(#{1,6})\s+(.+?)\s*#*\s*$/gm)) {
    values.push({ level: match[1].length, text: match[2] });
  }
  return values;
}

function findDuplicateParagraphs(body) {
  const counts = new Map();
  for (const match of body.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)) {
    const value = normalize(match[1]);
    if (value.length < 80) continue;
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  return [...counts.entries()].filter(([, count]) => count > 1);
}

function evaluateFile(relativeFile, document) {
  const { title, description, body } = document;
  const titleNormalized = normalize(title);
  const descriptionNormalized = normalize(description);
  const bodyWithoutCode = body.replace(/```[\s\S]*?```/g, '');

  if (!titleNormalized) addIssue(relativeFile, 'error', 'missing-title', 'عنوان المقال مفقود.');
  if (!descriptionNormalized) addIssue(relativeFile, 'error', 'missing-description', 'ملخص المقال مفقود.');
  if (!normalize(body).length) addIssue(relativeFile, 'error', 'empty-body', 'محتوى المقال فارغ.');

  if (titleNormalized && descriptionNormalized === titleNormalized) {
    addIssue(relativeFile, 'warning', 'description-repeats-title', 'الملخص يكرر عنوان المقال بدل وصف المحتوى.');
  }

  if (titleNormalized.length > 0 && titleNormalized.length < 8) {
    addIssue(relativeFile, 'warning', 'title-too-short', 'عنوان المقال قصير جدًا لتوضيح الموضوع.');
  }
  if (title.length > 120) {
    addIssue(relativeFile, 'warning', 'title-too-long', 'عنوان المقال طويل وقد يصعب مسحه بصريًا أو عرضه في البطاقات.', { length: title.length });
  }
  if (description.length > 240) {
    addIssue(relativeFile, 'warning', 'description-too-long', 'الملخص طويل؛ وظيفته تقديم الموضوع قبل فتح المقال وليس إعادة المحتوى.', { length: description.length });
  }

  const headings = extractHeadings(body);
  const duplicateTitleHeadings = headings.filter((heading) => normalize(heading.text) === titleNormalized);
  if (titleNormalized && duplicateTitleHeadings.length > 0) {
    addIssue(relativeFile, 'warning', 'duplicate-page-title', 'عنوان الصفحة مكرر داخل محتوى المقال. القاعدة: عنوان المقال ثم المحتوى الكامل مباشرة.', { count: duplicateTitleHeadings.length });
  }

  const bodyH1Count = headings.filter((heading) => heading.level === 1).length;
  if (bodyH1Count > 0) {
    addIssue(relativeFile, 'warning', 'body-h1', 'المحتوى يحتوي H1 إضافيًا بينما قالب المقال يوفر H1 واحدًا.', { count: bodyH1Count });
  }

  const duplicateParagraphs = findDuplicateParagraphs(body);
  if (duplicateParagraphs.length > 0) {
    addIssue(relativeFile, 'warning', 'duplicate-paragraph', 'يوجد نص طويل مكرر داخل المقال ويحتاج مراجعة.', { groups: duplicateParagraphs.length });
  }

  const images = [...body.matchAll(/<img\b[^>]*>/gi)].map((match) => match[0]);
  const imagesWithoutAlt = images.filter((tag) => !/\balt\s*=\s*["'][^"']*["']/i.test(tag)).length;
  if (imagesWithoutAlt > 0) {
    addIssue(relativeFile, 'warning', 'image-alt-missing', 'توجد صور بدون نص بديل alt.', { count: imagesWithoutAlt });
  }

  if (/<script\b/i.test(bodyWithoutCode)) {
    addIssue(relativeFile, 'error', 'script-tag', 'لا يسمح بوسوم script داخل محتوى المقالات.');
  }
  if (/\b(?:href|src)\s*=\s*["']\s*javascript:/i.test(bodyWithoutCode)) {
    addIssue(relativeFile, 'error', 'javascript-url', 'لا يسمح بروابط javascript: داخل المحتوى.');
  }
}

const files = await walk(contentRoot);
for (const file of files) {
  const source = await readFile(file, 'utf8');
  const relativeFile = path.relative(root, file).replaceAll(path.sep, '/');
  evaluateFile(relativeFile, parseDocument(source));
}

const errors = issues.filter((issue) => issue.severity === 'error');
const warnings = issues.filter((issue) => issue.severity === 'warning');
const affectedFiles = new Set(issues.map((issue) => issue.file));
const duplicateTitleFiles = new Set(issues.filter((issue) => issue.code === 'duplicate-page-title').map((issue) => issue.file));
const duplicateParagraphFiles = new Set(issues.filter((issue) => issue.code === 'duplicate-paragraph').map((issue) => issue.file));
const missingAltFiles = new Set(issues.filter((issue) => issue.code === 'image-alt-missing').map((issue) => issue.file));
const cleanFiles = Math.max(0, files.length - affectedFiles.size);
const cleanRate = files.length ? Number(((cleanFiles / files.length) * 100).toFixed(1)) : 100;

const report = {
  generatedAt: new Date().toISOString(),
  mode: strict ? 'strict' : 'baseline',
  scope: 'src/content/blog/**/*.{md,mdx}',
  policy: {
    pageShape: 'عنوان المقال → المحتوى الكامل مباشرة',
    summaryPlacement: 'الملخص للواجهة/قوائم التصفح وSEO، وليس كتلة مكررة داخل صفحة المقال.',
    aiPrompting: 'غير مطبق لأن الموقع لا يحتوي تجربة AI.',
  },
  summary: {
    files: files.length,
    cleanFiles,
    affectedFiles: affectedFiles.size,
    cleanRate,
    errors: errors.length,
    warnings: warnings.length,
    duplicateTitleFiles: duplicateTitleFiles.size,
    duplicateParagraphFiles: duplicateParagraphFiles.size,
    missingAltFiles: missingAltFiles.size,
  },
  issues,
};

console.log(`Content quality: ${files.length} files | ${errors.length} errors | ${warnings.length} warnings | ${cleanRate}% clean`);
for (const issue of issues.slice(0, 40)) {
  const marker = issue.severity === 'error' ? 'ERROR' : 'WARN';
  console.log(`[${marker}] ${issue.code} — ${issue.file}: ${issue.message}`);
}
if (issues.length > 40) console.log(`… ${issues.length - 40} additional issues are included in the JSON report.`);

if (jsonPath) {
  await mkdir(path.dirname(jsonPath), { recursive: true });
  await writeFile(jsonPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
  console.log(`Report: ${path.relative(root, jsonPath)}`);
}

if (errors.length > 0 || (strict && warnings.length > 0)) process.exitCode = 1;
