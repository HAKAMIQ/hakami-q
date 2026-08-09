CREATE TABLE IF NOT EXISTS legacy_admin_login_limits (
    client_key TEXT PRIMARY KEY,
    attempts INTEGER NOT NULL DEFAULT 0,
    window_started TEXT NOT NULL,
    blocked_until TEXT,
    updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_legacy_admin_login_limits_updated_at
    ON legacy_admin_login_limits(updated_at);
