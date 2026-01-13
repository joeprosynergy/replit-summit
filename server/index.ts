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

// API routes FIRST
registerRoutes(app);

// ---- SERVE STATIC FRONTEND ----
const distPath = path.resolve(__dirname, "public");

if (!fs.existsSync(distPath)) {
  console.error("❌ dist/public not found");
} else {
  app.use(express.static(distPath));

  // SPA fallback
  app.get("*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

// ---- ERROR HANDLER ----
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
});

// ---- START SERVER ----
const port = Number(process.env.PORT);
app.listen(port, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${port}`);
});