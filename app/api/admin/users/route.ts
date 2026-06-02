import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { verifyAdminAuth, isAuthError } from "@/lib/api-auth";
import { logAdminActivityServer } from "@/lib/adminActivityLogServer";

function getSupabaseAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

const SUPER_ADMIN_EMAIL = process.env.SUPER_ADMIN_EMAIL || "";

export async function GET(req: NextRequest) {
  const authResult = await verifyAdminAuth(req);
  if (isAuthError(authResult)) return authResult;

  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: "Database not configured" }, { status: 500 });
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }

  const users = (data || []).map((u: any) => ({
    ...u,
    is_super_admin: u.email === SUPER_ADMIN_EMAIL,
  }));

  return NextResponse.json({ users });
}

export async function PATCH(req: NextRequest) {
  const authResult = await verifyAdminAuth(req);
  if (isAuthError(authResult)) return authResult;

  let body: { profileId?: string; action?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { profileId, action } = body;

  if (!profileId || typeof profileId !== "string") {
    return NextResponse.json({ error: "profileId is required" }, { status: 400 });
  }
  if (action !== "approve" && action !== "reject") {
    return NextResponse.json({ error: "action must be 'approve' or 'reject'" }, { status: 400 });
  }

  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: "Database not configured" }, { status: 500 });
  }

  const { data: targetProfile, error: fetchError } = await supabase
    .from("profiles")
    .select("id, user_id, email")
    .eq("id", profileId)
    .maybeSingle();

  if (fetchError || !targetProfile) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (targetProfile.email === SUPER_ADMIN_EMAIL) {
    return NextResponse.json({ error: "Cannot modify super admin" }, { status: 403 });
  }

  const newStatus = action === "approve" ? "approved" : "rejected";

  const { error: updateError } = await supabase
    .from("profiles")
    .update({
      approval_status: newStatus,
      approved_by: authResult.id,
      approved_at: new Date().toISOString(),
    })
    .eq("id", profileId);

  if (updateError) {
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }

  if (action === "approve") {
    // user_roles has no unique constraint on user_id, so upsert(onConflict)
    // silently errored and the admin role was never granted — approved users
    // ended up unable to edit. Check-then-insert grants it reliably. (The
    // admin role is what content-table RLS / has_role(admin) require to edit.)
    const { data: existingRoles, error: roleSelError } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", targetProfile.user_id);

    if (roleSelError) {
      console.error("[admin/users] Failed to read roles:", roleSelError);
    } else if (!(existingRoles || []).some((r: { role: string }) => r.role === "admin")) {
      const { error: roleError } = await supabase
        .from("user_roles")
        .insert({ user_id: targetProfile.user_id, role: "admin" });

      if (roleError) {
        console.error("[admin/users] Failed to add admin role:", roleError);
      }
    }
  }

  logAdminActivityServer({
    userId: authResult.id,
    userEmail: authResult.email,
    action: action === "approve" ? "approve_user" : "reject_user",
    newValue: `${targetProfile.email} -> ${newStatus}`,
    ipAddress: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || undefined,
  });

  return NextResponse.json({ success: true, profileId, newStatus });
}
