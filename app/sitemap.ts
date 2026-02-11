import type { MetadataRoute } from "next";
import { createServerSupabaseAdminClient } from "@/lib/supabase/server";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://summitbuildings.com";

// All static public routes
const staticRoutes = [
  "",
  "/about-us",
  "/contact-us",
  "/financing",
  "/privacy-policy",
  "/buyers-guide",
  "/gallery",
  "/inventory",
  "/3d-configurator",
  "/block-chart",
  // Types (categories)
  "/types",
  "/types/basic-storage",
  "/types/deluxe-storage-cabins",
  "/types/garages-carports",
  // Types (products)
  "/types/basic-storage/economy-shed",
  "/types/basic-storage/budget-pro-lofted-barn",
  "/types/basic-storage/budget-pro-utility",
  "/types/deluxe-storage-cabins/pro-lofted-barn",
  "/types/deluxe-storage-cabins/pro-utility-shed",
  "/types/deluxe-storage-cabins/cabin",
  "/types/deluxe-storage-cabins/barn-cabin",
  "/types/deluxe-storage-cabins/modern-shed",
  "/types/garages-carports/garage",
  "/types/garages-carports/carports",
  // Styles
  "/styles",
  "/styles/utility",
  "/styles/barn",
  "/styles/modern",
  "/styles/animal-shelters",
  "/styles/greenhouse",
  "/blog",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route.startsWith("/types/") ? 0.8 : 0.7,
  }));

  // Dynamic CMS pages from Supabase
  let dynamicEntries: MetadataRoute.Sitemap = [];
  try {
    const supabase = createServerSupabaseAdminClient();
    if (supabase) {
      const { data: pages } = await supabase
        .from("page_content")
        .select("slug, updated_at")
        .not("slug", "in", `(${staticRoutes.filter(r => r).map(r => r.slice(1)).join(",")})`);

      if (pages) {
        // Slugs that should never appear in the sitemap
        const excludedSlugs = new Set([
          "home",
          "types/greenhouse",    // actual page is /styles/greenhouse
          "types/animal-shelters", // actual page is /styles/animal-shelters
          "dealer-locator",       // page no longer exists
          "blog",                 // external blog, not a CMS page
        ]);

        dynamicEntries = pages
          .filter((page) => {
            const slug = page.slug;
            return (
              !excludedSlugs.has(slug) &&
              !slug.startsWith("admin") &&
              !slug.startsWith("cms/")
            );
          })
          .map((page) => ({
            url: `${BASE_URL}/${page.slug}`,
            lastModified: page.updated_at
              ? new Date(page.updated_at)
              : new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.6,
          }));
      }
    }
  } catch (error) {
    console.error("[Sitemap] Error fetching dynamic pages:", error);
  }

  return [...staticEntries, ...dynamicEntries];
}
