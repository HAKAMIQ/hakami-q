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
	requireRole,
	requireSameOriginPost,
	sessionCookie,
	usernameKey,
	validateEmail,
	validatePassword,
	validateUsername,
	verifyLegacyAdminSession,
	verifyPassword,
} from '../../_lib/auth.js';

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

function getAction(request) {
	const path = new URL(request.url).pathname.replace(/\/+$/, '');
	return path.split('/').pop() || '';
}

async function readJson(request, message = 'بيانات الطلب غير صالحة.') {
	try {
		return await request.json();
	} catch {
		throw new AuthError(message);
	}
}

function registrationInput(payload) {
	const username = normalizeUsername(payload?.username);
	const email = normalizeEmail(payload?.email);
	const password = String(payload?.password || '');
	if (!validateUsername(username)) {
		throw new AuthError('اسم المستخدم يجب أن يكون بين 3 و32 حرفًا، ويقبل الحروف والأرقام والنقطة والشرطة والشرطة السفلية.');
	}
	if (!validateEmail(email)) throw new AuthError('البريد الإلكتروني غير صالح.');
	if (!validatePassword(password)) throw new AuthError('كلمة المرور يجب أن تكون بين 12 و128 حرفًا.');
	return { username, email, password };
}

async function createUser(env, input, role = 'user') {
	const db = requireAuthDb(env);
	const key = usernameKey(input.username);
	const duplicate = await db.prepare(
		'SELECT id, username_key, email_key FROM users WHERE username_key = ? OR email_key = ? LIMIT 1'
	).bind(key, input.email).first();
	if (duplicate) {
		if (duplicate.username_key === key) throw new AuthError('اسم المستخدم مستخدم بالفعل.', 409);
		throw new AuthError('البريد الإلكتروني مستخدم بالفعل.', 409);
	}
	const id = crypto.randomUUID();
	const now = new Date().toISOString();
	const passwordHash = await hashPassword(input.password);
	try {
		await db.prepare(`
			INSERT INTO users (
				id, username, username_key, email, email_key, password_hash,
				role, status, failed_login_count, created_at, updated_at
			) VALUES (?, ?, ?, ?, ?, ?, ?, 'active', 0, ?, ?)
		`).bind(id, input.username, key, input.email, input.email, passwordHash, role, now, now).run();
	} catch (error) {
		console.error('auth create user failed', error);
		throw new AuthError('تعذر إنشاء الحساب. قد يكون اسم المستخدم أو البريد مستخدمًا.', 409);
	}
	return db.prepare(
		'SELECT id, username, email, role, status, created_at FROM users WHERE id = ? LIMIT 1'
	).bind(id).first();
}

async function register(request, env) {
	requireSameOriginPost(request);
	if (env.REGISTRATION_CLOSED === '1') throw new AuthError('التسجيل متوقف مؤقتًا.', 403);
	const input = registrationInput(await readJson(request, 'بيانات التسجيل غير صالحة.'));
	const row = await createUser(env, input, 'user');
	const session = await createSession(env, row.id);
	return json(
		{ registered: true, authenticated: true, user: publicUser(row, true) },
		201,
		{ 'Set-Cookie': sessionCookie(session.token) },
	);
}

async function login(request, env) {
	requireSameOriginPost(request);
	const db = requireAuthDb(env);
	const payload = await readJson(request, 'بيانات تسجيل الدخول غير صالحة.');
	const identifier = String(payload?.identifier || '').trim().normalize('NFKC');
	const password = String(payload?.password || '');
	if (!identifier || !password || password.length > 128) return json({ error: 'بيانات تسجيل الدخول غير صحيحة.' }, 401);
	const key = identifier.toLocaleLowerCase('en');
	const row = await db.prepare(`
		SELECT id, username, username_key, email, email_key, password_hash, role, status,
			failed_login_count, locked_until, created_at
		FROM users
		WHERE username_key = ? OR email_key = ?
		LIMIT 1
	`).bind(key, key).first();
	if (!row) return json({ error: 'بيانات تسجيل الدخول غير صحيحة.' }, 401);
	if (row.status !== 'active') return json({ error: 'هذا الحساب موقوف.' }, 403);
	if (row.locked_until && Date.parse(row.locked_until) > Date.now()) {
		return json({ error: 'تم إيقاف محاولات تسجيل الدخول مؤقتًا. حاول لاحقًا.' }, 429);
	}
	const valid = await verifyPassword(password, row.password_hash);
	if (!valid) {
		const failures = Number(row.failed_login_count || 0) + 1;
		const shouldLock = failures >= 8;
		const lockedUntil = shouldLock ? new Date(Date.now() + 15 * 60 * 1000).toISOString() : null;
		await db.prepare(
			'UPDATE users SET failed_login_count = ?, locked_until = ?, updated_at = ? WHERE id = ?'
		).bind(shouldLock ? 0 : failures, lockedUntil, new Date().toISOString(), row.id).run();
		return json({ error: 'بيانات تسجيل الدخول غير صحيحة.' }, 401);
	}
	await db.prepare(
		'UPDATE users SET failed_login_count = 0, locked_until = NULL, updated_at = ? WHERE id = ?'
	).bind(new Date().toISOString(), row.id).run();
	const session = await createSession(env, row.id);
	return json(
		{ authenticated: true, user: publicUser(row, true), expiresAt: session.expiresAt.toISOString() },
		200,
		{ 'Set-Cookie': sessionCookie(session.token) },
	);
}

