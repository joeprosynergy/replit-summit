import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => ({
  plugins: [react()],

  // ✅ THIS IS THE FIX
  base: "/",  

  server: {
    host: "0.0.0.0",
    port: 5000,
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },

  root: path.resolve(__dirname, "client"),
  
  // Load .env files from project root instead of client/
  envDir: path.resolve(__dirname),

  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
    sourcemap: mode === "development",
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks - public dependencies
          if (id.includes('node_modules')) {
            // Core React libraries
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor-react';
            }
            // UI component libraries
            if (id.includes('@radix-ui') || id.includes('lucide-react')) {
              return 'vendor-ui';
            }
            // Supabase client (used in public for CMS fetching)
            if (id.includes('@supabase')) {
              return 'vendor-supabase';
            }
            // Other vendors
            return 'vendor-other';
          }

          // Admin bundle - ALL admin-related code
          if (
            id.includes('/admin/') ||
            id.includes('/components/admin/') ||
            id.includes('AdminAuthContext') ||
            id.includes('EditablePageWrapper') ||
            id.includes('InlineEditable') ||
            id.includes('InlineEditableImage') ||
            id.includes('InlineEditableButton') ||
            id.includes('AdminEditMode') ||
            id.includes('AdminUI') ||
            id.includes('useAdminUI') ||
            id.includes('EditModeContext') ||
            id.includes('globalEditRegistry') ||
            id.includes('AdminNavLink') ||
            id.includes('EditableText') ||
            id.includes('PopulateLayoutConfigButton') ||
            id.includes('MigrateEconomyShedWorkingCopy') ||
            id.includes('/pages/Admin.tsx') ||
            id.includes('/pages/AdminLogin.tsx') ||
            id.includes('/pages/AdminCloudinaryUpload.tsx') ||
            id.includes('/pages/AssetAudit.tsx') ||
            id.includes('/pages/AuthCallback.tsx') ||
            id.includes('Editable.tsx') // All *Editable page variants
          ) {
            return 'admin-bundle';
          }

          // CMS runtime (lightweight, used by public)
          if (
            id.includes('/lib/backendClient') ||
            id.includes('/lib/cmsFallback') ||
            id.includes('/hooks/useSectionContent') ||
            id.includes('/hooks/useCMSContent')
          ) {
            return 'cms-runtime';
          }

          // Public pages and components
          if (id.includes('/pages/') && !id.includes('Editable.tsx')) {
            return 'pages-public';
          }

          if (id.includes('/components/') && !id.includes('/admin/')) {
            return 'components-public';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Monitor bundle sizes
  },
}));