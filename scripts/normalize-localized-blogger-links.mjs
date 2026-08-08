import { promises as fs } from 'node:fs';
import path from 'node:path';

const CONTENT_ROOT = 'src/content/blog';
const HASHED_LOCAL_MEDIA_RE = /(\/media\/blogger\/[0-9a-f]{2}\/[0-9a-f]{64}\.(?:avif|bmp|gif|jpe?g|png|webp))\)\.(?:avif|bmp|gif|jpe?g|jfif|png|webp)/gi;

async function walkFiles(root) {
  const files = [];
  for (const entry of await fs.readdir(root, { withFileTypes: true })) {
    const fullPath = path.join(root, entry.name);
    if (entry.isDirectory()) files.push(...await walkFiles(fullPath));
    else if (/\.(?:md|mdx)$/i.test(entry.name)) files.push(fullPath);
  }
  return files;
}

let changedFiles = 0;
let normalizedLinks = 0;
for (const file of await walkFiles(CONTENT_ROOT)) {
  const original = await fs.readFile(file, 'utf8');
  const updated = original.replace(HASHED_LOCAL_MEDIA_RE, (_match, localPath) => {
    normalizedLinks += 1;
    return localPath;
  });
  if (updated !== original) {
    await fs.writeFile(file, updated, 'utf8');
    changedFiles += 1;
  }
}

console.log(`Localized Blogger link normalization: ${normalizedLinks} malformed suffix(es) removed across ${changedFiles} article file(s).`);
