import { requireAuthDb } from './auth.js';

const encoder = new TextEncoder();
const decoder = new TextDecoder();
const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
const TOTP_PERIOD_SECONDS = 30;
const TOTP_DIGITS = 6;
const TOTP_WINDOW = 1;
const LOGIN_CHALLENGE_SECONDS = 5 * 60;
const LOGIN_CHALLENGE_MAX_ATTEMPTS = 5;
const SETUP_SECONDS = 10 * 60;
const RECOVERY_CODE_COUNT = 10;
const RECOVERY_CODE_BYTES = 8;
let schemaReady = false;

export class MfaError extends Error {
	constructor(message, status = 400, code = 'mfa_error') {
		super(message);
		this.status = status;
		this.code = code;
	}
}

function bytesToBase64Url(bytes) {
	let binary = '';
	for (const byte of new Uint8Array(bytes)) binary += String.fromCharCode(byte);
	return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function base64UrlToBytes(value) {
	const base64 = String(value).replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - (String(value).length % 4)) % 4);
	const binary = atob(base64);
	const bytes = new Uint8Array(binary.length);
	for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
	return bytes;
}

function randomBytes(length) {
	const bytes = new Uint8Array(length);
	crypto.getRandomValues(bytes);
	return bytes;
}

function constantTimeTextEqual(left, right) {
	const a = String(left);
	const b = String(right);
	let difference = a.length ^ b.length;
	const length = Math.max(a.length, b.length);
	for (let index = 0; index < length; index += 1) {
		difference |= (a.charCodeAt(index) || 0) ^ (b.charCodeAt(index) || 0);
	}
	return difference === 0;
}

function base32Encode(bytes) {
	let bits = 0;
	let value = 0;
	let output = '';
	for (const byte of bytes) {
		value = (value << 8) | byte;
		bits += 8;
		while (bits >= 5) {
			output += BASE32_ALPHABET[(value >>> (bits - 5)) & 31];
			bits -= 5;
		}
	}
	if (bits > 0) output += BASE32_ALPHABET[(value << (5 - bits)) & 31];
	return output;
}

function normalizeRecoveryCode(value) {
	return String(value || '').toUpperCase().replace(/[^A-Z2-7]/g, '');
}

function normalizeTotpCode(value) {
	return String(value || '').replace(/\s+/g, '');
}

function privilegedRole(role) {
	return role === 'admin' || role === 'moderator';
}

export function requiresMfaRole(role) {
	return privilegedRole(role);
}

function secretMaterial(env) {
	const secret = String(env.AUTH_PASSWORD_PEPPER || env.ADMIN_SESSION_SECRET || '');
	if (secret.length < 32) throw new MfaError('خدمة التحقق بخطوتين غير مهيأة بعد.', 503, 'mfa_not_configured');
	return secret;
}

