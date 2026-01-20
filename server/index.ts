import express from "express";
import { registerRoutes } from "./routes";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));

// API routes first
registerRoutes(app);

// ---- SERVE FRONTEND ----
const isDev = process.env.NODE_ENV !== "production";

async function startServer() {
  // #region agent log
  const startData = {location:'server/index.ts:15',message:'startServer called',data:{isDev:isDev},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H2'};
  fetch('http://127.0.0.1:7242/ingest/f4257b34-1dc4-4061-84a5-733cc267b72d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(startData)}).catch(()=>{});
  // #endregion
  
  if (isDev) {
    // Development: Use Vite dev server
    const { setupVite } = await import("./vite");
    await setupVite(app);
    console.log("🔧 Vite dev server middleware enabled");
    // #region agent log
    const viteData = {location:'server/index.ts:26',message:'Vite setup complete',data:{},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H2'};
    fetch('http://127.0.0.1:7242/ingest/f4257b34-1dc4-4061-84a5-733cc267b72d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(viteData)}).catch(()=>{});
    // #endregion
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
    // #region agent log
    const errData = {location:'server/index.ts:45',message:'Error handler caught error',data:{errorMessage:err && err.message,errorStack:err && err.stack},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H2,H3'};
    fetch('http://127.0.0.1:7242/ingest/f4257b34-1dc4-4061-84a5-733cc267b72d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(errData)}).catch(()=>{});
    // #endregion
    res.status(500).json({ message: "Internal Server Error" });
  });

  // ---- START SERVER ----
  const port = Number(process.env.PORT) || 5000;
  app.listen(port, "0.0.0.0", () => {
    console.log(`✅ Server running on port ${port}`);
    // #region agent log
    const logData = {location:'server/index.ts:58',message:'Server listening',data:{port:port,host:'0.0.0.0'},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H5'};
    fetch('http://127.0.0.1:7242/ingest/f4257b34-1dc4-4061-84a5-733cc267b72d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(logData)}).catch(()=>{});
    // #endregion
  });
}

startServer();
