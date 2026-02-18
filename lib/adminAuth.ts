"use client";

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/lib/supabase/types';

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
  
  const rpcTimeout = new Promise<{ data: null; error: { message: string } }>((_, reject) =>
    setTimeout(() => reject({ data: null, error: { message: 'RPC timeout' } }), 3000)
  );
  
  const rpcCall = client.rpc('has_role', {
    _user_id: user.id,
    _role: 'admin'
  });
  
  try {
    const { data, error } = await Promise.race([rpcCall, rpcTimeout]);
    
    if (error) {
      console.warn('RPC check failed:', error.message);
      return { isAdmin: false, error: null, userId: user.id, userEmail: user.email ?? null };
    }
    
    return { isAdmin: data === true, error: null, userId: user.id, userEmail: user.email ?? null };
  } catch (err: any) {
    console.warn('Admin check error:', err);
    return { isAdmin: false, error: null, userId: user.id, userEmail: user.email ?? null };
  }
}
