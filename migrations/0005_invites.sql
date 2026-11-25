-- Registration control: open | invite | closed (settings.registration_mode) and invite codes.
-- Codes are 12 characters; only their SHA-256 is stored (shown in full once, at creation).
CREATE TABLE IF NOT EXISTS invite_codes (
  id TEXT PRIMARY KEY,
  code_hash TEXT NOT NULL UNIQUE,
  hint TEXT NOT NULL,              -- first 4 characters, to recognise a code in the list
  label TEXT NOT NULL DEFAULT '',
  max_uses INTEGER NOT NULL DEFAULT 1,
  uses INTEGER NOT NULL DEFAULT 0,
  expires_at INTEGER,
  created_at INTEGER NOT NULL,
  created_by TEXT NOT NULL,
  revoked_at INTEGER
);
-- The invite a sign-in link was requested with, and the invite an account was created with.
ALTER TABLE login_tokens ADD COLUMN invite_id TEXT;
ALTER TABLE users ADD COLUMN invite_id TEXT;
