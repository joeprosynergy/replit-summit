-- Migration: user_roles uniqueness
-- Run this in the Supabase SQL Editor (optional but recommended).
--
-- Context: app code upserted into user_roles with onConflict "user_id", but no
-- unique constraint existed, so the upsert errored and admin roles were never
-- granted on approval. The API now uses check-then-insert (works without this
-- migration), but adding a real unique constraint prevents duplicate role rows
-- and makes onConflict upserts safe in the future.

-- 1) Remove any duplicate (user_id, role) rows, keeping one of each pair.
DELETE FROM user_roles a
USING user_roles b
WHERE a.ctid < b.ctid
  AND a.user_id = b.user_id
  AND a.role = b.role;

-- 2) Add a unique constraint on (user_id, role).
DO $$ BEGIN
  ALTER TABLE user_roles
    ADD CONSTRAINT user_roles_user_id_role_key UNIQUE (user_id, role);
EXCEPTION
  WHEN duplicate_table THEN NULL;   -- constraint already exists
  WHEN duplicate_object THEN NULL;
END $$;
