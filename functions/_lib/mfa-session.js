import { parseCookies, requireAuthDb } from './auth.js';

const encoder = new TextEncoder();
const AUTH_COOKIE = 'hq_session';
const PRIVILEGED_SESSION_SECONDS = 8 * 60 * 60;
const ensuredDatabases = new WeakSet();

function bytesToBase64Url(bytes) {
	let binary = '';
	for (const byte of new Uint8Array(bytes)) binary += String.fromCharCode(byte);
	return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function randomToken(byteLength = 32) {
	const bytes = new Uint8Array(byteLength);
	crypto.getRandomValues(bytes);
	return bytesToBase64Url(bytes);
}

async function tokenHash(token) {
	const digest = await crypto.subtle.digest('SHA-256', encoder.encode(String(token || '')));
	return bytesToBase64Url(digest);
}

async function ensureSchema(env) {
	const db = requireAuthDb(env);
	if (ensuredDatabases.has(db)) return db;
	await db.prepare(`
		CREATE TABLE IF NOT EXISTS mfa_session_assurance (
			token_hash TEXT PRIMARY KEY,
			verified_at TEXT NOT NULL,
			FOREIGN KEY (token_hash) REFERENCES sessions(token_hash) ON DELETE CASCADE
		)
	`).run();
	ensuredDatabases.add(db);
	return db;
}

export async function createMfaVerifiedSession(env, userId, maxAgeSeconds = PRIVILEGED_SESSION_SECONDS) {
	const db = await ensureSchema(env);
	const token = randomToken(32);
	const hash = await tokenHash(token);
	const now = new Date();
	const expiresAt = new Date(now.getTime() + maxAgeSeconds * 1000);
	const nowIso = now.toISOString();
	await db.prepare(`
		INSERT INTO sessions (token_hash, user_id, expires_at, created_at, last_seen_at)
		VALUES (?, ?, ?, ?, ?)
	`).bind(hash, userId, expiresAt.toISOString(), nowIso, nowIso).run();
	try {
		await db.prepare(`
			INSERT INTO mfa_session_assurance (token_hash, verified_at)
			VALUES (?, ?)
		`).bind(hash, nowIso).run();
	} catch (error) {
		await db.prepare('DELETE FROM sessions WHERE token_hash = ?').bind(hash).run();
		throw error;
	}
	return { token, expiresAt, maxAgeSeconds };
}

export async function markSessionMfaVerified(env, token) {
	const value = String(token || '');
	if (!value) throw new Error('Missing account session token.');
	const db = await ensureSchema(env);
	const hash = await tokenHash(value);
	const session = await db.prepare('SELECT token_hash FROM sessions WHERE token_hash = ? LIMIT 1').bind(hash).first();
	if (!session) throw new Error('Account session no longer exists.');
	await db.prepare(`
		INSERT INTO mfa_session_assurance (token_hash, verified_at)
		VALUES (?, ?)
		ON CONFLICT(token_hash) DO UPDATE SET verified_at = excluded.verified_at
	`).bind(hash, new Date().toISOString()).run();
}

export async function isSessionMfaVerified(env, token) {
	const value = String(token || '');
	if (!value) return false;
	const db = await ensureSchema(env);
	const hash = await tokenHash(value);
	const row = await db.prepare(`
		SELECT a.verified_at
		FROM mfa_session_assurance a
		JOIN sessions s ON s.token_hash = a.token_hash
		WHERE a.token_hash = ? AND s.expires_at > ?
		LIMIT 1
	`).bind(hash, new Date().toISOString()).first();
	return Boolean(row?.verified_at);
}

export async function isCurrentSessionMfaVerified(request, env) {
	const token = parseCookies(request).get(AUTH_COOKIE);
	return isSessionMfaVerified(env, token);
}

export async function revokeAccountSessionToken(env, token) {
	const value = String(token || '');
	if (!value) return;
	const db = await ensureSchema(env);
	const hash = await tokenHash(value);
	await db.prepare('DELETE FROM mfa_session_assurance WHERE token_hash = ?').bind(hash).run();
	await db.prepare('DELETE FROM sessions WHERE token_hash = ?').bind(hash).run();
}

export function accountSessionTokenFromSetCookie(headerValue) {
	const match = String(headerValue || '').match(/(?:^|,\s*)hq_session=([^;]+)/);
	return match?.[1] || '';
}

export function clearAccountSessionCookieHeader() {
	return `${AUTH_COOKIE}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict`;
}
