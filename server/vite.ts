import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, type ViteDevServer } from "vite";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const viteLogger = {
  hasWarned: false,
  info: (msg: string) => {
    console.log(msg);
  },
  warn: (msg: string) => {
    viteLogger.hasWarned = true;
    console.warn(msg);
  },
  warnOnce: (msg: string) => {
    if (viteLogger.hasWarned) return;
    viteLogger.hasWarned = true;
    console.warn(msg);
  },
  error: (msg: string) => {
    console.error(msg);
  },
  clearScreen: () => {},
  hasErrorLogged: (_error: Error) => false,
};

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express) {
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/f4257b34-1dc4-4061-84a5-733cc267b72d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'server/vite.ts:42',message:'setupVite called',data:{},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H2'})}).catch(()=>{});
  // #endregion
  
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
    customLogger: viteLogger,
  });

  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/f4257b34-1dc4-4061-84a5-733cc267b72d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'server/vite.ts:52',message:'Vite server created',data:{},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H2'})}).catch(()=>{});
  // #endregion

  app.use(vite.middlewares);
  
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/f4257b34-1dc4-4061-84a5-733cc267b72d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'server/vite.ts:59',message:'Vite middlewares added',data:{},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H2'})}).catch(()=>{});
  // #endregion
  
  app.use(async (req, res, next) => {
    const url = req.originalUrl;
    
    // #region agent log
    const handlerData = {location:'server/vite.ts:67',message:'HTML handler invoked',data:{url:url,method:req.method},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H2,H3'};fetch('http://127.0.0.1:7242/ingest/f4257b34-1dc4-4061-84a5-733cc267b72d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(handlerData)}).catch(()=>{});
    // #endregion

    try {
      const clientTemplate = path.resolve(__dirname, "..", "client", "index.html");
      
      // #region agent log
      const templateData = {location:'server/vite.ts:75',message:'Reading template',data:{clientTemplate:clientTemplate},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H3'};fetch('http://127.0.0.1:7242/ingest/f4257b34-1dc4-4061-84a5-733cc267b72d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(templateData)}).catch(()=>{});
      // #endregion

      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      
      // #region agent log
      const readData = {location:'server/vite.ts:82',message:'Template read successfully',data:{templateLength:template.length},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H3'};fetch('http://127.0.0.1:7242/ingest/f4257b34-1dc4-4061-84a5-733cc267b72d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(readData)}).catch(()=>{});
      // #endregion
      
      template = await vite.transformIndexHtml(url, template);
      
      // #region agent log
      const transformData = {location:'server/vite.ts:89',message:'Template transformed',data:{transformedLength:template.length},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H3'};fetch('http://127.0.0.1:7242/ingest/f4257b34-1dc4-4061-84a5-733cc267b72d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(transformData)}).catch(()=>{});
      // #endregion

      res.status(200).set({ "Content-Type": "text/html" }).end(template);
      
      // #region agent log
      const sentData = {location:'server/vite.ts:96',message:'HTML sent to client',data:{statusCode:200},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H3'};fetch('http://127.0.0.1:7242/ingest/f4257b34-1dc4-4061-84a5-733cc267b72d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(sentData)}).catch(()=>{});
      // #endregion
    } catch (e) {
      // #region agent log
      const errData = {location:'server/vite.ts:102',message:'Error in HTML handler',data:{errorMessage:(e as Error).message,errorStack:(e as Error).stack},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H3'};fetch('http://127.0.0.1:7242/ingest/f4257b34-1dc4-4061-84a5-733cc267b72d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(errData)}).catch(()=>{});
      // #endregion
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "..", "dist", "public");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  // 1️⃣ Serve static assets FIRST
  app.use(express.static(distPath));

  // 2️⃣ SPA fallback ONLY for non-file routes
  app.use((req, res, next) => {
    if (req.path.includes(".")) {
      return next(); // let 404 happen for missing assets
    }

    res.sendFile(path.join(distPath, "index.html"));
  });
}
