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
import { ensureMemberAdminSchema, recordMemberAudit } from '../../_lib/member-audit.js';

const DUMMY_PASSWORD_HASH = 'pbkdf2-sha256-hmac-pepper-v1$100000$AAAAAAAAAAAAAAAAAAAAAA$AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const DEFAULT_PAGE_SIZE = 50;
const MAX_PAGE_SIZE = 100;

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

function expectedTurnstileHostnames(env) {
	return new Set(
		String(env.TURNSTILE_HOSTNAMES || '')
			.split(',')
			.map((hostname) => hostname.trim().toLowerCase())
			.filter(Boolean),
	);
}

async function verifyTurnstile(request, env, token, expectedAction) {
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
		response = await fetch(TURNSTILE_VERIFY_URL, {
			method: 'POST',
			body,
			signal: AbortSignal.timeout(10000),
		});
	} catch {
		throw new AuthError('تعذر الوصول إلى خدمة التحقق الأمني. حاول لاحقًا.', 503);
	}
	if (!response.ok) throw new AuthError('تعذر التحقق من الطلب حاليًا. حاول لاحقًا.', 503);
	const result = await response.json().catch(() => null);
	if (!result?.success) throw new AuthError('فشل التحقق الأمني. أعد المحاولة.', 403);
	if (result.action !== expectedAction) throw new AuthError('فشل التحقق الأمني للطلب.', 403);

	const hostnames = expectedTurnstileHostnames(env);
	if (hostnames.size > 0) {
		const hostname = String(result.hostname || '').trim().toLowerCase();
		if (!hostname || !hostnames.has(hostname)) throw new AuthError('فشل التحقق من مصدر الطلب.', 403);
	}
}

async function createUser(env, input, role = 'user') {
	const db = await ensureMemberAdminSchema(env);
	const key = usernameKey(input.username);
	const duplicate = await db.prepare(
		'SELECT id FROM users WHERE username_key = ? OR email_key = ? LIMIT 1'
	).bind(key, input.email).first();
	if (duplicate) throw new AuthError('تعذر إنشاء الحساب بهذه البيانات.', 409);
	const id = crypto.randomUUID();
	const now = new Date().toISOString();
	const passwordHash = await hashPassword(input.password, env);
	try {
		await db.prepare(`
			INSERT INTO users (
				id, username, username_key, email, email_key, password_hash,
				role, status, failed_login_count, created_at, updated_at
			) VALUES (?, ?, ?, ?, ?, ?, ?, 'active', 0, ?, ?)
		`).bind(id, input.username, key, input.email, input.email, passwordHash, role, now, now).run();
	} catch (error) {
		console.error('auth create user failed', error);
		throw new AuthError('تعذر إنشاء الحساب بهذه البيانات.', 409);
	}
	return db.prepare(
		'SELECT id, username, email, role, status, created_at FROM users WHERE id = ? LIMIT 1'
	).bind(id).first();
}

function positiveInteger(value, fallback, maximum = Number.MAX_SAFE_INTEGER) {
	const number = Number(value);
	if (!Number.isInteger(number) || number < 1) return fallback;
	return Math.min(number, maximum);
}

function normalizedReason(value) {
	return String(value || '').trim().replace(/[\r\n\t]+/g, ' ').slice(0, 240);
}

function memberView(row, includeEmail) {
	return {
		id: row.id,
		username: row.username,
		...(includeEmail ? { email: row.email } : {}),
		role: row.role,
		status: row.status,
		createdAt: row.created_at,
		updatedAt: row.updated_at,
		lastLoginAt: row.last_login_at || null,
		lockedUntil: row.locked_until || null,
		statusReason: row.status_reason || '',
		statusChangedAt: row.status_changed_at || null,
		activeSessions: Number(row.active_sessions || 0),
	};
}

async function preparedFirst(db, sql, bindings) {
	const statement = db.prepare(sql);
	return bindings.length ? statement.bind(...bindings).first() : statement.first();
}

async function preparedAll(db, sql, bindings) {
	const statement = db.prepare(sql);
	return bindings.length ? statement.bind(...bindings).all() : statement.all();
}

async function config(env) {
	return json({
		turnstileSitekey: String(env.TURNSTILE_SITEKEY || ''),
		registrationClosed: env.REGISTRATION_CLOSED === '1',
	});
}

