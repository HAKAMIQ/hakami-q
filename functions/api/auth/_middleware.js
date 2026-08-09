import { createMfaLoginChallenge, isMfaEnabled, requiresMfaRole } from '../../_lib/mfa.js';
import {
	accountSessionTokenFromSetCookie,
	clearAccountSessionCookieHeader,
	revokeAccountSessionToken,
} from '../../_lib/mfa-session.js';

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

export async function onRequest(context) {
	const { request, env } = context;
	if (request.method !== 'POST' || actionFrom(request) !== 'login') {
		return context.next();
	}

	const response = await context.next();
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
