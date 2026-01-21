-- Migration: User Approval System
-- This adds approval_status to profiles table for user management

-- Add approval_status enum type
DO $$ BEGIN
  CREATE TYPE user_approval_status AS ENUM ('pending', 'approved', 'rejected');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Add approval_status column to profiles table
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS approval_status user_approval_status DEFAULT 'pending';

-- Add approved_by column to track who approved the user
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS approved_by text;

-- Add approved_at timestamp
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS approved_at timestamp with time zone;

-- Add display_name for friendly user display
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS display_name varchar(255);

-- Ensure joe@summitbuildings.com is always approved (run this after any user with this email exists)
-- This will auto-approve joe if he exists in profiles
UPDATE profiles 
SET approval_status = 'approved', 
    approved_at = NOW()
WHERE email = 'joe@summitbuildings.com' 
  AND (approval_status IS NULL OR approval_status != 'approved');

-- Create an index for faster lookups by approval_status
CREATE INDEX IF NOT EXISTS idx_profiles_approval_status ON profiles(approval_status);

-- Create a function to auto-approve joe@summitbuildings.com on insert
CREATE OR REPLACE FUNCTION auto_approve_super_admin()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.email = 'joe@summitbuildings.com' THEN
    NEW.approval_status := 'approved';
    NEW.approved_at := NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-approve joe on insert
DROP TRIGGER IF EXISTS trigger_auto_approve_super_admin ON profiles;
CREATE TRIGGER trigger_auto_approve_super_admin
  BEFORE INSERT ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION auto_approve_super_admin();

-- Ensure joe has admin role in user_roles (if profile exists)
INSERT INTO user_roles (user_id, role)
SELECT p.user_id, 'admin'::app_role
FROM profiles p
WHERE p.email = 'joe@summitbuildings.com'
  AND NOT EXISTS (
    SELECT 1 FROM user_roles ur 
    WHERE ur.user_id = p.user_id AND ur.role = 'admin'
  );
