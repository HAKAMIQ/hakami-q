import assert from 'node:assert/strict';
import { hashPassword, verifyPassword } from '../functions/_lib/auth.js';

const env = {
	AUTH_PASSWORD_PEPPER: 'ci-only-password-pepper-not-used-by-production-2026',
};
const password = 'HAKAMIQ-ci-password-roundtrip';

const encoded = await hashPassword(password, env);
const parts = encoded.split('$');

assert.equal(parts[0], 'pbkdf2-sha256-hmac-pepper-v1');
assert.equal(parts[1], '100000');
assert.equal(parts.length, 4);
assert.equal(await verifyPassword(password, encoded, env), true);
assert.equal(await verifyPassword(password + '-wrong', encoded, env), false);
assert.equal(await verifyPassword(password, encoded, { AUTH_PASSWORD_PEPPER: env.AUTH_PASSWORD_PEPPER + '-wrong' }), false);

console.log('AUTH PASSWORD SELF-TEST: PASS');
