// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// Fluent UI Web Components emphasizes lightweight, standards-based output.
// Keep the static Astro result compact and make shared CSS cacheable across pages.
export default defineConfig({
	site: 'https://web-2ps.pages.dev',
	compressHTML: true,
	build: {
		inlineStylesheets: 'never',
	},
	integrations: [
		mdx(),
		sitemap({
			filter: (page) => !new URL(page).pathname.startsWith('/admin'),
		}),
	],
});
