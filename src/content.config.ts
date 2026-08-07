import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const normalizeBloggerImageUrl = (value: string) => {
	if (!value.includes('blogger.googleusercontent.com')) return value;

	return value.replace(
		/\/s(?:32|72|96|144|160|200|220|240|320|400|480|512|600|640)(-[^/]+)?\//i,
		(_segment, modifier = '') => `/s1280${modifier}/`,
	);
};

const blog = defineCollection({
	loader: glob({
		base: './src/content/blog',
		pattern: '**/*.{md,mdx}',
	}),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
			heroImageUrl: z.string().transform(normalizeBloggerImageUrl).optional(),
			originalUrl: z.string().optional(),
			labels: z.array(z.string()).default([]),
		}),
});

export const collections = { blog };
