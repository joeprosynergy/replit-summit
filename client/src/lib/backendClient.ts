import { supabase } from '@/integrations/supabase/client';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

export function isBackendAvailable(): boolean {
  return supabase !== null;
}

export function getBackendClient(): SupabaseClient<Database> | null {
  return supabase;
}
