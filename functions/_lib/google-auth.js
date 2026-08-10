import { AuthError, normalizeEmail, validateEmail } from './auth.js';

const encoder = new TextEncoder();
const GOOGLE_JWKS_URL = 'https://www.googleapis.com/oauth2/v3/certs';
const GOOGLE_ISSUERS = new Set(['accounts.google.com', 'https://accounts.google.com']);
const MAX_ID_TOKEN_BYTES = 16384;
const CLOCK_SKEW_SECONDS = 60;
const DEFAULT_JWKS_TTL_SECONDS = 3600;
const MAX_JWKS_TTL_SECONDS = 24 * 60 * 60;

let cachedJwks = null;
let cachedJwksExpiresAt = 0;

function base64UrlToBytes(value) {
	if (!/^[A-Za-z0-9_-]+$/.test(String(value || ''))) throw new AuthError('بيانات Google غير صالحة.', 401);
	const base64 = String(value).replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - (String(value).length % 4)) % 4);
	let binary;
	try {
		binary = atob(base64);
	} catch {
		throw new AuthError('بيانات Google غير صالحة.', 401);
	}
	const bytes = new Uint8Array(binary.length);
	for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
	return bytes;
}

function decodeJsonSegment(segment) {
	try {
		return JSON.parse(new TextDecoder().decode(base64UrlToBytes(segment)));
	} catch (error) {
		if (error instanceof AuthError) throw error;
		throw new AuthError('بيانات Google غير صالحة.', 401);
	}
}

function parseJwt(token) {
	const value = String(token || '').trim();
	if (!value || encoder.encode(value).byteLength > MAX_ID_TOKEN_BYTES) {
		throw new AuthError('رمز تسجيل الدخول بحساب Google غير صالح.', 401);
	}
	const parts = value.split('.');
	if (parts.length !== 3 || parts.some((part) => !part)) throw new AuthError('رمز تسجيل الدخول بحساب Google غير صالح.', 401);
	const header = decodeJsonSegment(parts[0]);
	const payload = decodeJsonSegment(parts[1]);
	if (!header || typeof header !== 'object' || !payload || typeof payload !== 'object') {
		throw new AuthError('رمز تسجيل الدخول بحساب Google غير صالح.', 401);
	}
	if (header.alg !== 'RS256' || typeof header.kid !== 'string' || !header.kid) {
		throw new AuthError('تعذر التحقق من توقيع Google.', 401);
	}
	return {
		token: value,
		header,
		payload,
		signingInput: `${parts[0]}.${parts[1]}`,
		signature: base64UrlToBytes(parts[2]),
	};
}

function googleClientId(env) {
	const clientId = String(env.GOOGLE_CLIENT_ID || '').trim();
	if (!clientId || clientId.length > 256 || !/^[0-9A-Za-z._-]+\.apps\.googleusercontent\.com$/.test(clientId)) {
		throw new AuthError('تسجيل الدخول بحساب Google غير مهيأ بعد.', 503);
	}
	return clientId;
}

function cacheTtlSeconds(response) {
	const header = String(response.headers.get('Cache-Control') || '');
	const match = header.match(/(?:^|,)\s*max-age=(\d+)/i);
	const seconds = match ? Number(match[1]) : DEFAULT_JWKS_TTL_SECONDS;
	if (!Number.isFinite(seconds) || seconds < 60) return DEFAULT_JWKS_TTL_SECONDS;
	return Math.min(Math.floor(seconds), MAX_JWKS_TTL_SECONDS);
}

async function fetchGoogleJwks(forceRefresh = false) {
	if (!forceRefresh && cachedJwks && cachedJwksExpiresAt > Date.now()) return cachedJwks;
	let response;
	try {
		response = await fetch(GOOGLE_JWKS_URL, {
			headers: { Accept: 'application/json' },
			signal: AbortSignal.timeout(7000),
		});
	} catch {
		throw new AuthError('تعذر الوصول إلى خدمة التحقق من Google حاليًا.', 503);
	}
	if (!response.ok) throw new AuthError('تعذر التحقق من Google حاليًا.', 503);
	const payload = await response.json().catch(() => null);
	const keys = Array.isArray(payload?.keys) ? payload.keys.filter((key) => key && key.kty === 'RSA' && key.kid) : [];
	if (!keys.length) throw new AuthError('تعذر التحقق من مفاتيح Google حاليًا.', 503);
	cachedJwks = keys;
	cachedJwksExpiresAt = Date.now() + cacheTtlSeconds(response) * 1000;
	return keys;
}

