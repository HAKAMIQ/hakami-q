import { promises as fs } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const errors = [];
const warnings = [];

const read = (file) => fs.readFile(path.join(root, file), 'utf8');
const fail = (file, rule, message) => errors.push({ file, rule, message });
const warn = (file, rule, message) => warnings.push({ file, rule, message });

async function collectFiles(dir, extension) {
	const absolute = path.join(root, dir);
	const entries = await fs.readdir(absolute, { withFileTypes: true });
	const files = [];
	for (const entry of entries) {
		const relative = path.join(dir, entry.name).replaceAll('\\', '/');
		if (entry.isDirectory()) files.push(...await collectFiles(relative, extension));
		else if (entry.isFile() && entry.name.endsWith(extension)) files.push(relative);
	}
	return files;
}

const [pkgText, config, head, theme, textStyles, tooltipStyles, tooltipRuntime, treeRuntime, components] = await Promise.all([
	read('package.json'),
	read('astro.config.mjs'),
	read('src/components/BaseHead.astro'),
	read('src/styles/fluent-core-theme.css'),
	read('src/styles/fluent-text.css'),
	read('src/styles/fluent-tooltip.css'),
	read('public/fluent-tooltip.js'),
	read('public/fluent-category-tree.js'),
	read('src/styles/fluent-web-components.css'),
]);

const pkg = JSON.parse(pkgText);
const runtimeDeps = Object.keys(pkg.dependencies ?? {});

// Fluent UI Web Components guidance: standards-based and framework interoperable.
for (const dependency of runtimeDeps) {
	if (dependency === 'react' || dependency === 'react-dom' || dependency.startsWith('@fluentui/react')) {
		fail('package.json', 'interop.framework-runtime', `Unexpected React-specific runtime dependency: ${dependency}`);
	}
}

