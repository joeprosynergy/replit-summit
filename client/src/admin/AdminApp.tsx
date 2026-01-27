import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Loader2 } from 'lucide-react';

/**
 * Admin App Entry Point
 * Separate bundle for all admin functionality.
 * Lazy-loaded only when accessing /admin/* routes.
 */

// Lazy-load all admin pages
const AdminDashboard = lazy(() => import('@/pages/Admin'));
const AdminLogin = lazy(() => import('@/pages/AdminLogin'));
const AuthCallback = lazy(() => import('@/pages/AuthCallback'));
const AdminCloudinaryUpload = lazy(() => import('@/pages/AdminCloudinaryUpload'));
const AssetAudit = lazy(() => import('@/pages/AssetAudit'));
const AdminUsers = lazy(() => import('@/pages/AdminUsers'));
const GlobalColorsAdmin = lazy(() => import('@/pages/GlobalColorsAdmin'));
const AdminCodeSnippets = lazy(() => import('@/pages/AdminCodeSnippets'));

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
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}

export default function AdminApp() {
  return (
    <Suspense fallback={<AdminLoadingFallback />}>
      <Routes>
        {/* Login route (public) */}
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/auth/callback" element={<AuthCallback />} />

        {/* Protected admin routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cloudinary-upload"
          element={
            <ProtectedRoute>
              <AdminCloudinaryUpload />
            </ProtectedRoute>
          }
        />
        <Route
          path="/asset-audit"
          element={
            <ProtectedRoute>
              <AssetAudit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <AdminUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/global-colors"
          element={
            <ProtectedRoute>
              <GlobalColorsAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/code-snippets"
          element={
            <ProtectedRoute>
              <AdminCodeSnippets />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </Suspense>
  );
}
