import assert from 'node:assert/strict';
import { onRequest } from '../functions/api/auth/_middleware.js';

const blockedUntil = new Date(Date.now() + 5 * 60 * 1000).toISOString();

function makeDb(limitRow) {
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
					return null;
				},
				async run() {
					return { success: true, meta: { changes: 1 } };
				},
			};
		},
	};
}

const env = {
	AUTH_DB: makeDb({
		attempts: 0,
		window_started: new Date().toISOString(),
		blocked_until: blockedUntil,
	}),
	AUTH_PASSWORD_PEPPER: 'ci-account-login-rate-secret-not-for-production-2026',
};

{
	let downstreamCalled = false;
	const request = new Request('https://hakami-q.pages.dev/api/auth/login', {
		method: 'POST',
		headers: {
			Origin: 'https://hakami-q.pages.dev',
			'CF-Connecting-IP': '203.0.113.25',
			'Content-Type': 'application/json',
		},
		body: '{}',
	});
	const response = await onRequest({
		request,
		env,
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
	const request = new Request('https://hakami-q.pages.dev/api/auth/session');
	const response = await onRequest({
		request,
		env,
		next: async () => {
			downstreamCalled = true;
			return new Response('{}', { status: 200 });
		},
	});
	assert.equal(response.status, 200);
	assert.equal(downstreamCalled, true);
}

console.log('AUTH LOGIN MIDDLEWARE SELF-TEST: PASS');