async function logout(request, env) {
	requireSameOriginPost(request);
	await destroySession(request, env);
	return json({ authenticated: false }, 200, { 'Set-Cookie': clearSessionCookie() });
}

async function session(request, env) {
	const user = await getAuthenticatedUser(request, env);
	if (!user) return json({ authenticated: false });
	return json({
		authenticated: true,
		user,
		permissions: {
			moderateUsers: user.role === 'moderator' || user.role === 'admin',
			manageRoles: user.role === 'admin',
		},
	});
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
	if (!(await verifyLegacyAdminSession(request, env))) {
		throw new AuthError('سجّل الدخول أولًا من لوحة الإدارة الحالية لإثبات ملكية الموقع.', 401);
	}
	const input = registrationInput(await readJson(request, 'بيانات حساب المدير غير صالحة.'));
	const row = await createUser(env, input, 'admin');
	const accountSession = await createSession(env, row.id);
	return json(
		{ bootstrapped: true, authenticated: true, user: publicUser(row, true) },
		201,
		{ 'Set-Cookie': sessionCookie(accountSession.token) },
	);
}

async function listUsers(request, env) {
	const actor = await requireRole(request, env, 'moderator');
	const db = requireAuthDb(env);
	const result = await db.prepare(`
		SELECT id, username, email, role, status, created_at
		FROM users
		ORDER BY created_at DESC
		LIMIT 250
	`).all();
	const includeEmail = actor.role === 'admin';
	return json({ actor, users: (result.results || []).map((row) => publicUser(row, includeEmail)) });
}

async function updateRole(request, env) {
	requireSameOriginPost(request);
	const actor = await requireRole(request, env, 'admin');
	const db = requireAuthDb(env);
	const payload = await readJson(request);
	const userId = String(payload?.userId || '');
	const role = String(payload?.role || '');
	if (!userId || !['user', 'moderator', 'admin'].includes(role)) throw new AuthError('بيانات الصلاحية غير صالحة.');
	const target = await db.prepare('SELECT id, role FROM users WHERE id = ? LIMIT 1').bind(userId).first();
	if (!target) throw new AuthError('المستخدم غير موجود.', 404);
	if (target.id === actor.id && role !== 'admin') throw new AuthError('لا يمكنك خفض صلاحية حسابك الحالي.', 409);
	if (target.role === 'admin' && role !== 'admin') {
		const admins = await db.prepare("SELECT COUNT(*) AS count FROM users WHERE role = 'admin' AND status = 'active'").first();
		if (Number(admins?.count || 0) <= 1) throw new AuthError('لا يمكن خفض صلاحية آخر مدير نشط.', 409);
	}
	await db.prepare('UPDATE users SET role = ?, updated_at = ? WHERE id = ?')
		.bind(role, new Date().toISOString(), userId).run();
	return json({ updated: true, userId, role });
}

async function updateStatus(request, env) {
	requireSameOriginPost(request);
	const actor = await requireRole(request, env, 'moderator');
	const db = requireAuthDb(env);
	const payload = await readJson(request);
	const userId = String(payload?.userId || '');
	const status = String(payload?.status || '');
	if (!userId || !['active', 'suspended'].includes(status)) throw new AuthError('بيانات حالة الحساب غير صالحة.');
	const target = await db.prepare('SELECT id, role, status FROM users WHERE id = ? LIMIT 1').bind(userId).first();
	if (!target) throw new AuthError('المستخدم غير موجود.', 404);
	if (target.id === actor.id) throw new AuthError('لا يمكنك تغيير حالة حسابك الحالي.', 409);
	if (actor.role === 'moderator' && target.role !== 'user') throw new AuthError('المشرف يستطيع إدارة المستخدمين العاديين فقط.', 403);
	if (actor.role === 'admin' && target.role === 'admin') throw new AuthError('لا يمكن إيقاف حساب مدير من هذه الواجهة.', 409);
	await db.prepare('UPDATE users SET status = ?, updated_at = ? WHERE id = ?')
		.bind(status, new Date().toISOString(), userId).run();
	if (status === 'suspended') await db.prepare('DELETE FROM sessions WHERE user_id = ?').bind(userId).run();
	return json({ updated: true, userId, status });
}

export async function onRequest(context) {
	const { request, env } = context;
	const action = getAction(request);
	try {
		if (action === 'session' && request.method === 'GET') return await session(request, env);
		if (action === 'bootstrap-status' && request.method === 'GET') return await bootstrapStatus(env);
		if (action === 'users' && request.method === 'GET') return await listUsers(request, env);
		if (action === 'register') return await register(request, env);
		if (action === 'login') return await login(request, env);
		if (action === 'logout') return await logout(request, env);
		if (action === 'bootstrap-admin') return await bootstrapAdmin(request, env);
		if (action === 'user-role') return await updateRole(request, env);
		if (action === 'user-status') return await updateStatus(request, env);
		return json({ error: 'المسار غير موجود.' }, 404);
	} catch (error) {
		if (error instanceof AuthError) return json({ error: error.message }, error.status);
		console.error('HAKAMIQ auth function failure', error);
		return json({ error: 'حدث خطأ داخلي أثناء معالجة الحساب.' }, 500);
	}
}
