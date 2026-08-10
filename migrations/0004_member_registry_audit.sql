PRAGMA foreign_keys = ON;

ALTER TABLE users ADD COLUMN last_login_at TEXT;
ALTER TABLE users ADD COLUMN status_reason TEXT;
ALTER TABLE users ADD COLUMN status_changed_at TEXT;
ALTER TABLE users ADD COLUMN status_changed_by TEXT;

CREATE TABLE IF NOT EXISTS member_audit_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    occurred_at TEXT NOT NULL,
    actor_user_id TEXT,
    target_user_id TEXT,
    event_type TEXT NOT NULL,
    outcome TEXT NOT NULL CHECK (outcome IN ('success', 'failure')),
    client_key TEXT,
    metadata_json TEXT
);

CREATE INDEX IF NOT EXISTS idx_member_audit_time ON member_audit_log(occurred_at);
CREATE INDEX IF NOT EXISTS idx_member_audit_actor ON member_audit_log(actor_user_id, occurred_at);
CREATE INDEX IF NOT EXISTS idx_member_audit_target ON member_audit_log(target_user_id, occurred_at);
CREATE INDEX IF NOT EXISTS idx_member_audit_event ON member_audit_log(event_type, occurred_at);
