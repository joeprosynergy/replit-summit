"use client";

import { supabase } from '@/lib/supabase/client';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/lib/supabase/types';

export function isBackendAvailable(): boolean {
  return supabase !== null;
}

export function getBackendClient(): SupabaseClient<Database> | null {
  return supabase;
}
