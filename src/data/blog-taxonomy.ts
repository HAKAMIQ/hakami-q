import type { CollectionEntry } from 'astro:content';

export type BlogPostEntry = CollectionEntry<'blog'>;

export type CategoryDefinition = {
	slug: string;
	name: string;
	parents?: string[];
	labels?: string[];
	keywords?: string[];
};

export type CategoryGroup = {
	slug: string;
	name: string;
	children: string[];
};

export const categoryDefinitions: CategoryDefinition[] = [
	{
		slug: 'nintendo',
		name: 'Nintendo',
		labels: ['Nintendo'],
		keywords: ['nintendo', 'نينتندو', 'yuzu', 'ryujinx', 'eden emulator', 'cemu', 'dolphin emulator', 'citra'],
	},
	{ slug: 'nintendo-switch', name: 'Nintendo Switch', parents: ['nintendo'], labels: ['NS', 'Nintendo Switch'], keywords: ['nintendo switch', 'switch emulator', 'yuzu', 'ryujinx', 'eden'] },
	{ slug: 'wii-u', name: 'Nintendo Wii U', parents: ['nintendo'], labels: ['Wii-U'], keywords: ['wii u', 'wii-u', 'cemu'] },
	{ slug: 'wii', name: 'Nintendo Wii', parents: ['nintendo'], labels: ['Wii'], keywords: ['nintendo wii', 'wii remote'] },
	{ slug: 'gamecube', name: 'Nintendo GameCube', parents: ['nintendo'], labels: ['GameCube'], keywords: ['gamecube', 'gcn'] },
	{ slug: 'n64', name: 'Nintendo 64', parents: ['nintendo'], labels: ['N64'], keywords: ['nintendo 64', 'project64', 'n64'] },
	{ slug: 'snes', name: 'Super Nintendo - SNES', parents: ['nintendo'], labels: ['SNES'], keywords: ['super nintendo', 'snes'] },
	{ slug: 'nes', name: 'Nintendo Entertainment System - NES', parents: ['nintendo'], labels: ['Nintendo-NES', 'NES'], keywords: ['nintendo entertainment system', 'nes'] },
	{ slug: 'nintendo-handhelds', name: 'Nintendo Handhelds', parents: ['nintendo'], labels: ['Handheld'], keywords: ['nintendo handheld'] },
	{ slug: 'nintendo-3ds', name: 'Nintendo 3DS', parents: ['nintendo-handhelds', 'nintendo'], labels: ['N3DS'], keywords: ['nintendo 3ds', '3ds', '2ds', 'citra'] },
	{ slug: 'nintendo-ds', name: 'Nintendo DS - NDS', parents: ['nintendo-handhelds', 'nintendo'], labels: ['N-DS', 'NDS'], keywords: ['nintendo ds', 'melonds', 'nds'] },
	{ slug: 'gba', name: 'Game Boy Advance - GBA', parents: ['nintendo-handhelds', 'nintendo'], labels: ['GBA', 'GBASP'], keywords: ['game boy advance', 'gba', 'gba sp'] },
	{ slug: 'gbc', name: 'Game Boy Color - GBC', parents: ['nintendo-handhelds', 'nintendo'], labels: ['GBC'], keywords: ['game boy color', 'gbc'] },
	{ slug: 'game-boy', name: 'Game Boy - GB', parents: ['nintendo-handhelds', 'nintendo'], labels: ['GB'], keywords: ['game boy'] },
	{ slug: 'virtual-boy', name: 'Virtual Boy - VB', parents: ['nintendo-handhelds', 'nintendo'], labels: ['VirtualBoy'], keywords: ['virtual boy'] },
	{
		slug: 'playstation',
		name: 'PlayStation',
		labels: ['PlayStation'],
		keywords: ['playstation', 'بلايستيشن', 'rpcs3', 'pcsx2', 'duckstation', 'ppsspp', 'vita3k', 'shadps4'],
	},
	{ slug: 'ps1', name: 'PlayStation 1 - PS1', parents: ['playstation'], labels: ['PS1'], keywords: ['playstation 1', 'ps1', 'psx', 'duckstation', 'epsxe'] },
	{ slug: 'ps2', name: 'PlayStation 2 - PS2', parents: ['playstation'], labels: ['PS2'], keywords: ['playstation 2', 'ps2', 'pcsx2', 'aethersx2'] },
	{ slug: 'ps3', name: 'PlayStation 3 - PS3', parents: ['playstation'], labels: ['PS3'], keywords: ['playstation 3', 'ps3', 'rpcs3'] },
	{ slug: 'ps4', name: 'PlayStation 4 - PS4', parents: ['playstation'], labels: ['PS4'], keywords: ['playstation 4', 'ps4', 'shadps4', 'fpps4'] },
	{ slug: 'ps5', name: 'PlayStation 5 - PS5', parents: ['playstation'], labels: ['PS5'], keywords: ['playstation 5', 'ps5'] },
	{ slug: 'playstation-handhelds', name: 'PlayStation Handhelds', parents: ['playstation'], labels: ['PSP', 'PSPVita'], keywords: ['playstation handheld'] },
	{ slug: 'psp', name: 'PlayStation Portable - PSP', parents: ['playstation-handhelds', 'playstation'], labels: ['PSP'], keywords: ['playstation portable', 'psp', 'ppsspp'] },
	{ slug: 'ps-vita', name: 'PlayStation Vita - PS Vita', parents: ['playstation-handhelds', 'playstation'], labels: ['PSPVita', 'PS Vita'], keywords: ['playstation vita', 'ps vita', 'vita3k'] },
	{
		slug: 'xbox',
		name: 'Xbox',
		labels: ['Xbox'],
		keywords: ['xbox', 'إكس بوكس', 'اكس بوكس', 'xenia', 'xemu'],
	},
	{ slug: 'original-xbox', name: 'Original Xbox - OG Xbox', parents: ['xbox'], labels: ['Xbox-Original'], keywords: ['original xbox', 'og xbox', 'xemu'] },
	{ slug: 'xbox-360', name: 'Xbox 360 - X360', parents: ['xbox'], labels: ['Xbox360'], keywords: ['xbox 360', 'x360', 'xenia'] },
	{
		slug: 'sega',
		name: 'SEGA',
		labels: ['sega', 'SEGA'],
		keywords: ['sega', 'سيجا', 'flycast'],
	},
	{ slug: 'genesis', name: 'Mega Drive / Genesis', parents: ['sega'], labels: ['Genesis-MegaDrive', 'Genesis32X'], keywords: ['mega drive', 'genesis', 'sega 32x'] },
	{ slug: 'saturn', name: 'SEGA Saturn', parents: ['sega'], labels: ['Saturn'], keywords: ['sega saturn', 'saturn', 'ymir'] },
	{ slug: 'dreamcast', name: 'Dreamcast - DC', parents: ['sega'], labels: ['Dreamcast'], keywords: ['dreamcast', 'flycast', 'deecy'] },
	{ slug: 'game-gear', name: 'Game Gear - GG', parents: ['sega'], labels: ['Sega-GameGear'], keywords: ['game gear'] },
	{ slug: 'naomi', name: 'SEGA NAOMI', parents: ['sega'], labels: ['Sega-Naomi'], keywords: ['sega naomi', 'naomi'] },
	{ slug: 'pico', name: 'SEGA Pico', parents: ['sega'], labels: ['Pico'], keywords: ['sega pico'] },
	{ slug: 'beena', name: 'Advanced Pico Beena', parents: ['sega'], labels: ['Beena'], keywords: ['advanced pico beena', 'beena'] },
	{ slug: 'other-consoles', name: 'أنظمة أخرى' },
	{ slug: 'atari', name: 'Atari', parents: ['other-consoles'], labels: ['Atari'], keywords: ['atari'] },
	{ slug: 'atari-2600', name: 'Atari 2600', parents: ['atari', 'other-consoles'], labels: ['Atari2600'], keywords: ['atari 2600'] },
	{ slug: 'atari-5200', name: 'Atari 5200', parents: ['atari', 'other-consoles'], labels: ['Atari5200'], keywords: ['atari 5200'] },
	{ slug: 'atari-7800', name: 'Atari 7800', parents: ['atari', 'other-consoles'], labels: ['Atari7800'], keywords: ['atari 7800'] },
	{ slug: 'atari-800', name: 'Atari 800', parents: ['atari', 'other-consoles'], labels: ['Atari800'], keywords: ['atari 800'] },
	{ slug: 'commodore', name: 'Commodore', parents: ['other-consoles'], labels: ['Commodore'], keywords: ['commodore'] },
	{ slug: 'commodore-64', name: 'Commodore 64 - C64', parents: ['commodore', 'other-consoles'], labels: ['Commodore64'], keywords: ['commodore 64', 'c64'] },
	{ slug: 'amiga', name: 'Amiga', parents: ['commodore', 'other-consoles'], labels: ['Commodore-AMIGA', 'Amiga'], keywords: ['commodore amiga', 'amiga'] },
	{ slug: 'android-emulators', name: 'محاكيات Android', parents: ['other-consoles'], labels: ['ANDROID-EMU'], keywords: ['android emulator', 'android emulators'] },
	{ slug: 'guides-articles', name: 'الأدلة والمقالات', parents: ['other-consoles'], labels: ['articles'], keywords: ['guides & articles', 'gaming articles'] },
	{ slug: 'multi-system', name: 'Multi-System', labels: ['MultiEmu'], keywords: ['multi-system', 'multi system', 'retroarch', 'retrobat', 'launchbox'] },
	{ slug: 'retroarch', name: 'RetroArch', parents: ['multi-system'], labels: ['RetroArch'], keywords: ['retroarch'] },
	{ slug: 'retrobat', name: 'RetroBat', parents: ['multi-system'], labels: ['RetroBat'], keywords: ['retrobat'] },
	{ slug: 'launchbox', name: 'LaunchBox', parents: ['multi-system'], labels: ['LaunchBox'], keywords: ['launchbox'] },
	{ slug: 'pc', name: 'الكمبيوتر', labels: ['PC'], keywords: ['pc emulation', 'chdman', 'chd tool', 'rclone', 'jdownloader', 'wmi', 'ffmpeg'] },
];

