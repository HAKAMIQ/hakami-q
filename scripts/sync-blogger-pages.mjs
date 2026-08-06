import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const BLOG_ID = process.env.BLOGGER_BLOG_ID || '3771343465280744442';
const BLOG_ORIGIN = (process.env.BLOGGER_ORIGIN || 'https://hakamiq1.blogspot.com').replace(/\/+$/, '');
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUTPUT = resolve(ROOT, 'src/data/blogger-pages.json');

const pageDefinitions = [
	{ route: 'about', titles: ['من نحن'], lang: 'ar', aliases: ['p/blog-page_38.html'] },
	{ route: 'en/about', titles: ['About Us', 'About Us (English)'], lang: 'en', aliases: [] },
	{ route: 'contact', titles: ['اتصل بنا', 'إتصل بنا'], lang: 'ar', aliases: ['p/blog-page_67.html'] },
	{ route: 'en/contact', titles: ['Contact Us', 'Contact Us (English)'], lang: 'en', aliases: ['p/contact-us.html'] },
	{ route: 'services', titles: ['خدمة المحاكيات'], lang: 'ar', aliases: [] },
	{ route: 'en/services', titles: ['Emulator Service'], lang: 'en', aliases: [] },
	{ route: 'privacy', titles: ['سياسة الخصوصية', 'سياسية الخصوصية'], lang: 'ar', aliases: ['p/blog-page.html', 'p/privacy-policy.html'] },
	{ route: 'en/privacy', titles: ['Privacy Policy', 'Privacy Policy (English)'], lang: 'en', aliases: ['p/privacy-policy-english.html'] },
	{ route: 'terms', titles: ['اتفاقية الاستخدام'], lang: 'ar', aliases: ['p/blog-page_10.html'] },
	{ route: 'en/terms', titles: ['Terms of Use', 'Terms of Use (English)'], lang: 'en', aliases: ['p/terms-of-use-english.html'] },
	{ route: 'disclaimer', titles: ['إخلاء المسؤولية'], lang: 'ar', aliases: ['p/blog-page_8.html'] },
	{ route: 'en/disclaimer', titles: ['Disclaimer', 'Disclaimer (English)'], lang: 'en', aliases: ['p/disclaimer-english.html'] },
];

const normalizeTitle = (value = '') =>
	value
		.replace(/\s+/g, ' ')
		.replace(/\s*[|–—-]\s*HAKAMIQ\s*$/i, '')
		.trim()
		.toLocaleLowerCase();

const definitionsByTitle = new Map(
	pageDefinitions.flatMap((definition) =>
		definition.titles.map((title) => [normalizeTitle(title), definition]),
	),
);

function decodeEntities(value = '') {
	return value
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#39;|&apos;/g, "'")
		.replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
		.replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)));
}

function stripTags(value = '') {
	return decodeEntities(
		value
			.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
			.replace(/<[^>]+>/g, ' ')
			.replace(/\s+/g, ' '),
	).trim();
}

function makeDescription(content, fallbackTitle) {
	const text = stripTags(content);
	if (!text) return fallbackTitle;
	return text.length > 190 ? `${text.slice(0, 187).trimEnd()}...` : text;
}

