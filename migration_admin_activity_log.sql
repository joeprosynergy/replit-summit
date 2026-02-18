-- ============================================================================
-- ADMIN ACTIVITY LOG TABLE
-- Run this script in Supabase SQL Editor to create the audit trail table
-- ============================================================================

CREATE TABLE IF NOT EXISTS admin_activity_log (
  id text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id text NOT NULL,
  user_email varchar(255),
  action varchar(50) NOT NULL,
  page_slug varchar(255),
  field_path text,
  old_value text,
  new_value text,
  ip_address varchar(45),
  user_agent text,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_activity_log_user_id ON admin_activity_log(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_log_action ON admin_activity_log(action);
CREATE INDEX IF NOT EXISTS idx_activity_log_created_at ON admin_activity_log(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_log_page_slug ON admin_activity_log(page_slug);

-- RLS: Only admins can read/write the activity log
ALTER TABLE admin_activity_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "activity_log_select_admin" ON admin_activity_log
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id::text = auth.uid()::text
      AND user_roles.role = 'admin'
    )
  );

CREATE POLICY "activity_log_insert_admin" ON admin_activity_log
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id::text = auth.uid()::text
      AND user_roles.role = 'admin'
    )
  );
