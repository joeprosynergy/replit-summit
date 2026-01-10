import { useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { LogOut, Settings, Users, FileText, ShieldX, ChevronDown, RefreshCw, Copy } from "lucide-react";
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

const STATIC_PAGE_SLUGS = [
  'home', 'about-us', 'buyers-guide', 'gallery', 'financing', 'privacy-policy',
  'styles', 'styles-utility', 'styles-barn', 'styles-modern',
  'types', 'basic-storage', 'deluxe-storage-cabins', 'garages-carports',
  'economy-shed', 'budget-pro-utility', 'budget-pro-lofted-barn',
  'utility-shed', 'pro-lofted-barn', 'cabin', 'barn-cabin', 'modern-shed',
  'garage', 'carports', 'greenhouse', 'animal-shelters'
];

const Admin = () => {
  const navigate = useNavigate();
  const { user, isAdmin, isLoading, error, recheckAdmin } = useAdminAuth();
  const client = getBackendClient();
  const [isRechecking, setIsRechecking] = useState(false);
  const [debugOpen, setDebugOpen] = useState(false);
  const [duplicatedPages, setDuplicatedPages] = useState<string[]>([]);
  const [loadingPages, setLoadingPages] = useState(true);

  useEffect(() => {
    const fetchDuplicatedPages = async () => {
      if (!client) return;
      try {
        const { data, error } = await (client as any)
          .from('page_content')
          .select('slug')
          .order('slug');
        
        if (!error && data) {
          const slugs: string[] = data.map((row: any) => row.slug as string);
          const customPages = slugs.filter((slug: string) => !STATIC_PAGE_SLUGS.includes(slug));
          setDuplicatedPages([...new Set(customPages)] as string[]);
        }
      } catch (err) {
        console.error('Failed to fetch pages:', err);
      } finally {
        setLoadingPages(false);
      }
    };
    fetchDuplicatedPages();
  }, [client]);

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
          {/* All Pages Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                All Pages
              </CardTitle>
              <CardDescription>
                Navigate to any page to edit its content. Click "Edit Page" button in the bottom-right corner when on a page.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Main Pages */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Main Pages</h3>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  <Button variant="outline" className="justify-start" onClick={() => navigate('/')}>
                    Home
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => navigate('/about-us')}>
                    About Us
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => navigate('/contact-us')}>
                    Contact Us
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => navigate('/buyers-guide')}>
                    Buyer's Guide
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => navigate('/gallery')}>
                    Gallery
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => navigate('/financing')}>
                    Financing
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => navigate('/privacy-policy')}>
                    Privacy Policy
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => navigate('/inventory')}>
                    Inventory
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => navigate('/3d-configurator')}>
                    3D Configurator
                  </Button>
                </div>
              </div>

              {/* Styles Pages */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Building Styles</h3>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  <Button variant="outline" className="justify-start" onClick={() => navigate('/styles')}>
                    Styles Overview
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => navigate('/styles/utility')}>
                    Utility Style
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => navigate('/styles/barn')}>
                    Barn Style
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => navigate('/styles/modern')}>
                    Modern Style
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => navigate('/styles/greenhouse')}>
                    Greenhouse (Style)
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => navigate('/styles/animal-shelters')}>
                    Animal Shelters (Style)
                  </Button>
                </div>
              </div>

              {/* Types Pages */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Structure Types</h3>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  <Button variant="outline" className="justify-start" onClick={() => navigate('/types')}>
                    Types Overview
                  </Button>
                </div>
              </div>

              {/* Basic Storage */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Basic Storage</h3>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  <Button variant="outline" className="justify-start" onClick={() => navigate('/types/basic-storage')}>
                    Basic Storage Overview
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => navigate('/types/basic-storage/economy-shed')}>
                    Economy Shed
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => navigate('/types/basic-storage/budget-pro-utility')}>
                    Budget Pro - Utility
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => navigate('/types/basic-storage/budget-pro-lofted-barn')}>
                    Budget Pro - Lofted Barn
                  </Button>
                </div>
              </div>

              {/* Deluxe Storage & Cabins */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Deluxe Storage & Cabins</h3>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  <Button variant="outline" className="justify-start" onClick={() => navigate('/types/deluxe-storage-cabins')}>
                    Deluxe Storage Overview
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => navigate('/types/deluxe-storage-cabins/pro-utility-shed')}>
                    Pro - Utility Shed
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => navigate('/types/deluxe-storage-cabins/pro-lofted-barn')}>
                    Pro - Lofted Barn
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => navigate('/types/deluxe-storage-cabins/cabin')}>
                    Summit Cabin
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => navigate('/types/deluxe-storage-cabins/barn-cabin')}>
                    Barn Cabin
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => navigate('/types/deluxe-storage-cabins/modern-shed')}>
                    Modern Shed
                  </Button>
                </div>
              </div>

              {/* Garages & Carports */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Garages & Carports</h3>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  <Button variant="outline" className="justify-start" onClick={() => navigate('/types/garages-carports')}>
                    Garages & Carports Overview
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => navigate('/types/garages-carports/garage')}>
                    Garage
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => navigate('/types/garages-carports/carports')}>
                    Carports
                  </Button>
                </div>
              </div>

              {/* Specialty Structures */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Specialty Structures</h3>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  <Button variant="outline" className="justify-start" onClick={() => navigate('/types/greenhouse')}>
                    Greenhouse
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => navigate('/types/animal-shelters')}>
                    Animal Shelters
                  </Button>
                </div>
              </div>

              {/* Duplicated Pages */}
              {duplicatedPages.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide flex items-center gap-2">
                    <Copy className="w-4 h-4" />
                    Duplicated Pages
                  </h3>
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {duplicatedPages.map((slug) => (
                      <Button 
                        key={slug} 
                        variant="outline" 
                        className="justify-start" 
                        onClick={() => navigate('/' + slug)}
                      >
                        {slug}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Admin Tools Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Admin Tools
              </CardTitle>
              <CardDescription>
                Manage images and audit assets.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                <Button variant="outline" className="justify-start" onClick={() => navigate('/cloudinary-upload')}>
                  Cloudinary Upload
                </Button>
                <Button variant="outline" className="justify-start" onClick={() => navigate('/asset-audit')}>
                  Asset Audit
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
