const REPOSITORY = 'HAKAMIQ/hakami-q';
const BRANCH = 'main';
const SESSION_COOKIE = 'hq_admin';
const SESSION_SECONDS = 8 * 60 * 60;
const MAX_IMAGE_BYTES = 6 * 1024 * 1024;
const MAX_TOTAL_IMAGE_BYTES = 20 * 1024 * 1024;
const MAX_BODY_BYTES = 300 * 1024;
const encoder = new TextEncoder();

const JSON_HEADERS = {
	'Content-Type': 'application/json; charset=utf-8',
	'Cache-Control': 'no-store, private',
	'X-Content-Type-Options': 'nosniff',
	'Referrer-Policy': 'no-referrer',
};

class RequestError extends Error {
	constructor(message, status = 400) {
		super(message);
		this.status = status;
	}
}

function json(payload, status = 200, extraHeaders = {}) {
	return new Response(JSON.stringify(payload), {
		status,
		headers: { ...JSON_HEADERS, ...extraHeaders },
	});
}

function getAction(request) {
	const path = new URL(request.url).pathname.replace(/\/+$/, '');
	return path.split('/').pop() || '';
}

function requirePost(request) {
	if (request.method !== 'POST') throw new RequestError('طريقة الطلب غير مسموحة.', 405);
	const url = new URL(request.url);
	const origin = request.headers.get('Origin');
	if (!origin || origin !== url.origin) throw new RequestError('تم رفض الطلب بسبب فشل التحقق من المصدر.', 403);
}

function requireEnvironment(env, names) {
	const missing = names.filter((name) => !env[name]);
	if (missing.length) throw new RequestError(`خدمة الإدارة غير مهيأة بعد: ${missing.join(', ')}`, 503);
}

function parseCookies(request) {
	const values = new Map();
	for (const part of (request.headers.get('Cookie') || '').split(';')) {
		const index = part.indexOf('=');
		if (index < 0) continue;
		const key = part.slice(0, index).trim();
		const value = part.slice(index + 1).trim();
		if (key) values.set(key, value);
	}
	return values;
}

function toBase64Url(bytes) {
	let binary = '';
	for (const byte of new Uint8Array(bytes)) binary += String.fromCharCode(byte);
	return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function fromBase64Url(value) {
	const base64 = value.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - (value.length % 4)) % 4);
	const binary = atob(base64);
	const bytes = new Uint8Array(binary.length);
	for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
	return bytes;
}

async function importHmacKey(secret) {
	return crypto.subtle.importKey(
		'raw',
		encoder.encode(secret),
		{ name: 'HMAC', hash: 'SHA-256' },
		false,
		['sign', 'verify'],
	);
}

async function signSession(expires, secret) {
	const key = await importHmacKey(secret);
	const payload = `admin:${expires}`;
	const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
	return `${expires}.${toBase64Url(signature)}`;
}

async function verifySession(request, env) {
	if (!env.ADMIN_SESSION_SECRET) return false;
	const value = parseCookies(request).get(SESSION_COOKIE);
	if (!value) return false;
	const [expiresText, signatureText, extra] = value.split('.');
	if (!expiresText || !signatureText || extra) return false;
	const expires = Number(expiresText);
	if (!Number.isSafeInteger(expires) || expires <= Math.floor(Date.now() / 1000)) return false;
	try {
		const key = await importHmacKey(env.ADMIN_SESSION_SECRET);
		return crypto.subtle.verify(
			'HMAC',
			key,
			fromBase64Url(signatureText),
			encoder.encode(`admin:${expires}`),
		);
	} catch {
		return false;
	}
}

async function constantTimeEqual(left, right) {
	const [a, b] = await Promise.all([
		crypto.subtle.digest('SHA-256', encoder.encode(left)),
		crypto.subtle.digest('SHA-256', encoder.encode(right)),
	]);
	const aa = new Uint8Array(a);
	const bb = new Uint8Array(b);
	let difference = aa.length ^ bb.length;
	for (let index = 0; index < Math.max(aa.length, bb.length); index += 1) {
		difference |= (aa[index] || 0) ^ (bb[index] || 0);
	}
	return difference === 0;
}

function sessionCookie(value, maxAge) {
	return `${SESSION_COOKIE}=${value}; Path=/; Max-Age=${maxAge}; HttpOnly; Secure; SameSite=Strict`;
}

