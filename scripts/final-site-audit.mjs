import { promises as fs } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const distArg = process.argv.indexOf('--dist');
const jsonArg = process.argv.indexOf('--json');
const dist = path.resolve(root, distArg >= 0 ? process.argv[distArg + 1] : 'dist');
const reportPath = jsonArg >= 0 ? path.resolve(root, jsonArg >= 0 ? process.argv[jsonArg + 1] : 'reports/final-site-audit.json') : null;

const errors = [];
const warnings = [];
const stats = {
	htmlPages: 0,
	articlePages: 0,
	staticPages: 0,
	images: 0,
	internalLinks: 0,
	brokenInternalLinks: 0,
	missingAlt: 0,
	duplicateIds: 0,
	maxHtmlBytes: 0,
	maxHtmlPage: '',
};

const pushError = (route, code, message) => errors.push({ route, code, message });
const pushWarning = (route, code, message) => warnings.push({ route, code, message });

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

async function countBlogSources(directory = path.join(root, 'src/content/blog')) {
	const entries = await fs.readdir(directory, { withFileTypes: true });
	let count = 0;
	for (const entry of entries) {
		const absolute = path.join(directory, entry.name);
		if (entry.isDirectory()) count += await countBlogSources(absolute);
		else if (/\.(?:md|mdx)$/i.test(entry.name)) count += 1;
	}
	return count;
}

function routeFromHtml(file) {
	const relative = path.relative(dist, file).replaceAll('\\', '/');
	if (relative === 'index.html') return '/';
	if (relative.endsWith('/index.html')) return `/${relative.slice(0, -'index.html'.length)}`;
	return `/${relative}`;
}

function normalizeRoute(value) {
	let decoded = value;
	try { decoded = decodeURIComponent(value); } catch {}
	const pathname = decoded.split('#')[0].split('?')[0] || '/';
	if (!pathname.startsWith('/')) return pathname;
	return pathname.replace(/\/{2,}/g, '/');
}

function hasAttribute(tag, name) {
	return new RegExp(`\\b${name}\\s*=`, 'i').test(tag);
}

function isGoogleVerificationFile(file) {
	return /^google[a-z0-9_-]+\.html$/i.test(path.basename(file));
}

const allFiles = await walk(dist);
const htmlFiles = allFiles.filter((file) => file.endsWith('.html') && !isGoogleVerificationFile(file));
const outputPaths = new Set();
const routes = new Set();

for (const file of allFiles) {
	const relative = `/${path.relative(dist, file).replaceAll('\\', '/')}`;
	outputPaths.add(relative);
}
for (const file of htmlFiles) {
	const route = routeFromHtml(file);
	routes.add(route);
	if (route !== '/') routes.add(route.replace(/\/$/, ''));
}

const isResolvableInternal = (href) => {
	const target = normalizeRoute(href);
	if (!target.startsWith('/')) return true;
	if (target === '/') return routes.has('/');
	if (routes.has(target) || routes.has(`${target}/`)) return true;
	if (outputPaths.has(target)) return true;
	if (outputPaths.has(`${target}/index.html`)) return true;
	return false;
};

