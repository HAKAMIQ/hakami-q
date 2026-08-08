import { promises as fs } from 'node:fs';

const cssPath = 'src/styles/header-footer-metrics.css';
const headPath = 'src/components/BaseHead.astro';

const [css, head] = await Promise.all([
	fs.readFile(cssPath, 'utf8'),
	fs.readFile(headPath, 'utf8'),
]);

const errors = [];
const requireMatch = (pattern, message) => {
	if (!pattern.test(css)) errors.push(message);
};

if (/min-height\s*:\s*56px\b/.test(css)) {
	errors.push('Utility strip must not inherit the footer row height (56px).');
}

requireMatch(/\.utility-inner\s*\{[\s\S]*?min-height\s*:\s*40px\b/, 'Desktop utility strip must stay at 40px.');
requireMatch(/\.utility-links a\s*\{[\s\S]*?min-height\s*:\s*32px\b/, 'Utility links must keep 32px control height.');
requireMatch(/\.utility-links a\s*\{[\s\S]*?padding-inline\s*:\s*var\(--spacing-80\)/, 'Utility links must match footer spacing-80 padding.');
requireMatch(/\.utility-links a\s*\{[\s\S]*?font-size\s*:\s*var\(--font-size-caption-1\)/, 'Utility links must match footer Caption 1 typography.');

const importNeedle = "import '../styles/header-footer-metrics.css';";
const importCount = head.split(importNeedle).length - 1;
if (importCount !== 1) errors.push('BaseHead must import the utility metrics stylesheet exactly once.');

const navIndex = head.indexOf("import '../styles/header-persistent-nav.css';");
const metricsIndex = head.indexOf(importNeedle);
if (navIndex < 0 || metricsIndex < navIndex) {
	errors.push('Utility metrics stylesheet must load after persistent navigation overrides.');
}

if (errors.length) {
	for (const error of errors) console.error(`HEADER UTILITY ERROR: ${error}`);
	process.exitCode = 1;
} else {
	console.log('Header utility quality: pass');
}
