CREATE TABLE IF NOT EXISTS mfa_totp (
    user_id TEXT PRIMARY KEY,
    secret_ciphertext TEXT NOT NULL,
    secret_nonce TEXT NOT NULL,
    last_used_step INTEGER,
    enabled_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS mfa_totp_pending (
    user_id TEXT PRIMARY KEY,
    secret_ciphertext TEXT NOT NULL,
    secret_nonce TEXT NOT NULL,
    expires_at TEXT NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS mfa_login_challenges (
    token_hash TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    expires_at TEXT NOT NULL,
    attempts INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS mfa_recovery_codes (
    user_id TEXT NOT NULL,
    code_hash TEXT NOT NULL,
    used_at TEXT,
    created_at TEXT NOT NULL,
    PRIMARY KEY (user_id, code_hash),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS mfa_session_assurance (
    token_hash TEXT PRIMARY KEY,
    verified_at TEXT NOT NULL,
    FOREIGN KEY (token_hash) REFERENCES sessions(token_hash) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_mfa_login_challenges_expires_at
    ON mfa_login_challenges(expires_at);

CREATE INDEX IF NOT EXISTS idx_mfa_recovery_codes_user_unused
    ON mfa_recovery_codes(user_id, used_at);