export const categoryGroups: CategoryGroup[] = [
	{ slug: 'playstation', name: 'PlayStation', children: ['ps1', 'ps2', 'ps3', 'ps4', 'ps5', 'psp', 'ps-vita'] },
	{ slug: 'nintendo', name: 'Nintendo', children: ['nintendo-switch', 'wii-u', 'wii', 'gamecube', 'n64', 'snes', 'nes', 'nintendo-3ds', 'nintendo-ds', 'gba', 'gbc', 'game-boy', 'virtual-boy'] },
	{ slug: 'xbox', name: 'Xbox', children: ['original-xbox', 'xbox-360'] },
	{ slug: 'sega', name: 'SEGA', children: ['genesis', 'saturn', 'dreamcast', 'game-gear', 'naomi', 'pico', 'beena'] },
	{ slug: 'other-consoles', name: 'أنظمة أخرى', children: ['atari', 'atari-2600', 'atari-5200', 'atari-7800', 'atari-800', 'commodore', 'commodore-64', 'amiga', 'android-emulators'] },
	{ slug: 'pc', name: 'الكمبيوتر والأدلة', children: ['pc', 'multi-system', 'retroarch', 'retrobat', 'launchbox', 'guides-articles'] },
];

export const categoryNames = Object.fromEntries(
	categoryDefinitions.map((category) => [category.slug, category.name]),
) as Record<string, string>;

