import { promises as fs } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const jsonIndex = process.argv.indexOf('--json');
const reportPath = jsonIndex >= 0 ? process.argv[jsonIndex + 1] : null;
const errors = [];
const warnings = [];

const read = (file) => fs.readFile(path.join(root, file), 'utf8');
const fail = (file, rule, message) => errors.push({ file, rule, message });
const warn = (file, rule, message) => warnings.push({ file, rule, message });

function requireText(file, source, needle, rule, message) {
	if (!source.includes(needle)) fail(file, rule, message);
}

function forbidText(file, source, needle, rule, message) {
	if (source.includes(needle)) fail(file, rule, message);
}

async function collectAstroFiles(dir) {
	const absolute = path.join(root, dir);
	const entries = await fs.readdir(absolute, { withFileTypes: true });
	const files = [];
	for (const entry of entries) {
		const relative = path.join(dir, entry.name).replaceAll('\\', '/');
		if (entry.isDirectory()) files.push(...await collectAstroFiles(relative));
		else if (entry.isFile() && entry.name.endsWith('.astro')) files.push(relative);
	}
	return files;
}

const files = {
	home: 'src/pages/index.astro',
	blog: 'src/pages/blog/index.astro',
	article: 'src/layouts/BlogPost.astro',
	blogger: 'src/layouts/BloggerPageLayout.astro',
	static: 'src/layouts/StaticPageLayout.astro',
	header: 'src/components/Header.astro',
	footer: 'src/components/Footer.astro',
	sidebar: 'src/components/fluent/BlogSidebar.astro',
	global: 'src/styles/global.css',
	components: 'src/styles/fluent-web-components.css',
	native: 'src/styles/fluent-native-controls.css',
	navCss: 'src/styles/header-persistent-nav.css',
	theme: 'src/styles/fluent-core-theme.css',
	astroConfig: 'astro.config.mjs',
};

const source = Object.fromEntries(await Promise.all(
	Object.entries(files).map(async ([key, file]) => [key, await read(file)]),
));

// Accessibility landmarks: all user-facing page shells need the same keyboard escape hatch.
for (const key of ['home', 'blog', 'article', 'blogger', 'static']) {
	const file = files[key];
	requireText(file, source[key], '<SkipLink', 'a11y.skip-link', 'Missing SkipLink on a user-facing page shell.');
	requireText(file, source[key], 'id="main-content"', 'a11y.main-landmark', 'Main content must expose id="main-content" for the SkipLink target.');
}

// Article invariant: title once, then full content. Discovery metadata must not be reinserted visually.
requireText(files.article, source.article, '<h1 id="article-title">{title}</h1>', 'article.title', 'Article template must render one explicit page title.');
requireText(files.article, source.article, '<div class="article-content fluent-rich-text">', 'article.full-content', 'Article full-content container is missing.');
forbidText(files.article, source.article, '<FormattedDate', 'article.no-date', 'Article template must not reintroduce date metadata between title and content.');
forbidText(files.article, source.article, 'originalUrl', 'article.no-source', 'Article template must not reintroduce the migrated original-source UI.');
forbidText(files.article, source.article, '<p>{description}</p>', 'article.no-summary', 'Description belongs to discovery/SEO, not as a repeated article summary.');

const titleIndex = source.article.indexOf('<h1 id="article-title">{title}</h1>');
const contentIndex = source.article.indexOf('<div class="article-content fluent-rich-text">');
if (titleIndex < 0 || contentIndex < titleIndex) {
	fail(files.article, 'article.order', 'Article content must follow the page title directly in document order.');
}

// Homepage invariants previously approved by the product owner.
forbidText(files.home, source.home, 'BlogSidebar', 'home.no-sidebar', 'Do not add the blog/category sidebar to the homepage.');
forbidText(files.home, source.home, '<time', 'home.no-dates', 'Do not reintroduce article dates on the homepage.');

// Footer removals are permanent product decisions.
forbidText(files.footer, source.footer, 'hakamiq-logo', 'footer.no-logo', 'Do not reintroduce the footer logo.');
forbidText(files.footer, source.footer, 'brand-description', 'footer.no-description', 'Do not reintroduce the removed footer brand-description block.');

// Header is a disclosure-style site navigation. Do not claim ARIA menu semantics without full Menu keyboard behavior.
for (const forbidden of ['role="menu"', 'role="menuitem"', 'aria-haspopup="menu"']) {
	forbidText(files.header, source.header, forbidden, 'nav.semantic-role', `Header navigation must not use ${forbidden}; use disclosure buttons with aria-expanded/aria-controls.`);
}
requireText(files.header, source.header, 'aria-controls={panelId}', 'nav.controls', 'Top-level disclosure buttons must reference their panels with aria-controls.');
requireText(files.header, source.header, 'aria-controls={submenuId}', 'nav.submenu-controls', 'Nested disclosure buttons must reference their panels with aria-controls.');
requireText(files.header, source.header, '<span class="home-menu-text">الرئيسية</span>', 'nav.locale', 'Mobile Home label must stay Arabic.');
requireText(files.header, source.header, "event.key !== 'Escape'", 'nav.escape', 'Navigation must support Escape dismissal and focus restoration.');

