import { promises as fs } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const errors = [];
const warnings = [];

const read = (file) => fs.readFile(path.join(root, file), 'utf8');
const fail = (file, rule, message) => errors.push({ file, rule, message });
const warn = (file, rule, message) => warnings.push({ file, rule, message });

const [pkgText, config, head, theme, textStyles, components] = await Promise.all([
	read('package.json'),
	read('astro.config.mjs'),
	read('src/components/BaseHead.astro'),
	read('src/styles/fluent-core-theme.css'),
	read('src/styles/fluent-text.css'),
	read('src/styles/fluent-web-components.css'),
]);

const pkg = JSON.parse(pkgText);
const runtimeDeps = Object.keys(pkg.dependencies ?? {});

// Fluent UI Web Components guidance: standards-based and framework interoperable.
// This Astro site must not gain a React-only Fluent runtime merely to reproduce Fluent visuals.
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

// Fluent Text contract: preserve semantic HTML while exposing the documented presentation controls.
if (!head.includes("import '../styles/fluent-text.css';")) {
	fail('src/components/BaseHead.astro', 'text.global-load', 'Fluent Text styles must be loaded globally.');
}

for (const size of [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]) {
	if (!textStyles.includes(`.fui-text--size-${size}`)) {
		fail('src/styles/fluent-text.css', 'text.size-ramp', `Missing Fluent Text size utility: ${size}.`);
	}
}

for (const requiredTextUtility of [
	'.fui-text--nowrap',
	'.fui-text--truncate',
	'.fui-text--italic',
	'.fui-text--underline',
	'.fui-text--strikethrough',
	'.fui-text--block',
	'.fui-text--weight-medium',
	'.fui-text--weight-regular',
	'.fui-text--weight-semibold',
	'.fui-text--weight-bold',
	'.fui-text--align-start',
	'.fui-text--align-end',
	'.fui-text--align-center',
	'.fui-text--align-justify',
	'.fui-text--font-base',
	'.fui-text--font-numeric',
	'.fui-text--font-monospace',
]) {
	if (!textStyles.includes(requiredTextUtility)) {
		fail('src/styles/fluent-text.css', 'text.utility', `Missing Fluent Text utility: ${requiredTextUtility}.`);
	}
}

if (/text-align\s*:\s*(left|right)\b/i.test(textStyles)) {
	fail('src/styles/fluent-text.css', 'text.logical-alignment', 'Fluent Text must use logical start/end alignment instead of left/right so RTL remains correct.');
}

if (!textStyles.includes("font-variant-numeric: tabular-nums")) {
	fail('src/styles/fluent-text.css', 'text.numeric-font', 'Numeric text must expose stable tabular-number rendering.');
}

// The site intentionally uses native semantic elements for simple controls. A Web Component
// should only be introduced when lifecycle/encapsulation provides real product value.
if (runtimeDeps.includes('@fluentui/web-components')) {
	warn('package.json', 'bundle.fluent-runtime', 'Official Fluent Web Components runtime is installed. Verify that only required components are imported and that the bundle cost is justified.');
}

console.log(`Web standards quality: ${errors.length} error(s), ${warnings.length} warning(s)`);
for (const issue of errors) console.error(`ERROR [${issue.rule}] ${issue.file}: ${issue.message}`);
for (const issue of warnings) console.warn(`WARN  [${issue.rule}] ${issue.file}: ${issue.message}`);

if (errors.length) process.exitCode = 1;
