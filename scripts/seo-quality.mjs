import { promises as fs } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const distArg = process.argv.indexOf('--dist');
const dist = path.resolve(root, distArg >= 0 ? process.argv[distArg + 1] : 'dist');
const site = 'https://hakami-q.pages.dev';
const errors = [];

const fail = (route, code, message) => errors.push({ route, code, message });

async function walk(directory) {
	const entries = await fs.readdir(directory, { withFileTypes: true });
	const result = [];
	for (const entry of entries) {
		const absolute = path.join(directory, entry.name);
		if (entry.isDirectory()) result.push(...await walk(absolute));
		else if (entry.isFile()) result.push(absolute);
	}
	return result;
}

function routeFromHtml(file) {
	const relative = path.relative(dist, file).replaceAll('\\', '/');
	if (relative === 'index.html') return '/';
	if (relative.endsWith('/index.html')) return `/${relative.slice(0, -'index.html'.length)}`;
	return `/${relative}`;
}

function metaContent(html, name, attribute = 'name') {
	const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	const expression = new RegExp(
		`<meta\\b(?=[^>]*\\b${attribute}=["']${escaped}["'])(?=[^>]*\\bcontent=["']([^"']*)["'])[^>]*>`,
		'i',
	);
	return html.match(expression)?.[1] ?? null;
}

function canonicalHref(html) {
	return html.match(/<link\b(?=[^>]*\brel=["']canonical["'])(?=[^>]*\bhref=["']([^"']+)["'])[^>]*>/i)?.[1] ?? null;
}

function isGoogleVerificationFile(file) {
	return /^google[a-z0-9_-]+\.html$/i.test(path.basename(file));
}

const allFiles = await walk(dist);
const htmlFiles = allFiles.filter((file) => file.endsWith('.html') && !isGoogleVerificationFile(file));

const robotsPath = path.join(dist, 'robots.txt');
let robots = '';
try {
	robots = await fs.readFile(robotsPath, 'utf8');
} catch {
	fail('/robots.txt', 'seo.robots.missing', 'robots.txt is missing from the production output.');
}
if (robots) {
	if (!/^User-agent:\s*\*/im.test(robots)) fail('/robots.txt', 'seo.robots.user-agent', 'Missing wildcard user-agent group.');
	if (!/^Allow:\s*\/\s*$/im.test(robots)) fail('/robots.txt', 'seo.robots.allow-root', 'Root crawling is not explicitly allowed.');
	if (!new RegExp(`^Sitemap:\\s*${site.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/sitemap-index\\.xml\\s*$`, 'im').test(robots)) {
		fail('/robots.txt', 'seo.robots.sitemap', 'robots.txt does not advertise the canonical sitemap index.');
	}
}

const sitemapFiles = allFiles.filter((file) => /^sitemap.*\.xml$/i.test(path.basename(file)));
if (!sitemapFiles.some((file) => path.basename(file) === 'sitemap-index.xml')) {
	fail('/sitemap-index.xml', 'seo.sitemap.index', 'sitemap-index.xml is missing from the production output.');
}
const sitemapText = (await Promise.all(sitemapFiles.map((file) => fs.readFile(file, 'utf8')))).join('\n');
for (const forbidden of ['/admin', '/account', '/login', '/register']) {
	if (sitemapText.includes(`${site}${forbidden}`)) {
		fail('/sitemap-index.xml', 'seo.sitemap.private-route', `Sitemap contains excluded route ${forbidden}.`);
	}
}

for (const file of htmlFiles) {
	const route = routeFromHtml(file);
	const html = await fs.readFile(file, 'utf8');
	const robotsMeta = metaContent(html, 'robots') ?? '';
	const noindex = /(?:^|,)\s*noindex\b/i.test(robotsMeta) || /<meta\b[^>]*\bname=["']robots["'][^>]*\bcontent=["'][^"']*\bnoindex\b/i.test(html);
	const canonical = canonicalHref(html);

	if (!/max-image-preview:large/i.test(html)) {
		fail(route, 'seo.preview.large-image', 'Page does not permit large image previews.');
	}

	if (noindex) continue;

	if (!canonical) {
		fail(route, 'seo.canonical.missing', 'Indexable page is missing a canonical URL.');
	} else if (!canonical.startsWith(site)) {
		fail(route, 'seo.canonical.origin', `Canonical URL is outside ${site}.`);
	}

	const ogUrl = metaContent(html, 'og:url', 'property');
	if (!ogUrl || ogUrl !== canonical) fail(route, 'seo.og.url', 'Open Graph URL must match the canonical URL.');
	if (!metaContent(html, 'og:title', 'property')) fail(route, 'seo.og.title', 'Missing og:title.');
	if (!metaContent(html, 'og:description', 'property')) fail(route, 'seo.og.description', 'Missing og:description.');
	if (!metaContent(html, 'og:image', 'property')) fail(route, 'seo.og.image', 'Missing og:image.');
	if (!metaContent(html, 'twitter:card')) fail(route, 'seo.twitter.card', 'Missing Twitter card metadata.');

	const articleRoute = /^\/blog\/[^/]+\/$/.test(route);
	if (articleRoute) {
		if (metaContent(html, 'og:type', 'property') !== 'article') fail(route, 'seo.article.og-type', 'Article page must use og:type=article.');
		if (!html.includes('"@type":"BlogPosting"')) fail(route, 'seo.article.schema', 'Article page is missing BlogPosting JSON-LD.');
		if (!html.includes('"@type":"BreadcrumbList"')) fail(route, 'seo.breadcrumb.schema', 'Article page is missing BreadcrumbList JSON-LD.');
		if (!html.includes('"datePublished"')) fail(route, 'seo.article.date-published', 'BlogPosting JSON-LD is missing datePublished.');
		if (!html.includes('"headline"')) fail(route, 'seo.article.headline', 'BlogPosting JSON-LD is missing headline.');
	}
}

const homeHtml = await fs.readFile(path.join(dist, 'index.html'), 'utf8');
if (!homeHtml.includes('"@type":"WebSite"')) fail('/', 'seo.website.schema', 'Homepage is missing WebSite JSON-LD.');

console.log(`SEO quality gate: ${errors.length} error(s); HTML pages checked: ${htmlFiles.length}; sitemap files: ${sitemapFiles.length}`);
for (const issue of errors) console.error(`ERROR [${issue.code}] ${issue.route}: ${issue.message}`);
if (errors.length) process.exitCode = 1;
