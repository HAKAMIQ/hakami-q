import { requireAuthDb } from '../../_lib/auth.js';
import { createMfaLoginChallenge, isMfaEnabled, requiresMfaRole } from '../../_lib/mfa.js';
import {
	accountSessionTokenFromSetCookie,
	clearAccountSessionCookieHeader,
	revokeAccountSessionToken,
} from '../../_lib/mfa-session.js';

const encoder = new TextEncoder();
const LOGIN_RATE_WINDOW_SECONDS = 15 * 60;
const LOGIN_RATE_BLOCK_SECONDS = 15 * 60;
const LOGIN_RATE_MAX_FAILURES = 5;

const JSON_HEADERS = {
	'Content-Type': 'application/json; charset=utf-8',
	'Cache-Control': 'no-store, private',
	'X-Content-Type-Options': 'nosniff',
	'Referrer-Policy': 'no-referrer',
};

function json(payload, status = 200, extraHeaders = {}) {
	return new Response(JSON.stringify(payload), {
		status,
		headers: { ...JSON_HEADERS, ...extraHeaders },
	});
}

function actionFrom(request) {
	const pathname = new URL(request.url).pathname.replace(/\/+$/, '');
	return pathname.split('/').pop() || '';
}

function rateSecret(env) {
	const secret = String(env.AUTH_PASSWORD_PEPPER || env.ADMIN_SESSION_SECRET || '');
	return secret.length >= 32 ? secret : '';
}

function bytesToBase64Url(bytes) {
	let binary = '';
	for (const byte of new Uint8Array(bytes)) binary += String.fromCharCode(byte);
	return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

async function hmac(secret, value) {
	const key = await crypto.subtle.importKey(
		'raw',
		encoder.encode(secret),
		{ name: 'HMAC', hash: 'SHA-256' },
		false,
		['sign'],
	);
	return bytesToBase64Url(await crypto.subtle.sign('HMAC', key, encoder.encode(value)));
}

async function ensureRateTable(db) {
	await db.prepare(`
		CREATE TABLE IF NOT EXISTS auth_login_limits (
			client_key TEXT PRIMARY KEY,
			attempts INTEGER NOT NULL DEFAULT 0,
			window_started TEXT NOT NULL,
			blocked_until TEXT,
			updated_at TEXT NOT NULL
		)
	`).run();
}

function secondsUntil(value) {
	const timestamp = Date.parse(value || '');
	if (!Number.isFinite(timestamp)) return 0;
	return Math.max(0, Math.ceil((timestamp - Date.now()) / 1000));
}

async function rateContext(request, env) {
	const ip = request.headers.get('CF-Connecting-IP');
	const secret = rateSecret(env);
	if (!ip || !secret) return null;
	const db = requireAuthDb(env);
	await ensureRateTable(db);
	const clientKey = await hmac(secret, `account-login:${ip}`);
	const row = await db.prepare(`
		SELECT attempts, window_started, blocked_until
		FROM auth_login_limits
		WHERE client_key = ?
		LIMIT 1
	`).bind(clientKey).first();
	return { db, clientKey, row };
}

async function enforceRateLimit(request, env) {
	try {
		const context = await rateContext(request, env);
		if (!context) return { blocked: null, context: null };
		const retryAfter = secondsUntil(context.row?.blocked_until);
		if (retryAfter <= 0) return { blocked: null, context };
		return {
			blocked: json(
				{ error: 'تم إيقاف محاولات تسجيل الدخول مؤقتًا من هذا الاتصال. حاول لاحقًا.' },
				429,
				{ 'Retry-After': String(retryAfter) },
			),
			context,
		};
	} catch (error) {
		console.error('Account login rate limiter unavailable', error);
		return { blocked: null, context: null };
	}
}

async function recordLoginResult(context, status) {
	if (!context) return;
	try {
		const { db, clientKey, row } = context;
		const now = new Date();
		const nowIso = now.toISOString();
		if (status >= 200 && status < 300) {
			await db.prepare('DELETE FROM auth_login_limits WHERE client_key = ?').bind(clientKey).run();
			return;
		}
		if (status !== 401) return;

		const windowStartedMs = Date.parse(row?.window_started || '');
		const windowExpired = !Number.isFinite(windowStartedMs)
			|| now.getTime() - windowStartedMs >= LOGIN_RATE_WINDOW_SECONDS * 1000;
		const attempts = windowExpired ? 1 : Number(row?.attempts || 0) + 1;
		const blockedUntil = attempts >= LOGIN_RATE_MAX_FAILURES
			? new Date(now.getTime() + LOGIN_RATE_BLOCK_SECONDS * 1000).toISOString()
			: null;
		const storedAttempts = blockedUntil ? 0 : attempts;
		const windowStarted = windowExpired ? nowIso : String(row.window_started);

		await db.prepare(`
			INSERT INTO auth_login_limits (client_key, attempts, window_started, blocked_until, updated_at)
			VALUES (?, ?, ?, ?, ?)
			ON CONFLICT(client_key) DO UPDATE SET
				attempts = excluded.attempts,
				window_started = excluded.window_started,
				blocked_until = excluded.blocked_until,
				updated_at = excluded.updated_at
		`).bind(clientKey, storedAttempts, windowStarted, blockedUntil, nowIso).run();
		await db.prepare('DELETE FROM auth_login_limits WHERE updated_at < ?')
			.bind(new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString()).run();
	} catch (error) {
		console.error('Account login rate result could not be recorded', error);
	}
}

export async function onRequest(context) {
	const { request, env } = context;
	if (request.method !== 'POST' || actionFrom(request) !== 'login') {
		return context.next();
	}

	const rate = await enforceRateLimit(request, env);
	if (rate.blocked) return rate.blocked;

	const response = await context.next();
	await recordLoginResult(rate.context, response.status);
	if (!response.ok) return response;

	try {
		const payload = await response.clone().json().catch(() => null);
		const user = payload?.user;
		if (!payload?.authenticated || !user?.id || !requiresMfaRole(user.role)) return response;
		if (!(await isMfaEnabled(env, user.id))) return response;

		const sessionToken = accountSessionTokenFromSetCookie(response.headers.get('Set-Cookie'));
		if (!sessionToken) {
			console.error('Privileged login returned no account session cookie before MFA cutover.');
			return json({ error: 'تعذر بدء التحقق بخطوتين. أعد تسجيل الدخول.' }, 503);
		}

		await revokeAccountSessionToken(env, sessionToken);
		const challenge = await createMfaLoginChallenge(env, user.id);
		return json(
			{
				mfaRequired: true,
				mfaToken: challenge.token,
				expiresAt: challenge.expiresAt,
				methods: ['totp', 'recovery'],
			},
			202,
			{ 'Set-Cookie': clearAccountSessionCookieHeader() },
		);
	} catch (error) {
		console.error('HAKAMIQ privileged login MFA middleware failure', error);
		return json({ error: 'تعذر بدء التحقق بخطوتين. أعد المحاولة.' }, 503);
	}
}
