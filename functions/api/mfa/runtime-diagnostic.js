import { createSession, requireAuthDb } from '../../_lib/auth.js';
import {
	confirmTotpSetup,
	createMfaLoginChallenge,
	ensureMfaSchema,
	generateTotpCode,
	mfaStatus,
	startTotpSetup,
	verifyMfaCode,
	verifyMfaLoginChallenge,
} from '../../_lib/mfa.js';
import {
	isSessionMfaVerified,
	markSessionMfaVerified,
	revokeAccountSessionToken,
} from '../../_lib/mfa-session.js';

const PREVIEW_TEST_SITEKEY = '1x00000000000000000000AA';
const BASE32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

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

function base32Decode(value) {
	let bits = 0;
	let buffer = 0;
	const bytes = [];
	for (const character of String(value).replace(/=+$/g, '').toUpperCase()) {
		const index = BASE32.indexOf(character);
		if (index < 0) throw new Error('Invalid Base32 diagnostic secret.');
		buffer = (buffer << 5) | index;
		bits += 5;
		if (bits >= 8) {
			bytes.push((buffer >>> (bits - 8)) & 0xff);
			bits -= 8;
		}
	}
	return new Uint8Array(bytes);
}

async function cleanup(db, userId) {
	for (const statement of [
		'DELETE FROM mfa_session_assurance WHERE token_hash IN (SELECT token_hash FROM sessions WHERE user_id = ?)',
		'DELETE FROM sessions WHERE user_id = ?',
		'DELETE FROM mfa_login_challenges WHERE user_id = ?',
		'DELETE FROM mfa_recovery_codes WHERE user_id = ?',
		'DELETE FROM mfa_totp_pending WHERE user_id = ?',
		'DELETE FROM mfa_totp WHERE user_id = ?',
		'DELETE FROM users WHERE id = ?',
	]) {
		try {
			await db.prepare(statement).bind(userId).run();
		} catch {
			// Preview-only cleanup is best-effort; the next statement can still remove parent data.
		}
	}
}

export async function onRequestGet({ env }) {
	if (env.TURNSTILE_SITEKEY !== PREVIEW_TEST_SITEKEY) return json({ error: 'Not found.' }, 404);
	const db = requireAuthDb(env);
	const suffix = crypto.randomUUID().replace(/-/g, '').slice(0, 12);
	const userId = `mfa-diagnostic-${suffix}`;
	const now = new Date().toISOString();
	const started = Date.now();

	try {
		await ensureMfaSchema(env);
		await db.prepare(`
			INSERT INTO users (
				id, username, username_key, email, email_key, password_hash,
				role, status, failed_login_count, created_at, updated_at
			) VALUES (?, ?, ?, ?, ?, ?, 'admin', 'active', 0, ?, ?)
		`).bind(
			userId,
			`mfa_diag_${suffix}`,
			`mfa_diag_${suffix}`,
			`mfa_diag_${suffix}@example.test`,
			`mfa_diag_${suffix}@example.test`,
			'diagnostic-not-for-login',
			now,
			now,
		).run();

		const user = {
			id: userId,
			username: `mfa_diag_${suffix}`,
			email: `mfa_diag_${suffix}@example.test`,
			role: 'admin',
			status: 'active',
			createdAt: now,
		};
		const setup = await startTotpSetup(env, user);
		const secretBytes = base32Decode(setup.secret);
		const setupCode = await generateTotpCode(secretBytes);
		const confirmed = await confirmTotpSetup(env, user, setupCode);
		const status = await mfaStatus(env, userId);
		if (!confirmed.enabled || !status.enabled || confirmed.recoveryCodes.length !== 10) {
			throw new Error('MFA enrollment verification failed.');
		}

		const recoveryFirst = await verifyMfaCode(env, userId, confirmed.recoveryCodes[0]);
		const recoveryReplay = await verifyMfaCode(env, userId, confirmed.recoveryCodes[0]);
		if (!recoveryFirst || recoveryReplay) throw new Error('Recovery-code single-use check failed.');

		const challenge = await createMfaLoginChallenge(env, userId);
		const nextWindowCode = await generateTotpCode(secretBytes, Math.floor(Date.now() / 1000) + 30);
		const challengedUser = await verifyMfaLoginChallenge(env, challenge.token, nextWindowCode);
		if (challengedUser.id !== userId) throw new Error('MFA challenge user mismatch.');

		const session = await createSession(env, userId);
		await markSessionMfaVerified(env, session.token);
		const assured = await isSessionMfaVerified(env, session.token);
		if (!assured) throw new Error('MFA session assurance check failed.');
		await revokeAccountSessionToken(env, session.token);
		const assuredAfterRevoke = await isSessionMfaVerified(env, session.token);
		if (assuredAfterRevoke) throw new Error('Revoked session retained MFA assurance.');

		return json({
			ok: true,
			elapsedMs: Date.now() - started,
			totpEnabled: status.enabled,
			recoverySingleUse: recoveryFirst && !recoveryReplay,
			challengeVerified: challengedUser.id === userId,
			sessionAssurance: assured && !assuredAfterRevoke,
		});
	} catch (error) {
		return json({
			ok: false,
			elapsedMs: Date.now() - started,
			name: String(error?.name || 'Error'),
			message: String(error?.message || error || 'Unknown error').slice(0, 300),
		}, 500);
	} finally {
		await cleanup(db, userId);
	}
}
