const encoder = new TextEncoder();
const AUTH_COOKIE = 'hq_session';
const LEGACY_ADMIN_COOKIE = 'hq_admin';
const SESSION_SECONDS = 7 * 24 * 60 * 60;
const PBKDF2_ITERATIONS = 600000;
const PASSWORD_BYTES = 32;
const SALT_BYTES = 16;

export class AuthError extends Error {
	constructor(message, status = 400) {
		super(message);
		this.status = status;
	}
}

export function requireAuthDb(env) {
	if (!env.AUTH_DB) throw new AuthError('خدمة الحسابات غير مهيأة بعد: AUTH_DB', 503);
	return env.AUTH_DB;
}

export function requireSameOriginPost(request) {
	if (request.method !== 'POST') throw new AuthError('طريقة الطلب غير مسموحة.', 405);
	const url = new URL(request.url);
	const origin = request.headers.get('Origin');
	if (!origin || origin !== url.origin) throw new AuthError('تم رفض الطلب بسبب فشل التحقق من المصدر.', 403);
}

export function parseCookies(request) {
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

function bytesToBase64Url(bytes) {
	let binary = '';
	for (const byte of new Uint8Array(bytes)) binary += String.fromCharCode(byte);
	return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function base64UrlToBytes(value) {
	const base64 = value.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - (value.length % 4)) % 4);
	const binary = atob(base64);
	const bytes = new Uint8Array(binary.length);
	for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
	return bytes;
}

function randomToken(byteLength = 32) {
	const bytes = new Uint8Array(byteLength);
	crypto.getRandomValues(bytes);
	return bytesToBase64Url(bytes);
}

async function sha256(value) {
	const digest = await crypto.subtle.digest('SHA-256', encoder.encode(value));
	return bytesToBase64Url(digest);
}

function constantTimeBytesEqual(left, right) {
	const a = new Uint8Array(left);
	const b = new Uint8Array(right);
	let difference = a.length ^ b.length;
	const length = Math.max(a.length, b.length);
	for (let index = 0; index < length; index += 1) difference |= (a[index] || 0) ^ (b[index] || 0);
	return difference === 0;
}

async function derivePassword(password, salt, iterations = PBKDF2_ITERATIONS) {
	const material = await crypto.subtle.importKey(
		'raw',
		encoder.encode(password),
		'PBKDF2',
		false,
		['deriveBits'],
	);
	return crypto.subtle.deriveBits(
		{ name: 'PBKDF2', hash: 'SHA-256', salt, iterations },
		material,
		PASSWORD_BYTES * 8,
	);
}

export async function hashPassword(password) {
	const salt = new Uint8Array(SALT_BYTES);
	crypto.getRandomValues(salt);
	const derived = await derivePassword(password, salt);
	return `pbkdf2-sha256$${PBKDF2_ITERATIONS}$${bytesToBase64Url(salt)}$${bytesToBase64Url(derived)}`;
}

export async function verifyPassword(password, encoded) {
	const [scheme, iterationsText, saltText, expectedText, extra] = String(encoded || '').split('$');
	if (scheme !== 'pbkdf2-sha256' || !iterationsText || !saltText || !expectedText || extra) return false;
	const iterations = Number(iterationsText);
	if (!Number.isInteger(iterations) || iterations < 100000 || iterations > 1000000) return false;
	try {
		const salt = base64UrlToBytes(saltText);
		const expected = base64UrlToBytes(expectedText);
		const actual = await derivePassword(password, salt, iterations);
		return constantTimeBytesEqual(actual, expected);
	} catch {
		return false;
	}
}

export function normalizeUsername(value) {
	return String(value || '').trim().normalize('NFKC');
}

export function usernameKey(value) {
	return normalizeUsername(value).toLocaleLowerCase('en');
}

export function normalizeEmail(value) {
	return String(value || '').trim().normalize('NFKC').toLocaleLowerCase('en');
}

