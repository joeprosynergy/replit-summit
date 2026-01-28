-- ============================================================================
-- RLS POLICIES FOR CONTENT TABLES
-- Run this script in Supabase SQL Editor to secure page_content and section_content
-- ============================================================================

-- STEP 1: Enable RLS on content tables
-- ============================================================================

ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE section_content ENABLE ROW LEVEL SECURITY;

-- STEP 2: Drop any existing policies (clean slate)
-- ============================================================================

DO $$ 
DECLARE r RECORD;
BEGIN
    FOR r IN SELECT policyname FROM pg_policies WHERE tablename = 'page_content' LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON page_content';
    END LOOP;
END $$;

DO $$ 
DECLARE r RECORD;
BEGIN
    FOR r IN SELECT policyname FROM pg_policies WHERE tablename = 'section_content' LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON section_content';
    END LOOP;
END $$;

-- STEP 3: Create policies for PAGE_CONTENT table
-- ============================================================================

-- Anyone can read page content (public website)
CREATE POLICY "page_content_select_public" ON page_content
  FOR SELECT USING (true);

-- Only admins can insert page content
CREATE POLICY "page_content_insert_admin" ON page_content
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_roles.user_id::text = auth.uid()::text 
      AND user_roles.role = 'admin'
    )
  );

-- Only admins can update page content
CREATE POLICY "page_content_update_admin" ON page_content
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_roles.user_id::text = auth.uid()::text 
      AND user_roles.role = 'admin'
    )
  );

-- Only admins can delete page content
CREATE POLICY "page_content_delete_admin" ON page_content
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_roles.user_id::text = auth.uid()::text 
      AND user_roles.role = 'admin'
    )
  );

-- STEP 4: Create policies for SECTION_CONTENT table
-- ============================================================================

-- Anyone can read section content (public website)
CREATE POLICY "section_content_select_public" ON section_content
  FOR SELECT USING (true);

-- Only admins can insert section content
CREATE POLICY "section_content_insert_admin" ON section_content
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_roles.user_id::text = auth.uid()::text 
      AND user_roles.role = 'admin'
    )
  );

-- Only admins can update section content
CREATE POLICY "section_content_update_admin" ON section_content
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_roles.user_id::text = auth.uid()::text 
      AND user_roles.role = 'admin'
    )
  );

-- Only admins can delete section content
CREATE POLICY "section_content_delete_admin" ON section_content
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_roles.user_id::text = auth.uid()::text 
      AND user_roles.role = 'admin'
    )
  );

-- STEP 5: Verify the configuration
-- ============================================================================

SELECT '=== RLS ENABLED STATUS ===' as section;
SELECT relname as table_name, relrowsecurity as rls_enabled
FROM pg_class
WHERE relname IN ('page_content', 'section_content');

SELECT '=== POLICIES CREATED ===' as section;
SELECT tablename, policyname, cmd 
FROM pg_policies 
WHERE tablename IN ('page_content', 'section_content')
ORDER BY tablename, policyname;
