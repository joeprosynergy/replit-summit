import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

/**
 * Signup Page
 * Allows new users to request an admin account.
 * Account will be pending until approved by joe@summitbuildings.com
 */
const Signup = () => {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !displayName) {
      setStatus("error");
      setMessage("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setStatus("idle");
    setMessage("");

    try {
      const { getBackendClient } = await import("@/lib/backendClient");
      const supabase = getBackendClient();
      
      if (!supabase) {
        setStatus("error");
        setMessage("Authentication service not available");
        setIsLoading(false);
        return;
      }

      // Send magic link for signup - this creates the auth user
      const { error: signupError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/signup/callback?displayName=${encodeURIComponent(displayName)}`,
          data: {
            display_name: displayName,
          },
        },
      });

      if (signupError) {
        setStatus("error");
        setMessage(signupError.message);
      } else {
        setStatus("success");
        setMessage("Check your email for the confirmation link. Once confirmed, your account will be pending approval by the administrator.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("An error occurred. Please try again.");
      console.error("Signup error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy via-navy-dark to-navy p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Request Admin Access</CardTitle>
          <CardDescription>
            Create an account to access the admin panel. Your account will need to be approved before you can log in.
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSignup}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="displayName">Your Name</Label>
              <Input
                id="displayName"
                type="text"
                placeholder="John Smith"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                disabled={isLoading || status === "success"}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading || status === "success"}
              />
            </div>

            {status === "success" && (
              <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-green-800">
                  <p className="font-medium">Email sent!</p>
                  <p>{message}</p>
                </div>
              </div>
            )}

            {status === "error" && (
              <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">{message}</p>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || status === "success"}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : status === "success" ? (
                "Email Sent"
              ) : (
                "Request Access"
              )}
            </Button>
            
            <p className="text-sm text-muted-foreground text-center">
              Already have an account?{" "}
              <Link to="/admin/login" className="text-primary hover:underline">
                Log in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Signup;
