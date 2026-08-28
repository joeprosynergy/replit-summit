"use client";

import { useEffect, useState, Suspense, lazy, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAdminAuthContext } from "@/contexts/AdminAuthContext";
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

function AdminLoadingFallback({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary" />
        <p className="text-muted-foreground">Loading admin panel...</p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="text-sm text-primary hover:underline"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
}

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { sessionStatus } = useAdminAuthContext();
  const router = useRouter();
  const [showRetry, setShowRetry] = useState(false);

  useEffect(() => {
    if (sessionStatus === "signed-out") {
      router.replace("/admin/login");
    }
  }, [sessionStatus, router]);

  useEffect(() => {
    if (sessionStatus !== "unknown") {
      setShowRetry(false);
      return;
    }
    const timer = setTimeout(() => setShowRetry(true), 8000);
    return () => clearTimeout(timer);
  }, [sessionStatus]);

  if (sessionStatus === "signed-out" || sessionStatus === "unknown") {
    return (
      <AdminLoadingFallback
        onRetry={sessionStatus === "unknown" && showRetry ? () => window.location.reload() : undefined}
      />
    );
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
