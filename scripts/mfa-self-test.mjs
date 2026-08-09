import assert from 'node:assert/strict';
import { generateTotpCode, requiresMfaRole } from '../functions/_lib/mfa.js';

const secret = new TextEncoder().encode('12345678901234567890');
const vectors = [
	[59, '94287082'],
	[1111111109, '07081804'],
	[1111111111, '14050471'],
	[1234567890, '89005924'],
	[2000000000, '69279037'],
	[20000000000, '65353130'],
];

for (const [timestamp, expected] of vectors) {
	const actual = await generateTotpCode(secret, timestamp, 8);
	assert.equal(actual, expected, `TOTP mismatch at ${timestamp}`);
}

assert.equal(requiresMfaRole('admin'), true);
assert.equal(requiresMfaRole('moderator'), true);
assert.equal(requiresMfaRole('user'), false);

console.log('MFA RFC SELF-TEST: PASS');