// Sidebar is an overlay drawer below the desktop breakpoint and must behave modally.
for (const [needle, rule, message] of [
	["sidebar.setAttribute('aria-modal', 'true')", 'drawer.modal', 'Mobile sidebar drawer must expose modal semantics.'],
	['sidebar.inert = true', 'drawer.inert', 'Closed mobile drawer must be inert.'],
	["event.key === 'Escape'", 'drawer.escape', 'Drawer must close with Escape.'],
	['lastFocused?.focus()', 'drawer.restore-focus', 'Drawer must restore focus to its invoker.'],
	["event.key !== 'Tab'", 'drawer.focus-trap', 'Modal drawer must keep keyboard focus inside while open.'],
	['aria-controls={panelId}', 'accordion.controls', 'Accordion headers must reference their panels.'],
	['aria-expanded="false"', 'accordion.expanded', 'Accordion headers must expose expanded state.'],
	['<label class="sr-only" for="category-search-input">', 'search.label', 'Category search must have a persistent accessible label.'],
	['data-category-clear hidden', 'search.clear-state', 'Search clear control should only appear when there is content.'],
]) requireText(files.sidebar, source.sidebar, needle, rule, message);

// Never hide imported article content again. Visibility rules for unrelated UI are allowed.
for (const [key, css] of [['global', source.global], ['article', source.article]]) {
	const hiddenContentRule = /([^{}]*(?:\.fluent-rich-text|\.article-content)[^{}]*)\{[^{}]*display\s*:\s*none\b/gi;
	for (const match of css.matchAll(hiddenContentRule)) {
		fail(files[key], 'article.no-css-hiding', `Content selector must not hide article material with display:none: ${match[1].trim().slice(0, 120)}`);
	}
}

// Design-token discipline: raw hex colors belong in the theme/token file, not component styles.
for (const key of ['global', 'components', 'native', 'navCss', 'article', 'static', 'blogger', 'home', 'blog', 'header', 'footer', 'sidebar']) {
	const matches = [...source[key].matchAll(/#[0-9a-fA-F]{3,8}\b/g)];
	if (matches.length) {
		fail(files[key], 'tokens.raw-color', `Found ${matches.length} raw hex color value(s); use semantic Fluent aliases instead.`);
	}
	if (/transition\s*:\s*all\b/i.test(source[key])) {
		fail(files[key], 'motion.transition-all', 'Avoid transition: all; animate only the properties that communicate state.');
	}
}

// The current Fluent typography uses native/system fonts. Legacy Atkinson should not return to build configuration.
forbidText(files.astroConfig, source.astroConfig, 'Atkinson', 'typography.legacy-font', 'Legacy Atkinson font pipeline must remain removed.');
forbidText(files.astroConfig, source.astroConfig, 'fontProviders', 'typography.legacy-provider', 'Unused Astro font provider must remain removed.');

// Template image semantics and new-window links. Parse only inside one start tag so checks cannot bleed into neighboring markup.
const astroFiles = await collectAstroFiles('src');
for (const file of astroFiles) {
	const text = await read(file);
	for (const match of text.matchAll(/<img\b([^>]*)>/gi)) {
		if (!/\balt\s*=/.test(match[1])) {
			fail(file, 'image.alt', 'Template image is missing an alt attribute. Use descriptive alt text or alt="" for decorative images.');
		}
	}
	for (const match of text.matchAll(/<a\b([^>]*)target=["']_blank["']([^>]*)>/gi)) {
		const attributes = `${match[1]} ${match[2]}`;
		const rel = attributes.match(/\brel=["']([^"']+)["']/i)?.[1] ?? '';
		if (!/\bnoopener\b/i.test(rel) || !/\bnoreferrer\b/i.test(rel)) {
			fail(file, 'link.new-context-rel', 'target="_blank" links must include noopener noreferrer.');
		}
		const aria = attributes.match(/\baria-label=["']([^"']+)["']/i)?.[1] ?? '';
		if (!/(تبويب|نافذة|tab|window)/i.test(aria)) {
			fail(file, 'link.new-context-label', 'Links opening a new context must say so in their accessible label.');
		}
	}
}

// Helpful non-blocking observations.
if (!source.components.includes('.fui-tooltip')) {
	warn(files.components, 'component.tooltip', 'No custom tooltip primitive is defined. This is acceptable while native title text is only supplemental; add a real tooltip only when the experience needs one.');
}

const report = {
	generatedAt: new Date().toISOString(),
	errors,
	warnings,
	summary: {
		errors: errors.length,
		warnings: warnings.length,
		status: errors.length === 0 ? 'pass' : 'fail',
	},
};

if (reportPath) {
	const absolute = path.join(root, reportPath);
	await fs.mkdir(path.dirname(absolute), { recursive: true });
	await fs.writeFile(absolute, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
}

console.log(`Fluent UI quality: ${errors.length} error(s), ${warnings.length} warning(s)`);
for (const issue of errors) console.error(`ERROR [${issue.rule}] ${issue.file}: ${issue.message}`);
for (const issue of warnings) console.warn(`WARN  [${issue.rule}] ${issue.file}: ${issue.message}`);

if (errors.length) process.exitCode = 1;
