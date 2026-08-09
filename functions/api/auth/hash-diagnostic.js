import { hashPassword, verifyPassword } from '../../_lib/auth.js';

const PREVIEW_TEST_SITEKEY = '1x00000000000000000000AA';

function json(payload, status = 200) {
	return new Response(JSON.stringify(payload), {
		status,
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			'Cache-Control': 'no-store, private',
			'X-Content-Type-Options': 'nosniff',
		},
	});
}

export async function onRequestGet({ env }) {
	if (env.TURNSTILE_SITEKEY !== PREVIEW_TEST_SITEKEY) {
		return json({ error: 'Not found.' }, 404);
	}

	const password = 'HAKAMIQ-preview-diagnostic-password';
	const started = Date.now();
	try {
		const encoded = await hashPassword(password, env);
		const valid = await verifyPassword(password, encoded, env);
		const invalid = await verifyPassword(password + '-wrong', encoded, env);
		const scheme = String(encoded).split('$')[0];
		const iterations = Number(String(encoded).split('$')[1]);
		const ok = valid === true && invalid === false && scheme === 'pbkdf2-sha256-hmac-pepper-v1' && iterations === 100000;
		return json({ ok, elapsedMs: Date.now() - started, valid, invalid, scheme, iterations }, ok ? 200 : 500);
	} catch (error) {
		return json({
			ok: false,
			elapsedMs: Date.now() - started,
			name: String(error?.name || 'Error'),
			message: String(error?.message || error || 'Unknown error').slice(0, 300),
		}, 500);
	}
}
