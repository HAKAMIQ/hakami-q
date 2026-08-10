import {
	AuthError,
	clearSessionCookie,
	createSession,
	destroySession,
	getAuthenticatedUser,
	hashPassword,
	normalizeEmail,
	normalizeUsername,
	publicUser,
	requireAuthDb,
	requireSameOriginPost,
	sessionCookie,
	usernameKey,
	validateEmail,
	validatePassword,
	validateUsername,
	verifyLegacyAdminSession,
	verifyPassword,
} from '../../_lib/auth.js';

const DUMMY_PASSWORD_HASH = 'pbkdf2-sha256-hmac-pepper-v1$100000$AAAAAAAAAAAAAAAAAAAAAA$AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const JSON_HEADERS = {
	'Content-Type': 'application/json; charset=utf-8',
	'Cache-Control': 'no-store, private',
	'X-Content-Type-Options': 'nosniff',
	'X-Frame-Options': 'DENY',
	'Referrer-Policy': 'no-referrer',
};

function json(payload, status = 200, extraHeaders = {}) {
	return new Response(JSON.stringify(payload), { status, headers: { ...JSON_HEADERS, ...extraHeaders } });
}

function actionFrom(request) {
	const pathname = new URL(request.url).pathname.replace(/\/+$/, '');
	return pathname.split('/').pop() || '';
}

async function readJson(request, message = 'بيانات الطلب غير صالحة.') {
	try {
		return await request.json();
	} catch {
		throw new AuthError(message);
	}
}

function expectedTurnstileHostnames(env) {
	return new Set(String(env.TURNSTILE_HOSTNAMES || '').split(',').map((value) => value.trim().toLowerCase()).filter(Boolean));
}

async function verifyTurnstile(request, env, token) {
	if (!env.TURNSTILE_SECRET_KEY) throw new AuthError('خدمة التحقق الأمني غير مهيأة بعد.', 503);
	const value = String(token || '');
	if (!value || value.length > 2048) throw new AuthError('أكمل التحقق الأمني ثم أعد المحاولة.', 400);
	const body = new FormData();
	body.set('secret', env.TURNSTILE_SECRET_KEY);
	body.set('response', value);
	body.set('idempotency_key', crypto.randomUUID());
	const remoteIp = request.headers.get('CF-Connecting-IP');
	if (remoteIp) body.set('remoteip', remoteIp);
	let response;
	try {
		response = await fetch(TURNSTILE_VERIFY_URL, { method: 'POST', body, signal: AbortSignal.timeout(10000) });
	} catch {
		throw new AuthError('تعذر الوصول إلى خدمة التحقق الأمني. حاول لاحقًا.', 503);
	}
	if (!response.ok) throw new AuthError('تعذر التحقق من الطلب حاليًا. حاول لاحقًا.', 503);
	const result = await response.json().catch(() => null);
	if (!result?.success || result.action !== 'login') throw new AuthError('فشل التحقق الأمني. أعد المحاولة.', 403);
	const hostnames = expectedTurnstileHostnames(env);
	if (hostnames.size > 0) {
		const hostname = String(result.hostname || '').trim().toLowerCase();
		if (!hostname || !hostnames.has(hostname)) throw new AuthError('فشل التحقق من مصدر الطلب.', 403);
	}
}

function adminInput(payload) {
	const username = normalizeUsername(payload?.username);
	const email = normalizeEmail(payload?.email);
	const password = String(payload?.password || '');
	if (!validateUsername(username)) throw new AuthError('اسم المستخدم غير صالح.');
	if (!validateEmail(email)) throw new AuthError('البريد الإلكتروني غير صالح.');
	if (!validatePassword(password)) throw new AuthError('كلمة المرور يجب أن تكون بين 12 و128 حرفًا.');
	return { username, email, password };
}

async function config(env) {
	return json({ turnstileSitekey: String(env.TURNSTILE_SITEKEY || '') });
}