export const normalizeSearchText = (value: string) =>
	value
		.normalize('NFKC')
		.replace(/\s+/g, ' ')
		.trim()
		.toLowerCase();

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const containsTerm = (text: string, term: string) => {
	const normalizedTerm = normalizeSearchText(term);
	if (!normalizedTerm) return false;

	if (/^[a-z0-9][a-z0-9+.#-]{0,5}$/i.test(normalizedTerm)) {
		return new RegExp(`(^|[^a-z0-9])${escapeRegExp(normalizedTerm)}($|[^a-z0-9])`, 'i').test(text);
	}

	return text.includes(normalizedTerm);
};

export const getPostCategories = (post: BlogPostEntry) => {
	const normalizedLabels = post.data.labels.map(normalizeSearchText);
	const searchableText = normalizeSearchText(
		[post.data.title, post.data.description, ...post.data.labels].join(' '),
	);
	const matchedCategories = new Set<string>();

	for (const category of categoryDefinitions) {
		const matchesLabel = (category.labels ?? []).some((label) =>
			normalizedLabels.includes(normalizeSearchText(label)),
		);
		const matchesKeyword = (category.keywords ?? []).some((keyword) =>
			containsTerm(searchableText, keyword),
		);

		if (!matchesLabel && !matchesKeyword) continue;

		matchedCategories.add(category.slug);
		for (const parent of category.parents ?? []) matchedCategories.add(parent);
	}

	return Array.from(matchedCategories);
};

export const formatArabicDate = (date: Date) =>
	new Intl.DateTimeFormat('ar-SA', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	}).format(date);
