import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const SUPER_ADMIN_EMAIL =
  process.env.SUPER_ADMIN_EMAIL || "";

function getSupabaseAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url) {
    console.error("[Auth] NEXT_PUBLIC_SUPABASE_URL is not configured");
    return null;
  }

  if (!key) {
    console.error(
      "[Auth] SUPABASE_SERVICE_ROLE_KEY is not configured - this is required for admin authentication"
    );
    return null;
  }

  return createClient(url, key);
}

export interface AuthenticatedUser {
  id: string;
  email: string;
  isAdmin: boolean;
}

/**
 * Verify admin auth from a Next.js Route Handler request.
 * Returns the authenticated user or a NextResponse error.
 */
export async function verifyAdminAuth(
  req: NextRequest
): Promise<AuthenticatedUser | NextResponse> {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Missing or invalid authorization header" },
      { status: 401 }
    );
  }

  const token = authHeader.substring(7);
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return NextResponse.json(
      { error: "Authentication service not configured" },
      { status: 500 }
    );
  }

  try {
    // Verify the JWT and get the user
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // Super admin always has access
    if (user.email === SUPER_ADMIN_EMAIL) {
      return { id: user.id, email: user.email || "", isAdmin: true };
    }

    // Check profile for approval status
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("approval_status, user_id, email")
      .eq("user_id", user.id)
      .maybeSingle();

    if (profileError) {
      console.error("[Auth] Profile check error:", profileError);
      return NextResponse.json(
        { error: "Failed to verify admin status" },
        { status: 500 }
      );
    }

    if (!profile || profile.approval_status !== "approved") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    return { id: user.id, email: user.email || "", isAdmin: true };
  } catch (err) {
    console.error("[Auth] Token verification error:", err);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 401 }
    );
  }
}

/**
 * Helper to check if the result is an error response (NextResponse)
 */
export function isAuthError(
  result: AuthenticatedUser | NextResponse
): result is NextResponse {
  return result instanceof NextResponse;
}

// Input validation helpers (shared across routes)
export const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const MAX_SLUG_LENGTH = 100;

export function isValidSlug(slug: string): boolean {
  return (
    typeof slug === "string" &&
    slug.length > 0 &&
    slug.length <= MAX_SLUG_LENGTH &&
    SLUG_REGEX.test(slug)
  );
}

export function isValidCloudinaryFolder(folder: string): boolean {
  if (!folder) return true;
  if (folder.includes("..") || folder.startsWith("/") || folder.startsWith("\\")) {
    return false;
  }
  return /^[a-zA-Z0-9_-]+(?:\/[a-zA-Z0-9_-]+)*$/.test(folder);
}

export function isValidPublicId(publicId: string): boolean {
  if (!publicId) return false;
  if (publicId.includes("..")) return false;
  return /^[a-zA-Z0-9_\-./]+$/.test(publicId) && publicId.length <= 200;
}