// Performance and bundle-size invariants for a static site with hundreds of pages.
if (!/compressHTML\s*:\s*true/.test(config)) {
	fail('astro.config.mjs', 'performance.compress-html', 'Astro HTML compression must remain enabled.');
}
if (!/inlineStylesheets\s*:\s*['"]never['"]/.test(config)) {
	fail('astro.config.mjs', 'bundle.cacheable-css', 'Shared project styles must remain external/cacheable instead of being duplicated inline across pages.');
}

// Avoid silently introducing third-party runtime/CDN scripts into every page.
for (const match of head.matchAll(/<script\b[^>]*\bsrc=["'](https?:\/\/[^"']+)["'][^>]*>/gi)) {
	fail('src/components/BaseHead.astro', 'interop.external-runtime', `Global external runtime script is not allowed: ${match[1]}`);
}

// Design-to-code: components must continue to consume the shared token system.
for (const requiredToken of [
	'--color-neutral-background-1',
	'--color-neutral-foreground-1',
	'--color-brand-background',
	'--spacing-160',
	'--radius-large',
	'--shadow-4',
]) {
	if (!theme.includes(requiredToken)) {
		fail('src/styles/fluent-core-theme.css', 'tokens.required', `Required Fluent token is missing: ${requiredToken}`);
	}
}

if (!components.includes('var(--color-neutral-card-background)')) {
	fail('src/styles/fluent-web-components.css', 'tokens.component-consumption', 'Reusable components must consume semantic Fluent tokens.');
}

// Fluent Text contract.
if (!head.includes("import '../styles/fluent-text.css';")) {
	fail('src/components/BaseHead.astro', 'text.global-load', 'Fluent Text styles must be loaded globally.');
}
for (const size of [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]) {
	if (!textStyles.includes(`.fui-text--size-${size}`)) {
		fail('src/styles/fluent-text.css', 'text.size-ramp', `Missing Fluent Text size utility: ${size}.`);
	}
}
for (const requiredTextUtility of [
	'.fui-text--nowrap', '.fui-text--truncate', '.fui-text--italic', '.fui-text--underline',
	'.fui-text--strikethrough', '.fui-text--block', '.fui-text--weight-medium',
	'.fui-text--weight-regular', '.fui-text--weight-semibold', '.fui-text--weight-bold',
	'.fui-text--align-start', '.fui-text--align-end', '.fui-text--align-center',
	'.fui-text--align-justify', '.fui-text--font-base', '.fui-text--font-numeric',
	'.fui-text--font-monospace',
]) {
	if (!textStyles.includes(requiredTextUtility)) {
		fail('src/styles/fluent-text.css', 'text.utility', `Missing Fluent Text utility: ${requiredTextUtility}.`);
	}
}
if (/text-align\s*:\s*(left|right)\b/i.test(textStyles)) {
	fail('src/styles/fluent-text.css', 'text.logical-alignment', 'Fluent Text must use logical start/end alignment instead of left/right so RTL remains correct.');
}
if (!textStyles.includes('font-variant-numeric: tabular-nums')) {
	fail('src/styles/fluent-text.css', 'text.numeric-font', 'Numeric text must expose stable tabular-number rendering.');
}

// Fluent Tooltip: use a lightweight standards-based surface for compact/icon controls.
for (const requiredHeadEntry of [
	"import '../styles/fluent-tooltip.css';",
	'<script src="/fluent-tooltip.js" defer></script>',
	'<script src="/fluent-category-tree.js" defer></script>',
]) {
	if (!head.includes(requiredHeadEntry)) {
		fail('src/components/BaseHead.astro', 'components.global-runtime', `Missing required Fluent runtime/style entry: ${requiredHeadEntry}`);
	}
}
for (const requiredTooltipContract of [
	"tooltip.setAttribute('role', 'tooltip')",
	"document.addEventListener('focusin'",
	"document.addEventListener('pointerover'",
	"event.key === 'Escape'",
	"anchor.setAttribute('aria-describedby'",
]) {
	if (!tooltipRuntime.includes(requiredTooltipContract)) {
		fail('public/fluent-tooltip.js', 'tooltip.accessibility', `Missing Tooltip interaction contract: ${requiredTooltipContract}`);
	}
}
for (const token of ['var(--color-neutral-background-1)', 'var(--shadow-16)', 'var(--radius-medium)']) {
	if (!tooltipStyles.includes(token)) {
		fail('src/styles/fluent-tooltip.css', 'tooltip.tokens', `Tooltip must consume Fluent semantic tokens: ${token}`);
	}
}

// Fluent Tree: the category hierarchy is a real two-level navigation tree.
for (const requiredTreeContract of [
	"tree.setAttribute('role', 'tree')",
	"trigger.setAttribute('role', 'treeitem')",
	"panel.setAttribute('role', 'group')",
	"link.setAttribute('role', 'treeitem')",
	"case 'ArrowDown'",
	"case 'ArrowUp'",
	"case 'ArrowRight'",
	"case 'ArrowLeft'",
	"case 'Home'",
	"case 'End'",
]) {
	if (!treeRuntime.includes(requiredTreeContract)) {
		fail('public/fluent-category-tree.js', 'tree.keyboard', `Missing Tree semantic/keyboard contract: ${requiredTreeContract}`);
	}
}

// TextArea applicability: do not add an unused control. When one appears, it must be implemented deliberately.
const astroFiles = await collectFiles('src', '.astro');
let textareaCount = 0;
for (const file of astroFiles) {
	const content = await read(file);
	const matches = [...content.matchAll(/<textarea\b/gi)];
	textareaCount += matches.length;
}
if (textareaCount > 0) {
	warn('src/**/*.astro', 'textarea.feature-review', `Found ${textareaCount} textarea element(s). Apply the Fluent TextArea contract (label, appearance, size, resize/auto-resize, validation and disabled/readonly states) before shipping the feature.`);
}

// The site intentionally uses native semantic elements for simple controls.
if (runtimeDeps.includes('@fluentui/web-components')) {
	warn('package.json', 'bundle.fluent-runtime', 'Official Fluent Web Components runtime is installed. Verify that only required components are imported and that the bundle cost is justified.');
}

console.log(`Web standards quality: ${errors.length} error(s), ${warnings.length} warning(s)`);
for (const issue of errors) console.error(`ERROR [${issue.rule}] ${issue.file}: ${issue.message}`);
for (const issue of warnings) console.warn(`WARN  [${issue.rule}] ${issue.file}: ${issue.message}`);
if (errors.length) process.exitCode = 1;