async function resolveSigningKey(kid) {
	let keys = await fetchGoogleJwks(false);
	let jwk = keys.find((key) => key.kid === kid);
	if (!jwk) {
		keys = await fetchGoogleJwks(true);
		jwk = keys.find((key) => key.kid === kid);
	}
	if (!jwk) throw new AuthError('تعذر العثور على مفتاح توقيع Google.', 401);
	return jwk;
}

async function verifySignature(parsed) {
	const jwk = await resolveSigningKey(parsed.header.kid);
	let key;
	try {
		key = await crypto.subtle.importKey(
			'jwk',
			jwk,
			{ name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
			false,
			['verify'],
		);
	} catch {
		throw new AuthError('تعذر استخدام مفتاح توقيع Google.', 503);
	}
	const valid = await crypto.subtle.verify(
		{ name: 'RSASSA-PKCS1-v1_5' },
		key,
		parsed.signature,
		encoder.encode(parsed.signingInput),
	).catch(() => false);
	if (!valid) throw new AuthError('فشل التحقق من توقيع Google.', 401);
}

function audienceMatches(aud, clientId) {
	if (typeof aud === 'string') return aud === clientId;
	return Array.isArray(aud) && aud.length > 0 && aud.every((value) => typeof value === 'string') && aud.includes(clientId);
}

function validateClaims(payload, clientId) {
	const now = Math.floor(Date.now() / 1000);
	if (!GOOGLE_ISSUERS.has(String(payload.iss || ''))) throw new AuthError('مصدر حساب Google غير صالح.', 401);
	if (!audienceMatches(payload.aud, clientId)) throw new AuthError('رمز Google غير مخصص لهذا الموقع.', 401);
	if (!Number.isFinite(Number(payload.exp)) || Number(payload.exp) <= now - CLOCK_SKEW_SECONDS) {
		throw new AuthError('انتهت صلاحية تسجيل الدخول بحساب Google. أعد المحاولة.', 401);
	}
	if (payload.nbf !== undefined && (!Number.isFinite(Number(payload.nbf)) || Number(payload.nbf) > now + CLOCK_SKEW_SECONDS)) {
		throw new AuthError('رمز Google غير صالح في الوقت الحالي.', 401);
	}
	if (payload.iat !== undefined && (!Number.isFinite(Number(payload.iat)) || Number(payload.iat) > now + 5 * 60)) {
		throw new AuthError('وقت إصدار رمز Google غير صالح.', 401);
	}
	const sub = String(payload.sub || '').trim();
	if (!sub || sub.length > 255 || !/^[0-9]+$/.test(sub)) throw new AuthError('معرّف حساب Google غير صالح.', 401);
	const email = normalizeEmail(payload.email);
	if (!validateEmail(email) || payload.email_verified !== true) throw new AuthError('البريد المرتبط بحساب Google غير موثّق.', 401);
	return {
		sub,
		email,
		name: String(payload.name || '').trim().slice(0, 120),
		picture: /^https:\/\//i.test(String(payload.picture || '')) ? String(payload.picture).slice(0, 1024) : '',
		hostedDomain: String(payload.hd || '').trim().toLowerCase().slice(0, 255),
	};
}

export function googleIdentityConfig(env) {
	try {
		return { enabled: true, clientId: googleClientId(env) };
	} catch {
		return { enabled: false, clientId: '' };
	}
}

export async function verifyGoogleIdToken(credential, env) {
	const parsed = parseJwt(credential);
	const clientId = googleClientId(env);
	await verifySignature(parsed);
	return validateClaims(parsed.payload, clientId);
}