async function login(request, env) {
	requireSameOriginPost(request);
	const payload = await readJson(request, 'بيانات تسجيل الدخول غير صالحة.');
	await verifyTurnstile(request, env, payload?.turnstileToken);
	const identifier = String(payload?.identifier || '').trim().normalize('NFKC');
	const password = String(payload?.password || '');
	if (!identifier || !password || password.length > 128) return json({ error: 'بيانات تسجيل الدخول غير صحيحة.' }, 401);
	const key = identifier.toLocaleLowerCase('en');
	const db = requireAuthDb(env);
	const row = await db.prepare(`
		SELECT id, username, email, password_hash, role, status, failed_login_count, locked_until, created_at
		FROM users
		WHERE role = 'admin' AND (username_key = ? OR email_key = ?)
		LIMIT 1
	`).bind(key, key).first();
	if (!row) {
		await verifyPassword(password, DUMMY_PASSWORD_HASH, env);
		return json({ error: 'بيانات تسجيل الدخول غير صحيحة.' }, 401);
	}
	if (row.status !== 'active') return json({ error: 'حساب الإدارة غير متاح حاليًا.' }, 403);
	if (row.locked_until && Date.parse(row.locked_until) > Date.now()) {
		return json({ error: 'تم إيقاف محاولات تسجيل الدخول مؤقتًا. حاول لاحقًا.' }, 429);
	}
	if (!(await verifyPassword(password, row.password_hash, env))) {
		const failures = Number(row.failed_login_count || 0) + 1;
		const lock = failures >= 8;
		await db.prepare('UPDATE users SET failed_login_count = ?, locked_until = ?, updated_at = ? WHERE id = ?')
			.bind(lock ? 0 : failures, lock ? new Date(Date.now() + 15 * 60 * 1000).toISOString() : null, new Date().toISOString(), row.id).run();
		return json({ error: 'بيانات تسجيل الدخول غير صحيحة.' }, 401);
	}
	await db.prepare('UPDATE users SET failed_login_count = 0, locked_until = NULL, updated_at = ? WHERE id = ?')
		.bind(new Date().toISOString(), row.id).run();
	const accountSession = await createSession(env, row.id);
	return json(
		{ authenticated: true, user: publicUser(row, true), expiresAt: accountSession.expiresAt.toISOString() },
		200,
		{ 'Set-Cookie': sessionCookie(accountSession.token) },
	);
}

async function logout(request, env) {
	requireSameOriginPost(request);
	await destroySession(request, env);
	return json({ authenticated: false }, 200, { 'Set-Cookie': clearSessionCookie() });
}

async function session(request, env) {
	const user = await getAuthenticatedUser(request, env);
	if (!user || user.role !== 'admin') return json({ authenticated: false });
	return json({ authenticated: true, user });
}

async function bootstrapStatus(env) {
	const db = requireAuthDb(env);
	const row = await db.prepare("SELECT COUNT(*) AS count FROM users WHERE role = 'admin'").first();
	return json({ needsBootstrap: Number(row?.count || 0) === 0 });
}

async function bootstrapAdmin(request, env) {
	requireSameOriginPost(request);
	const db = requireAuthDb(env);
	const count = await db.prepare("SELECT COUNT(*) AS count FROM users WHERE role = 'admin'").first();
	if (Number(count?.count || 0) > 0) throw new AuthError('تم إنشاء حساب المدير الأول مسبقًا.', 409);
	if (!(await verifyLegacyAdminSession(request, env))) throw new AuthError('يلزم إثبات ملكية لوحة الإدارة القديمة أولًا.', 401);
	const input = adminInput(await readJson(request, 'بيانات حساب المدير غير صالحة.'));
	const duplicate = await db.prepare('SELECT id FROM users WHERE username_key = ? OR email_key = ? LIMIT 1')
		.bind(usernameKey(input.username), input.email).first();
	if (duplicate) throw new AuthError('تعذر إنشاء حساب المدير بهذه البيانات.', 409);
	const id = crypto.randomUUID();
	const now = new Date().toISOString();
	const passwordHash = await hashPassword(input.password, env);
	await db.prepare(`
		INSERT INTO users (id, username, username_key, email, email_key, password_hash, role, status, failed_login_count, created_at, updated_at)
		VALUES (?, ?, ?, ?, ?, ?, 'admin', 'active', 0, ?, ?)
	`).bind(id, input.username, usernameKey(input.username), input.email, input.email, passwordHash, now, now).run();
	const row = await db.prepare('SELECT id, username, email, role, status, created_at FROM users WHERE id = ? LIMIT 1').bind(id).first();
	const accountSession = await createSession(env, id);
	return json({ bootstrapped: true, authenticated: true, user: publicUser(row, true) }, 201, {
		'Set-Cookie': sessionCookie(accountSession.token),
	});
}

export async function onRequest(context) {
	const { request, env } = context;
	const action = actionFrom(request);
	try {
		if (action === 'config' && request.method === 'GET') return await config(env);
		if (action === 'session' && request.method === 'GET') return await session(request, env);
		if (action === 'bootstrap-status' && request.method === 'GET') return await bootstrapStatus(env);
		if (action === 'login' && request.method === 'POST') return await login(request, env);
		if (action === 'logout' && request.method === 'POST') return await logout(request, env);
		if (action === 'bootstrap-admin' && request.method === 'POST') return await bootstrapAdmin(request, env);
		return json({ error: 'المسار غير موجود.' }, 404);
	} catch (error) {
		if (error instanceof AuthError) return json({ error: error.message }, error.status);
		console.error('HAKAMIQ admin auth failure', error);
		return json({ error: 'حدث خطأ داخلي أثناء معالجة دخول الإدارة.' }, 500);
	}
}
