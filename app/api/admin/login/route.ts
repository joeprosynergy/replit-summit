import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { logAdminActivityServer } from "@/lib/adminActivityLogServer";

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS_PER_IP = 10;
const MAX_ATTEMPTS_PER_EMAIL = 5;
const LOCKOUT_DURATION_MS = 30 * 60 * 1000; // 30 minutes after max failures

const ipAttempts = new Map<string, { count: number; resetAt: number }>();
const emailAttempts = new Map<string, { count: number; resetAt: number; lockedUntil?: number }>();

function getClientIp(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function isIpRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipAttempts.get(ip);
  if (!entry || now > entry.resetAt) {
    ipAttempts.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > MAX_ATTEMPTS_PER_IP;
}

function isEmailLocked(email: string): boolean {
  const entry = emailAttempts.get(email);
  if (!entry) return false;
  if (entry.lockedUntil && Date.now() < entry.lockedUntil) return true;
  if (entry.lockedUntil && Date.now() >= entry.lockedUntil) {
    emailAttempts.delete(email);
    return false;
  }
  return false;
}

function recordEmailFailure(email: string): void {
  const now = Date.now();
  const entry = emailAttempts.get(email);
  if (!entry || now > entry.resetAt) {
    emailAttempts.set(email, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return;
  }
  entry.count++;
  if (entry.count >= MAX_ATTEMPTS_PER_EMAIL) {
    entry.lockedUntil = now + LOCKOUT_DURATION_MS;
  }
}

function clearEmailFailures(email: string): void {
  emailAttempts.delete(email);
}

function getSupabaseAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

const GENERIC_ERROR = "Invalid email or password";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);

  if (isIpRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many login attempts. Please try again later." },
      { status: 429, headers: { "Retry-After": "900" } }
    );
  }

  let body: { email?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { email, password } = body;

  if (!email || !password || typeof email !== "string" || typeof password !== "string") {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

  const normalizedEmail = email.toLowerCase().trim();

  if (isEmailLocked(normalizedEmail)) {
    return NextResponse.json(
      { error: "Account temporarily locked due to too many failed attempts. Please try again later." },
      { status: 429, headers: { "Retry-After": "1800" } }
    );
  }

  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Authentication service not configured" },
      { status: 500 }
    );
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: normalizedEmail,
    password,
  });

  if (error || !data.session) {
    recordEmailFailure(normalizedEmail);
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 401 });
  }

  clearEmailFailures(normalizedEmail);

  logAdminActivityServer({
    userId: data.user.id,
    userEmail: data.user.email || undefined,
    action: "login",
    ipAddress: ip,
    userAgent: req.headers.get("user-agent") || undefined,
  });

  return NextResponse.json({
    access_token: data.session.access_token,
    refresh_token: data.session.refresh_token,
    expires_in: data.session.expires_in,
    user: {
      id: data.user.id,
      email: data.user.email,
    },
  });
}