async function register(request, env) {
	requireSameOriginPost(request);
	if (env.REGISTRATION_CLOSED === '1') throw new AuthError('التسجيل متوقف مؤقتًا.', 403);
	const payload = await readJson(request, 'بيانات التسجيل غير صالحة.');
	await verifyTurnstile(request, env, payload?.turnstileToken, 'register');
	const input = registrationInput(payload);
	const row = await createUser(env, input, 'user');
	const db = await ensureMemberAdminSchema(env);
	const now = new Date().toISOString();
	await db.prepare('UPDATE users SET last_login_at = ?, updated_at = ? WHERE id = ?').bind(now, now, row.id).run();
	const accountSession = await createSession(env, row.id);
	await recordMemberAudit({
		env,
		request,
		targetUserId: row.id,
		eventType: 'member.registered',
		metadata: { role: row.role },
	});
	return json(
		{ registered: true, authenticated: true, user: publicUser(row, true) },
		201,
		{ 'Set-Cookie': sessionCookie(accountSession.token) },
	);
}

async function login(request, env) {
	requireSameOriginPost(request);
	const db = await ensureMemberAdminSchema(env);
	const payload = await readJson(request, 'بيانات تسجيل الدخول غير صالحة.');
	await verifyTurnstile(request, env, payload?.turnstileToken, 'login');
	const identifier = String(payload?.identifier || '').trim().normalize('NFKC');
	const password = String(payload?.password || '');
	if (!identifier || !password || password.length > 128) {
		await recordMemberAudit({ env, request, eventType: 'auth.login.failure', outcome: 'failure', metadata: { reason: 'invalid_input' } });
		return json({ error: 'بيانات تسجيل الدخول غير صحيحة.' }, 401);
	}
	const key = identifier.toLocaleLowerCase('en');
	const row = await db.prepare(`
		SELECT id, username, username_key, email, email_key, password_hash, role, status,
			failed_login_count, locked_until, created_at
		FROM users
		WHERE username_key = ? OR email_key = ?
		LIMIT 1
	`).bind(key, key).first();
	if (!row) {
		await verifyPassword(password, DUMMY_PASSWORD_HASH, env);
		await recordMemberAudit({ env, request, eventType: 'auth.login.failure', outcome: 'failure', metadata: { reason: 'invalid_credentials', knownAccount: false } });
		return json({ error: 'بيانات تسجيل الدخول غير صحيحة.' }, 401);
	}
	if (row.status !== 'active') {
		await recordMemberAudit({ env, request, targetUserId: row.id, eventType: 'auth.login.failure', outcome: 'failure', metadata: { reason: 'account_suspended' } });
		return json({ error: 'هذا الحساب غير متاح حاليًا.' }, 403);
	}
	if (row.locked_until && Date.parse(row.locked_until) > Date.now()) {
		await recordMemberAudit({ env, request, targetUserId: row.id, eventType: 'auth.login.failure', outcome: 'failure', metadata: { reason: 'account_locked' } });
		return json({ error: 'تم إيقاف محاولات تسجيل الدخول مؤقتًا. حاول لاحقًا.' }, 429);
	}
	const valid = await verifyPassword(password, row.password_hash, env);
	if (!valid) {
		const failures = Number(row.failed_login_count || 0) + 1;
		const shouldLock = failures >= 8;
		const lockedUntil = shouldLock ? new Date(Date.now() + 15 * 60 * 1000).toISOString() : null;
		await db.prepare(
			'UPDATE users SET failed_login_count = ?, locked_until = ?, updated_at = ? WHERE id = ?'
		).bind(shouldLock ? 0 : failures, lockedUntil, new Date().toISOString(), row.id).run();
		await recordMemberAudit({
			env,
			request,
			targetUserId: row.id,
			eventType: 'auth.login.failure',
			outcome: 'failure',
			metadata: { reason: 'invalid_credentials', knownAccount: true, lockApplied: shouldLock },
		});
		return json({ error: 'بيانات تسجيل الدخول غير صحيحة.' }, 401);
	}
	const now = new Date().toISOString();
	await db.prepare(
		'UPDATE users SET failed_login_count = 0, locked_until = NULL, last_login_at = ?, updated_at = ? WHERE id = ?'
	).bind(now, now, row.id).run();
	const accountSession = await createSession(env, row.id);
	await recordMemberAudit({ env, request, actorUserId: row.id, targetUserId: row.id, eventType: 'auth.login.success', metadata: { role: row.role } });
	return json(
		{ authenticated: true, user: publicUser(row, true), expiresAt: accountSession.expiresAt.toISOString() },
		200,
		{ 'Set-Cookie': sessionCookie(accountSession.token) },
	);
}

