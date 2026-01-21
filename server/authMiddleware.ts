import type { Request, Response, NextFunction } from "express";
import { createClient } from "@supabase/supabase-js";

// Super admin email that always has access
const SUPER_ADMIN_EMAIL = "joe@summitbuildings.com";

// Create a Supabase client for auth verification
function getSupabaseAdminClient() {
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  
  if (!url || !key) {
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
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      res.status(401).json({ error: "Invalid or expired token" });
      return;
    }

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
    // Super admin always has access
    if (req.user.email === SUPER_ADMIN_EMAIL) {
      req.user.isAdmin = true;
      next();
      return;
    }

    // Check profile for approval status
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("approval_status")
      .eq("user_id", req.user.id)
      .maybeSingle();

    if (profileError) {
      console.error("[Auth] Profile check error:", profileError);
      res.status(500).json({ error: "Failed to verify admin status" });
      return;
    }

    if (!profile || profile.approval_status !== "approved") {
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
