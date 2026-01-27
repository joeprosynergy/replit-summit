-- Run this SQL in your Supabase SQL Editor to add a test admin
-- Replace 'your-test-email@example.com' with an email you have access to

-- First, you'll need to create the auth user via Supabase Dashboard:
-- 1. Go to Authentication → Users → Add User
-- 2. Enter: testadmin@example.com (or any email)
-- 3. Set a password or use auto-generated
-- 4. Copy the User ID after creation

-- Then run this to make them an admin:
-- UPDATE profiles 
-- SET approval_status = 'approved'
-- WHERE user_id = 'PASTE_USER_ID_HERE';

-- Check all profiles:
SELECT user_id, email, approval_status FROM profiles;
