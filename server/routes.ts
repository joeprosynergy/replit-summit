import type { Express } from "express";
import { storage } from "./storage";
import { insertPageContentSchema } from "@shared/schema";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";
import { requireAdminAuth, type AuthenticatedRequest } from "./authMiddleware";

function getSupabaseClient() {
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  
  if (!url || !key) {
    return null;
  }
  
  return createClient(url, key);
}

export function registerRoutes(app: Express): void {
  app.get("/api/page-content/:slug", async (req, res) => {
    const { slug } = req.params;
    const content = await storage.getPageContent(slug);
    if (!content) {
      return res.status(404).json({ error: "Page content not found" });
    }
    res.json(content);
  });

  app.post("/api/page-content", requireAdminAuth, async (req: AuthenticatedRequest, res) => {
    const result = insertPageContentSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.issues });
    }
    const content = await storage.upsertPageContent(result.data);
    res.json(content);
  });

  app.post("/api/cloudinary/upload", requireAdminAuth, async (req: AuthenticatedRequest, res) => {
    try {
      const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
      const apiKey = process.env.CLOUDINARY_API_KEY;
      const apiSecret = process.env.CLOUDINARY_API_SECRET;

      if (!cloudName || !apiKey || !apiSecret) {
        return res.status(500).json({ success: false, error: "Cloudinary credentials not configured" });
      }

      const { imageBase64, imageUrl, publicId, folder } = req.body;
      const fileData = imageBase64 || imageUrl;
      
      if (!fileData) {
        return res.status(400).json({ success: false, error: "No image data provided. Send imageBase64 or imageUrl." });
      }
      if (!publicId) {
        return res.status(400).json({ success: false, error: "publicId is required" });
      }

      const timestamp = Math.floor(Date.now() / 1000);
      const paramsToSign = folder
        ? `folder=${folder}&public_id=${publicId}&timestamp=${timestamp}`
        : `public_id=${publicId}&timestamp=${timestamp}`;

      const signature = crypto
        .createHash("sha1")
        .update(paramsToSign + apiSecret)
        .digest("hex");

      const formData = new FormData();
      formData.append("file", fileData);
      formData.append("public_id", publicId);
      formData.append("timestamp", timestamp.toString());
      formData.append("api_key", apiKey);
      formData.append("signature", signature);
      if (folder) {
        formData.append("folder", folder);
      }

      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: formData }
      );

      const result = await uploadResponse.json() as { 
        error?: { message?: string }; 
        secure_url?: string; 
        public_id?: string; 
        format?: string; 
        width?: number; 
        height?: number 
      };

      if (!uploadResponse.ok) {
        throw new Error(result.error?.message || "Upload failed");
      }

      res.json({
        success: true,
        url: result.secure_url,
        publicId: result.public_id,
        format: result.format,
        width: result.width,
        height: result.height,
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      console.error("Cloudinary upload error:", errorMessage);
      res.status(500).json({ success: false, error: errorMessage });
    }
  });

  // One-time migration: populate canonical layout values for CMS-first pages
  app.post("/api/admin/populate-layout-config/:slug", requireAdminAuth, async (req: AuthenticatedRequest, res) => {
    const { slug } = req.params;
    
    if (!slug) {
      return res.status(400).json({ error: "Slug is required" });
    }

    const supabase = getSupabaseClient();
    if (!supabase) {
      return res.status(500).json({ error: "Database not configured" });
    }

    try {
      // Fetch page_content
      const { data: pageData, error: pageError } = await supabase
        .from("page_content")
        .select("id, layout_config")
        .eq("slug", slug)
        .maybeSingle();

      if (pageError || !pageData) {
        return res.status(404).json({ error: "Page not found" });
      }

      const pageId = pageData.id;

      // Default layout config for page_content
      const defaultLayoutConfig = {
        heroBackground: null,
        heroLayout: "full-width",
        backgroundColor: "#f8f9fa",
        theme: "default",
      };

      // Update page_content.layout_config
      const { error: updatePageError } = await supabase
        .from("page_content")
        .update({ layout_config: defaultLayoutConfig })
        .eq("id", pageId);

      if (updatePageError) {
        console.error("[populate-layout] Failed to update page_content:", updatePageError);
        return res.status(500).json({ error: "Failed to update page layout_config" });
      }

      // Default layout values for sections
      const heroLayoutDefaults = {
        backgroundColor: "hsl(var(--primary) / 0.1)",
        paddingTop: "4rem",
        paddingBottom: "4rem",
        textAlignment: "center",
        layoutVariant: "full-width",
      };

      const ctaLayoutDefaults = {
        backgroundColor: "hsl(var(--primary) / 0.1)",
        paddingTop: "4rem",
        paddingBottom: "4rem",
        textAlignment: "center",
        layoutVariant: "default",
        buttonTarget: "_self",
      };

      // Fetch sections
      const { data: sections, error: sectionsError } = await supabase
        .from("section_content")
        .select("id, section_name, content")
        .eq("page_id", pageId)
        .in("section_name", ["hero", "cta"]);

      if (sectionsError) {
        console.error("[populate-layout] Failed to fetch sections:", sectionsError);
        return res.status(500).json({ error: "Failed to fetch sections" });
      }

      const updates: { sectionName: string; fieldsAdded: string[] }[] = [];

      for (const section of sections || []) {
        const currentContent = section.content || {};
        let layoutDefaults: Record<string, string>;

        if (section.section_name === "hero") {
          layoutDefaults = heroLayoutDefaults;
        } else if (section.section_name === "cta") {
          layoutDefaults = ctaLayoutDefaults;
        } else {
          continue;
        }

        // Merge layout defaults into content (only add missing fields)
        const updatedContent = { ...currentContent };
        const fieldsAdded: string[] = [];

        for (const [key, value] of Object.entries(layoutDefaults)) {
          if (updatedContent[key] === undefined || updatedContent[key] === null) {
            updatedContent[key] = value;
            fieldsAdded.push(key);
          }
        }

        if (fieldsAdded.length > 0) {
          const { error: updateError } = await supabase
            .from("section_content")
            .update({ content: updatedContent })
            .eq("id", section.id);

          if (updateError) {
            console.error(`[populate-layout] Failed to update section ${section.section_name}:`, updateError);
            return res.status(500).json({ error: `Failed to update section ${section.section_name}` });
          }

          updates.push({ sectionName: section.section_name, fieldsAdded });
        }
      }

      console.log(`[populate-layout] Updated ${slug}:`, { layoutConfig: defaultLayoutConfig, sections: updates });

      res.json({
        success: true,
        slug,
        layoutConfig: defaultLayoutConfig,
        sectionsUpdated: updates,
      });
    } catch (err) {
      console.error("[populate-layout] Unexpected error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // CMS-first page endpoint: fetches page_content and section_content by slug
  app.get("/api/cms-page/:slug", async (req, res) => {
    const { slug } = req.params;
    
    if (!slug) {
      return res.status(400).json({ error: "Slug is required" });
    }

    const supabase = getSupabaseClient();
    if (!supabase) {
      return res.status(500).json({ error: "Database not configured" });
    }

    try {
      // Fetch page_content by slug
      const { data: pageData, error: pageError } = await supabase
        .from("page_content")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (pageError) {
        console.error("[cms-page] Error fetching page_content:", pageError);
        return res.status(500).json({ error: "Failed to fetch page content" });
      }

      if (!pageData) {
        return res.status(404).json({ error: "Page not found" });
      }

      const pageId = pageData.id;

      // Fetch section_content by page_id
      const { data: sectionsData, error: sectionsError } = await supabase
  .from("section_content")
  .select("*")
  .eq("page_id", pageId)
  .order("order_index", { ascending: true });

      if (sectionsError) {
        console.error("[cms-page] Error fetching section_content:", sectionsError);
        return res.status(500).json({ error: "Failed to fetch sections" });
      }

      res.json({
        page: pageData,
        sections: sectionsData || [],
      });
    } catch (err) {
      console.error("[cms-page] Unexpected error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/cloudinary/asset-audit", requireAdminAuth, async (req: AuthenticatedRequest, res) => {
    try {
      const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
      const apiKey = process.env.CLOUDINARY_API_KEY;
      const apiSecret = process.env.CLOUDINARY_API_SECRET;

      if (!cloudName || !apiKey || !apiSecret) {
        return res.status(500).json({ error: "Cloudinary credentials not configured" });
      }

      const { assets } = req.body;
      if (!assets || !Array.isArray(assets)) {
        return res.status(400).json({ error: "Assets array is required" });
      }

      const authString = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");
      const cloudinaryResources: any[] = [];
      let nextCursor: string | undefined;

      do {
        const url = new URL(`https://api.cloudinary.com/v1_1/${cloudName}/resources/image`);
        url.searchParams.set("max_results", "500");
        if (nextCursor) {
          url.searchParams.set("next_cursor", nextCursor);
        }

        const response = await fetch(url.toString(), {
          headers: { Authorization: `Basic ${authString}` },
        });

        if (!response.ok) {
          throw new Error(`Cloudinary API error: ${response.status}`);
        }

        const data = await response.json() as { resources?: any[]; next_cursor?: string };
        cloudinaryResources.push(...(data.resources || []));
        nextCursor = data.next_cursor;
      } while (nextCursor);

      const cloudinaryMap = new Map<string, any>();
      cloudinaryResources.forEach((resource) => {
        cloudinaryMap.set(resource.public_id, resource);
        const baseName = resource.public_id.split("/").pop() || "";
        cloudinaryMap.set(baseName, resource);
      });

      const results = assets.map((asset: { path: string; usedIn: string[] }) => {
        const { path, usedIn } = asset;

        if (path.startsWith("http://") || path.startsWith("https://")) {
          const isCloudinary = path.includes("cloudinary.com") || path.includes("res.cloudinary.com");
          return {
            path,
            usedIn,
            status: isCloudinary ? "uploaded" : "external",
            cloudinaryUrl: isCloudinary ? path : undefined,
          };
        }

        const fileName = path.split("/").pop() || "";
        const fileNameWithoutExt = fileName.replace(/\.[^.]+$/, "");

        const matchingResource =
          cloudinaryMap.get(fileNameWithoutExt) ||
          cloudinaryMap.get(fileName) ||
          cloudinaryMap.get(`summit-sheds/${fileNameWithoutExt}`) ||
          cloudinaryMap.get(`assets/${fileNameWithoutExt}`);

        if (matchingResource) {
          return {
            path,
            usedIn,
            status: "uploaded",
            cloudinaryUrl: matchingResource.secure_url,
            cloudinaryPublicId: matchingResource.public_id,
          };
        }

        return { path, usedIn, status: "not_uploaded" };
      });

      const statusOrder: Record<string, number> = { not_uploaded: 0, external: 1, uploaded: 2 };
      results.sort((a: any, b: any) => statusOrder[a.status] - statusOrder[b.status]);

      res.json({
        results,
        cloudinaryCount: cloudinaryResources.length,
        summary: {
          uploaded: results.filter((r: any) => r.status === "uploaded").length,
          not_uploaded: results.filter((r: any) => r.status === "not_uploaded").length,
          external: results.filter((r: any) => r.status === "external").length,
        },
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Internal server error";
      console.error("Asset audit error:", error);
      res.status(500).json({ error: errorMessage });
    }
  });
}
