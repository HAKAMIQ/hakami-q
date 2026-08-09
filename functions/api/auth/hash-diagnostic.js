import { hashPassword } from '../../_lib/auth.js';

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

	const started = Date.now();
	try {
		const encoded = await hashPassword('HAKAMIQ-preview-diagnostic-password');
		return json({
			ok: true,
			elapsedMs: Date.now() - started,
			scheme: String(encoded).split('$')[0],
		});
	} catch (error) {
		return json({
			ok: false,
			elapsedMs: Date.now() - started,
			name: String(error?.name || 'Error'),
			message: String(error?.message || error || 'Unknown error').slice(0, 300),
		}, 500);
	}
}