export function validateUsername(username) {
	return username.length >= 3 && username.length <= 32 && /^[\p{L}\p{N}._-]+$/u.test(username);
}

export function validateEmail(email) {
	return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePassword(password) {
	return typeof password === 'string' && password.length >= 12 && password.length <= 128;
}

export function publicUser(row, includeEmail = true) {
	if (!row) return null;
	const user = {
		id: row.id,
		username: row.username,
		role: row.role,
		status: row.status,
		createdAt: row.created_at,
	};
	if (includeEmail) user.email = row.email;
	return user;
}

export function sessionCookie(value, maxAge = SESSION_SECONDS) {
	return `${AUTH_COOKIE}=${value}; Path=/; Max-Age=${maxAge}; HttpOnly; Secure; SameSite=Strict`;
}

export function clearSessionCookie() {
	return sessionCookie('', 0);
}

export async function createSession(env, userId) {
	const db = requireAuthDb(env);
	const token = randomToken(32);
	const tokenHash = await sha256(token);
	const now = new Date();
	const expiresAt = new Date(now.getTime() + SESSION_SECONDS * 1000);
	await db.prepare(
		'INSERT INTO sessions (token_hash, user_id, expires_at, created_at, last_seen_at) VALUES (?, ?, ?, ?, ?)'
	).bind(tokenHash, userId, expiresAt.toISOString(), now.toISOString(), now.toISOString()).run();
	return { token, expiresAt };
}

export async function destroySession(request, env) {
	const db = requireAuthDb(env);
	const token = parseCookies(request).get(AUTH_COOKIE);
	if (!token) return;
	const tokenHash = await sha256(token);
	await db.prepare('DELETE FROM sessions WHERE token_hash = ?').bind(tokenHash).run();
}

export async function getAuthenticatedUser(request, env) {
	const db = requireAuthDb(env);
	const token = parseCookies(request).get(AUTH_COOKIE);
	if (!token) return null;
	const tokenHash = await sha256(token);
	const row = await db.prepare(`
		SELECT u.id, u.username, u.email, u.role, u.status, u.created_at, s.expires_at
		FROM sessions s
		JOIN users u ON u.id = s.user_id
		WHERE s.token_hash = ?
		LIMIT 1
	`).bind(tokenHash).first();
	if (!row) return null;
	if (row.status !== 'active' || Date.parse(row.expires_at) <= Date.now()) {
		await db.prepare('DELETE FROM sessions WHERE token_hash = ?').bind(tokenHash).run();
		return null;
	}
	return publicUser(row, true);
}

const ROLE_RANK = { user: 0, moderator: 1, admin: 2 };

export async function requireRole(request, env, minimumRole) {
	const user = await getAuthenticatedUser(request, env);
	if (!user) throw new AuthError('يلزم تسجيل الدخول.', 401);
	if ((ROLE_RANK[user.role] ?? -1) < (ROLE_RANK[minimumRole] ?? 99)) throw new AuthError('لا تملك الصلاحية المطلوبة.', 403);
	return user;
}

async function importLegacyHmacKey(secret) {
	return crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']);
}

export async function verifyLegacyAdminSession(request, env) {
	if (!env.ADMIN_SESSION_SECRET) return false;
	const value = parseCookies(request).get(LEGACY_ADMIN_COOKIE);
	if (!value) return false;
	const [expiresText, signatureText, extra] = value.split('.');
	if (!expiresText || !signatureText || extra) return false;
	const expires = Number(expiresText);
	if (!Number.isSafeInteger(expires) || expires <= Math.floor(Date.now() / 1000)) return false;
	try {
		const key = await importLegacyHmacKey(env.ADMIN_SESSION_SECRET);
		return crypto.subtle.verify(
			'HMAC',
			key,
			base64UrlToBytes(signatureText),
			encoder.encode(`admin:${expires}`),
		);
	} catch {
		return false;
	}
}
