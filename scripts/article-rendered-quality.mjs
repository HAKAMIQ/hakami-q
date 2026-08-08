import { promises as fs } from 'node:fs';
import path from 'node:path';

const DIST_ROOT = process.argv.includes('--dist')
	? process.argv[process.argv.indexOf('--dist') + 1]
	: 'dist';
const CONTENT_ROOT = 'src/content/blog';
const ROUTE_SOURCE = 'src/pages/blog/[...slug].astro';
const COMPAT_CSS = 'src/styles/article-content-compat.css';
const SCOPE_MARKER = 'HAKAMIQ_ARTICLE_SCOPE';

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

function countMatches(value, regex) {
	return [...value.matchAll(regex)].length;
}

const errors = [];
const articleSources = (await walk(CONTENT_ROOT)).filter((file) => /\.(?:md|mdx)$/i.test(file));
let sourceLegacyStyles = 0;
let sourceInlineImportant = 0;

for (const file of articleSources) {
	const source = await fs.readFile(file, 'utf8');
	sourceLegacyStyles += countMatches(source, /<style\b[^>]*>[\s\S]*?<\/style>/gi);
	sourceInlineImportant += countMatches(source, /\bstyle\s*=\s*(["'])[^"']*!important[^"']*\1/gi);
}

const routeSource = await fs.readFile(ROUTE_SOURCE, 'utf8');
const compatCss = await fs.readFile(COMPAT_CSS, 'utf8');

for (const invariant of [
	"import '../../styles/article-content-compat.css';",
	"data-hq-article-compat=\"v1\"",
	'function scopeLegacyStyleBlocks',
	'@scope (.article-content)',
	'HAKAMIQ_ARTICLE_SCOPE',
	"replace(/\\s*!important\\b/gi, '')",
]) {
	if (!routeSource.includes(invariant)) errors.push(`${ROUTE_SOURCE} is missing compatibility invariant: ${invariant}`);
}

for (const invariant of [
	'#main-content [data-hq-article-compat]',
	'color: var(--color-neutral-foreground-2) !important;',
	'background-color: var(--color-neutral-background-2) !important;',
	'max-inline-size: min(100%, var(--hq-article-media-width)) !important;',
	'height: auto !important;',
	'object-fit: contain !important;',
	'--hq-media-frame-border',
]) {
	if (!compatCss.includes(invariant)) errors.push(`${COMPAT_CSS} is missing compatibility invariant: ${invariant}`);
}

let distFiles;
try {
	distFiles = await walk(path.join(DIST_ROOT, 'blog'));
} catch (error) {
	throw new Error(`Unable to inspect rendered blog output at ${path.join(DIST_ROOT, 'blog')}: ${error.message}`);
}

const htmlFiles = distFiles.filter((file) => file.endsWith('.html'));
const renderedArticles = [];
let renderedScopedStyles = 0;
let renderedInlineImportant = 0;
let renderedUnscopedStyles = 0;

for (const file of htmlFiles) {
	const html = await fs.readFile(file, 'utf8');
	if (!html.includes('data-hq-article-compat="v1"')) continue;
	renderedArticles.push(file);

	const styleBlocks = [...html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)];
	for (const match of styleBlocks) {
		if (match[1].includes(SCOPE_MARKER)) {
			renderedScopedStyles += 1;
			if (/!important\b/i.test(match[1])) {
				errors.push(`${file} contains a scoped legacy style that still has !important.`);
			}
		} else {
			renderedUnscopedStyles += 1;
			errors.push(`${file} contains an unscoped inline <style> block.`);
		}
	}

	const inlineImportant = countMatches(html, /\bstyle\s*=\s*(["'])[^"']*!important[^"']*\1/gi);
	renderedInlineImportant += inlineImportant;
	if (inlineImportant > 0) errors.push(`${file} still contains ${inlineImportant} inline !important declaration(s).`);
}

if (renderedArticles.length !== articleSources.length) {
	errors.push(`Rendered article count mismatch: source=${articleSources.length}, rendered=${renderedArticles.length}.`);
}

if (renderedScopedStyles !== sourceLegacyStyles) {
	errors.push(`Legacy style scoping mismatch: source=${sourceLegacyStyles}, renderedScoped=${renderedScopedStyles}.`);
}

if (renderedInlineImportant !== 0) {
	errors.push(`Rendered articles still contain ${renderedInlineImportant} inline !important declaration(s).`);
}

if (renderedUnscopedStyles !== 0) {
	errors.push(`Rendered articles contain ${renderedUnscopedStyles} unscoped style block(s).`);
}

if (errors.length) {
	for (const error of errors) console.error(`ARTICLE COMPAT ERROR: ${error}`);
	process.exitCode = 1;
} else {
	console.log(
		`Article compatibility: pass | ${articleSources.length} articles | ${sourceLegacyStyles} legacy style blocks scoped | ${sourceInlineImportant} source inline-important declarations softened | ${renderedArticles.length} rendered article pages audited.`,
	);
}
