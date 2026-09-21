import type { MetadataRoute } from "next";
import { createServerSupabaseAdminClient } from "@/lib/supabase/server";
import {
  PRODUCT_STYLE_ROUTES,
  STYLE_HUB_PATHS,
  TYPES_CATEGORY_PATHS,
  sitemapExcludedCmsSlugs,
} from "@/shared/productStyleRoutes";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://summitbuildings.com";

type Freq = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

function entry(
  path: string,
  priority: number,
  changeFrequency: Freq,
  lastModified: Date = new Date(),
): MetadataRoute.Sitemap[number] {
  return {
    url: `${BASE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const core: MetadataRoute.Sitemap = [
    entry("", 1.0, "daily", now),
    entry("/about-us", 0.6, "weekly", now),
    entry("/contact-us", 0.6, "weekly", now),
    entry("/financing", 0.7, "weekly", now),
    entry("/privacy-policy", 0.3, "yearly", now),
    entry("/buyers-guide", 0.6, "weekly", now),
    entry("/gallery", 0.6, "weekly", now),
    entry("/blog", 0.5, "weekly", now),
    entry("/traditional-sheds", 0.6, "weekly", now),
  ];

  const styleHubs: MetadataRoute.Sitemap = STYLE_HUB_PATHS.map((path) =>
    entry(path, path === "/styles" ? 0.9 : 0.85, "weekly", now),
  );

  const products: MetadataRoute.Sitemap = PRODUCT_STYLE_ROUTES.map((r) =>
    entry(`/styles/${r.slug}`, 0.85, "weekly", now),
  );

  const typesBrowse: MetadataRoute.Sitemap = TYPES_CATEGORY_PATHS.map((path) =>
    entry(path, 0.4, "weekly", now),
  );

  const staticEntries = [...core, ...styleHubs, ...products, ...typesBrowse];
  const listed = new Set(staticEntries.map((row) => row.url));
  const excluded = sitemapExcludedCmsSlugs();

  let dynamicEntries: MetadataRoute.Sitemap = [];
  try {
    const supabase = createServerSupabaseAdminClient();
    if (supabase) {
      const { data: pages } = await supabase
        .from("page_content")
        .select("slug, updated_at");

      if (pages) {
        dynamicEntries = pages
          .filter((page) => {
            const slug = page.slug;
            if (!slug || excluded.has(slug)) return false;
            if (slug.startsWith("admin") || slug.startsWith("cms/")) return false;
            if (slug.startsWith("our-models/") || slug.includes("working-copy")) return false;
            const url = `${BASE_URL}/${slug}`;
            return !listed.has(url);
          })
          .map((page) => ({
            url: `${BASE_URL}/${page.slug}`,
            lastModified: page.updated_at ? new Date(page.updated_at) : now,
            changeFrequency: "weekly" as const,
            priority: 0.5,
          }));
      }
    }
  } catch (error) {
    console.error("[Sitemap] Error fetching dynamic pages:", error);
  }

  return [...staticEntries, ...dynamicEntries];
}
