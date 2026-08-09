import assert from 'node:assert/strict';
import { onRequest } from '../functions/api/auth/_middleware.js';

const now = new Date().toISOString();
const future = new Date(Date.now() + 60 * 60 * 1000).toISOString();
const blockedUntil = new Date(Date.now() + 5 * 60 * 1000).toISOString();

function account(role) {
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

function makeDb({ limitRow = null, sessionUser = null, mfaEnabled = false, mfaVerified = false } = {}) {
	return {
		prepare(sql) {
			return {
				args: [],
				bind(...args) {
					this.args = args;
					return this;
				},
				async first() {
					if (sql.includes('FROM auth_login_limits')) return limitRow;
					if (sql.includes('FROM sessions s') && sql.includes('JOIN users u')) return sessionUser;
					if (sql.includes('SELECT enabled_at FROM mfa_totp')) return mfaEnabled ? { enabled_at: now } : null;
					if (sql.includes('FROM mfa_session_assurance a')) return mfaVerified ? { verified_at: now } : null;
					return null;
				},
				async run() {
					return { success: true, meta: { changes: 1 } };
				},
			};
		},
	};
}

function makeEnv(options = {}) {
	return {
		AUTH_DB: makeDb(options),
		AUTH_PASSWORD_PEPPER: 'ci-account-login-rate-secret-not-for-production-2026',
	};
}

function request(path, { method = 'GET', accountCookie = false, ip = '' } = {}) {
	const headers = new Headers();
	if (accountCookie) headers.set('Cookie', 'hq_session=test-session-token');
	if (ip) headers.set('CF-Connecting-IP', ip);
	if (method === 'POST') {
		headers.set('Origin', 'https://hakami-q.pages.dev');
		headers.set('Content-Type', 'application/json');
	}
	return new Request(`https://hakami-q.pages.dev${path}`, {
		method,
		headers,
		body: method === 'POST' ? '{}' : undefined,
	});
}

{
	let downstreamCalled = false;
	const response = await onRequest({
		request: request('/api/auth/login', { method: 'POST', ip: '203.0.113.25' }),
		env: makeEnv({
			limitRow: { attempts: 0, window_started: now, blocked_until: blockedUntil },
		}),
		next: async () => {
			downstreamCalled = true;
			return new Response('{}', { status: 401 });
		},
	});
	assert.equal(response.status, 429);
	assert.equal(downstreamCalled, false);
	assert.ok(Number(response.headers.get('retry-after')) > 0);
}

{
	let downstreamCalled = false;
	const response = await onRequest({
		request: request('/api/auth/session'),
		env: makeEnv(),
		next: async () => {
			downstreamCalled = true;
			return new Response('{}', { status: 200 });
		},
	});
	assert.equal(response.status, 200);
	assert.equal(downstreamCalled, true);
}

{
	let downstreamCalled = false;
	const response = await onRequest({
		request: request('/api/auth/users'),
		env: makeEnv(),
		next: async () => {
			downstreamCalled = true;
			return new Response('{}', { status: 200 });
		},
	});
	assert.equal(response.status, 401);
	assert.equal(downstreamCalled, false);
}

{
	let downstreamCalled = false;
	const response = await onRequest({
		request: request('/api/auth/users', { accountCookie: true }),
		env: makeEnv({ sessionUser: account('admin'), mfaEnabled: false }),
		next: async () => {
			downstreamCalled = true;
			return new Response('{}', { status: 200 });
		},
	});
	assert.equal(response.status, 403);
	assert.equal(downstreamCalled, false);
	const payload = await response.json();
	assert.equal(payload.mfaSetupRequired, true);
}

{
	let downstreamCalled = false;
	const response = await onRequest({
		request: request('/api/auth/users', { accountCookie: true }),
		env: makeEnv({ sessionUser: account('admin'), mfaEnabled: true, mfaVerified: false }),
		next: async () => {
			downstreamCalled = true;
			return new Response('{}', { status: 200 });
		},
	});
	assert.equal(response.status, 401);
	assert.equal(downstreamCalled, false);
	const payload = await response.json();
	assert.equal(payload.mfaRequired, true);
}

{
	let downstreamCalled = false;
	const response = await onRequest({
		request: request('/api/auth/users', { accountCookie: true }),
		env: makeEnv({ sessionUser: account('moderator'), mfaEnabled: true, mfaVerified: true }),
		next: async () => {
			downstreamCalled = true;
			return new Response('{"users":[]}', { status: 200, headers: { 'Content-Type': 'application/json' } });
		},
	});
	assert.equal(response.status, 200);
	assert.equal(downstreamCalled, true);
}

{
	let downstreamCalled = false;
	const response = await onRequest({
		request: request('/api/auth/user-role', { method: 'POST', accountCookie: true }),
		env: makeEnv({ sessionUser: account('moderator'), mfaEnabled: true, mfaVerified: true }),
		next: async () => {
			downstreamCalled = true;
			return new Response('{}', { status: 200 });
		},
	});
	assert.equal(response.status, 403);
	assert.equal(downstreamCalled, false);
}

{
	let downstreamCalled = false;
	const response = await onRequest({
		request: request('/api/auth/user-role', { method: 'POST', accountCookie: true }),
		env: makeEnv({ sessionUser: account('admin'), mfaEnabled: true, mfaVerified: true }),
		next: async () => {
			downstreamCalled = true;
			return new Response('{}', { status: 200 });
		},
	});
	assert.equal(response.status, 200);
	assert.equal(downstreamCalled, true);
}

console.log('AUTH LOGIN + PRIVILEGED API MIDDLEWARE SELF-TEST: PASS');
