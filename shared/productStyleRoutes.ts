/**
 * /styles/{slug} is the canonical product URL.
 * Phase 2: next.config rewrites /styles/{slug} onto the existing /types/... page.
 * Phase 3: next.config 301s old public URLs onto /styles/{slug}.
 *
 * Do not redirect /barn — that is the Traditional Shed V2 landing page,
 * not the /styles/barn hub.
 */

export const PRODUCT_STYLE_ROUTES = [
  { slug: "economy-shed", typesPath: "/types/basic-storage/economy-shed" },
  { slug: "budget-pro-utility", typesPath: "/types/basic-storage/budget-pro-utility" },
  { slug: "budget-pro-lofted-barn", typesPath: "/types/basic-storage/budget-pro-lofted-barn" },
  { slug: "pro-utility-shed", typesPath: "/types/deluxe-storage-cabins/pro-utility-shed" },
  { slug: "pro-lofted-barn", typesPath: "/types/deluxe-storage-cabins/pro-lofted-barn" },
  { slug: "cabin", typesPath: "/types/deluxe-storage-cabins/cabin" },
  { slug: "barn-cabin", typesPath: "/types/deluxe-storage-cabins/barn-cabin" },
  { slug: "modern-shed", typesPath: "/types/deluxe-storage-cabins/modern-shed" },
  { slug: "garage", typesPath: "/types/garages-carports/garage" },
  { slug: "carports", typesPath: "/types/garages-carports/carports" },
] as const;

export type ProductSlug = (typeof PRODUCT_STYLE_ROUTES)[number]["slug"];

export function stylesPath(slug: ProductSlug): string {
  return `/styles/${slug}`;
}

export function absoluteStylesUrl(slug: ProductSlug): string {
  return `https://summitbuildings.com/styles/${slug}`;
}

export function stylesPathForTypesPath(typesPath: string): string {
  const row = PRODUCT_STYLE_ROUTES.find((r) => r.typesPath === typesPath);
  return row ? `/styles/${row.slug}` : typesPath;
}

/** Hub pages that must never be treated as product rewrites */
export function isStyleHubPath(path: string): boolean {
  return (
    path === "/styles" ||
    path === "/styles/utility" ||
    path === "/styles/barn" ||
    path === "/styles/modern" ||
    path === "/styles/greenhouse" ||
    path === "/styles/animal-shelters"
  );
}

/** Map a types or styles product href onto /styles/{slug}?from=styles for hub cards */
export function withStylesFromParam(link: string): string {
  const [rawPath, existingQuery] = link.split("?");
  const path = rawPath || link;
  if (isStyleHubPath(path) || (!path.startsWith("/styles/") && !path.startsWith("/types/"))) {
    return link;
  }

  const mapped = stylesPathForTypesPath(path);
  const isProduct = PRODUCT_STYLE_ROUTES.some((r) => `/styles/${r.slug}` === mapped);
  if (!isProduct) return link;

  const params = new URLSearchParams(existingQuery || "");
  if (!params.has("from")) params.set("from", "styles");
  const q = params.toString();
  return q ? `${mapped}?${q}` : mapped;
}

export function productStyleRewrites() {
  return PRODUCT_STYLE_ROUTES.map((r) => ({
    source: `/styles/${r.slug}`,
    destination: r.typesPath,
  }));
}

/** Legacy public aliases that are not `/{product-slug}` or the typesPath. */
export const PRODUCT_STYLE_ALIASES = [
  { source: "/utility-shed", destination: "/styles/pro-utility-shed" },
  { source: "/greenhouse", destination: "/styles/greenhouse" },
  { source: "/animal-shelters", destination: "/styles/animal-shelters" },
  { source: "/types/greenhouse", destination: "/styles/greenhouse" },
  { source: "/types/animal-shelters", destination: "/styles/animal-shelters" },
  { source: "/styles-utility", destination: "/styles/utility" },
  { source: "/styles-barn", destination: "/styles/barn" },
  { source: "/styles-modern", destination: "/styles/modern" },
] as const;

type StyleRedirect = {
  source: string;
  destination: string;
  statusCode: 301;
};

function as301(source: string, destination: string): StyleRedirect {
  return { source, destination, statusCode: 301 };
}

/** Public 301s onto /styles/{slug}. Types category hubs stay 200. */
export function productStyleRedirects(): StyleRedirect[] {
  const fromProducts = PRODUCT_STYLE_ROUTES.flatMap((r) => [
    as301(r.typesPath, `/styles/${r.slug}`),
    as301(`/${r.slug}`, `/styles/${r.slug}`),
  ]);

  const aliases = PRODUCT_STYLE_ALIASES.map((a) => as301(a.source, a.destination));

  // WordPress leftovers — specific rows before the /our-models/:path* catch-all.
  const wordpress: StyleRedirect[] = [
    as301("/our-models/cabin", "/styles/cabin"),
    as301("/our-models/utility-shed", "/styles/pro-utility-shed"),
    as301("/our-models/garage", "/styles/garage"),
    as301("/our-models/tiny-homes", "/types/deluxe-storage-cabins#cabins-tiny-home"),
    as301("/our-models/:path*", "/styles"),
  ];

  return [...fromProducts, ...aliases, ...wordpress];
}
