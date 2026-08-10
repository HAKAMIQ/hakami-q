import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const contentRoot = path.join(root, 'src', 'content', 'blog');
const args = new Set(process.argv.slice(2));
const writeChanges = args.has('--write');
const checkOnly = args.has('--check');

if (writeChanges && checkOnly) {
  throw new Error('Use either --write or --check, not both.');
}

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(fullPath));
    else if (/\.(?:md|mdx)$/i.test(entry.name)) files.push(fullPath);
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

function splitDocument(source) {
  const match = source.match(/^\uFEFF?---\s*\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n|$)/);
  if (!match) return { prefix: '', body: source, title: '' };
  const frontmatter = match[1];
  const titleMatch = frontmatter.match(/^title:\s*(.*)$/m);
  return {
    prefix: source.slice(0, match[0].length),
    body: source.slice(match[0].length),
    title: parseScalar(titleMatch?.[1] ?? ''),
  };
}

function decodeEntities(value = '') {
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

function plainText(value = '') {
  return decodeEntities(value.replace(/<[^>]+>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();
}

function normalize(value = '') {
  return plainText(value)
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

function escapeAttribute(value = '') {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function protectLiteralBlocks(body) {
  const blocks = [];
  const pattern = /```[\s\S]*?```|~~~[\s\S]*?~~~|<pre\b[\s\S]*?<\/pre>|<code\b[\s\S]*?<\/code>|<style\b[\s\S]*?<\/style>|<!--([\s\S]*?)-->/gi;
  const text = body.replace(pattern, (block) => {
    const token = `\u0000HAKAMIQ_PROTECTED_${blocks.length}\u0000`;
    blocks.push(block);
    return token;
  });
  return {
    text,
    restore(value) {
      return value.replace(/\u0000HAKAMIQ_PROTECTED_(\d+)\u0000/g, (_, index) => blocks[Number(index)] ?? '');
    },
  };
}

function cleanBody(body, articleTitle) {
  const titleNormalized = normalize(articleTitle);
  const protectedBody = protectLiteralBlocks(body);
  let value = protectedBody.text;
  const stats = {
    duplicateTitleHeadingsRemoved: 0,
    bodyH1Converted: 0,
    imageAltAdded: 0,
  };

  if (titleNormalized) {
    value = value.replace(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi, (full, _level, inner) => {
      if (normalize(inner) !== titleNormalized) return full;
      stats.duplicateTitleHeadingsRemoved += 1;
      return '';
    });

    value = value.replace(/^(\s{0,3})(#{1,6})([ \t]+)(.+?)([ \t]*#*[ \t]*)$/gm, (full, _indent, _marks, _spacing, heading) => {
      if (normalize(heading) !== titleNormalized) return full;
      stats.duplicateTitleHeadingsRemoved += 1;
      return '';
    });
  }

  value = value.replace(/<h1\b([^>]*)>/gi, (_full, attributes) => {
    stats.bodyH1Converted += 1;
    return `<h2${attributes}>`;
  });
  value = value.replace(/<\/h1>/gi, '</h2>');

  value = value.replace(/^(\s{0,3})#([ \t]+)(.+?)$/gm, (_full, indent, spacing, heading) => {
    stats.bodyH1Converted += 1;
    return `${indent}##${spacing}${heading}`;
  });

  value = value.replace(/<img\b[^>]*>/gi, (tag) => {
    if (/\balt\s*=\s*["'][^"']*["']/i.test(tag)) return tag;
    const titleAttribute = tag.match(/\btitle\s*=\s*(["'])([^"']+)\1/i)?.[2] ?? '';
    const alt = plainText(titleAttribute) || `صورة توضيحية ضمن مقال ${articleTitle}`;
    stats.imageAltAdded += 1;
    return tag.replace(/^<img\b/i, `<img alt="${escapeAttribute(alt)}"`);
  });

  return { body: protectedBody.restore(value), stats };
}

const totals = {
  files: 0,
  changedFiles: 0,
  duplicateTitleHeadingsRemoved: 0,
  bodyH1Converted: 0,
  imageAltAdded: 0,
};
const changedFiles = [];

for (const file of await walk(contentRoot)) {
  totals.files += 1;
  const source = await readFile(file, 'utf8');
  const document = splitDocument(source);
  if (!document.title) continue;

  const cleaned = cleanBody(document.body, document.title);
  const nextSource = `${document.prefix}${cleaned.body}`;
  if (nextSource === source) continue;

  totals.changedFiles += 1;
  totals.duplicateTitleHeadingsRemoved += cleaned.stats.duplicateTitleHeadingsRemoved;
  totals.bodyH1Converted += cleaned.stats.bodyH1Converted;
  totals.imageAltAdded += cleaned.stats.imageAltAdded;
  changedFiles.push(path.relative(root, file).replaceAll(path.sep, '/'));

  if (writeChanges) await writeFile(file, nextSource, 'utf8');
}

const mode = writeChanges ? 'write' : checkOnly ? 'check' : 'preview';
console.log(
  `Content source cleanup (${mode}): ${totals.files} files | ${totals.changedFiles} changed | ` +
  `${totals.duplicateTitleHeadingsRemoved} duplicate title heading(s) removed | ` +
  `${totals.bodyH1Converted} body H1 heading(s) normalized | ${totals.imageAltAdded} missing alt attribute(s) added.`,
);

if (!writeChanges && changedFiles.length > 0) {
  for (const file of changedFiles.slice(0, 30)) console.log(`CHANGE ${file}`);
  if (changedFiles.length > 30) console.log(`… ${changedFiles.length - 30} additional files require normalization.`);
}

if (checkOnly && changedFiles.length > 0) process.exitCode = 1;
