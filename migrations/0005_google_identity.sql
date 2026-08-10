PRAGMA foreign_keys = ON;

ALTER TABLE users ADD COLUMN google_subject TEXT;
ALTER TABLE users ADD COLUMN google_linked_at TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS idx_users_google_subject
ON users(google_subject)
WHERE google_subject IS NOT NULL;
