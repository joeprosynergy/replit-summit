"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { setAdminSessionCookie } from "@/lib/adminSessionCookie";

const AdminLogin = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usePassword, setUsePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [envError, setEnvError] = useState<string | null>(null);

  const handlePasswordLogin = async () => {
    setMessage(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage({ type: "error", text: result.error || "Invalid email or password" });
        setIsLoading(false);
        return;
      }

      const { getBackendClient } = await import("@/lib/backendClient");
      const supabase = getBackendClient();

      if (supabase && result.access_token && result.refresh_token) {
        await supabase.auth.setSession({
          access_token: result.access_token,
          refresh_token: result.refresh_token,
        });
      }

      setAdminSessionCookie();
      window.location.href = "/admin";
    } catch (err) {
      setMessage({ type: "error", text: "Failed to login" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendLink = async () => {
    setMessage(null);
    setIsLoading(true);

    try {
      const { getBackendClient } = await import("@/lib/backendClient");
      const supabase = getBackendClient();
      
      if (supabase === null) {
        setMessage({ type: "error", text: "Supabase not configured - check environment variables" });
        setIsLoading(false);
        return;
      }
      
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/admin/auth/callback`,
        },
      });

      if (error) {
        setMessage({ type: "error", text: "Failed to send login link. Please try again." });
      } else {
        setMessage({ type: "success", text: "Check your email for the login link" });
      }
    } catch (err) {
      if (err instanceof Error && err.message.includes('not configured')) {
        setEnvError(err.message);
      } else {
        setMessage({ type: "error", text: "Failed to send request" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (envError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="w-full max-w-sm space-y-4 text-center">
          <h1 className="text-xl font-semibold text-foreground">Admin Unavailable</h1>
          <p className="text-sm text-muted-foreground">
            Admin authentication isn't available in this environment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-2xl font-bold text-center text-foreground">
          Admin Login
        </h1>
        <div className="space-y-4">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !isLoading && email) {
                if (usePassword && password) {
                  handlePasswordLogin();
                } else if (!usePassword) {
                  handleSendLink();
                }
              }
            }}
          />
          {usePassword && (
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !isLoading && email && password) {
                  handlePasswordLogin();
                }
              }}
            />
          )}
          <Button 
            className="w-full" 
            onClick={usePassword ? handlePasswordLogin : handleSendLink} 
            disabled={isLoading || !email || (usePassword && !password)}
          >
            {isLoading ? "Loading..." : usePassword ? "Login with Password" : "Send login link"}
          </Button>
          <button
            type="button"
            onClick={() => setUsePassword(!usePassword)}
            className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {usePassword ? "← Use magic link instead" : "Use password instead →"}
          </button>
          {message && (
            <div className="space-y-3">
              <p className={`text-sm text-center ${message.type === "success" ? "text-green-600" : "text-destructive"}`}>
                {message.text}
              </p>
              {message.type === "success" && (
                <Button 
                  className="w-full" 
                  onClick={() => {
                    router.push('/admin');
                  }}
                >
                  Go to Admin Dashboard
                </Button>
              )}
            </div>
          )}
          
          <p className="text-sm text-muted-foreground text-center pt-4 border-t">
            Don't have an account?{" "}
            <a href="/signup" className="text-primary hover:underline">
              Request access
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
