import {
	clearSessionCookie,
	destroySession,
	getAuthenticatedUser,
	requireAuthDb,
} from '../_lib/auth.js';
import { isMfaEnabled, requiresMfaRole } from '../_lib/mfa.js';
import { isCurrentSessionMfaVerified } from '../_lib/mfa-session.js';

const encoder = new TextEncoder();
const LEGACY_COOKIE = 'hq_admin';
const LEGACY_COMPAT_SECONDS = 8 * 60 * 60;

async function adminCount(env) {
	const db = requireAuthDb(env);
	const row = await db.prepare("SELECT COUNT(*) AS count FROM users WHERE role = 'admin'").first();
	return Number(row?.count || 0);
}

async function signLegacyCompatibilityCookie(env) {
	if (!env.ADMIN_SESSION_SECRET) return '';
	const expires = Math.floor(Date.now() / 1000) + LEGACY_COMPAT_SECONDS;
	const key = await crypto.subtle.importKey(
		'raw',
		encoder.encode(env.ADMIN_SESSION_SECRET),
		{ name: 'HMAC', hash: 'SHA-256' },
		false,
		['sign'],
	);
	const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(`admin:${expires}`));
	let binary = '';
	for (const byte of new Uint8Array(signature)) binary += String.fromCharCode(byte);
	const encoded = btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
	return `${LEGACY_COOKIE}=${expires}.${encoded}; Path=/; Max-Age=${LEGACY_COMPAT_SECONDS}; HttpOnly; Secure; SameSite=Strict`;
}

function redirect(location, setCookie = '') {
	const headers = new Headers({
		Location: location,
		'Cache-Control': 'no-store, private',
		'X-Frame-Options': 'DENY',
		'Referrer-Policy': 'no-referrer',
	});
	if (setCookie) headers.append('Set-Cookie', setCookie);
	return new Response(null, { status: 302, headers });
}

function loginRedirect(request, clearCookie = false) {
	const url = new URL(request.url);
	const next = `${url.pathname}${url.search}`;
	const target = new URL('/login', url.origin);
	target.searchParams.set('next', next);
	return redirect(target.toString(), clearCookie ? clearSessionCookie() : '');
}

function setupRedirect(request) {
	const target = new URL('/account', request.url);
	target.searchParams.set('security', 'setup');
	return redirect(target.toString());
}

function forbiddenRedirect(request) {
	return redirect(new URL('/account', request.url).toString());
}

function securedResponse(response, compatibilityCookie = '') {
	const secured = new Response(response.body, response);
	secured.headers.set('Cache-Control', 'no-store, private');
	secured.headers.set('X-Frame-Options', 'DENY');
	secured.headers.set('Referrer-Policy', 'no-referrer');
	secured.headers.set('Content-Security-Policy', "frame-ancestors 'none'; base-uri 'self'; form-action 'self'");
	if (compatibilityCookie) secured.headers.append('Set-Cookie', compatibilityCookie);
	return secured;
}

export async function onRequest(context) {
	const { request, env } = context;
	try {
		if ((await adminCount(env)) === 0) {
			return securedResponse(await context.next());
		}

		const user = await getAuthenticatedUser(request, env);
		if (!user) return loginRedirect(request);

		const pathname = new URL(request.url).pathname.replace(/\/+$/, '') || '/';
		const isUserManagement = pathname === '/admin/users';
		const allowed = isUserManagement
			? user.role === 'moderator' || user.role === 'admin'
			: user.role === 'admin';
		if (!allowed) return forbiddenRedirect(request);

		if (requiresMfaRole(user.role)) {
			if (!(await isMfaEnabled(env, user.id))) return setupRedirect(request);
			if (!(await isCurrentSessionMfaVerified(request, env))) {
				await destroySession(request, env);
				return loginRedirect(request, true);
			}
		}

		const compatibilityCookie = user.role === 'admin'
			? await signLegacyCompatibilityCookie(env)
			: '';
		return securedResponse(await context.next(), compatibilityCookie);
	} catch (error) {
		console.error('HAKAMIQ admin page middleware failure', error);
		return new Response('خدمة الإدارة غير متاحة مؤقتًا.', {
			status: 503,
			headers: {
				'Content-Type': 'text/plain; charset=utf-8',
				'Cache-Control': 'no-store, private',
				'X-Frame-Options': 'DENY',
			},
		});
	}
}