function slugify(value = '') {
	const slug = value
		.normalize('NFKD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLocaleLowerCase()
		.replace(/[^\p{L}\p{N}]+/gu, '-')
		.replace(/^-+|-+$/g, '')
		.slice(0, 90);
	return slug || 'page';
}

function sanitizeContent(value = '') {
	return value
		.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
		.replace(/<iframe\b[^>]*\bsrcdoc\s*=\s*(?:"[^"]*"|'[^']*')[^>]*>[\s\S]*?<\/iframe>/gi, '')
		.replace(/\s+on[a-z][a-z0-9:_-]*\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')
		.replace(/\b(href|src)\s*=\s*(["'])\s*javascript:[\s\S]*?\2/gi, '$1="#"')
		.replace(/<meta\b[^>]*http-equiv\s*=\s*(["'])refresh\1[^>]*>/gi, '')
		.trim();
}

function pathFromUrl(url) {
	try {
		return new URL(url).pathname.replace(/^\/+/, '');
	} catch {
		return '';
	}
}

function titleFromHtml(html) {
	const og = html.match(/<meta\b[^>]*property=(["'])og:title\1[^>]*content=(["'])([\s\S]*?)\2[^>]*>/i)
		|| html.match(/<meta\b[^>]*content=(["'])([\s\S]*?)\1[^>]*property=(["'])og:title\3[^>]*>/i);
	if (og) {
		const value = og.length === 4 ? og[3] : og[2];
		return stripTags(value);
	}

	const heading = html.match(/<h[123]\b[^>]*class=(["'])[^"']*\bpost-title\b[^"']*\1[^>]*>([\s\S]*?)<\/h[123]>/i);
	if (heading) return stripTags(heading[2]);

	const title = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);
	return title ? stripTags(title[1]) : '';
}

function extractBalancedDiv(html, openingMatch) {
	const openingTag = openingMatch[0];
	const start = (openingMatch.index ?? 0) + openingTag.length;
	const tagPattern = /<\/?div\b[^>]*>/gi;
	tagPattern.lastIndex = start;
	let depth = 1;
	let match;

	while ((match = tagPattern.exec(html))) {
		if (/^<\//.test(match[0])) depth -= 1;
		else if (!/\/>$/.test(match[0])) depth += 1;

		if (depth === 0) return html.slice(start, match.index);
	}

	return '';
}

function contentFromHtml(html) {
	const patterns = [
		/<div\b[^>]*class=(["'])[^"']*\bpost-body\b[^"']*\1[^>]*>/i,
		/<div\b[^>]*itemprop=(["'])articleBody\1[^>]*>/i,
		/<div\b[^>]*class=(["'])[^"']*\bentry-content\b[^"']*\1[^>]*>/i,
	];

	for (const pattern of patterns) {
		const match = pattern.exec(html);
		if (match) {
			const content = extractBalancedDiv(html, match);
			if (content) return content;
		}
	}

	const article = html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/i);
	return article?.[1] || '';
}

function updatedFromHtml(html) {
	const match =
		html.match(/<meta\b[^>]*property=(["'])article:modified_time\1[^>]*content=(["'])([\s\S]*?)\2[^>]*>/i)
		|| html.match(/<time\b[^>]*datetime=(["'])([\s\S]*?)\1/i);
	return match ? (match[3] || match[2] || '') : '';
}

async function fetchResponse(url, { optional = false } = {}) {
	let lastError;
	for (let attempt = 1; attempt <= 3; attempt += 1) {
		const controller = new AbortController();
		const timeout = setTimeout(() => controller.abort(), 30000);
		try {
			const response = await fetch(url, {
				headers: {
					accept: 'application/json, application/xml, text/html;q=0.9, */*;q=0.8',
					'user-agent': 'Mozilla/5.0 (compatible; HAKAMIQ-Blogger-Migration/1.0)',
				},
				redirect: 'follow',
				signal: controller.signal,
			});
			if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`);
			return response;
		} catch (error) {
			lastError = error;
			if (attempt < 3) await new Promise((resolvePromise) => setTimeout(resolvePromise, attempt * 1500));
		} finally {
			clearTimeout(timeout);
		}
	}
	if (optional) return null;
	throw new Error(`Unable to fetch ${url}: ${lastError?.message || lastError}`);
}

async function loadFromFeed() {
	const feedUrls = [
		`https://www.blogger.com/feeds/${BLOG_ID}/pages/default?alt=json&max-results=500`,
		`${BLOG_ORIGIN}/feeds/pages/default?alt=json&max-results=500`,
	];

	for (const url of feedUrls) {
		const response = await fetchResponse(url, { optional: true });
		if (!response) continue;

		try {
			const json = await response.json();
			const entries = Array.isArray(json?.feed?.entry) ? json.feed.entry : [];
			if (!entries.length) continue;

			return entries.map((entry) => ({
				title: entry?.title?.$t || '',
				content: entry?.content?.$t || '',
				sourceUrl:
					(entry?.link || []).find((link) => link?.rel === 'alternate')?.href || '',
				updated: entry?.updated?.$t || entry?.published?.$t || '',
			}));
		} catch {
			// Continue to the next endpoint.
		}
	}

	return [];
}

async function loadFromSitemap() {
	const response = await fetchResponse(`${BLOG_ORIGIN}/sitemap-pages.xml`, { optional: true });
	if (!response) return [];

	const xml = await response.text();
	const urls = [...xml.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)]
		.map((match) => decodeEntities(match[1].trim()))
		.filter(Boolean);

	const pages = [];
	for (const url of urls) {
		const pageResponse = await fetchResponse(url, { optional: true });
		if (!pageResponse) continue;
		const html = await pageResponse.text();
		const content = contentFromHtml(html);
		if (!content) continue;
		pages.push({
			title: titleFromHtml(html),
			content,
			sourceUrl: url,
			updated: updatedFromHtml(html),
		});
	}
	return pages;
}

function resolveDefinition(title) {
	return definitionsByTitle.get(normalizeTitle(title));
}

function createUnknownRoute(title, sourceUrl, usedRoutes) {
	const pathname = pathFromUrl(sourceUrl);
	const sourceSlug = pathname.split('/').pop()?.replace(/\.html?$/i, '') || '';
	const base = slugify(title || sourceSlug);
	let route = `pages/${base}`;
	let suffix = 2;
	while (usedRoutes.has(route)) {
		route = `pages/${base}-${suffix}`;
		suffix += 1;
	}
	return route;
}

function rewriteInternalLinks(content, routeBySourcePath) {
	return content.replace(
		/(href\s*=\s*)(["'])(https?:\/\/hakamiq1\.blogspot\.com)?(\/p\/[^"'?#]+(?:\.html)?)([^"']*)\2/gi,
		(full, prefix, quote, origin, pathname, tail) => {
			const route = routeBySourcePath.get(pathname.replace(/^\/+/, ''));
			return route ? `${prefix}${quote}/${route}${tail}${quote}` : full;
		},
	);
}

async function readCurrentPages() {
	try {
		const parsed = JSON.parse(await readFile(OUTPUT, 'utf8'));
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}

async function main() {
	let rawPages = await loadFromFeed();
	let source = 'Blogger pages feed';

	if (!rawPages.length) {
		rawPages = await loadFromSitemap();
		source = 'Blogger page sitemap';
	}

	if (!rawPages.length) {
		const currentPages = await readCurrentPages();
		if (currentPages.length) {
			console.warn(`Blogger pages could not be downloaded; preserving ${currentPages.length} existing pages.`);
			return;
		}
		throw new Error('Blogger returned no public static pages, and no local page inventory exists.');
	}

	const usedRoutes = new Set();
	const routeBySourcePath = new Map();
	const preliminary = rawPages
		.map((rawPage) => {
			const title = stripTags(rawPage.title);
			const definition = resolveDefinition(title);
			const route = definition?.route || createUnknownRoute(title, rawPage.sourceUrl, usedRoutes);
			usedRoutes.add(route);

			const sourcePath = pathFromUrl(rawPage.sourceUrl);
			const aliases = new Set(definition?.aliases || []);
			if (sourcePath) aliases.add(sourcePath);
			aliases.delete(route);
			if (sourcePath) routeBySourcePath.set(sourcePath, route);

			const lang = definition?.lang || (/[A-Za-z]{3}/.test(title) ? 'en' : 'ar');
			return {
				route,
				title: title || (lang === 'ar' ? 'صفحة HAKAMIQ' : 'HAKAMIQ Page'),
				description: '',
				lang,
				dir: lang === 'ar' ? 'rtl' : 'ltr',
				sourceUrl: rawPage.sourceUrl || '',
				updated: rawPage.updated || '',
				aliases: [...aliases],
				content: sanitizeContent(rawPage.content),
			};
		})
		.filter((page) => page.content);

	for (const definition of pageDefinitions) {
		for (const alias of definition.aliases) {
			routeBySourcePath.set(alias, definition.route);
		}
	}

	const pages = preliminary
		.map((page) => {
			const content = rewriteInternalLinks(page.content, routeBySourcePath);
			return {
				...page,
				description: makeDescription(content, page.title),
				content,
			};
		})
		.sort((a, b) => a.route.localeCompare(b.route, 'en'));

	await mkdir(dirname(OUTPUT), { recursive: true });
	await writeFile(OUTPUT, `${JSON.stringify(pages, null, 2)}\n`, 'utf8');

	const knownCount = pages.filter((page) => !page.route.startsWith('pages/')).length;
	console.log(`Downloaded ${pages.length} Blogger pages from ${source}.`);
	console.log(`Mapped ${knownCount} known pages and preserved ${pages.length - knownCount} additional pages.`);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
