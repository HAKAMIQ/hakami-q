// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

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
