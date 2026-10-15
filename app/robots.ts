import type { MetadataRoute } from "next";

// The site is served on www (non-www redirects to it), so sitemap URLs must be www to return 200 directly.
const BASE_URL = "https://www.summitbuildings.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/*",
          "/auth/*",
          "/signup",
          "/signup/*",
          "/cms/*",
          "/api/*",
          "/block-chart",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
