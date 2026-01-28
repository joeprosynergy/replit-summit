import express from "express";
import compression from "compression";
import cors from "cors";
import { registerRoutes } from "./routes";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env.local (only in development)
// In production (Railway), env vars are injected automatically
if (process.env.NODE_ENV !== "production") {
  const dotenv = await import("dotenv");
  dotenv.config({ path: path.resolve(__dirname, '../.env.local') });
}

const app = express();

// Enable gzip/brotli compression for all responses
app.use(compression());

// CORS configuration
// For public websites, allow all origins. Security is handled by JWT authentication.
// To restrict origins, set ALLOWED_ORIGINS env var (comma-separated list)
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',').filter(Boolean) || [];
const isDev = process.env.NODE_ENV !== "production";

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (same-origin, mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    // If no restrictions configured, allow all origins (public website)
    if (allowedOrigins.length === 0) {
      return callback(null, true);
    }
    
    // In development, allow localhost origins
    if (isDev && (origin.includes('localhost') || origin.includes('127.0.0.1'))) {
      return callback(null, true);
    }
    
    // Check against allowed origins (if configured)
    if (allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
      return callback(null, true);
    }
    
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));

// API routes first
registerRoutes(app);

// ---- SERVE FRONTEND ----
async function startServer() {
  if (isDev) {
    // Development: Use Vite dev server
    const { setupVite } = await import("./vite");
    await setupVite(app);
    console.log("🔧 Vite dev server middleware enabled");
  } else {
    // Production: Serve static build (no Vite dependency)
    const { serveStatic } = await import("./static");
    try {
      serveStatic(app);
      console.log("📦 Serving static build from dist/public");
    } catch (err) {
      console.error("❌ Failed to serve static build:", err);
    }
  }

  // ---- ERROR HANDLER ----
  app.use((err: any, _req: any, res: any, _next: any) => {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  });

  // ---- START SERVER ----
  const port = Number(process.env.PORT) || 5000;
  app.listen(port, "0.0.0.0", () => {
    console.log(`✅ Server running on port ${port}`);
  });
}

startServer();