async function logout(request, env) {
	requireSameOriginPost(request);
	const user = await getAuthenticatedUser(request, env).catch(() => null);
	await destroySession(request, env);
	if (user) await recordMemberAudit({ env, request, actorUserId: user.id, targetUserId: user.id, eventType: 'auth.logout' });
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
			viewAuditLog: user.role === 'admin',
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
	const db = await ensureMemberAdminSchema(env);
	const count = await db.prepare("SELECT COUNT(*) AS count FROM users WHERE role = 'admin'").first();
	if (Number(count?.count || 0) > 0) throw new AuthError('تم إنشاء حساب المدير الأول مسبقًا.', 409);
	if (!(await verifyLegacyAdminSession(request, env))) {
		throw new AuthError('سجّل الدخول أولًا من لوحة الإدارة الحالية لإثبات ملكية الموقع.', 401);
	}
	const input = registrationInput(await readJson(request, 'بيانات حساب المدير غير صالحة.'));
	const row = await createUser(env, input, 'admin');
	const now = new Date().toISOString();
	await db.prepare('UPDATE users SET last_login_at = ?, updated_at = ? WHERE id = ?').bind(now, now, row.id).run();
	const accountSession = await createSession(env, row.id);
	await recordMemberAudit({ env, request, targetUserId: row.id, eventType: 'member.admin.bootstrap', metadata: { role: 'admin' } });
	return json(
		{ bootstrapped: true, authenticated: true, user: publicUser(row, true) },
		201,
		{ 'Set-Cookie': sessionCookie(accountSession.token) },
	);
}

async function listUsers(request, env) {
	const actor = await requireRole(request, env, 'moderator');
	const db = await ensureMemberAdminSchema(env);
	const url = new URL(request.url);
	const q = String(url.searchParams.get('q') || '').trim().normalize('NFKC').toLocaleLowerCase('en').slice(0, 80);
	const role = String(url.searchParams.get('role') || '');
	const status = String(url.searchParams.get('status') || '');
	const page = positiveInteger(url.searchParams.get('page'), 1, 100000);
	const limit = positiveInteger(url.searchParams.get('limit'), DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE);
	const clauses = [];
	const bindings = [];

	if (q) {
		if (actor.role === 'admin') {
			clauses.push('(instr(lower(username), ?) > 0 OR instr(lower(email), ?) > 0)');
			bindings.push(q, q);
		} else {
			clauses.push('instr(lower(username), ?) > 0');
			bindings.push(q);
		}
	}
	if (['user', 'moderator', 'admin'].includes(role)) {
		clauses.push('role = ?');
		bindings.push(role);
	}
	if (['active', 'suspended'].includes(status)) {
		clauses.push('status = ?');
		bindings.push(status);
	}

	const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
	const countRow = await preparedFirst(db, `SELECT COUNT(*) AS count FROM users ${where}`, bindings);
	const total = Number(countRow?.count || 0);
	const totalPages = Math.max(1, Math.ceil(total / limit));
	const safePage = Math.min(page, totalPages);
	const offset = (safePage - 1) * limit;
	const rows = await preparedAll(db, `
		SELECT id, username, email, role, status, created_at, updated_at, last_login_at,
			locked_until, status_reason, status_changed_at,
			(SELECT COUNT(*) FROM sessions s WHERE s.user_id = users.id AND s.expires_at > ?) AS active_sessions
		FROM users
		${where}
		ORDER BY created_at DESC
		LIMIT ? OFFSET ?
	`, [new Date().toISOString(), ...bindings, limit, offset]);
	const stats = await db.prepare(`
		SELECT
			COUNT(*) AS total,
			SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) AS active,
			SUM(CASE WHEN status = 'suspended' THEN 1 ELSE 0 END) AS suspended,
			SUM(CASE WHEN role = 'admin' THEN 1 ELSE 0 END) AS admins,
			SUM(CASE WHEN role = 'moderator' THEN 1 ELSE 0 END) AS moderators,
			SUM(CASE WHEN locked_until IS NOT NULL AND locked_until > ? THEN 1 ELSE 0 END) AS locked
		FROM users
	`).bind(new Date().toISOString()).first();
	const includeEmail = actor.role === 'admin';
	return json({
		actor,
		users: (rows.results || []).map((row) => memberView(row, includeEmail)),
		pagination: { page: safePage, limit, total, totalPages },
		stats: {
			total: Number(stats?.total || 0),
			active: Number(stats?.active || 0),
			suspended: Number(stats?.suspended || 0),
			admins: Number(stats?.admins || 0),
			moderators: Number(stats?.moderators || 0),
			locked: Number(stats?.locked || 0),
		},
	});
}

