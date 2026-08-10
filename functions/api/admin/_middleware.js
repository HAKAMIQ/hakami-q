import {
	clearSessionCookie,
	destroySession,
	getAuthenticatedUser,
	requireAuthDb,
	requireSameOriginPost,
} from '../../_lib/auth.js';
import { isMfaEnabled } from '../../_lib/mfa.js';
import { isCurrentSessionMfaVerified } from '../../_lib/mfa-session.js';

const encoder = new TextEncoder();
const LEGACY_COOKIE = 'hq_admin';
const LEGACY_COMPAT_SECONDS = 8 * 60 * 60;
const LEGACY_RATE_WINDOW_SECONDS = 15 * 60;
const LEGACY_RATE_BLOCK_SECONDS = 15 * 60;
const LEGACY_RATE_MAX_FAILURES = 5;

const JSON_HEADERS = {
	'Content-Type': 'application/json; charset=utf-8',
	'Cache-Control': 'no-store, private',
	'X-Content-Type-Options': 'nosniff',
	'X-Frame-Options': 'DENY',
	'Referrer-Policy': 'no-referrer',
};

function json(payload, status = 200, headers = {}) {
	return new Response(JSON.stringify(payload), { status, headers: { ...JSON_HEADERS, ...headers } });
}

function actionFrom(request) {
	const pathname = new URL(request.url).pathname.replace(/\/+$/, '');
	return pathname.split('/').pop() || '';
}

async function adminCount(env) {
	const db = requireAuthDb(env);
	const row = await db.prepare("SELECT COUNT(*) AS count FROM users WHERE role = 'admin'").first();
	return Number(row?.count || 0);
}

