const PREVIEW_TEST_SITEKEY = '1x00000000000000000000AA';
const encoder = new TextEncoder();

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

async function derive(iterations) {
	const password = encoder.encode('HAKAMIQ-preview-diagnostic-password');
	const salt = new Uint8Array(16);
	crypto.getRandomValues(salt);
	const key = await crypto.subtle.importKey('raw', password, 'PBKDF2', false, ['deriveBits']);
	return crypto.subtle.deriveBits(
		{ name: 'PBKDF2', hash: 'SHA-256', salt, iterations },
		key,
		256,
	);
}

export async function onRequestGet({ env }) {
	if (env.TURNSTILE_SITEKEY !== PREVIEW_TEST_SITEKEY) {
		return json({ error: 'Not found.' }, 404);
	}

	const results = [];
	for (const iterations of [100000]) {
		const started = Date.now();
		try {
			const derived = await derive(iterations);
			results.push({ iterations, ok: true, elapsedMs: Date.now() - started, bytes: derived.byteLength });
		} catch (error) {
			results.push({
				iterations,
				ok: false,
				elapsedMs: Date.now() - started,
				name: String(error?.name || 'Error'),
				message: String(error?.message || error || 'Unknown error').slice(0, 300),
			});
		}
	}

	return json({ ok: results.every((item) => item.ok), results }, results.every((item) => item.ok) ? 200 : 500);
}
