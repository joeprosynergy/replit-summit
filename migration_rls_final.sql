-- ============================================================================
-- FINAL RLS CONFIGURATION FOR SUMMIT BUILDINGS
-- Run this script in Supabase SQL Editor to ensure proper security
-- ============================================================================

-- STEP 1: Drop all existing policies to start clean
-- ============================================================================

-- Disable RLS temporarily
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles DISABLE ROW LEVEL SECURITY;

-- Drop ALL policies on profiles (catches any naming variation)
DO $$ 
DECLARE r RECORD;
BEGIN
    FOR r IN SELECT policyname FROM pg_policies WHERE tablename = 'profiles' LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON profiles';
    END LOOP;
END $$;

-- Drop ALL policies on user_roles (catches any naming variation)
DO $$ 
DECLARE r RECORD;
BEGIN
    FOR r IN SELECT policyname FROM pg_policies WHERE tablename = 'user_roles' LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON user_roles';
    END LOOP;
END $$;

-- STEP 2: Re-enable RLS
-- ============================================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- STEP 3: Create policies for PROFILES table
-- ============================================================================

-- Users can view their own profile
CREATE POLICY "profiles_select_own" ON profiles
  FOR SELECT USING (user_id::text = auth.uid()::text);

-- Users can insert their own profile (for signup)
CREATE POLICY "profiles_insert_own" ON profiles
  FOR INSERT WITH CHECK (user_id::text = auth.uid()::text);

-- Users can update their own profile (for display name changes etc.)
CREATE POLICY "profiles_update_own" ON profiles
  FOR UPDATE USING (user_id::text = auth.uid()::text);

-- Admins can view ALL profiles (for user management page)
CREATE POLICY "profiles_select_admin" ON profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_roles.user_id::text = auth.uid()::text 
      AND user_roles.role = 'admin'
    )
  );

-- Admins can update ALL profiles (for approve/reject)
CREATE POLICY "profiles_update_admin" ON profiles
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_roles.user_id::text = auth.uid()::text 
      AND user_roles.role = 'admin'
    )
  );

-- STEP 4: Create policies for USER_ROLES table
-- ============================================================================

-- Users can view their own roles
CREATE POLICY "roles_select_own" ON user_roles
  FOR SELECT USING (user_id::text = auth.uid()::text);

-- Admins can view ALL roles
CREATE POLICY "roles_select_admin" ON user_roles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      WHERE ur.user_id::text = auth.uid()::text 
      AND ur.role = 'admin'
    )
  );

-- Admins can insert roles (when approving users)
CREATE POLICY "roles_insert_admin" ON user_roles
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_roles.user_id::text = auth.uid()::text 
      AND user_roles.role = 'admin'
    )
  );

-- Admins can update roles
CREATE POLICY "roles_update_admin" ON user_roles
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_roles.user_id::text = auth.uid()::text 
      AND user_roles.role = 'admin'
    )
  );

-- STEP 5: Ensure super admin has admin role
-- ============================================================================

-- Get Joe's user_id from profiles if exists
INSERT INTO user_roles (user_id, role)
SELECT p.user_id, 'admin'
FROM profiles p
WHERE p.email = 'joe@summitbuildings.com'
ON CONFLICT (user_id) DO NOTHING;

-- If Joe doesn't have a profile yet, get from auth.users
INSERT INTO user_roles (user_id, role)
SELECT au.id::text, 'admin'
FROM auth.users au
WHERE au.email = 'joe@summitbuildings.com'
  AND NOT EXISTS (SELECT 1 FROM user_roles ur WHERE ur.user_id::text = au.id::text)
ON CONFLICT (user_id) DO NOTHING;

-- STEP 6: Verify the configuration
-- ============================================================================

SELECT '=== RLS ENABLED STATUS ===' as section;
SELECT relname as table_name, relrowsecurity as rls_enabled
FROM pg_class
WHERE relname IN ('profiles', 'user_roles');

SELECT '=== POLICIES CREATED ===' as section;
SELECT tablename, policyname, cmd 
FROM pg_policies 
WHERE tablename IN ('profiles', 'user_roles')
ORDER BY tablename, policyname;

SELECT '=== SUPER ADMIN STATUS ===' as section;
SELECT p.email, p.approval_status, ur.role
FROM profiles p
LEFT JOIN user_roles ur ON ur.user_id = p.user_id
WHERE p.email = 'joe@summitbuildings.com';
