import { promises as fs } from 'node:fs';

const navCssPath = 'src/styles/header-persistent-nav.css';
const headerComponentPath = 'src/components/Header.astro';
const headPath = 'src/components/BaseHead.astro';
const legacyMetricsPath = 'src/styles/header-footer-metrics.css';

const [css, headerComponent, head] = await Promise.all([
	fs.readFile(navCssPath, 'utf8'),
	fs.readFile(headerComponentPath, 'utf8'),
	fs.readFile(headPath, 'utf8'),
]);

const errors = [];
const requireMatch = (source, pattern, message) => {
	if (!pattern.test(source)) errors.push(message);
};

requireMatch(headerComponent, /\.utility-inner\s*\{[\s\S]*?min-height\s*:\s*40px\b/, 'Header component utility strip must stay at 40px.');
requireMatch(headerComponent, /\.social-links a\s*\{[\s\S]*?width\s*:\s*32px\b[\s\S]*?height\s*:\s*32px\b/, 'Header social actions must keep 32px targets.');
requireMatch(headerComponent, /\.social-links svg\s*\{[\s\S]*?width\s*:\s*16px\b[\s\S]*?height\s*:\s*16px\b/, 'Header social icons must stay at 16px.');
requireMatch(headerComponent, /\.utility-links a\s*\{[\s\S]*?min-height\s*:\s*32px\b/, 'Header utility links must keep 32px control height.');
requireMatch(headerComponent, /\.utility-links a\s*\{[^}]*font-size\s*:\s*var\(--font-size-body-1\)/s, 'Header utility links must remain Body 1 (14px).');
requireMatch(headerComponent, /\.utility-links a\s*\{[^}]*font-weight\s*:\s*var\(--font-weight-semibold\)/s, 'Header utility links must remain semibold.');

if (/\.utility-links a\s*\{[^}]*font-size\s*:\s*var\(--font-size-caption-[12]\)/s.test(headerComponent)) {
	errors.push('Header component must not shrink utility links to Caption typography.');
}

const compactDesktop = headerComponent.match(/@media \(max-width: 1180px\) and \(min-width: 1024px\) \{([\s\S]*?)\n\t\}/)?.[1] ?? '';
if (/\.utility-links a\s*\{[^}]*font-size\s*:\s*var\(--font-size-caption-[12]\)/s.test(compactDesktop)) {
	errors.push('Compact desktop utility links must stay Body 1; scoped Caption overrides caused the production regression.');
}
requireMatch(compactDesktop, /\.utility-links a\s*\{[^}]*font-size\s*:\s*var\(--font-size-body-1\)/s, 'Compact desktop scoped utility rule must explicitly keep Body 1 typography.');

requireMatch(css, /\.utility-inner\s*\{[\s\S]*?min-height\s*:\s*40px\b/, 'Persistent desktop utility strip must agree on 40px.');
requireMatch(css, /\.utility-links a\s*\{[^}]*font-size\s*:\s*var\(--font-size-body-1\)/s, 'Persistent desktop utility links must agree on Body 1.');

if (head.includes("header-footer-metrics.css")) {
	errors.push('BaseHead must not import the removed header-footer-metrics.css override layer.');
}

try {
	await fs.access(legacyMetricsPath);
	errors.push('Legacy header-footer-metrics.css must remain removed.');
} catch {
	// Expected: file does not exist.
}

if (errors.length) {
	for (const error of errors) console.error(`HEADER UTILITY ERROR: ${error}`);
	process.exitCode = 1;
} else {
	console.log('Header utility quality: pass');
}
