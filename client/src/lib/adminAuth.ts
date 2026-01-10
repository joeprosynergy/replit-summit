import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

export interface AdminCheckResult {
  isAdmin: boolean;
  error: string | null;
  userId: string | null;
  userEmail: string | null;
}

export async function checkIsAdmin(
  client: SupabaseClient<Database>
): Promise<AdminCheckResult> {
  const { data: { user }, error: userError } = await client.auth.getUser();
  
  if (userError) {
    return { isAdmin: false, error: `Auth error: ${userError.message}`, userId: null, userEmail: null };
  }
  
  if (!user) {
    return { isAdmin: false, error: 'No authenticated user', userId: null, userEmail: null };
  }
  
  const { data, error } = await client.rpc('has_role', {
    _user_id: user.id,
    _role: 'admin'
  });
  
  if (error) {
    console.error('Error checking admin role:', error);
    return { isAdmin: false, error: `RPC error: ${error.message}`, userId: user.id, userEmail: user.email ?? null };
  }
  
  return { isAdmin: data === true, error: null, userId: user.id, userEmail: user.email ?? null };
}

export async function getCurrentUser(client: SupabaseClient<Database>) {
  const { data: { user } } = await client.auth.getUser();
  return user;
}
