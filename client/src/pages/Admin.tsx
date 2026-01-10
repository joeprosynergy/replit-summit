import { useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { LogOut, Settings, Users, FileText, ShieldX, ChevronDown, RefreshCw } from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { getBackendClient, isBackendAvailable } from "@/lib/backendClient";

// Helper to extract hostname for debug display
function getBackendHost(): string {
  const url = import.meta.env.VITE_SUPABASE_URL;
  if (!url) return 'Not configured';
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

function getKeySource(): string {
  if (import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY) return 'DEFAULT_KEY';
  if (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY) return 'PUBLISHABLE_KEY';
  return 'None';
}

const Admin = () => {
  const navigate = useNavigate();
  const { user, isAdmin, isLoading, error, recheckAdmin } = useAdminAuth();
  const client = getBackendClient();
  const [isRechecking, setIsRechecking] = useState(false);
  const [debugOpen, setDebugOpen] = useState(false);

  const handleLogout = async () => {
    if (client) {
      await client.auth.signOut();
    }
    navigate("/admin/login");
  };

  const handleRecheck = async () => {
    setIsRechecking(true);
    await recheckAdmin();
    setIsRechecking(false);
  };

  if (!client) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="w-full max-w-sm space-y-4 text-center">
          <h1 className="text-xl font-semibold text-foreground">Admin Unavailable</h1>
          <p className="text-sm text-muted-foreground">
            Backend is not configured in this environment.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-6 w-full max-w-xs">
          <p className="text-muted-foreground">Loading admin...</p>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full animate-pulse w-2/3" />
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="w-full max-w-md space-y-6 text-center">
          <ShieldX className="w-16 h-16 mx-auto text-destructive" />
          <h1 className="text-xl font-semibold text-foreground">Access Denied</h1>
          <p className="text-sm text-muted-foreground">
            You don't have admin privileges. Contact an administrator if you believe this is an error.
          </p>
          
          <div className="flex flex-col gap-3">
            <Button 
              variant="secondary" 
              onClick={handleRecheck} 
              disabled={isRechecking}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isRechecking ? 'animate-spin' : ''}`} />
              Re-check Admin Role
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>

          <Collapsible open={debugOpen} onOpenChange={setDebugOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                <ChevronDown className={`w-3 h-3 mr-1 transition-transform ${debugOpen ? 'rotate-180' : ''}`} />
                Troubleshooting Details
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <div className="text-left bg-muted/50 rounded-lg p-4 text-xs space-y-2 font-mono">
                <p><span className="text-muted-foreground">Backend Host:</span> {getBackendHost()}</p>
                <p><span className="text-muted-foreground">Key Source:</span> {getKeySource()}</p>
                <p><span className="text-muted-foreground">Backend Available:</span> {isBackendAvailable() ? 'Yes' : 'No'}</p>
                <p><span className="text-muted-foreground">User ID:</span> {user.id}</p>
                <p><span className="text-muted-foreground">Email:</span> {user.email}</p>
                <p><span className="text-muted-foreground">Checked at:</span> {new Date().toISOString()}</p>
                {error && (
                  <p className="text-destructive"><span className="text-muted-foreground">Error:</span> {error}</p>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Inline Editing Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Edit Page Content
              </CardTitle>
              <CardDescription>
                Navigate to any page to edit its content inline. Look for the "Edit Page" button in the bottom-right corner.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <Button variant="outline" className="justify-start" onClick={() => navigate('/')}>
                  Home Page
                </Button>
                <Button variant="outline" className="justify-start" onClick={() => navigate('/styles')}>
                  Building Styles
                </Button>
                <Button variant="outline" className="justify-start" onClick={() => navigate('/types')}>
                  Structure Types
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Other Admin Sections */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Users
                </CardTitle>
                <CardDescription>View and manage user accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="secondary" className="w-full" disabled>
                  Coming Soon
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Settings
                </CardTitle>
                <CardDescription>Configure site settings</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="secondary" className="w-full" disabled>
                  Coming Soon
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
