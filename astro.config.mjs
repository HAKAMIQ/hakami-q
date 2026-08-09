// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import { readFileSync } from 'node:fs';

const bloggerPages = JSON.parse(
	readFileSync(new URL('./src/data/blogger-pages.json', import.meta.url), 'utf8'),
);
const legacyAliasPaths = new Set(
	bloggerPages.flatMap((page) =>
		(page.aliases ?? []).map((alias) => `/${String(alias).replace(/^\/+|\/+$/g, '')}`),
	),
);

// Fluent UI Web Components emphasizes lightweight, standards-based output.
// Keep the static Astro result compact and make shared CSS cacheable across pages.
export default defineConfig({
	site: 'https://hakami-q.pages.dev',
	compressHTML: true,
	build: {
		inlineStylesheets: 'never',
	},
	integrations: [
		mdx(),
		sitemap({
			filter: (page) => {
				const pathname = new URL(page).pathname;
				const normalizedPathname = pathname === '/' ? '/' : pathname.replace(/\/+$/g, '');
				if (legacyAliasPaths.has(normalizedPathname)) return false;
				return ![
					'/admin',
					'/account',
					'/login',
					'/register',
				].some((route) => pathname === route || pathname.startsWith(`${route}/`));
			},
		}),
	],
});
