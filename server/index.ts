import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";

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
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
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