function toBase64Url(bytes) {
	let binary = '';
	for (const byte of new Uint8Array(bytes)) binary += String.fromCharCode(byte);
	return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

async function hmac(secret, value) {
	const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
	return toBase64Url(await crypto.subtle.sign('HMAC', key, encoder.encode(value)));
}

async function compatibilityCookie(env) {
	if (!env.ADMIN_SESSION_SECRET) return '';
	const expires = Math.floor(Date.now() / 1000) + LEGACY_COMPAT_SECONDS;
	const signature = await hmac(env.ADMIN_SESSION_SECRET, `admin:${expires}`);
	return `${LEGACY_COOKIE}=${expires}.${signature}; Path=/; Max-Age=${LEGACY_COMPAT_SECONDS}; HttpOnly; Secure; SameSite=Strict`;
}

function clearLegacyCookie() {
	return `${LEGACY_COOKIE}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict`;
}

async function ensureLegacyRateTable(db) {
	await db.prepare(`CREATE TABLE IF NOT EXISTS legacy_admin_login_limits (
		client_key TEXT PRIMARY KEY, attempts INTEGER NOT NULL DEFAULT 0, window_started TEXT NOT NULL,
		blocked_until TEXT, updated_at TEXT NOT NULL
	)`).run();
}

async function legacyRateContext(request, env) {
	if (!env.ADMIN_SESSION_SECRET) return null;
	const db = requireAuthDb(env);
	await ensureLegacyRateTable(db);
	const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
	const clientKey = await hmac(env.ADMIN_SESSION_SECRET, `legacy-admin-login:${ip}`);
	const row = await db.prepare('SELECT attempts, window_started, blocked_until FROM legacy_admin_login_limits WHERE client_key = ? LIMIT 1').bind(clientKey).first();
	return { db, clientKey, row };
}

function secondsUntil(value) {
	const timestamp = Date.parse(value || '');
	return Number.isFinite(timestamp) ? Math.max(0, Math.ceil((timestamp - Date.now()) / 1000)) : 0;
}

async function enforceLegacyRateLimit(request, env) {
	const context = await legacyRateContext(request, env);
	if (!context) return null;
	const retryAfter = secondsUntil(context.row?.blocked_until);
	if (retryAfter > 0) return { blocked: json({ error: 'تم إيقاف محاولات دخول الإدارة مؤقتًا. حاول لاحقًا.' }, 429, { 'Retry-After': String(retryAfter) }), context };
	return { blocked: null, context };
}

async function recordLegacyLoginResult(rateContext, responseStatus) {
	if (!rateContext) return;
	const { db, clientKey, row } = rateContext;
	const now = new Date();
	const nowIso = now.toISOString();
	if (responseStatus >= 200 && responseStatus < 300) {
		await db.prepare('DELETE FROM legacy_admin_login_limits WHERE client_key = ?').bind(clientKey).run();
		return;
	}
	if (responseStatus !== 401) return;
	const windowStartedMs = Date.parse(row?.window_started || '');
	const windowExpired = !Number.isFinite(windowStartedMs) || now.getTime() - windowStartedMs >= LEGACY_RATE_WINDOW_SECONDS * 1000;
	const attempts = windowExpired ? 1 : Number(row?.attempts || 0) + 1;
	const blockedUntil = attempts >= LEGACY_RATE_MAX_FAILURES ? new Date(now.getTime() + LEGACY_RATE_BLOCK_SECONDS * 1000).toISOString() : null;
	await db.prepare(`INSERT INTO legacy_admin_login_limits (client_key, attempts, window_started, blocked_until, updated_at)
		VALUES (?, ?, ?, ?, ?)
		ON CONFLICT(client_key) DO UPDATE SET attempts=excluded.attempts, window_started=excluded.window_started,
		blocked_until=excluded.blocked_until, updated_at=excluded.updated_at`)
		.bind(clientKey, blockedUntil ? 0 : attempts, windowExpired ? nowIso : String(row.window_started), blockedUntil, nowIso).run();
}

async function requireAdminMfa(request, env, user) {
	if (!(await isMfaEnabled(env, user.id))) {
		return json({ error: 'يلزم تفعيل التحقق بخطوتين قبل استخدام صلاحيات الإدارة.', mfaSetupRequired: true, setupUrl: '/admin/security' }, 403);
	}
	if (!(await isCurrentSessionMfaVerified(request, env))) {
		return json({ error: 'يلزم تسجيل دخول مكتمل بالتحقق بخطوتين.', mfaRequired: true, loginUrl: '/login?next=/admin' }, 401);
	}
	return null;
}

async function handleCutoverRequest(context, action) {
	const { request, env } = context;
	const user = await getAuthenticatedUser(request, env);
	if (action === 'login') return json({ error: 'تم إيقاف كلمة مرور الإدارة القديمة. استخدم حساب المدير.', loginUrl: '/login?next=/admin' }, 410);
	if (action === 'session' && request.method === 'GET') {
		if (!user) return json({ authenticated: false, accountAuth: true, loginUrl: '/login?next=/admin' });
		if (user.role !== 'admin') return json({ authenticated: false, accountAuth: true, error: 'لا تملك صلاحية إدارة المقالات.' }, 403);
		const mfaError = await requireAdminMfa(request, env, user);
		if (mfaError) return mfaError;
		return json({ authenticated: true, accountAuth: true, mfaVerified: true, user: { id: user.id, username: user.username, role: user.role } }, 200, { 'Set-Cookie': await compatibilityCookie(env) });
	}
	if (action === 'logout') {
		requireSameOriginPost(request);
		await destroySession(request, env);
		const headers = new Headers(JSON_HEADERS);
		headers.append('Set-Cookie', clearSessionCookie());
		headers.append('Set-Cookie', clearLegacyCookie());
		return new Response(JSON.stringify({ authenticated: false }), { status: 200, headers });
	}
	if (action === 'publish' || action === 'rewrite') {
		if (!user) return json({ error: 'يلزم تسجيل الدخول بحساب المدير.', loginUrl: '/login?next=/admin' }, 401);
		if (user.role !== 'admin') return json({ error: 'لا تملك صلاحية استخدام أدوات إدارة المقالات.' }, 403);
		const mfaError = await requireAdminMfa(request, env, user);
		if (mfaError) return mfaError;
		return context.next();
	}
	return context.next();
}

export async function onRequest(context) {
	const { request, env } = context;
	const action = actionFrom(request);
	try {
		if ((await adminCount(env)) > 0) return await handleCutoverRequest(context, action);
		if (action === 'login' && request.method === 'POST') {
			const rate = await enforceLegacyRateLimit(request, env);
			if (rate?.blocked) return rate.blocked;
			const response = await context.next();
			await recordLegacyLoginResult(rate?.context || null, response.status);
			return response;
		}
		return context.next();
	} catch (error) {
		console.error('HAKAMIQ admin API middleware failure', error);
		return json({ error: 'تعذر التحقق من صلاحية الإدارة حاليًا.' }, 503);
	}
}
