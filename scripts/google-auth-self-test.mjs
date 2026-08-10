import assert from 'node:assert/strict';
import { verifyGoogleIdToken } from '../functions/_lib/google-auth.js';

const encoder = new TextEncoder();
const CLIENT_ID = '1234567890-test.apps.googleusercontent.com';
const KID = 'hakamiq-google-auth-self-test';

function base64Url(bytes) {
	return Buffer.from(bytes).toString('base64url');
}

function jsonPart(value) {
	return Buffer.from(JSON.stringify(value), 'utf8').toString('base64url');
}

async function signToken(privateKey, claims, header = { alg: 'RS256', typ: 'JWT', kid: KID }) {
	const encodedHeader = jsonPart(header);
	const encodedPayload = jsonPart(claims);
	const signingInput = `${encodedHeader}.${encodedPayload}`;
	const signature = await crypto.subtle.sign(
		{ name: 'RSASSA-PKCS1-v1_5' },
		privateKey,
		encoder.encode(signingInput),
	);
	return `${signingInput}.${base64Url(signature)}`;
}

async function expectRejected(promise, expectedStatus) {
	let error = null;
	try {
		await promise;
	} catch (caught) {
		error = caught;
	}
	assert.ok(error, 'Expected Google token verification to reject.');
	assert.equal(error.status, expectedStatus);
}

const keyPair = await crypto.subtle.generateKey(
	{
		name: 'RSASSA-PKCS1-v1_5',
		modulusLength: 2048,
		publicExponent: new Uint8Array([1, 0, 1]),
		hash: 'SHA-256',
	},
	true,
	['sign', 'verify'],
);
const publicJwk = await crypto.subtle.exportKey('jwk', keyPair.publicKey);
const originalFetch = globalThis.fetch;
globalThis.fetch = async (url) => {
	assert.equal(String(url), 'https://www.googleapis.com/oauth2/v3/certs');
	return new Response(JSON.stringify({
		keys: [{ ...publicJwk, kid: KID, alg: 'RS256', use: 'sig' }],
	}), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
			'Cache-Control': 'public, max-age=3600',
		},
	});
};

try {
	const now = Math.floor(Date.now() / 1000);
	const baseClaims = {
		iss: 'https://accounts.google.com',
		aud: CLIENT_ID,
		sub: '109876543210987654321',
		email: 'member@example.com',
		email_verified: true,
		name: 'HAKAMIQ Member',
		iat: now,
		exp: now + 600,
	};
	const env = { GOOGLE_CLIENT_ID: CLIENT_ID };
	const validToken = await signToken(keyPair.privateKey, baseClaims);
	const identity = await verifyGoogleIdToken(validToken, env);
	assert.equal(identity.sub, baseClaims.sub);
	assert.equal(identity.email, baseClaims.email);
	assert.equal(identity.name, baseClaims.name);

	const wrongAudienceToken = await signToken(keyPair.privateKey, { ...baseClaims, aud: '9999999999-other.apps.googleusercontent.com' });
	await expectRejected(verifyGoogleIdToken(wrongAudienceToken, env), 401);

	const expiredToken = await signToken(keyPair.privateKey, { ...baseClaims, exp: now - 600 });
	await expectRejected(verifyGoogleIdToken(expiredToken, env), 401);

	const unverifiedEmailToken = await signToken(keyPair.privateKey, { ...baseClaims, email_verified: false });
	await expectRejected(verifyGoogleIdToken(unverifiedEmailToken, env), 401);

	const tokenParts = validToken.split('.');
	const tamperedSignature = `${tokenParts[0]}.${tokenParts[1]}.${tokenParts[2].slice(0, -1)}${tokenParts[2].endsWith('A') ? 'B' : 'A'}`;
	await expectRejected(verifyGoogleIdToken(tamperedSignature, env), 401);

	console.log('Google identity self-test: PASS');
} finally {
	globalThis.fetch = originalFetch;
}
