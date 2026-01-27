-- Create test admin profile
-- Replace 'YOUR_USER_UUID_HERE' with the UUID from the user you just created

INSERT INTO profiles (user_id, email, display_name, approval_status, created_at, updated_at)
VALUES (
  'YOUR_USER_UUID_HERE',  -- Replace this with the actual UUID
  'testadmin@example.com',
  'Test Admin',
  'approved',
  NOW(),
  NOW()
);

-- Verify it was created:
SELECT * FROM profiles WHERE email = 'testadmin@example.com';
