import type { Request, Response, NextFunction } from "express";
import { createClient } from "@supabase/supabase-js";

// Super admin email that always has access (configurable via env var)
const SUPER_ADMIN_EMAIL = process.env.SUPER_ADMIN_EMAIL || "joe@summitbuildings.com";

// Create a Supabase client for auth verification
// SECURITY: Must use service role key to bypass RLS for admin checks
function getSupabaseAdminClient() {
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!url) {
    console.error("[Auth] VITE_SUPABASE_URL is not configured");
    return null;
  }
  
  if (!key) {
    console.error("[Auth] SUPABASE_SERVICE_ROLE_KEY is not configured - this is required for admin authentication");
    return null;
  }
  
  return createClient(url, key);
}

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    isAdmin: boolean;
  };
}

/**
 * Middleware to require authentication
 * Validates the Supabase JWT token from Authorization header
 */
export async function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Missing or invalid authorization header" });
    return;
  }

  const token = authHeader.substring(7); // Remove "Bearer " prefix
  const supabase = getSupabaseAdminClient();
  
  if (!supabase) {
    res.status(500).json({ error: "Authentication service not configured" });
    return;
  }

  try {
    // Verify the JWT and get the user
    console.log("[Auth] Verifying token...");
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      console.log("[Auth] Token verification failed:", { error: error?.message, hasUser: !!user });
      res.status(401).json({ error: "Invalid or expired token" });
      return;
    }

    console.log("[Auth] Token verified for user:", { id: user.id, email: user.email });

    // Attach user info to request
    req.user = {
      id: user.id,
      email: user.email || "",
      isAdmin: false, // Will be set by requireAdmin if needed
    };

    next();
  } catch (err) {
    console.error("[Auth] Token verification error:", err);
    res.status(401).json({ error: "Authentication failed" });
  }
}

/**
 * Middleware to require admin access
 * Must be used after requireAuth
 */
export async function requireAdmin(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  if (!req.user) {
    res.status(401).json({ error: "Authentication required" });
    return;
  }

  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    res.status(500).json({ error: "Authentication service not configured" });
    return;
  }

  try {
    console.log("[Auth] Checking admin status for:", { userId: req.user.id, email: req.user.email });
    
    // Super admin always has access
    if (req.user.email === SUPER_ADMIN_EMAIL) {
      console.log("[Auth] Super admin access granted");
      req.user.isAdmin = true;
      next();
      return;
    }

    // Check profile for approval status
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("approval_status, user_id, email")
      .eq("user_id", req.user.id)
      .maybeSingle();

    console.log("[Auth] Profile query result:", { 
      hasProfile: !!profile, 
      profileData: profile,
      profileError: profileError?.message 
    });

    if (profileError) {
      console.error("[Auth] Profile check error:", profileError);
      res.status(500).json({ error: "Failed to verify admin status" });
      return;
    }

    if (!profile || profile.approval_status !== "approved") {
      console.log("[Auth] Access denied:", { 
        reason: !profile ? "No profile found" : `Status is '${profile.approval_status}' not 'approved'`,
        queriedUserId: req.user.id 
      });
      res.status(403).json({ error: "Admin access required" });
      return;
    }

    req.user.isAdmin = true;
    next();
  } catch (err) {
    console.error("[Auth] Admin check error:", err);
    res.status(500).json({ error: "Failed to verify admin status" });
  }
}

/**
 * Combined middleware for routes that require admin access
 */
export async function requireAdminAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  await requireAuth(req, res, () => {
    requireAdmin(req, res, next);
  });
}
