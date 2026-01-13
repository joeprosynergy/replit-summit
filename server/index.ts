import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { registerRoutes } from "./routes";
import { setupVite, log } from "./vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));

(async () => {
  registerRoutes(app);

  if (process.env.NODE_ENV === "development") {
    await setupVite(app);
  } else {
    // ✅ PRODUCTION STATIC SERVING (THIS FIXES WHITE SCREEN)
    const distPath = path.join(__dirname, "..", "dist", "public");

    if (!fs.existsSync(distPath)) {
      throw new Error(`Build output missing at ${distPath}`);
    }

    // Serve JS / CSS / images
    app.use(express.static(distPath));

    // SPA fallback — IMPORTANT: must be LAST
    app.get("*", (req, res) => {
      if (req.path.includes(".")) {
        return res.status(404).end();
      }
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  const port = Number(process.env.PORT) || 3000;
  app.listen(port, "0.0.0.0", () => {
    log(`serving on port ${port}`);
  });
})();