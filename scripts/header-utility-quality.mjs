import { promises as fs } from 'node:fs';

const navCssPath = 'src/styles/header-persistent-nav.css';
const headPath = 'src/components/BaseHead.astro';
const legacyMetricsPath = 'src/styles/header-footer-metrics.css';

const [css, head] = await Promise.all([
	fs.readFile(navCssPath, 'utf8'),
	fs.readFile(headPath, 'utf8'),
]);

const errors = [];
const requireMatch = (pattern, message) => {
	if (!pattern.test(css)) errors.push(message);
};

requireMatch(/\.utility-inner\s*\{[\s\S]*?min-height\s*:\s*40px\b/, 'Desktop utility strip must stay at 40px.');
requireMatch(/\.social-links a\s*\{[\s\S]*?width\s*:\s*32px\b[\s\S]*?height\s*:\s*32px\b/, 'Social actions must keep 32px targets.');
requireMatch(/\.social-links svg\s*\{[\s\S]*?width\s*:\s*16px\b[\s\S]*?height\s*:\s*16px\b/, 'Social icons must stay at 16px.');
requireMatch(/\.utility-links a\s*\{[\s\S]*?min-height\s*:\s*32px\b/, 'Utility links must keep 32px control height.');
requireMatch(/\.utility-links a\s*\{[\s\S]*?padding-inline\s*:\s*var\(--spacing-80\)/, 'Utility links must keep spacing-80 horizontal padding.');
requireMatch(/\.utility-links a\s*\{[\s\S]*?font-size\s*:\s*var\(--font-size-body-1\)/, 'Desktop utility links must remain Body 1 (14px), not Caption typography.');
requireMatch(/\.utility-links a\s*\{[\s\S]*?font-weight\s*:\s*var\(--font-weight-semibold\)/, 'Utility links must remain semibold.');

if (head.includes("header-footer-metrics.css")) {
	errors.push('BaseHead must not import the removed header-footer-metrics.css override layer.');
}

try {
	await fs.access(legacyMetricsPath);
	errors.push('Legacy header-footer-metrics.css must remain removed; utility sizing has one desktop authority.');
} catch {
	// Expected: file does not exist.
}

if (/\.utility-links a\s*\{[\s\S]*?font-size\s*:\s*var\(--font-size-caption-[12]\)/.test(css)) {
	errors.push('Persistent desktop utility rules must not shrink quick links to Caption typography.');
}

if (errors.length) {
	for (const error of errors) console.error(`HEADER UTILITY ERROR: ${error}`);
	process.exitCode = 1;
} else {
	console.log('Header utility quality: pass');
}
