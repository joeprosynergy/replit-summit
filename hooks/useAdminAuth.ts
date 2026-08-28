"use client";

/**
 * Single admin-auth source of truth. Call this ONLY from AdminAuthProvider
 * (contexts/AdminAuthContext.tsx). Every other consumer must use
 * useAdminAuthContext() or useOptionalAdminAuth().
 */

import { useState, useEffect, useCallback, useRef } from "react";
import type { User } from "@supabase/supabase-js";
import { getBackendClient } from "@/lib/backendClient";
import { setAdminSessionCookie, clearAdminSessionCookie } from "@/lib/adminSessionCookie";

export type SessionStatus = "unknown" | "signed-out" | "signed-in";

interface AdminAuthState {
  user: User | null;
  isAdmin: boolean;
  isLoading: boolean;
  error: string | null;
  approvalStatus: "pending" | "approved" | "rejected" | null;
  sessionStatus: SessionStatus;
  recheckAdmin: () => Promise<void>;
}

type ApprovalResult = {
  isAdmin: boolean;
  approvalStatus: "pending" | "approved" | "rejected" | null;
  timedOut?: boolean;
};

function hasLocalAuthToken(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return Object.keys(localStorage).some((k) => k.includes("auth-token"));
  } catch {
    return false;
  }
}

async function checkApprovalStatus(client: NonNullable<ReturnType<typeof getBackendClient>>, userId: string): Promise<ApprovalResult> {
  try {
    let profile: { approval_status: string } | null = null;
    let error: { message?: string } | null = null;
    const maxRetries = 3;
    const timeouts = [3000, 5000, 8000];

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      const queryPromise = client
        .from("profiles")
        .select("approval_status")
        .eq("user_id", userId)
        .maybeSingle();

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error(`Profile query timeout after ${timeouts[attempt]}ms`)), timeouts[attempt])
      );

      try {
        const result = (await Promise.race([queryPromise, timeoutPromise])) as {
          data: { approval_status: string } | null;
          error: { message?: string } | null;
        };
        profile = result.data;
        error = result.error;
        break;
      } catch (retryErr) {
        if (attempt === maxRetries - 1) {
          throw retryErr;
        }
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }

    if (error) {
      return { isAdmin: false, approvalStatus: null };
    }

    if (!profile) {
      return { isAdmin: false, approvalStatus: null };
    }

    const approvalStatus = profile.approval_status as "pending" | "approved" | "rejected";
    return { isAdmin: approvalStatus === "approved", approvalStatus };
  } catch {
    return { isAdmin: false, approvalStatus: null, timedOut: true };
  }
}

export function useAdminAuth(): AdminAuthState {
  const [user, setUser] = useState<User | null>(null);
  const [sessionStatus, setSessionStatus] = useState<SessionStatus>("unknown");
  const [isAdmin, setIsAdmin] = useState(false);
  const [approvalStatus, setApprovalStatus] = useState<"pending" | "approved" | "rejected" | null>(null);
  const [approvalResolved, setApprovalResolved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const userIdRef = useRef<string | null>(null);

  const applySignedIn = useCallback((nextUser: User) => {
    if (userIdRef.current !== nextUser.id) {
      setApprovalResolved(false);
      setIsAdmin(false);
      setApprovalStatus(null);
    }
    userIdRef.current = nextUser.id;
    setUser(nextUser);
    setSessionStatus("signed-in");
    setError(null);
    setAdminSessionCookie();
  }, []);

  const applySignedOut = useCallback(() => {
    userIdRef.current = null;
    setUser(null);
    setSessionStatus("signed-out");
    setIsAdmin(false);
    setApprovalStatus(null);
    setApprovalResolved(true);
    setError(null);
    clearAdminSessionCookie();
  }, []);

  const recheckAdmin = useCallback(async () => {
    const client = getBackendClient();
    if (!client || !user) return;

    setApprovalResolved(false);
    const result = await checkApprovalStatus(client, user.id);
    if (result.timedOut) {
      setApprovalResolved(true);
      return;
    }
    setIsAdmin(result.isAdmin);
    setApprovalStatus(result.approvalStatus);
    setApprovalResolved(true);
  }, [user]);

  useEffect(() => {
    const client = getBackendClient();

    if (!client) {
      setError("Backend not configured");
      setSessionStatus("signed-out");
      return;
    }

    let mounted = true;

    // Fast local tiebreak: no stored token means definitely signed-out.
    // A timer must never assert signed-out on its own.
    if (!hasLocalAuthToken()) {
      applySignedOut();
    }

    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;
      // Synchronous only — never await Supabase inside this callback
      // (navigator lock deadlock with PostgREST).
      if (event === "SIGNED_OUT") {
        applySignedOut();
        return;
      }
      if (session?.user) {
        applySignedIn(session.user);
        return;
      }
      if (event === "INITIAL_SESSION" && !hasLocalAuthToken()) {
        applySignedOut();
      }
    });

    const checkInitialAuth = async () => {
      try {
        const { data, error: sessionError } = await client.auth.getSession();
        if (!mounted) return;

        if (sessionError) {
          // Network/unknown: do not assert signed-out if a token is still stored.
          if (!hasLocalAuthToken()) {
            applySignedOut();
          }
          return;
        }

        if (data.session?.user) {
          applySignedIn(data.session.user);
          return;
        }

        applySignedOut();
      } catch {
        if (!mounted) return;
        if (!hasLocalAuthToken()) {
          applySignedOut();
        }
      }
    };

    checkInitialAuth();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [applySignedIn, applySignedOut]);

  const userId = user?.id;

  useEffect(() => {
    if (sessionStatus !== "signed-in" || !userId) return;
    const client = getBackendClient();
    if (!client) return;

    let cancelled = false;
    setApprovalResolved(false);

    (async () => {
      const result = await checkApprovalStatus(client, userId);
      if (cancelled) return;
      if (result.timedOut) {
        setApprovalResolved(true);
        return;
      }
      setIsAdmin(result.isAdmin);
      setApprovalStatus(result.approvalStatus);
      setApprovalResolved(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [sessionStatus, userId]);

  const isLoading =
    sessionStatus === "unknown" || (sessionStatus === "signed-in" && !approvalResolved);

  return {
    user,
    isAdmin,
    isLoading,
    error,
    approvalStatus,
    sessionStatus,
    recheckAdmin,
  };
}