async function encryptionKey(env) {
	const digest = await crypto.subtle.digest(
		'SHA-256',
		encoder.encode(`HAKAMIQ_MFA_ENCRYPTION_V1\0${secretMaterial(env)}`),
	);
	return crypto.subtle.importKey('raw', digest, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']);
}

async function recoveryHmacKey(env) {
	return crypto.subtle.importKey(
		'raw',
		encoder.encode(secretMaterial(env)),
		{ name: 'HMAC', hash: 'SHA-256' },
		false,
		['sign'],
	);
}

async function recoveryCodeHash(env, userId, code) {
	const key = await recoveryHmacKey(env);
	const normalized = normalizeRecoveryCode(code);
	const signature = await crypto.subtle.sign(
		'HMAC',
		key,
		encoder.encode(`HAKAMIQ_MFA_RECOVERY_V1\0${userId}\0${normalized}`),
	);
	return bytesToBase64Url(signature);
}

async function encryptSecret(env, userId, secretBytes) {
	const nonce = randomBytes(12);
	const key = await encryptionKey(env);
	const additionalData = encoder.encode(`HAKAMIQ_TOTP_V1\0${userId}`);
	const encrypted = await crypto.subtle.encrypt(
		{ name: 'AES-GCM', iv: nonce, additionalData },
		key,
		secretBytes,
	);
	return {
		ciphertext: bytesToBase64Url(encrypted),
		nonce: bytesToBase64Url(nonce),
	};
}

async function decryptSecret(env, userId, ciphertext, nonce) {
	try {
		const key = await encryptionKey(env);
		const additionalData = encoder.encode(`HAKAMIQ_TOTP_V1\0${userId}`);
		const plain = await crypto.subtle.decrypt(
			{ name: 'AES-GCM', iv: base64UrlToBytes(nonce), additionalData },
			key,
			base64UrlToBytes(ciphertext),
		);
		return new Uint8Array(plain);
	} catch {
		throw new MfaError('تعذر قراءة إعداد التحقق بخطوتين.', 503, 'mfa_secret_unavailable');
	}
}

async function sha256Text(value) {
	return bytesToBase64Url(await crypto.subtle.digest('SHA-256', encoder.encode(String(value))));
}

async function ensureSchema(env) {
	if (schemaReady) return;
	const db = requireAuthDb(env);
	await db.prepare(`
		CREATE TABLE IF NOT EXISTS mfa_totp (
			user_id TEXT PRIMARY KEY,
			secret_ciphertext TEXT NOT NULL,
			secret_nonce TEXT NOT NULL,
			last_used_step INTEGER,
			enabled_at TEXT NOT NULL,
			updated_at TEXT NOT NULL,
			FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
		)
	`).run();
	await db.prepare(`
		CREATE TABLE IF NOT EXISTS mfa_totp_pending (
			user_id TEXT PRIMARY KEY,
			secret_ciphertext TEXT NOT NULL,
			secret_nonce TEXT NOT NULL,
			expires_at TEXT NOT NULL,
			created_at TEXT NOT NULL,
			FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
		)
	`).run();
	await db.prepare(`
		CREATE TABLE IF NOT EXISTS mfa_login_challenges (
			token_hash TEXT PRIMARY KEY,
			user_id TEXT NOT NULL,
			expires_at TEXT NOT NULL,
			attempts INTEGER NOT NULL DEFAULT 0,
			created_at TEXT NOT NULL,
			FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
		)
	`).run();
	await db.prepare(`
		CREATE TABLE IF NOT EXISTS mfa_recovery_codes (
			user_id TEXT NOT NULL,
			code_hash TEXT NOT NULL,
			used_at TEXT,
			created_at TEXT NOT NULL,
			PRIMARY KEY (user_id, code_hash),
			FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
		)
	`).run();
	await db.prepare('CREATE INDEX IF NOT EXISTS idx_mfa_login_challenges_expires_at ON mfa_login_challenges(expires_at)').run();
	await db.prepare('CREATE INDEX IF NOT EXISTS idx_mfa_recovery_codes_user_unused ON mfa_recovery_codes(user_id, used_at)').run();
	schemaReady = true;
}

export async function ensureMfaSchema(env) {
	await ensureSchema(env);
}

export async function generateTotpCode(secretBytes, unixSeconds = Math.floor(Date.now() / 1000), digits = TOTP_DIGITS) {
	const step = Math.floor(Number(unixSeconds) / TOTP_PERIOD_SECONDS);
	const counter = new Uint8Array(8);
	let value = BigInt(step);
	for (let index = 7; index >= 0; index -= 1) {
		counter[index] = Number(value & 0xffn);
		value >>= 8n;
	}
	const key = await crypto.subtle.importKey(
		'raw',
		secretBytes,
		{ name: 'HMAC', hash: 'SHA-1' },
		false,
		['sign'],
	);
	const signature = new Uint8Array(await crypto.subtle.sign('HMAC', key, counter));
	const offset = signature[signature.length - 1] & 0x0f;
	const binary = (
		((signature[offset] & 0x7f) << 24)
		| ((signature[offset + 1] & 0xff) << 16)
		| ((signature[offset + 2] & 0xff) << 8)
		| (signature[offset + 3] & 0xff)
	) >>> 0;
	return String(binary % (10 ** digits)).padStart(digits, '0');
}

async function matchingTotpStep(secretBytes, code, nowSeconds = Math.floor(Date.now() / 1000)) {
	const normalized = normalizeTotpCode(code);
	if (!/^\d{6}$/.test(normalized)) return null;
	const currentStep = Math.floor(nowSeconds / TOTP_PERIOD_SECONDS);
	for (let offset = -TOTP_WINDOW; offset <= TOTP_WINDOW; offset += 1) {
		const step = currentStep + offset;
		const candidate = await generateTotpCode(secretBytes, step * TOTP_PERIOD_SECONDS, TOTP_DIGITS);
		if (constantTimeTextEqual(candidate, normalized)) return step;
	}
	return null;
}

export async function isMfaEnabled(env, userId) {
	await ensureSchema(env);
	const db = requireAuthDb(env);
	const row = await db.prepare('SELECT enabled_at FROM mfa_totp WHERE user_id = ? LIMIT 1').bind(userId).first();
	return Boolean(row?.enabled_at);
}

export async function mfaStatus(env, userId) {
	await ensureSchema(env);
	const db = requireAuthDb(env);
	const [totp, recovery] = await Promise.all([
		db.prepare('SELECT enabled_at FROM mfa_totp WHERE user_id = ? LIMIT 1').bind(userId).first(),
		db.prepare('SELECT COUNT(*) AS count FROM mfa_recovery_codes WHERE user_id = ? AND used_at IS NULL').bind(userId).first(),
	]);
	return {
		enabled: Boolean(totp?.enabled_at),
		enabledAt: totp?.enabled_at || null,
		recoveryCodesRemaining: Number(recovery?.count || 0),
	};
}

export async function startTotpSetup(env, user) {
	await ensureSchema(env);
	if (!privilegedRole(user.role)) throw new MfaError('التحقق بخطوتين مطلوب للحسابات الإدارية فقط.', 403, 'mfa_not_allowed');
	const db = requireAuthDb(env);
	const secret = randomBytes(20);
	const encrypted = await encryptSecret(env, user.id, secret);
	const now = new Date();
	const expiresAt = new Date(now.getTime() + SETUP_SECONDS * 1000).toISOString();
	await db.prepare(`
		INSERT INTO mfa_totp_pending (user_id, secret_ciphertext, secret_nonce, expires_at, created_at)
		VALUES (?, ?, ?, ?, ?)
		ON CONFLICT(user_id) DO UPDATE SET
			secret_ciphertext = excluded.secret_ciphertext,
			secret_nonce = excluded.secret_nonce,
			expires_at = excluded.expires_at,
			created_at = excluded.created_at
	`).bind(user.id, encrypted.ciphertext, encrypted.nonce, expiresAt, now.toISOString()).run();
	const base32 = base32Encode(secret);
	const label = `HAKAMIQ:${user.username}`;
	const otpauthUri = `otpauth://totp/${encodeURIComponent(label)}?secret=${base32}&issuer=${encodeURIComponent('HAKAMIQ')}&algorithm=SHA1&digits=${TOTP_DIGITS}&period=${TOTP_PERIOD_SECONDS}`;
	return { secret: base32, otpauthUri, expiresAt };
}

function formatRecoveryCode(raw) {
	return `${raw.slice(0, 4)}-${raw.slice(4, 8)}-${raw.slice(8, 12)}`;
}

function newRecoveryCodes() {
	const codes = [];
	while (codes.length < RECOVERY_CODE_COUNT) {
		const raw = base32Encode(randomBytes(RECOVERY_CODE_BYTES)).slice(0, 12);
		const formatted = formatRecoveryCode(raw);
		if (!codes.includes(formatted)) codes.push(formatted);
	}
	return codes;
}

async function replaceRecoveryCodes(env, userId) {
	const db = requireAuthDb(env);
	const codes = newRecoveryCodes();
	const now = new Date().toISOString();
	await db.prepare('DELETE FROM mfa_recovery_codes WHERE user_id = ?').bind(userId).run();
	for (const code of codes) {
		const codeHash = await recoveryCodeHash(env, userId, code);
		await db.prepare(`
			INSERT INTO mfa_recovery_codes (user_id, code_hash, used_at, created_at)
			VALUES (?, ?, NULL, ?)
		`).bind(userId, codeHash, now).run();
	}
	return codes;
}

export async function confirmTotpSetup(env, user, code) {
	await ensureSchema(env);
	if (!privilegedRole(user.role)) throw new MfaError('لا تملك صلاحية إعداد التحقق بخطوتين.', 403, 'mfa_not_allowed');
	const db = requireAuthDb(env);
	const pending = await db.prepare(`
		SELECT secret_ciphertext, secret_nonce, expires_at
		FROM mfa_totp_pending
		WHERE user_id = ?
		LIMIT 1
	`).bind(user.id).first();
	if (!pending) throw new MfaError('ابدأ إعداد التحقق بخطوتين من جديد.', 409, 'mfa_setup_missing');
	if (Date.parse(pending.expires_at) <= Date.now()) {
		await db.prepare('DELETE FROM mfa_totp_pending WHERE user_id = ?').bind(user.id).run();
		throw new MfaError('انتهت مهلة إعداد التحقق بخطوتين. ابدأ من جديد.', 409, 'mfa_setup_expired');
	}
	const secret = await decryptSecret(env, user.id, pending.secret_ciphertext, pending.secret_nonce);
	const matched = await matchingTotpStep(secret, code);
	if (matched === null) throw new MfaError('رمز التحقق غير صحيح.', 401, 'mfa_code_invalid');
	const now = new Date().toISOString();
	await db.prepare(`
		INSERT INTO mfa_totp (user_id, secret_ciphertext, secret_nonce, last_used_step, enabled_at, updated_at)
		VALUES (?, ?, ?, NULL, ?, ?)
		ON CONFLICT(user_id) DO UPDATE SET
			secret_ciphertext = excluded.secret_ciphertext,
			secret_nonce = excluded.secret_nonce,
			last_used_step = NULL,
			enabled_at = excluded.enabled_at,
			updated_at = excluded.updated_at
	`).bind(user.id, pending.secret_ciphertext, pending.secret_nonce, now, now).run();
	await db.prepare('DELETE FROM mfa_totp_pending WHERE user_id = ?').bind(user.id).run();
	const recoveryCodes = await replaceRecoveryCodes(env, user.id);
	await db.prepare('DELETE FROM sessions WHERE user_id = ?').bind(user.id).run();
	await db.prepare('DELETE FROM mfa_login_challenges WHERE user_id = ?').bind(user.id).run();
	return { enabled: true, recoveryCodes, reauthRequired: true };
}

async function consumeTotp(env, userId, code) {
	const db = requireAuthDb(env);
	const row = await db.prepare(`
		SELECT secret_ciphertext, secret_nonce, last_used_step
		FROM mfa_totp
		WHERE user_id = ?
		LIMIT 1
	`).bind(userId).first();
	if (!row) return false;
	const secret = await decryptSecret(env, userId, row.secret_ciphertext, row.secret_nonce);
	const step = await matchingTotpStep(secret, code);
	if (step === null) return false;
	const lastUsed = row.last_used_step === null || row.last_used_step === undefined ? null : Number(row.last_used_step);
	if (lastUsed !== null && step <= lastUsed) return false;
	const result = await db.prepare(`
		UPDATE mfa_totp
		SET last_used_step = ?, updated_at = ?
		WHERE user_id = ? AND (last_used_step IS NULL OR last_used_step < ?)
	`).bind(step, new Date().toISOString(), userId, step).run();
	const changes = Number(result?.meta?.changes ?? result?.changes ?? 0);
	return changes > 0;
}

async function consumeRecoveryCode(env, userId, code) {
	const normalized = normalizeRecoveryCode(code);
	if (normalized.length !== 12) return false;
	const db = requireAuthDb(env);
	const codeHash = await recoveryCodeHash(env, userId, normalized);
	const result = await db.prepare(`
		UPDATE mfa_recovery_codes
		SET used_at = ?
		WHERE user_id = ? AND code_hash = ? AND used_at IS NULL
	`).bind(new Date().toISOString(), userId, codeHash).run();
	const changes = Number(result?.meta?.changes ?? result?.changes ?? 0);
	return changes > 0;
}

export async function verifyMfaCode(env, userId, code) {
	await ensureSchema(env);
	const normalizedTotp = normalizeTotpCode(code);
	if (/^\d{6}$/.test(normalizedTotp)) {
		return consumeTotp(env, userId, normalizedTotp);
	}
	return consumeRecoveryCode(env, userId, code);
}

export async function createMfaLoginChallenge(env, userId) {
	await ensureSchema(env);
	const db = requireAuthDb(env);
	const token = bytesToBase64Url(randomBytes(32));
	const tokenHash = await sha256Text(token);
	const now = new Date();
	const expiresAt = new Date(now.getTime() + LOGIN_CHALLENGE_SECONDS * 1000).toISOString();
	await db.prepare('DELETE FROM mfa_login_challenges WHERE user_id = ? OR expires_at <= ?')
		.bind(userId, now.toISOString()).run();
	await db.prepare(`
		INSERT INTO mfa_login_challenges (token_hash, user_id, expires_at, attempts, created_at)
		VALUES (?, ?, ?, 0, ?)
	`).bind(tokenHash, userId, expiresAt, now.toISOString()).run();
	return { token, expiresAt };
}

export async function verifyMfaLoginChallenge(env, token, code) {
	await ensureSchema(env);
	const value = String(token || '');
	if (value.length < 32 || value.length > 128) throw new MfaError('جلسة التحقق غير صالحة.', 401, 'mfa_challenge_invalid');
	const db = requireAuthDb(env);
	const tokenHash = await sha256Text(value);
	const row = await db.prepare(`
		SELECT c.user_id, c.expires_at, c.attempts,
			u.id, u.username, u.email, u.role, u.status, u.created_at
		FROM mfa_login_challenges c
		JOIN users u ON u.id = c.user_id
		WHERE c.token_hash = ?
		LIMIT 1
	`).bind(tokenHash).first();
	if (!row) throw new MfaError('جلسة التحقق غير صالحة أو انتهت.', 401, 'mfa_challenge_invalid');
	if (row.status !== 'active') {
		await db.prepare('DELETE FROM mfa_login_challenges WHERE token_hash = ?').bind(tokenHash).run();
		throw new MfaError('هذا الحساب غير متاح حاليًا.', 403, 'mfa_account_unavailable');
	}
	if (Date.parse(row.expires_at) <= Date.now()) {
		await db.prepare('DELETE FROM mfa_login_challenges WHERE token_hash = ?').bind(tokenHash).run();
		throw new MfaError('انتهت مهلة التحقق. سجل الدخول من جديد.', 401, 'mfa_challenge_expired');
	}
	if (Number(row.attempts || 0) >= LOGIN_CHALLENGE_MAX_ATTEMPTS) {
		await db.prepare('DELETE FROM mfa_login_challenges WHERE token_hash = ?').bind(tokenHash).run();
		throw new MfaError('تم تجاوز عدد محاولات التحقق. سجل الدخول من جديد.', 429, 'mfa_challenge_locked');
	}
	const valid = await verifyMfaCode(env, row.user_id, code);
	if (!valid) {
		const attempts = Number(row.attempts || 0) + 1;
		if (attempts >= LOGIN_CHALLENGE_MAX_ATTEMPTS) {
			await db.prepare('DELETE FROM mfa_login_challenges WHERE token_hash = ?').bind(tokenHash).run();
			throw new MfaError('تم تجاوز عدد محاولات التحقق. سجل الدخول من جديد.', 429, 'mfa_challenge_locked');
		}
		await db.prepare('UPDATE mfa_login_challenges SET attempts = ? WHERE token_hash = ?')
			.bind(attempts, tokenHash).run();
		throw new MfaError('رمز التحقق غير صحيح.', 401, 'mfa_code_invalid');
	}
	await db.prepare('DELETE FROM mfa_login_challenges WHERE token_hash = ?').bind(tokenHash).run();
	return {
		id: row.id,
		username: row.username,
		email: row.email,
		role: row.role,
		status: row.status,
		created_at: row.created_at,
	};
}

export async function regenerateRecoveryCodes(env, user, code) {
	await ensureSchema(env);
	if (!privilegedRole(user.role)) throw new MfaError('لا تملك صلاحية إدارة رموز الاسترداد.', 403, 'mfa_not_allowed');
	if (!(await isMfaEnabled(env, user.id))) throw new MfaError('التحقق بخطوتين غير مفعّل.', 409, 'mfa_not_enabled');
	if (!(await verifyMfaCode(env, user.id, code))) throw new MfaError('رمز التحقق غير صحيح.', 401, 'mfa_code_invalid');
	return replaceRecoveryCodes(env, user.id);
}

export async function revokeSessionToken(env, token) {
	const value = String(token || '');
	if (!value) return;
	const db = requireAuthDb(env);
	const tokenHash = await sha256Text(value);
	await db.prepare('DELETE FROM sessions WHERE token_hash = ?').bind(tokenHash).run();
}

export function accountSessionTokenFromSetCookie(headerValue) {
	const match = String(headerValue || '').match(/(?:^|,\s*)hq_session=([^;]+)/);
	return match?.[1] || '';
}

export function clearAccountSessionCookieHeader() {
	return 'hq_session=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict';
}