async function auditLog(request, env) {
	await requireRole(request, env, 'admin');
	const db = await ensureMemberAdminSchema(env);
	const url = new URL(request.url);
	const page = positiveInteger(url.searchParams.get('page'), 1, 100000);
	const limit = positiveInteger(url.searchParams.get('limit'), 50, 100);
	const eventType = String(url.searchParams.get('event') || '').trim().slice(0, 80);
	const bindings = [];
	let where = '';
	if (eventType) {
		where = 'WHERE a.event_type = ?';
		bindings.push(eventType);
	}
	const countRow = await preparedFirst(db, `SELECT COUNT(*) AS count FROM member_audit_log a ${where}`, bindings);
	const total = Number(countRow?.count || 0);
	const totalPages = Math.max(1, Math.ceil(total / limit));
	const safePage = Math.min(page, totalPages);
	const offset = (safePage - 1) * limit;
	const result = await preparedAll(db, `
		SELECT a.id, a.occurred_at, a.event_type, a.outcome, a.metadata_json,
			actor.username AS actor_username,
			target.username AS target_username
		FROM member_audit_log a
		LEFT JOIN users actor ON actor.id = a.actor_user_id
		LEFT JOIN users target ON target.id = a.target_user_id
		${where}
		ORDER BY a.id DESC
		LIMIT ? OFFSET ?
	`, [...bindings, limit, offset]);
	const events = (result.results || []).map((row) => {
		let metadata = null;
		try {
			metadata = row.metadata_json ? JSON.parse(row.metadata_json) : null;
		} catch {
			metadata = null;
		}
		return {
			id: row.id,
			occurredAt: row.occurred_at,
			eventType: row.event_type,
			outcome: row.outcome,
			actorUsername: row.actor_username || '',
			targetUsername: row.target_username || '',
			metadata,
		};
	});
	return json({ events, pagination: { page: safePage, limit, total, totalPages } });
}

async function updateRole(request, env) {
	requireSameOriginPost(request);
	const actor = await requireRole(request, env, 'admin');
	const db = await ensureMemberAdminSchema(env);
	const payload = await readJson(request);
	const userId = String(payload?.userId || '');
	const role = String(payload?.role || '');
	if (!userId || !['user', 'moderator', 'admin'].includes(role)) throw new AuthError('بيانات الصلاحية غير صالحة.');
	const target = await db.prepare('SELECT id, username, role FROM users WHERE id = ? LIMIT 1').bind(userId).first();
	if (!target) throw new AuthError('المستخدم غير موجود.', 404);
	if (target.id === actor.id && role !== 'admin') throw new AuthError('لا يمكنك خفض صلاحية حسابك الحالي.', 409);
	if (target.role === 'admin' && role !== 'admin') {
		const admins = await db.prepare("SELECT COUNT(*) AS count FROM users WHERE role = 'admin' AND status = 'active'").first();
		if (Number(admins?.count || 0) <= 1) throw new AuthError('لا يمكن خفض صلاحية آخر مدير نشط.', 409);
	}
	const now = new Date().toISOString();
	await db.prepare('UPDATE users SET role = ?, updated_at = ? WHERE id = ?').bind(role, now, userId).run();
	await recordMemberAudit({
		env,
		request,
		actorUserId: actor.id,
		targetUserId: userId,
		eventType: 'member.role.changed',
		metadata: { oldRole: target.role, newRole: role },
	});
	return json({ updated: true, userId, role });
}