for (const file of htmlFiles) {
	const route = routeFromHtml(file);
	const html = await fs.readFile(file, 'utf8');
	const byteLength = Buffer.byteLength(html);
	stats.htmlPages += 1;
	if (byteLength > stats.maxHtmlBytes) {
		stats.maxHtmlBytes = byteLength;
		stats.maxHtmlPage = route;
	}
	if (byteLength > 1_500_000) pushWarning(route, 'performance.large-html', `HTML size is ${(byteLength / 1024 / 1024).toFixed(2)} MiB.`);

	if (!/<html\b[^>]*\blang=["'][^"']+["'][^>]*>/i.test(html)) pushError(route, 'document.lang', 'Missing html lang attribute.');
	if (!/<html\b[^>]*\bdir=["'](?:rtl|ltr)["'][^>]*>/i.test(html)) pushError(route, 'document.dir', 'Missing html dir attribute.');
	if (!/<title>[^<]+<\/title>/i.test(html)) pushError(route, 'seo.title', 'Missing or empty document title.');
	if (!/<meta\b[^>]*\bname=["']description["'][^>]*\bcontent=["'][^"']+["'][^>]*>/i.test(html)) pushError(route, 'seo.description', 'Missing or empty meta description.');
	if (!/<link\b[^>]*\brel=["']canonical["'][^>]*\bhref=["'][^"']+["'][^>]*>/i.test(html)) pushError(route, 'seo.canonical', 'Missing canonical link.');
	if (!/href=["']#main-content["']/i.test(html)) pushError(route, 'a11y.skip-link', 'Missing Skip Link target reference.');

	const mainCount = (html.match(/<main\b/gi) ?? []).length;
	if (mainCount !== 1) pushError(route, 'landmark.main-count', `Expected exactly one main landmark, found ${mainCount}.`);
	if (!/<main\b[^>]*\bid=["']main-content["']/i.test(html)) pushError(route, 'landmark.main-id', 'Main landmark is missing id="main-content".');

	const ids = [...html.matchAll(/\bid=["']([^"']+)["']/gi)].map((match) => match[1]);
	const seenIds = new Set();
	const duplicates = new Set();
	for (const id of ids) {
		if (seenIds.has(id)) duplicates.add(id);
		seenIds.add(id);
	}
	if (duplicates.size) {
		stats.duplicateIds += duplicates.size;
		pushWarning(route, 'a11y.duplicate-id', `Duplicate id values: ${[...duplicates].slice(0, 8).join(', ')}${duplicates.size > 8 ? '…' : ''}`);
	}

	for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
		stats.images += 1;
		if (!hasAttribute(match[0], 'alt')) {
			stats.missingAlt += 1;
			pushError(route, 'image.alt', 'Rendered image is missing an alt attribute.');
		}
	}

	for (const match of html.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["'][^>]*>/gi)) {
		const href = match[1].trim();
		const tag = match[0];
		if (/^javascript:/i.test(href)) pushError(route, 'security.javascript-link', 'Rendered link uses a javascript: URL.');
		if (/\btarget=["']_blank["']/i.test(tag)) {
			const rel = tag.match(/\brel=["']([^"']*)["']/i)?.[1] ?? '';
			if (!/\bnoopener\b/i.test(rel) || !/\bnoreferrer\b/i.test(rel)) pushError(route, 'security.new-tab-rel', 'New-tab link is missing noopener noreferrer.');
		}
		if (!href.startsWith('/') || href.startsWith('//')) continue;
		stats.internalLinks += 1;
		if (!isResolvableInternal(href)) {
			stats.brokenInternalLinks += 1;
			pushError(route, 'link.internal-broken', `Internal link does not resolve in dist: ${href}`);
		}
	}

	if (/\s(?:onload|onclick|onerror|onmouseover|onfocus)\s*=/i.test(html)) pushError(route, 'security.inline-handler', 'Rendered HTML contains an inline event handler.');

	const articleRoute = /^\/blog\/[^/]+\/$/.test(route);
	if (articleRoute) {
		stats.articlePages += 1;
		const h1Count = (html.match(/<h1\b/gi) ?? []).length;
		if (h1Count !== 1) pushError(route, 'article.single-h1', `Article must render exactly one H1; found ${h1Count}.`);
		if (!/<h1\b[^>]*\bid=["']article-title["']/i.test(html)) pushError(route, 'article.title-id', 'Article page title is missing article-title id.');
		const titlePosition = html.search(/<h1\b[^>]*\bid=["']article-title["']/i);
		const contentPosition = html.indexOf('class="article-content fluent-rich-text"');
		if (titlePosition < 0 || contentPosition < titlePosition) pushError(route, 'article.order', 'Full article content must follow the page title.');
	}
}

const blogSourceCount = await countBlogSources();
if (stats.articlePages !== blogSourceCount) {
	pushError('/blog/', 'build.article-parity', `Built ${stats.articlePages} article pages for ${blogSourceCount} blog source files.`);
}

const homeFile = path.join(dist, 'index.html');
const homeHtml = await fs.readFile(homeFile, 'utf8');
if (/<time\b/i.test(homeHtml)) pushError('/', 'home.no-dates', 'Homepage must not render publication dates.');
if (/BlogSidebar|sidebar-region/i.test(homeHtml)) pushError('/', 'home.no-sidebar', 'Homepage must not render the blog category sidebar.');

const blogFile = path.join(dist, 'blog/index.html');
const blogHtml = await fs.readFile(blogFile, 'utf8');
const initialCards = (blogHtml.match(/class=["'][^"']*\bpost-card\b[^"']*["']/gi) ?? []).length;
if (initialCards > 12) pushError('/blog/', 'listing.initial-dom', `Blog initial DOM contains ${initialCards} cards; expected at most 12.`);
if (!/id=["']posts-pagination["']/i.test(blogHtml)) pushError('/blog/', 'listing.pagination', 'Blog pagination container is missing.');
if (/id=["']posts-per-page["']/i.test(blogHtml)) pushError('/blog/', 'listing.no-page-size', 'Blog page-size selector must remain removed from the reader-facing UI.');
if (/id=["']post-count["']/i.test(blogHtml)) pushError('/blog/', 'listing.no-total-count', 'Blog total article count must remain removed from the reader-facing UI.');
if (/id=["']listing-range["']/i.test(blogHtml)) pushError('/blog/', 'listing.no-range-metrics', 'Blog listing range metrics must remain removed from the reader-facing UI.');
if (/class=["'][^"']*\bpage-hero\b[^"']*["']/i.test(blogHtml)) pushError('/blog/', 'listing.no-intro-hero', 'Blog intro hero must remain removed.');

stats.staticPages = stats.htmlPages - stats.articlePages - 2;
const report = {
	generatedAt: new Date().toISOString(),
	dist: path.relative(root, dist).replaceAll('\\', '/'),
	summary: {
		status: errors.length === 0 ? 'pass' : 'fail',
		errors: errors.length,
		warnings: warnings.length,
		...stats,
		blogSourceFiles: blogSourceCount,
	},
	errors,
	warnings,
};

if (reportPath) {
	await fs.mkdir(path.dirname(reportPath), { recursive: true });
	await fs.writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
}

console.log(`Final site audit: ${errors.length} error(s), ${warnings.length} warning(s)`);
console.log(`HTML pages: ${stats.htmlPages}; articles: ${stats.articlePages}/${blogSourceCount}; images: ${stats.images}; internal links: ${stats.internalLinks}`);
console.log(`Largest HTML: ${stats.maxHtmlPage} (${(stats.maxHtmlBytes / 1024).toFixed(1)} KiB)`);
for (const issue of errors) console.error(`ERROR [${issue.code}] ${issue.route}: ${issue.message}`);
for (const issue of warnings) console.warn(`WARN  [${issue.code}] ${issue.route}: ${issue.message}`);
if (errors.length) process.exitCode = 1;
