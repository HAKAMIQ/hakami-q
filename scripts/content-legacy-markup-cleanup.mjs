import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const contentRoot = path.join(root, 'src', 'content', 'blog');
const args = new Set(process.argv.slice(2));
const writeChanges = args.has('--write');
const checkOnly = args.has('--check');

if (writeChanges && checkOnly) throw new Error('Use either --write or --check, not both.');

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

function splitDocument(source) {
  const match = source.match(/^\uFEFF?---\s*\r?\n[\s\S]*?\r?\n---\s*(?:\r?\n|$)/);
  if (!match) return { prefix: '', body: source };
  return { prefix: source.slice(0, match[0].length), body: source.slice(match[0].length) };
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
  return decodeEntities(value.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
}

function protectLiteralBlocks(body) {
  const blocks = [];
  const pattern = /```[\s\S]*?```|~~~[\s\S]*?~~~|<pre\b[\s\S]*?<\/pre>|<code\b[\s\S]*?<\/code>|<style\b[\s\S]*?<\/style>|<!--([\s\S]*?)-->/gi;
  const text = body.replace(pattern, (block) => {
    const token = `\u0000HAKAMIQ_LEGACY_PROTECTED_${blocks.length}\u0000`;
    blocks.push(block);
    return token;
  });
  return {
    text,
    restore(value) {
      return value.replace(/\u0000HAKAMIQ_LEGACY_PROTECTED_(\d+)\u0000/g, (_, index) => blocks[Number(index)] ?? '');
    },
  };
}

function cleanInlineStyle(style, hadDarkReaderMetadata) {
  const declarations = style
    .split(';')
    .map((declaration) => declaration.trim())
    .filter(Boolean)
    .filter((declaration) => !/^--darkreader-inline-[\w-]+\s*:/i.test(declaration))
    .filter((declaration) => {
      if (!hadDarkReaderMetadata) return true;
      const normalized = declaration.replace(/\s+/g, ' ').toLowerCase();
      if (/^background-color\s*:\s*(?:white|#fff(?:fff)?)$/i.test(normalized)) return false;
      if (/^color\s*:\s*#333(?:333)?$/i.test(normalized)) return false;
      return true;
    });
  return declarations.join('; ');
}

function cleanTag(tag, stats) {
  const hadDarkReaderMetadata = /\bdata-darkreader-inline-[\w-]+/i.test(tag);
  let next = tag.replace(/\s+data-darkreader-inline-[\w-]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?/gi, () => {
    stats.darkReaderAttributesRemoved += 1;
    return '';
  });

  next = next.replace(/\bstyle\s*=\s*(["'])([\s\S]*?)\1/i, (full, quote, style) => {
    const cleaned = cleanInlineStyle(style, hadDarkReaderMetadata);
    if (cleaned === style.trim()) return full;
    stats.inlineStylesCleaned += 1;
    if (!cleaned) return '';
    return `style=${quote}${cleaned}${quote}`;
  });

  return next.replace(/\s{2,}/g, ' ').replace(/\s+>/g, '>');
}

function cleanMarkup(body) {
  const protectedBody = protectLiteralBlocks(body);
  const stats = {
    darkReaderAttributesRemoved: 0,
    inlineStylesCleaned: 0,
    mediaOnlyHeadingsUnwrapped: 0,
    emptyHeadingsRemoved: 0,
  };

  let value = protectedBody.text.replace(/<[^!][^>]*>/g, (tag) => cleanTag(tag, stats));

  value = value.replace(/<h([2-6])\b([^>]*)>([\s\S]*?)<\/h\1>/gi, (full, _level, _attributes, inner) => {
    if (plainText(inner)) return full;
    if (/<(?:img|picture|figure|iframe|video|audio|svg)\b/i.test(inner)) {
      stats.mediaOnlyHeadingsUnwrapped += 1;
      return inner;
    }
    stats.emptyHeadingsRemoved += 1;
    return '';
  });

  return { body: protectedBody.restore(value), stats };
}

const totals = {
  files: 0,
  changedFiles: 0,
  darkReaderAttributesRemoved: 0,
  inlineStylesCleaned: 0,
  mediaOnlyHeadingsUnwrapped: 0,
  emptyHeadingsRemoved: 0,
};
const changedFiles = [];

for (const file of await walk(contentRoot)) {
  totals.files += 1;
  const source = await readFile(file, 'utf8');
  const document = splitDocument(source);
  const cleaned = cleanMarkup(document.body);
  const nextSource = `${document.prefix}${cleaned.body}`;
  if (nextSource === source) continue;

  totals.changedFiles += 1;
  totals.darkReaderAttributesRemoved += cleaned.stats.darkReaderAttributesRemoved;
  totals.inlineStylesCleaned += cleaned.stats.inlineStylesCleaned;
  totals.mediaOnlyHeadingsUnwrapped += cleaned.stats.mediaOnlyHeadingsUnwrapped;
  totals.emptyHeadingsRemoved += cleaned.stats.emptyHeadingsRemoved;
  changedFiles.push(path.relative(root, file).replaceAll(path.sep, '/'));

  if (writeChanges) await writeFile(file, nextSource, 'utf8');
}

const mode = writeChanges ? 'write' : checkOnly ? 'check' : 'preview';
console.log(
  `Legacy markup cleanup (${mode}): ${totals.files} files | ${totals.changedFiles} changed | ` +
  `${totals.darkReaderAttributesRemoved} DarkReader attribute(s) removed | ` +
  `${totals.inlineStylesCleaned} inline style(s) cleaned | ` +
  `${totals.mediaOnlyHeadingsUnwrapped} media-only heading(s) unwrapped | ` +
  `${totals.emptyHeadingsRemoved} empty heading(s) removed.`,
);

if (!writeChanges && changedFiles.length > 0) {
  for (const file of changedFiles.slice(0, 30)) console.log(`CHANGE ${file}`);
  if (changedFiles.length > 30) console.log(`… ${changedFiles.length - 30} additional files require legacy markup cleanup.`);
}

if (checkOnly && changedFiles.length > 0) process.exitCode = 1;
