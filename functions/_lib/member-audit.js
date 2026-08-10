import { requireAuthDb } from './auth.js';

const encoder = new TextEncoder();
const schemaReadyDatabases = new WeakSet();
const AUDIT_RETENTION_DAYS = 180;
const MAX_METADATA_BYTES = 2048;

function secretMaterial(env) {
	const secret = String(env.AUTH_PASSWORD_PEPPER || env.ADMIN_SESSION_SECRET || '');
	return secret.length >= 32 ? secret : '';
}

function bytesToBase64Url(bytes) {
	let binary = '';
	for (const byte of new Uint8Array(bytes)) binary += String.fromCharCode(byte);
	return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

async function hmac(secret, value) {
	const key = await crypto.subtle.importKey(
		'raw',
		encoder.encode(secret),
		{ name: 'HMAC', hash: 'SHA-256' },
		false,
		['sign'],
	);
	return bytesToBase64Url(await crypto.subtle.sign('HMAC', key, encoder.encode(value)));
}

async function ensureUserColumns(db) {
	const result = await db.prepare('PRAGMA table_info(users)').all();
	const columns = new Set((result.results || []).map((row) => String(row.name || '')));
	const additions = [
		['last_login_at', 'TEXT'],
		['status_reason', 'TEXT'],
		['status_changed_at', 'TEXT'],
		['status_changed_by', 'TEXT'],
	];
	for (const [name, type] of additions) {
		if (!columns.has(name)) await db.prepare(`ALTER TABLE users ADD COLUMN ${name} ${type}`).run();
	}
}

export async function ensureMemberAdminSchema(env) {
	const db = requireAuthDb(env);
	if (schemaReadyDatabases.has(db)) return db;
	await ensureUserColumns(db);
	await db.prepare(`
		CREATE TABLE IF NOT EXISTS member_audit_log (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			occurred_at TEXT NOT NULL,
			actor_user_id TEXT,
			target_user_id TEXT,
			event_type TEXT NOT NULL,
			outcome TEXT NOT NULL CHECK (outcome IN ('success', 'failure')),
			client_key TEXT,
			metadata_json TEXT
		)
	`).run();
	await db.prepare('CREATE INDEX IF NOT EXISTS idx_member_audit_time ON member_audit_log(occurred_at)').run();
	await db.prepare('CREATE INDEX IF NOT EXISTS idx_member_audit_actor ON member_audit_log(actor_user_id, occurred_at)').run();
	await db.prepare('CREATE INDEX IF NOT EXISTS idx_member_audit_target ON member_audit_log(target_user_id, occurred_at)').run();
	await db.prepare('CREATE INDEX IF NOT EXISTS idx_member_audit_event ON member_audit_log(event_type, occurred_at)').run();
	schemaReadyDatabases.add(db);
	return db;
}

async function clientKey(request, env) {
	if (!request) return null;
	const ip = String(request.headers.get('CF-Connecting-IP') || '').trim();
	const secret = secretMaterial(env);
	if (!ip || !secret) return null;
	return hmac(secret, `member-audit-ip-v1\0${ip}`);
}

function safeMetadata(metadata) {
	if (!metadata || typeof metadata !== 'object') return null;
	let text;
	try {
		text = JSON.stringify(metadata);
	} catch {
		return null;
	}
	if (!text || encoder.encode(text).byteLength > MAX_METADATA_BYTES) return null;
	return text;
}

export async function recordMemberAudit({
	env,
	request = null,
	actorUserId = null,
	targetUserId = null,
	eventType,
	outcome = 'success',
	metadata = null,
}) {
	if (!eventType) return;
	try {
		const db = await ensureMemberAdminSchema(env);
		const now = new Date();
		await db.prepare(`
			INSERT INTO member_audit_log (
				occurred_at, actor_user_id, target_user_id, event_type, outcome, client_key, metadata_json
			) VALUES (?, ?, ?, ?, ?, ?, ?)
		`).bind(
			now.toISOString(),
			actorUserId || null,
			targetUserId || null,
			String(eventType).slice(0, 80),
			outcome === 'failure' ? 'failure' : 'success',
			await clientKey(request, env),
			safeMetadata(metadata),
		).run();
		const cutoff = new Date(now.getTime() - AUDIT_RETENTION_DAYS * 24 * 60 * 60 * 1000).toISOString();
		await db.prepare('DELETE FROM member_audit_log WHERE occurred_at < ?').bind(cutoff).run();
	} catch (error) {
		console.error('member audit write failed', error);
	}
}
