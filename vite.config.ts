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
          // Only split vendor chunks - let Vite handle app code automatically
          if (id.includes('node_modules')) {
            // Core React libraries
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'vendor-react';
            }
            // UI component libraries
            if (id.includes('@radix-ui') || id.includes('lucide-react')) {
              return 'vendor-ui';
            }
            // All other vendors
            return 'vendor';
          }
          // Let Vite handle all app code chunking automatically
          return undefined;
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
}));