import {
	AuthError,
	createSession,
	getAuthenticatedUser,
	normalizeEmail,
	publicUser,
	requireSameOriginPost,
	sessionCookie,
} from '../../_lib/auth.js';
import { googleIdentityConfig, verifyGoogleIdToken } from '../../_lib/google-auth.js';
import { ensureMemberAdminSchema, recordMemberAudit } from '../../_lib/member-audit.js';
import { createMfaLoginChallenge, isMfaEnabled, requiresMfaRole } from '../../_lib/mfa.js';

const JSON_HEADERS = {
	'Content-Type': 'application/json; charset=utf-8',
	'Cache-Control': 'no-store, private',
	'X-Content-Type-Options': 'nosniff',
	'X-Frame-Options': 'DENY',
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

async function readJson(request) {
	try {
		return await request.json();
	} catch {
		throw new AuthError('بيانات تسجيل الدخول بحساب Google غير صالحة.', 400);
	}
}

async function config(env) {
	const identity = googleIdentityConfig(env);
	return json({
		enabled: identity.enabled,
		clientId: identity.clientId,
	});
}

async function status(request, env) {
	const user = await getAuthenticatedUser(request, env);
	if (!user) throw new AuthError('يلزم تسجيل الدخول.', 401);
	const db = await ensureMemberAdminSchema(env);
	const row = await db.prepare(`
		SELECT google_subject, google_linked_at
		FROM users
		WHERE id = ?
		LIMIT 1
	`).bind(user.id).first();
	return json({
		linked: Boolean(row?.google_subject),
		linkedAt: row?.google_linked_at || null,
	});
}

async function googleLogin(request, env) {
	requireSameOriginPost(request);
	const payload = await readJson(request);
	const identity = await verifyGoogleIdToken(payload?.credential, env);
	const db = await ensureMemberAdminSchema(env);
	const row = await db.prepare(`
		SELECT id, username, email, role, status, created_at, google_subject
		FROM users
		WHERE google_subject = ?
		LIMIT 1
	`).bind(identity.sub).first();

	if (!row) {
		const sameEmail = await db.prepare('SELECT id FROM users WHERE email_key = ? LIMIT 1')
			.bind(normalizeEmail(identity.email)).first();
		await recordMemberAudit({
			env,
			request,
			targetUserId: sameEmail?.id || null,
			eventType: 'auth.google.login.failure',
			outcome: 'failure',
			metadata: { reason: sameEmail ? 'link_required' : 'not_linked' },
		});
		if (sameEmail) {
			return json({
				error: 'هذا الحساب موجود لكنه غير مربوط بحساب Google بعد. سجّل الدخول بكلمة المرور ثم اربط Google من صفحة حسابك.',
				linkRequired: true,
				linkUrl: '/account/google',
			}, 409);
		}
		return json({
			error: 'لا يوجد حساب HAKAMIQ مرتبط بحساب Google هذا حتى الآن.',
			requiresRegistration: true,
			registrationClosed: env.REGISTRATION_CLOSED === '1',
		}, 403);
	}

	if (row.status !== 'active') {
		await recordMemberAudit({
			env,
			request,
			targetUserId: row.id,
			eventType: 'auth.google.login.failure',
			outcome: 'failure',
			metadata: { reason: 'account_suspended' },
		});
		throw new AuthError('هذا الحساب غير متاح حاليًا.', 403);
	}

	const now = new Date().toISOString();
	await db.prepare(`
		UPDATE users
		SET failed_login_count = 0, locked_until = NULL, last_login_at = ?, updated_at = ?
		WHERE id = ?
	`).bind(now, now, row.id).run();

	await recordMemberAudit({
		env,
		request,
		actorUserId: row.id,
		targetUserId: row.id,
		eventType: 'auth.google.login.success',
		metadata: { role: row.role },
	});

	if (requiresMfaRole(row.role) && await isMfaEnabled(env, row.id)) {
		const challenge = await createMfaLoginChallenge(env, row.id);
		return json({
			mfaRequired: true,
			mfaToken: challenge.token,
			expiresAt: challenge.expiresAt,
			methods: ['totp', 'recovery'],
		}, 202);
	}

	const accountSession = await createSession(env, row.id);
	return json(
		{
			authenticated: true,
			provider: 'google',
			user: publicUser(row, true),
			expiresAt: accountSession.expiresAt.toISOString(),
		},
		200,
		{ 'Set-Cookie': sessionCookie(accountSession.token) },
	);
}

async function linkGoogle(request, env) {
	requireSameOriginPost(request);
	const user = await getAuthenticatedUser(request, env);
	if (!user) throw new AuthError('يلزم تسجيل الدخول أولًا لربط حساب Google.', 401);
	const payload = await readJson(request);
	const identity = await verifyGoogleIdToken(payload?.credential, env);
	const db = await ensureMemberAdminSchema(env);
	const account = await db.prepare(`
		SELECT id, email, google_subject, google_linked_at
		FROM users
		WHERE id = ?
		LIMIT 1
	`).bind(user.id).first();
	if (!account) throw new AuthError('تعذر العثور على الحساب.', 404);
	if (normalizeEmail(account.email) !== normalizeEmail(identity.email)) {
		throw new AuthError('يجب أن يكون بريد حساب Google مطابقًا لبريد حساب HAKAMIQ قبل الربط.', 409);
	}
	if (account.google_subject === identity.sub) {
		return json({ linked: true, linkedAt: account.google_linked_at || null, alreadyLinked: true });
	}
	if (account.google_subject && account.google_subject !== identity.sub) {
		throw new AuthError('الحساب مربوط بحساب Google آخر. ألغِ الربط أولًا قبل استبداله.', 409);
	}
	const duplicate = await db.prepare('SELECT id FROM users WHERE google_subject = ? AND id <> ? LIMIT 1')
		.bind(identity.sub, user.id).first();
	if (duplicate) throw new AuthError('حساب Google هذا مربوط بحساب HAKAMIQ آخر.', 409);
	const now = new Date().toISOString();
	await db.prepare(`
		UPDATE users
		SET google_subject = ?, google_linked_at = ?, updated_at = ?
		WHERE id = ?
	`).bind(identity.sub, now, now, user.id).run();
	await recordMemberAudit({
		env,
		request,
		actorUserId: user.id,
		targetUserId: user.id,
		eventType: 'member.google.linked',
	});
	return json({ linked: true, linkedAt: now });
}

async function unlinkGoogle(request, env) {
	requireSameOriginPost(request);
	const user = await getAuthenticatedUser(request, env);
	if (!user) throw new AuthError('يلزم تسجيل الدخول.', 401);
	const db = await ensureMemberAdminSchema(env);
	const account = await db.prepare('SELECT google_subject FROM users WHERE id = ? LIMIT 1').bind(user.id).first();
	if (!account?.google_subject) return json({ linked: false, alreadyUnlinked: true });
	await db.prepare('UPDATE users SET google_subject = NULL, google_linked_at = NULL, updated_at = ? WHERE id = ?')
		.bind(new Date().toISOString(), user.id).run();
	await recordMemberAudit({
		env,
		request,
		actorUserId: user.id,
		targetUserId: user.id,
		eventType: 'member.google.unlinked',
	});
	return json({ linked: false });
}

export async function onRequest(context) {
	const { request, env } = context;
	const action = actionFrom(request);
	try {
		if (action === 'config' && request.method === 'GET') return await config(env);
		if (action === 'status' && request.method === 'GET') return await status(request, env);
		if (action === 'login') return await googleLogin(request, env);
		if (action === 'link') return await linkGoogle(request, env);
		if (action === 'unlink') return await unlinkGoogle(request, env);
		return json({ error: 'المسار غير موجود.' }, 404);
	} catch (error) {
		if (error instanceof AuthError) return json({ error: error.message }, error.status);
		console.error('HAKAMIQ Google identity function failure', error);
		return json({ error: 'حدث خطأ داخلي أثناء معالجة تسجيل الدخول بحساب Google.' }, 500);
	}
}
