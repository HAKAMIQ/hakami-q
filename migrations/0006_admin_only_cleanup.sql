PRAGMA foreign_keys = ON;

-- HAKAMIQ is now an admin-only authenticated application.
-- Purge all non-admin accounts and their active sessions when this migration is applied.
DELETE FROM sessions
WHERE user_id IN (SELECT id FROM users WHERE role <> 'admin');

DELETE FROM users
WHERE role <> 'admin';

-- The public member registry/audit subsystem is no longer part of the application.
DROP TABLE IF EXISTS member_audit_log;

-- Remove stale MFA challenges that no longer point at an existing admin account.
DELETE FROM mfa_login_challenges
WHERE user_id NOT IN (SELECT id FROM users WHERE role = 'admin');
DELETE FROM mfa_totp_pending
WHERE user_id NOT IN (SELECT id FROM users WHERE role = 'admin');
DELETE FROM mfa_totp
WHERE user_id NOT IN (SELECT id FROM users WHERE role = 'admin');
DELETE FROM mfa_recovery_codes
WHERE user_id NOT IN (SELECT id FROM users WHERE role = 'admin');
