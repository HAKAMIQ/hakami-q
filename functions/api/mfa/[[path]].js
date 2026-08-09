import {
	AuthError,
	createSession,
	getAuthenticatedUser,
	publicUser,
	requireAuthDb,
	requireRole,
	requireSameOriginPost,
	sessionCookie,
	verifyPassword,
} from '../../_lib/auth.js';
import {
	MfaError,
	confirmTotpSetup,
	isMfaEnabled,
	mfaStatus,
	regenerateRecoveryCodes,
	requiresMfaRole,
	startTotpSetup,
	verifyMfaLoginChallenge,
} from '../../_lib/mfa.js';
import {
	clearAccountSessionCookieHeader,
	isCurrentSessionMfaVerified,
	markSessionMfaVerified,
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

async function readJson(request, message = 'بيانات الطلب غير صالحة.') {
	try {
		return await request.json();
	} catch {
		throw new AuthError(message, 400);
	}
}

async function status(request, env) {
	const user = await getAuthenticatedUser(request, env);
	if (!user) throw new AuthError('يلزم تسجيل الدخول.', 401);
	const required = requiresMfaRole(user.role);
	const details = required ? await mfaStatus(env, user.id) : { enabled: false, enabledAt: null, recoveryCodesRemaining: 0 };
	const sessionVerified = required && details.enabled
		? await isCurrentSessionMfaVerified(request, env)
		: false;
	return json({
		required,
		enabled: details.enabled,
		enabledAt: details.enabledAt,
		recoveryCodesRemaining: details.recoveryCodesRemaining,
		sessionVerified,
		role: user.role,
	});
}

async function setupStart(request, env) {
	requireSameOriginPost(request);
	const user = await requireRole(request, env, 'moderator');
	if (await isMfaEnabled(env, user.id)) {
		throw new MfaError('التحقق بخطوتين مفعّل بالفعل. لا يمكن استبداله بدون تحقق حالي.', 409, 'mfa_already_enabled');
	}
	const payload = await readJson(request, 'بيانات إعادة التحقق غير صالحة.');
	const password = String(payload?.password || '');
	if (!password || password.length > 128) throw new AuthError('أدخل كلمة مرور حسابك الحالية.', 400);
	const db = requireAuthDb(env);
	const account = await db.prepare('SELECT password_hash FROM users WHERE id = ? LIMIT 1').bind(user.id).first();
	if (!account?.password_hash || !(await verifyPassword(password, account.password_hash, env))) {
		throw new AuthError('كلمة مرور الحساب غير صحيحة.', 401);
	}
	const setup = await startTotpSetup(env, user);
	return json(setup, 200);
}

async function setupConfirm(request, env) {
	requireSameOriginPost(request);
	const user = await requireRole(request, env, 'moderator');
	if (await isMfaEnabled(env, user.id)) {
		throw new MfaError('التحقق بخطوتين مفعّل بالفعل.', 409, 'mfa_already_enabled');
	}
	const payload = await readJson(request, 'بيانات رمز التحقق غير صالحة.');
	const result = await confirmTotpSetup(env, user, payload?.code);
	return json(
		result,
		200,
		{ 'Set-Cookie': clearAccountSessionCookieHeader() },
	);
}

async function verifyLogin(request, env) {
	requireSameOriginPost(request);
	const payload = await readJson(request, 'بيانات التحقق بخطوتين غير صالحة.');
	const user = await verifyMfaLoginChallenge(env, payload?.mfaToken, payload?.code);
	if (!requiresMfaRole(user.role)) {
		throw new MfaError('لم يعد هذا الحساب يتطلب تحققًا إداريًا إضافيًا. سجل الدخول من جديد.', 409, 'mfa_role_changed');
	}
	const accountSession = await createSession(env, user.id);
	try {
		await markSessionMfaVerified(env, accountSession.token);
	} catch (error) {
		const db = requireAuthDb(env);
		await db.prepare('DELETE FROM sessions WHERE user_id = ? AND expires_at = ?')
			.bind(user.id, accountSession.expiresAt.toISOString()).run();
		throw error;
	}
	return json(
		{
			authenticated: true,
			mfaVerified: true,
			user: publicUser(user, true),
			expiresAt: accountSession.expiresAt.toISOString(),
		},
		200,
		{ 'Set-Cookie': sessionCookie(accountSession.token) },
	);
}

async function recoveryRegenerate(request, env) {
	requireSameOriginPost(request);
	const user = await requireRole(request, env, 'moderator');
	if (!(await isMfaEnabled(env, user.id))) throw new MfaError('التحقق بخطوتين غير مفعّل.', 409, 'mfa_not_enabled');
	if (!(await isCurrentSessionMfaVerified(request, env))) {
		throw new MfaError('يلزم تسجيل دخول مكتمل بالتحقق بخطوتين.', 401, 'mfa_session_required');
	}
	const payload = await readJson(request, 'بيانات إعادة إنشاء الرموز غير صالحة.');
	const recoveryCodes = await regenerateRecoveryCodes(env, user, payload?.code);
	return json({ recoveryCodes }, 200);
}

export async function onRequest(context) {
	const { request, env } = context;
	const action = actionFrom(request);
	try {
		if (action === 'status' && request.method === 'GET') return await status(request, env);
		if (action === 'setup-start') return await setupStart(request, env);
		if (action === 'setup-confirm') return await setupConfirm(request, env);
		if (action === 'verify-login') return await verifyLogin(request, env);
		if (action === 'recovery-regenerate') return await recoveryRegenerate(request, env);
		return json({ error: 'المسار غير موجود.' }, 404);
	} catch (error) {
		if (error instanceof MfaError) return json({ error: error.message, code: error.code }, error.status);
		if (error instanceof AuthError) return json({ error: error.message }, error.status);
		console.error('HAKAMIQ MFA function failure', error);
		return json({ error: 'حدث خطأ داخلي أثناء معالجة التحقق بخطوتين.' }, 500);
	}
}
