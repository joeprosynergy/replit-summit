import { createClient } from "@supabase/supabase-js";

/**
 * Server-side activity logging for API routes.
 * Uses the service role client to bypass RLS.
 */
export async function logAdminActivityServer(entry: {
  userId: string;
  userEmail?: string;
  action: string;
  pageSlug?: string;
  fieldPath?: string;
  oldValue?: string;
  newValue?: string;
  ipAddress?: string;
  userAgent?: string;
}): Promise<void> {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) return;

    const supabase = createClient(url, key);

    await supabase.from("admin_activity_log").insert({
      user_id: entry.userId,
      user_email: entry.userEmail || null,
      action: entry.action,
      page_slug: entry.pageSlug || null,
      field_path: entry.fieldPath || null,
      old_value: entry.oldValue ? entry.oldValue.substring(0, 5000) : null,
      new_value: entry.newValue ? entry.newValue.substring(0, 5000) : null,
      ip_address: entry.ipAddress || null,
      user_agent: entry.userAgent || null,
    });
  } catch {
    // Silently fail - logging should never break the main flow
  }
}