async function updateStatus(request, env) {
	requireSameOriginPost(request);
	const actor = await requireRole(request, env, 'moderator');
	const db = await ensureMemberAdminSchema(env);
	const payload = await readJson(request);
	const userId = String(payload?.userId || '');
	const status = String(payload?.status || '');
	const reason = normalizedReason(payload?.reason);
	if (!userId || !['active', 'suspended'].includes(status)) throw new AuthError('بيانات حالة الحساب غير صالحة.');
	const target = await db.prepare('SELECT id, username, role, status FROM users WHERE id = ? LIMIT 1').bind(userId).first();
	if (!target) throw new AuthError('المستخدم غير موجود.', 404);
	if (target.id === actor.id) throw new AuthError('لا يمكنك تغيير حالة حسابك الحالي.', 409);
	if (actor.role === 'moderator' && target.role !== 'user') throw new AuthError('المشرف يستطيع إدارة المستخدمين العاديين فقط.', 403);
	if (actor.role === 'admin' && target.role === 'admin') throw new AuthError('لا يمكن إيقاف حساب مدير من هذه الواجهة.', 409);
	const now = new Date().toISOString();
	await db.prepare(`
		UPDATE users
		SET status = ?, status_reason = ?, status_changed_at = ?, status_changed_by = ?, updated_at = ?
		WHERE id = ?
	`).bind(status, status === 'suspended' ? reason || null : null, now, actor.id, now, userId).run();
	if (status === 'suspended') await db.prepare('DELETE FROM sessions WHERE user_id = ?').bind(userId).run();
	await recordMemberAudit({
		env,
		request,
		actorUserId: actor.id,
		targetUserId: userId,
		eventType: status === 'suspended' ? 'member.suspended' : 'member.reactivated',
		metadata: { oldStatus: target.status, newStatus: status, ...(reason ? { reason } : {}) },
	});
	return json({ updated: true, userId, status });
}

async function unlockUser(request, env) {
	requireSameOriginPost(request);
	const actor = await requireRole(request, env, 'moderator');
	const db = await ensureMemberAdminSchema(env);
	const payload = await readJson(request);
	const userId = String(payload?.userId || '');
	if (!userId) throw new AuthError('معرّف المستخدم غير صالح.');
	const target = await db.prepare('SELECT id, role, locked_until, failed_login_count FROM users WHERE id = ? LIMIT 1').bind(userId).first();
	if (!target) throw new AuthError('المستخدم غير موجود.', 404);
	if (target.id === actor.id) throw new AuthError('لا تحتاج إلى فتح قفل حسابك الحالي من هذه الواجهة.', 409);
	if (actor.role === 'moderator' && target.role !== 'user') throw new AuthError('المشرف يستطيع إدارة المستخدمين العاديين فقط.', 403);
	if (actor.role === 'admin' && target.role === 'admin') throw new AuthError('لا يمكن تعديل قفل حساب مدير من هذه الواجهة.', 409);
	await db.prepare('UPDATE users SET failed_login_count = 0, locked_until = NULL, updated_at = ? WHERE id = ?')
		.bind(new Date().toISOString(), userId).run();
	await recordMemberAudit({
		env,
		request,
		actorUserId: actor.id,
		targetUserId: userId,
		eventType: 'member.login_lock.cleared',
		metadata: { hadLock: Boolean(target.locked_until), failedLoginCount: Number(target.failed_login_count || 0) },
	});
	return json({ updated: true, userId, unlocked: true });
}

export async function onRequest(context) {
	const { request, env } = context;
	const action = getAction(request);
	try {
		if (action === 'config' && request.method === 'GET') return await config(env);
		if (action === 'session' && request.method === 'GET') return await session(request, env);
		if (action === 'bootstrap-status' && request.method === 'GET') return await bootstrapStatus(env);
		if (action === 'users' && request.method === 'GET') return await listUsers(request, env);
		if (action === 'audit-log' && request.method === 'GET') return await auditLog(request, env);
		if (action === 'register') return await register(request, env);
		if (action === 'login') return await login(request, env);
		if (action === 'logout') return await logout(request, env);
		if (action === 'bootstrap-admin') return await bootstrapAdmin(request, env);
		if (action === 'user-role') return await updateRole(request, env);
		if (action === 'user-status') return await updateStatus(request, env);
		if (action === 'user-unlock') return await unlockUser(request, env);
		return json({ error: 'المسار غير موجود.' }, 404);
	} catch (error) {
		if (error instanceof AuthError) return json({ error: error.message }, error.status);
		console.error('HAKAMIQ auth function failure', error);
		return json({ error: 'حدث خطأ داخلي أثناء معالجة الحساب.' }, 500);
	}
}
