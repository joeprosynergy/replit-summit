"use client";

import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const supabase =
  SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY
    ? createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
        auth: {
          storage: typeof window !== "undefined" ? localStorage : undefined,
          persistSession: true,
          autoRefreshToken: true,
          // implicit flow is required for magic links that open in a different browser/device.
          // PKCE requires the same browser session. Switch to PKCE only after
          // verifying magic-link login still works in the target Supabase version.
          flowType: "implicit",
        },
      })
    : null;

if (typeof window !== "undefined" && supabase) {
  supabase
    .from("profiles")
    .select("user_id")
    .limit(1)
    .maybeSingle()
    .then(() => {}, () => {});
}
