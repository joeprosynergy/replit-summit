import express from "express";
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

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));

// API routes first
registerRoutes(app);

// ---- SERVE FRONTEND ----
const isDev = process.env.NODE_ENV !== "production";

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
