import express, { type Request, Response, NextFunction } from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { registerRoutes } from "./routes";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));

// API routes first
registerRoutes(app);

// ---- SERVE VITE BUILD ----
const distPath = path.resolve(__dirname, "public");

if (!fs.existsSync(distPath)) {
  console.error("❌ dist/public not found");
} else {
  // 1️⃣ Serve static assets
  app.use(express.static(distPath));

  // 2️⃣ SPA fallback (NO "*")
  app.use((req, res, next) => {
    // Skip API and asset requests
    if (req.path.startsWith("/api") || req.path.includes(".")) {
      return next();
    }

    res.sendFile(path.join(distPath, "index.html"));
  });
}

// ---- ERROR HANDLER ----
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
});

// ---- START SERVER ----
const port = Number(process.env.PORT) || 3000;
app.listen(port, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${port}`);
});