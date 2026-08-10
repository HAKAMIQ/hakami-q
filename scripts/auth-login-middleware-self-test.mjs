import assert from 'node:assert/strict';
import { onRequest } from '../functions/api/auth/_middleware.js';

const now = new Date().toISOString();
const blockedUntil = new Date(Date.now() + 5 * 60 * 1000).toISOString();

function makeDb({ limitRow = null } = {}) {
	return {
		prepare(sql) {
			return {
				args: [],
				bind(...args) { this.args = args; return this; },
				async first() {
					if (sql.includes('FROM auth_login_limits')) return limitRow;
					return null;
				},
				async run() { return { success: true, meta: { changes: 1 } }; },
			};
		},
	};
}

function makeEnv(options = {}) {
	return { AUTH_DB: makeDb(options), AUTH_PASSWORD_PEPPER: 'ci-admin-login-rate-secret-not-for-production-2026' };
}

function request(path, { method = 'GET', ip = '' } = {}) {
	const headers = new Headers();
	if (ip) headers.set('CF-Connecting-IP', ip);
	if (method === 'POST') {
		headers.set('Origin', 'https://hakami-q.pages.dev');
		headers.set('Content-Type', 'application/json');
	}
	return new Request(`https://hakami-q.pages.dev${path}`, { method, headers, body: method === 'POST' ? '{}' : undefined });
}

{
	let downstreamCalled = false;
	const response = await onRequest({
		request: request('/api/auth/login', { method: 'POST', ip: '203.0.113.25' }),
		env: makeEnv({ limitRow: { attempts: 0, window_started: now, blocked_until: blockedUntil } }),
		next: async () => { downstreamCalled = true; return new Response('{}', { status: 401 }); },
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
		next: async () => { downstreamCalled = true; return new Response('{"authenticated":false}', { status: 200 }); },
	});
	assert.equal(response.status, 200);
	assert.equal(downstreamCalled, true);
}

{
	let downstreamCalled = false;
	const response = await onRequest({
		request: request('/api/auth/users'),
		env: makeEnv(),
		next: async () => { downstreamCalled = true; return new Response('{"error":"المسار غير موجود."}', { status: 404 }); },
	});
	assert.equal(response.status, 404);
	assert.equal(downstreamCalled, true);
}

console.log('ADMIN LOGIN MIDDLEWARE SELF-TEST: PASS');