function escapeHtml(value) {
	return String(value)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

function parseAttributes(raw) {
	const attributes = new Map();
	const pattern = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
	for (const match of raw.matchAll(pattern)) {
		const name = match[1].toLowerCase();
		const value = match[2] ?? match[3] ?? match[4] ?? '';
		attributes.set(name, value);
	}
	return attributes;
}

function safeHref(value) {
	const trimmed = value.trim();
	if (/^(?:\/|#)/.test(trimmed)) return trimmed;
	if (/^(?:https?:|mailto:|tel:)/i.test(trimmed)) return trimmed;
	return '';
}

function safeImageSrc(value) {
	const trimmed = value.trim();
	if (trimmed.startsWith('/media/')) return trimmed;
	if (/^https:\/\//i.test(trimmed)) return trimmed;
	return '';
}

function safeYouTubeEmbed(value) {
	try {
		const url = new URL(value);
		if (!['www.youtube.com', 'youtube.com', 'www.youtube-nocookie.com', 'youtube-nocookie.com'].includes(url.hostname)) return '';
		const parts = url.pathname.split('/').filter(Boolean);
		if (parts[0] !== 'embed' || !/^[A-Za-z0-9_-]{6,20}$/.test(parts[1] || '')) return '';
		return `https://www.youtube-nocookie.com/embed/${parts[1]}`;
	} catch {
		return '';
	}
}

const ALLOWED_TAGS = new Set([
	'p', 'br', 'div', 'span', 'h2', 'h3', 'h4', 'ul', 'ol', 'li',
	'strong', 'b', 'em', 'i', 'u', 's', 'blockquote', 'pre', 'code', 'kbd',
	'a', 'img', 'figure', 'figcaption', 'hr', 'table', 'thead', 'tbody', 'tr',
	'th', 'td', 'details', 'summary', 'iframe',
]);

const VOID_TAGS = new Set(['br', 'hr', 'img']);

function sanitizeAllowedTag(full, closing, originalName, rawAttributes) {
	let name = originalName.toLowerCase();
	if (name === 'h1') name = 'h2';
	if (!ALLOWED_TAGS.has(name)) return '';
	if (closing) return VOID_TAGS.has(name) ? '' : `</${name}>`;

	const source = parseAttributes(rawAttributes || '');
	const output = [];
	const add = (key, value) => {
		if (value === null || value === undefined || value === '') return;
		output.push(`${key}="${escapeHtml(value)}"`);
	};

	const dir = source.get('dir');
	if (dir === 'rtl' || dir === 'ltr' || dir === 'auto') add('dir', dir);

	if (name === 'a') {
		const href = safeHref(source.get('href') || '');
		if (href) add('href', href);
		if (source.get('title')) add('title', source.get('title').slice(0, 180));
		if (source.get('target') === '_blank') {
			add('target', '_blank');
			add('rel', 'noopener noreferrer');
			add('aria-label', 'فتح الرابط في تبويب جديد');
		}
	}

	if (name === 'img') {
		const src = safeImageSrc(source.get('src') || '');
		if (!src) return '';
		add('src', src);
		add('alt', (source.get('alt') || 'صورة توضيحية').slice(0, 240));
		if (source.get('title')) add('title', source.get('title').slice(0, 180));
		add('loading', 'lazy');
		add('decoding', 'async');
	}

	if (name === 'iframe') {
		const src = safeYouTubeEmbed(source.get('src') || '');
		if (!src) return '';
		add('src', src);
		add('title', (source.get('title') || 'فيديو YouTube').slice(0, 180));
		add('loading', 'lazy');
		add('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
		output.push('allowfullscreen');
	}

	if (name === 'td' || name === 'th') {
		for (const attr of ['colspan', 'rowspan']) {
			const value = Number(source.get(attr));
			if (Number.isInteger(value) && value >= 1 && value <= 20) add(attr, String(value));
		}
	}

	if (name === 'ol') {
		const start = Number(source.get('start'));
		if (Number.isInteger(start) && start >= 1 && start <= 10000) add('start', String(start));
	}

	if (name === 'li') {
		const value = Number(source.get('value'));
		if (Number.isInteger(value) && value >= 1 && value <= 10000) add('value', String(value));
	}

	if (name === 'details' && source.has('open')) output.push('open');
	return `<${name}${output.length ? ` ${output.join(' ')}` : ''}>`;
}

function sanitizeArticleHtml(html) {
	let result = String(html)
		.replace(/<!--[\s\S]*?-->/g, '')
		.replace(/<(script|style|form|object|embed|meta|link|base)\b[^>]*>[\s\S]*?<\/\1>/gi, '')
		.replace(/<(script|style|form|input|button|select|textarea|object|embed|meta|link|base)\b[^>]*\/?\s*>/gi, '');

	result = result.replace(/<iframe\b[^>]*>[\s\S]*?<\/iframe>/gi, (full) => {
		const open = full.match(/^<iframe\b([^>]*)>/i);
		if (!open) return '';
		const src = parseAttributes(open[1]).get('src') || '';
		return safeYouTubeEmbed(src) ? full : '';
	});

	result = result.replace(/<(\/)?([a-z0-9-]+)\b([^>]*)>/gi, sanitizeAllowedTag);
	result = result.replace(/\u0000/g, '').trim();
	if (/\b(?:src|href)\s*=\s*["']\s*(?:javascript:|data:|blob:)/i.test(result)) {
		throw new RequestError('تم رفض رابط غير آمن داخل محتوى المقال.');
	}
	return result;
}

function approximateBase64Bytes(base64) {
	const padding = base64.endsWith('==') ? 2 : base64.endsWith('=') ? 1 : 0;
	return Math.floor((base64.length * 3) / 4) - padding;
}

function imageExtension(type) {
	if (type === 'jpeg' || type === 'jpg') return 'jpg';
	if (type === 'png' || type === 'webp' || type === 'gif') return type;
	return '';
}

function parseImageDataUrl(value) {
	const match = String(value || '').match(/^data:image\/(png|jpe?g|webp|gif);base64,([A-Za-z0-9+/=]+)$/i);
	if (!match) throw new RequestError('إحدى الصور ليست PNG أو JPG أو WebP أو GIF صالحة.');
	const extension = imageExtension(match[1].toLowerCase());
	const base64 = match[2];
	const bytes = approximateBase64Bytes(base64);
	if (bytes <= 0 || bytes > MAX_IMAGE_BYTES) throw new RequestError('إحدى الصور تتجاوز الحد المسموح وهو 6 ميجابايت.');
	return { extension, base64, bytes };
}

function extractInlineImages(html, mediaDirectory) {
	const files = [];
	let totalBytes = 0;
	let sequence = 0;
	const result = String(html).replace(
		/(<img\b[^>]*\bsrc\s*=\s*)(["'])(data:image\/(?:png|jpe?g|webp|gif);base64,[A-Za-z0-9+/=]+)\2/gi,
		(full, prefix, quote, dataUrl) => {
			const image = parseImageDataUrl(dataUrl);
			sequence += 1;
			totalBytes += image.bytes;
			const filename = `image-${String(sequence).padStart(2, '0')}.${image.extension}`;
			const repositoryPath = `${mediaDirectory.repository}/${filename}`;
			const publicPath = `${mediaDirectory.public}/${filename}`;
			files.push({ path: repositoryPath, content: image.base64, encoding: 'base64' });
			return `${prefix}${quote}${publicPath}${quote}`;
		},
	);
	return { html: result, files, totalBytes };
}

function normalizeLabels(value) {
	if (!Array.isArray(value)) return [];
	const labels = [];
	const seen = new Set();
	for (const item of value) {
		const label = String(item || '').trim().replace(/[\r\n\t]+/g, ' ').slice(0, 60);
		const key = label.toLocaleLowerCase('en');
		if (!label || seen.has(key)) continue;
		seen.add(key);
		labels.push(label);
		if (labels.length >= 12) break;
	}
	return labels;
}

function saudiDateParts(date = new Date()) {
	const parts = new Intl.DateTimeFormat('en', {
		timeZone: 'Asia/Riyadh',
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	}).formatToParts(date);
	const get = (type) => parts.find((part) => part.type === type)?.value || '';
	return { year: get('year'), month: get('month'), day: get('day') };
}

function validateArticleInput(payload) {
	const title = String(payload?.title || '').trim().replace(/[\r\n\t]+/g, ' ');
	const description = String(payload?.description || '').trim().replace(/[\r\n\t]+/g, ' ');
	const slug = String(payload?.slug || '').trim().toLowerCase();
	const bodyHtml = String(payload?.bodyHtml || '');
	if (title.length < 5 || title.length > 180) throw new RequestError('عنوان المقال غير صالح.');
	if (description.length < 20 || description.length > 360) throw new RequestError('وصف المقال غير صالح.');
	if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slug.length > 100) throw new RequestError('Slug غير صالح.');
	if (!bodyHtml.trim() || bodyHtml.length > 30 * 1024 * 1024) throw new RequestError('محتوى المقال فارغ أو أكبر من الحد المسموح.');
	return {
		title,
		description,
		slug,
		bodyHtml,
		labels: normalizeLabels(payload?.labels),
		heroDataUrl: payload?.heroDataUrl ? String(payload.heroDataUrl) : '',
	};
}

function encodeRepositoryPath(path) {
	return path.split('/').map((segment) => encodeURIComponent(segment)).join('/');
}

function githubHeaders(env) {
	return {
		Accept: 'application/vnd.github+json',
		Authorization: `Bearer ${env.GITHUB_CONTENT_TOKEN}`,
		'X-GitHub-Api-Version': '2022-11-28',
		'User-Agent': 'HAKAMIQ-Article-Publisher',
		'Content-Type': 'application/json',
	};
}

async function githubRaw(env, apiPath, options = {}) {
	return fetch(`https://api.github.com/repos/${REPOSITORY}${apiPath}`, {
		...options,
		headers: { ...githubHeaders(env), ...(options.headers || {}) },
	});
}

async function github(env, apiPath, options = {}) {
	const response = await githubRaw(env, apiPath, options);
	const payload = await response.json().catch(() => ({}));
	if (!response.ok) {
		const detail = typeof payload.message === 'string' ? payload.message : 'GitHub API error';
		throw new RequestError(`تعذر تحديث المستودع: ${detail}`, response.status === 401 || response.status === 403 ? 503 : 502);
	}
	return payload;
}

async function createBlob(env, file) {
	const payload = await github(env, '/git/blobs', {
		method: 'POST',
		body: JSON.stringify({ content: file.content, encoding: file.encoding }),
	});
	return payload.sha;
}

function buildArticleSource(article, publishedAt, heroPublicPath, bodyHtml) {
	const lines = [
		'---',
		`title: ${JSON.stringify(article.title)}`,
		`description: ${JSON.stringify(article.description)}`,
		`pubDate: ${JSON.stringify(publishedAt.toISOString())}`,
	];
	if (heroPublicPath) lines.push(`heroImageUrl: ${JSON.stringify(heroPublicPath)}`);
	lines.push(`labels: ${JSON.stringify(article.labels)}`);
	lines.push('---', '', bodyHtml.trim(), '');
	return lines.join('\n');
}

async function publishArticle(request, env) {
	requirePost(request);
	requireEnvironment(env, ['ADMIN_SESSION_SECRET', 'GITHUB_CONTENT_TOKEN']);
	if (!(await verifySession(request, env))) throw new RequestError('انتهت جلسة الإدارة. سجّل الدخول من جديد.', 401);

	let payload;
	try { payload = await request.json(); }
	catch { throw new RequestError('بيانات النشر غير صالحة.'); }
	const article = validateArticleInput(payload);
	const publishedAt = new Date();
	const date = saudiDateParts(publishedAt);
	const fileStem = `${date.year}-${date.month}-${date.day}-${article.slug}`;
	const articlePath = `src/content/blog/${fileStem}.md`;
	const mediaDirectory = {
		repository: `public/media/articles/${date.year}/${date.month}/${article.slug}`,
		public: `/media/articles/${date.year}/${date.month}/${article.slug}`,
	};

	const conflict = await githubRaw(env, `/contents/${encodeRepositoryPath(articlePath)}?ref=${encodeURIComponent(BRANCH)}`);
	if (conflict.ok) throw new RequestError('يوجد مقال بنفس Slug لهذا اليوم. غيّر Slug ثم أعد النشر.', 409);
	if (conflict.status !== 404) {
		const detail = await conflict.json().catch(() => ({}));
		throw new RequestError(`تعذر التحقق من اسم المقال: ${detail.message || 'GitHub API error'}`, 502);
	}

	const extracted = extractInlineImages(article.bodyHtml, mediaDirectory);
	let totalImageBytes = extracted.totalBytes;
	const mediaFiles = [...extracted.files];
	let heroPublicPath = '';

	if (article.heroDataUrl) {
		const hero = parseImageDataUrl(article.heroDataUrl);
		totalImageBytes += hero.bytes;
		if (totalImageBytes > MAX_TOTAL_IMAGE_BYTES) throw new RequestError('إجمالي صور المقال يتجاوز 20 ميجابايت.');
		const filename = `hero.${hero.extension}`;
		mediaFiles.push({ path: `${mediaDirectory.repository}/${filename}`, content: hero.base64, encoding: 'base64' });
		heroPublicPath = `${mediaDirectory.public}/${filename}`;
	}
	if (totalImageBytes > MAX_TOTAL_IMAGE_BYTES) throw new RequestError('إجمالي صور المقال يتجاوز 20 ميجابايت.');

	const sanitizedHtml = sanitizeArticleHtml(extracted.html);
	if (encoder.encode(sanitizedHtml).byteLength > MAX_BODY_BYTES) throw new RequestError('نص المقال بعد تجهيز الصور يتجاوز 300 كيلوبايت.');
	const plainText = sanitizedHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
	if (plainText.length < 20) throw new RequestError('محتوى المقال قصير جدًا بعد التنظيف.');

	const articleSource = buildArticleSource(article, publishedAt, heroPublicPath, sanitizedHtml);
	const ref = await github(env, `/git/ref/heads/${BRANCH}`);
	const baseCommitSha = ref.object?.sha;
	if (!baseCommitSha) throw new RequestError('تعذر تحديد آخر Commit في المستودع.', 502);
	const baseCommit = await github(env, `/git/commits/${baseCommitSha}`);
	const baseTreeSha = baseCommit.tree?.sha;
	if (!baseTreeSha) throw new RequestError('تعذر تحديد شجرة المستودع الحالية.', 502);

	const files = [
		...mediaFiles,
		{ path: articlePath, content: articleSource, encoding: 'utf-8' },
	];
	const blobs = await Promise.all(files.map(async (file) => ({ ...file, sha: await createBlob(env, file) })));
	const tree = await github(env, '/git/trees', {
		method: 'POST',
		body: JSON.stringify({
			base_tree: baseTreeSha,
			tree: blobs.map((file) => ({ path: file.path, mode: '100644', type: 'blob', sha: file.sha })),
		}),
	});
	const commit = await github(env, '/git/commits', {
		method: 'POST',
		body: JSON.stringify({
			message: `content: publish ${article.title}`,
			tree: tree.sha,
			parents: [baseCommitSha],
		}),
	});

	const update = await githubRaw(env, `/git/refs/heads/${BRANCH}`, {
		method: 'PATCH',
		body: JSON.stringify({ sha: commit.sha, force: false }),
	});
	if (!update.ok) {
		const detail = await update.json().catch(() => ({}));
		if (update.status === 409 || update.status === 422) {
			throw new RequestError('تغيّر المستودع أثناء النشر. أعد الضغط على نشر ليُنشأ Commit جديد فوق آخر نسخة.', 409);
		}
		throw new RequestError(`تعذر تثبيت Commit على main: ${detail.message || 'GitHub API error'}`, 502);
	}

	return json({
		published: true,
		commitSha: commit.sha,
		articlePath,
		articleUrl: `/blog/${fileStem}`,
		mediaCount: mediaFiles.length,
	});
}

async function login(request, env) {
	requirePost(request);
	requireEnvironment(env, ['ADMIN_PASSWORD', 'ADMIN_SESSION_SECRET']);
	let payload;
	try { payload = await request.json(); }
	catch { throw new RequestError('بيانات تسجيل الدخول غير صالحة.'); }
	const password = String(payload?.password || '');
	if (!password || password.length > 512 || !(await constantTimeEqual(password, env.ADMIN_PASSWORD))) {
		return json({ error: 'كلمة المرور غير صحيحة.' }, 401);
	}
	const expires = Math.floor(Date.now() / 1000) + SESSION_SECONDS;
	const token = await signSession(expires, env.ADMIN_SESSION_SECRET);
	return json(
		{ authenticated: true, expiresAt: new Date(expires * 1000).toISOString() },
		200,
		{ 'Set-Cookie': sessionCookie(token, SESSION_SECONDS) },
	);
}

async function session(request, env) {
	requireEnvironment(env, ['ADMIN_SESSION_SECRET']);
	return json({ authenticated: await verifySession(request, env) });
}

async function logout(request) {
	requirePost(request);
	return json({ authenticated: false }, 200, { 'Set-Cookie': sessionCookie('', 0) });
}

export async function onRequest(context) {
	const { request, env } = context;
	const action = getAction(request);
	try {
		if (action === 'session' && request.method === 'GET') return await session(request, env);
		if (action === 'login') return await login(request, env);
		if (action === 'logout') return await logout(request);
		if (action === 'publish') return await publishArticle(request, env);
		return json({ error: 'المسار غير موجود.' }, 404);
	} catch (error) {
		if (error instanceof RequestError) return json({ error: error.message }, error.status);
		console.error('HAKAMIQ admin function failure', error);
		return json({ error: 'حدث خطأ داخلي أثناء معالجة الطلب.' }, 500);
	}
}
