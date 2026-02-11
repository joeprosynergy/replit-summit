"use client";

import { usePathname } from "next/navigation";
import { Suspense, lazy } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Loader2 } from "lucide-react";

// Lazy-load admin pages for code splitting
const AdminDashboard = lazy(() => import("@/components/admin-pages/AdminDashboard"));
const AdminLogin = lazy(() => import("@/components/admin-pages/AdminLogin"));
const AuthCallback = lazy(() => import("@/components/admin-pages/AuthCallback"));
const AdminCloudinaryUpload = lazy(() => import("@/components/admin-pages/AdminCloudinaryUpload"));
const AssetAudit = lazy(() => import("@/components/admin-pages/AssetAudit"));
const AdminUsers = lazy(() => import("@/components/admin-pages/AdminUsers"));
const GlobalColorsAdmin = lazy(() => import("@/components/admin-pages/GlobalColorsAdmin"));
const AdminCodeSnippets = lazy(() => import("@/components/admin-pages/AdminCodeSnippets"));

function AdminLoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary" />
        <p className="text-muted-foreground">Loading admin panel...</p>
      </div>
    </div>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAdminAuth();

  if (isLoading) {
    return <AdminLoadingFallback />;
  }

  if (!user) {
    // Redirect to login
    if (typeof window !== "undefined") {
      window.location.href = "/admin/login";
    }
    return <AdminLoadingFallback />;
  }

  return <>{children}</>;
}

export default function AdminRouter() {
  const pathname = usePathname();

  // Determine which admin page to render based on pathname
  const adminPath = pathname.replace(/^\/admin\/?/, "");

  const renderPage = () => {
    switch (adminPath) {
      case "login":
        return <AdminLogin />;
      case "auth/callback":
        return <AuthCallback />;
      case "cloudinary-upload":
        return (
          <ProtectedRoute>
            <AdminCloudinaryUpload />
          </ProtectedRoute>
        );
      case "asset-audit":
        return (
          <ProtectedRoute>
            <AssetAudit />
          </ProtectedRoute>
        );
      case "users":
        return (
          <ProtectedRoute>
            <AdminUsers />
          </ProtectedRoute>
        );
      case "global-colors":
        return (
          <ProtectedRoute>
            <GlobalColorsAdmin />
          </ProtectedRoute>
        );
      case "code-snippets":
        return (
          <ProtectedRoute>
            <AdminCodeSnippets />
          </ProtectedRoute>
        );
      default:
        // Default admin dashboard (protected)
        return (
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        );
    }
  };

  return (
    <Suspense fallback={<AdminLoadingFallback />}>
      {renderPage()}
    </Suspense>
  );
}
