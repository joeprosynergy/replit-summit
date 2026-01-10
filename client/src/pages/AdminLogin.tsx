import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [envError, setEnvError] = useState<string | null>(null);

  const handleSendLink = async () => {
    setMessage(null);
    setIsLoading(true);

    try {
      const { getBackendClient } = await import("@/lib/backendClient");
      const supabase = getBackendClient();
      
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setMessage({ type: "error", text: error.message });
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
                handleSendLink();
              }
            }}
          />
          <Button className="w-full" onClick={handleSendLink} disabled={isLoading}>
            {isLoading ? "Sending..." : "Send login link"}
          </Button>
          {message && (
            <p className={`text-sm text-center ${message.type === "success" ? "text-green-600" : "text-destructive"}`}>
              {message.text}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
