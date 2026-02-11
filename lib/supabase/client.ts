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
          // Use implicit flow for magic links - works across browsers/devices
          // PKCE requires the same browser session which breaks email magic links
          flowType: "implicit",
        },
      })
    : null;

// Pre-warm the database connection to avoid cold-start timeout on first query
// This runs immediately when the app loads
if (typeof window !== "undefined" && supabase) {
  console.log("[Supabase] Pre-warming database connection...");
  supabase
    .from("profiles")
    .select("user_id")
    .limit(1)
    .maybeSingle()
    .then(() => {
      console.log("[Supabase] Database connection warmed up successfully");
    })
    .catch((err) => {
      console.warn(
        "[Supabase] Warm-up query failed (this is usually OK):",
        err?.message
      );
    });
}
