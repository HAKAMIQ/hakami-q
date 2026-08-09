import assert from 'node:assert/strict';
import { onRequest as pageMiddleware } from '../functions/admin/_middleware.js';
import { onRequest as apiMiddleware } from '../functions/api/admin/_middleware.js';

const now = new Date().toISOString();
const future = new Date(Date.now() + 60 * 60 * 1000).toISOString();

function makeDb({ admins = 1, sessionUser = null, limitRow = null, mfaEnabled = false, mfaVerified = false } = {}) {
	return {
		prepare(sql) {
			const statement = {
				args: [],
				bind(...args) {
					this.args = args;
					return this;
				},
				async first() {
					if (sql.includes("COUNT(*) AS count FROM users WHERE role = 'admin'")) return { count: admins };
					if (sql.includes('FROM sessions s') && sql.includes('JOIN users u')) return sessionUser;
					if (sql.includes('SELECT enabled_at FROM mfa_totp')) return mfaEnabled ? { enabled_at: now } : null;
					if (sql.includes('FROM mfa_session_assurance a')) return mfaVerified ? { verified_at: now } : null;
					if (sql.includes('FROM legacy_admin_login_limits')) return limitRow;
					return null;
				},
				async run() {
					return { success: true, meta: { changes: 1 } };
				},
			};
			return statement;
		},
	};
}

function makeEnv(options = {}) {
	return {
		AUTH_DB: makeDb(options),
		ADMIN_SESSION_SECRET: 'test-admin-session-secret-which-is-long-enough-2026',
	};
}

function user(role) {
	return {
		id: `${role}-1`,
		username: role,
		email: `${role}@example.test`,
		role,
		status: 'active',
		created_at: now,
		expires_at: future,
	};
}

function request(path, { method = 'GET', accountCookie = false } = {}) {
	const headers = new Headers();
	if (accountCookie) headers.set('Cookie', 'hq_session=test-session-token');
	if (method === 'POST') headers.set('Origin', 'https://hakami-q.pages.dev');
	return new Request(`https://hakami-q.pages.dev${path}`, { method, headers });
}

async function nextOk() {
	return new Response('ok', { status: 200 });
}

{
	const response = await pageMiddleware({ request: request('/admin'), env: makeEnv({ admins: 0 }), next: nextOk });
	assert.equal(response.status, 200, 'legacy bootstrap must remain reachable before first admin');
}

{
	const response = await pageMiddleware({ request: request('/admin'), env: makeEnv({ admins: 1 }), next: nextOk });
	assert.equal(response.status, 302);
	assert.match(response.headers.get('location') || '', /\/login\?next=%2Fadmin/);
}

{
	const response = await pageMiddleware({
		request: request('/admin', { accountCookie: true }),
		env: makeEnv({ admins: 1, sessionUser: user('user') }),
		next: nextOk,
	});
	assert.equal(response.status, 302);
	assert.match(response.headers.get('location') || '', /\/account$/);
}

{
	const response = await pageMiddleware({
		request: request('/admin', { accountCookie: true }),
		env: makeEnv({ admins: 1, sessionUser: user('admin'), mfaEnabled: false }),
		next: nextOk,
	});
	assert.equal(response.status, 302);
	assert.match(response.headers.get('location') || '', /\/account\?security=setup$/);
}

{
	const response = await pageMiddleware({
		request: request('/admin', { accountCookie: true }),
		env: makeEnv({ admins: 1, sessionUser: user('admin'), mfaEnabled: true, mfaVerified: false }),
		next: nextOk,
	});
	assert.equal(response.status, 302);
	assert.match(response.headers.get('location') || '', /\/login\?next=%2Fadmin/);
	assert.match(response.headers.get('set-cookie') || '', /hq_session=/);
}

{
	const response = await pageMiddleware({
		request: request('/admin', { accountCookie: true }),
		env: makeEnv({ admins: 1, sessionUser: user('admin'), mfaEnabled: true, mfaVerified: true }),
		next: nextOk,
	});
	assert.equal(response.status, 200);
	assert.match(response.headers.get('set-cookie') || '', /hq_admin=/);
	assert.equal(response.headers.get('x-frame-options'), 'DENY');
}

{
	const response = await pageMiddleware({
		request: request('/admin/users', { accountCookie: true }),
		env: makeEnv({ admins: 1, sessionUser: user('moderator'), mfaEnabled: true, mfaVerified: true }),
		next: nextOk,
	});
	assert.equal(response.status, 200, 'MFA-verified moderators must retain user-management access');
	assert.doesNotMatch(response.headers.get('set-cookie') || '', /hq_admin=/);
}

{
	const response = await apiMiddleware({
		request: request('/api/admin/login', { method: 'POST' }),
		env: makeEnv({ admins: 1 }),
		next: nextOk,
	});
	assert.equal(response.status, 410, 'legacy password login must retire after bootstrap');
}

{
	const response = await apiMiddleware({
		request: request('/api/admin/session', { accountCookie: true }),
		env: makeEnv({ admins: 1, sessionUser: user('admin'), mfaEnabled: false }),
		next: nextOk,
	});
	assert.equal(response.status, 403);
	const payload = await response.json();
	assert.equal(payload.mfaSetupRequired, true);
}

{
	const response = await apiMiddleware({
		request: request('/api/admin/session', { accountCookie: true }),
		env: makeEnv({ admins: 1, sessionUser: user('admin'), mfaEnabled: true, mfaVerified: true }),
		next: nextOk,
	});
	assert.equal(response.status, 200);
	const payload = await response.json();
	assert.equal(payload.authenticated, true);
	assert.equal(payload.accountAuth, true);
	assert.equal(payload.mfaVerified, true);
	assert.match(response.headers.get('set-cookie') || '', /hq_admin=/);
}

{
	let called = false;
	const response = await apiMiddleware({
		request: request('/api/admin/publish', { method: 'POST', accountCookie: true }),
		env: makeEnv({ admins: 1, sessionUser: user('admin'), mfaEnabled: true, mfaVerified: true }),
		next: async () => {
			called = true;
			return new Response(null, { status: 204 });
		},
	});
	assert.equal(response.status, 204);
	assert.equal(called, true);
}

{
	const response = await apiMiddleware({
		request: request('/api/admin/publish', { method: 'POST', accountCookie: true }),
		env: makeEnv({ admins: 1, sessionUser: user('moderator'), mfaEnabled: true, mfaVerified: true }),
		next: nextOk,
	});
	assert.equal(response.status, 403);
}

{
	const response = await apiMiddleware({
		request: request('/api/admin/logout', { method: 'POST', accountCookie: true }),
		env: makeEnv({ admins: 1, sessionUser: user('admin') }),
		next: nextOk,
	});
	assert.equal(response.status, 200);
	const cookies = response.headers.get('set-cookie') || '';
	assert.match(cookies, /hq_session=/);
	assert.match(cookies, /hq_admin=/);
}

{
	const blockedUntil = new Date(Date.now() + 5 * 60 * 1000).toISOString();
	const response = await apiMiddleware({
		request: request('/api/admin/login', { method: 'POST' }),
		env: makeEnv({ admins: 0, limitRow: { attempts: 0, window_started: now, blocked_until: blockedUntil } }),
		next: nextOk,
	});
	assert.equal(response.status, 429);
	assert.ok(Number(response.headers.get('retry-after')) > 0);
}

console.log('ADMIN ACCOUNT CUTOVER SELF-TEST: PASS');
