"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, AlertCircle, Clock } from "lucide-react";

/**
 * Signup Callback Page
 * Handles the redirect after user clicks the email confirmation link.
 * Creates a pending profile for the user.
 */
export default function SignupCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error" | "pending">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const { getBackendClient } = await import("@/lib/backendClient");
        const supabase = getBackendClient();
        
        if (!supabase) {
          setStatus("error");
          setMessage("Authentication service not available");
          return;
        }

        // Wait for Supabase to process the auth tokens from URL hash
        // This is needed because the magic link contains tokens in the URL fragment
        let session = null;
        let attempts = 0;
        const maxAttempts = 10;
        
        while (!session && attempts < maxAttempts) {
          const { data, error } = await supabase.auth.getSession();
          if (data?.session) {
            session = data.session;
            break;
          }
          // Wait a bit for auth state to be processed
          await new Promise(resolve => setTimeout(resolve, 500));
          attempts++;
        }
        
        if (!session) {
          // Try to exchange the hash for a session if present
          const hashParams = new URLSearchParams(window.location.hash.substring(1));
          const accessToken = hashParams.get('access_token');
          const refreshToken = hashParams.get('refresh_token');
          
          if (accessToken && refreshToken) {
            const { data, error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });
            if (data?.session) {
              session = data.session;
            }
          }
        }
        
        if (!session) {
          setStatus("error");
          setMessage("Failed to verify your email. Please try signing up again.");
          return;
        }

        const user = session.user;
        const displayName = searchParams.get("displayName") || user.user_metadata?.display_name || user.email?.split("@")[0] || "User";

        // Check if profile already exists
        const { data: existingProfile } = await supabase
          .from("profiles")
          .select("id, approval_status")
          .eq("user_id", user.id)
          .maybeSingle();

        if (existingProfile) {
          // Profile exists, check status
          if (existingProfile.approval_status === "approved") {
            setStatus("success");
            setMessage("Your account is already approved! Redirecting to admin panel...");
            setTimeout(() => router.push("/admin"), 2000);
            return;
          } else if (existingProfile.approval_status === "pending") {
            setStatus("pending");
            setMessage("Your account is pending approval. You'll receive an email once approved.");
            return;
          } else if (existingProfile.approval_status === "rejected") {
            setStatus("error");
            setMessage("Your account request was not approved. Please contact the administrator.");
            return;
          }
        }

        // Create new profile with pending status.
        // The database trigger auto_approve_super_admin handles super admin auto-approval.
        const { error: profileError } = await supabase
          .from("profiles")
          .insert({
            user_id: user.id,
            email: user.email,
            display_name: displayName,
            approval_status: "pending",
          });

        if (profileError) {
          if (profileError.code === "23505") {
            setStatus("pending");
            setMessage("Your account is pending approval. You'll receive an email once approved.");
            return;
          }
          setStatus("error");
          setMessage("Failed to create your profile. Please try again.");
          return;
        }

        // Re-fetch the profile to see if the trigger auto-approved it
        const { data: createdProfile } = await supabase
          .from("profiles")
          .select("approval_status")
          .eq("user_id", user.id)
          .maybeSingle();

        if (createdProfile?.approval_status === "approved") {
          setStatus("success");
          setMessage("Welcome! Your admin account is ready. Redirecting...");
          setTimeout(() => router.push("/admin"), 2000);
        } else {
          setStatus("pending");
          setMessage("Your account has been created and is pending approval. You'll receive an email once approved by the administrator.");
        }

      } catch (err) {
        console.error("Callback error:", err);
        setStatus("error");
        setMessage("An unexpected error occurred. Please try again.");
      }
    };

    handleCallback();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy via-navy-dark to-navy p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          {status === "loading" && (
            <>
              <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary mb-4" />
              <CardTitle>Setting Up Your Account</CardTitle>
              <CardDescription>Please wait while we verify your email...</CardDescription>
            </>
          )}
          
          {status === "success" && (
            <>
              <CheckCircle2 className="w-12 h-12 mx-auto text-green-600 mb-4" />
              <CardTitle className="text-green-600">Account Ready!</CardTitle>
            </>
          )}
          
          {status === "pending" && (
            <>
              <Clock className="w-12 h-12 mx-auto text-yellow-600 mb-4" />
              <CardTitle className="text-yellow-600">Approval Pending</CardTitle>
            </>
          )}
          
          {status === "error" && (
            <>
              <AlertCircle className="w-12 h-12 mx-auto text-red-600 mb-4" />
              <CardTitle className="text-red-600">Something Went Wrong</CardTitle>
            </>
          )}
        </CardHeader>
        
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">{message}</p>
          
          {status === "pending" && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
              <p className="font-medium mb-1">What happens next?</p>
              <p>The administrator will review your request and approve or deny access. You'll be notified by email.</p>
            </div>
          )}
          
          {(status === "error" || status === "pending") && (
            <Button variant="outline" onClick={() => router.push("/")}>
              Return to Home
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
