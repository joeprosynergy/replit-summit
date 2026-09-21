import {
  PRODUCT_STYLE_ROUTES,
  STYLE_HUB_PATHS,
  TYPES_CATEGORY_PATHS,
} from "@/shared/productStyleRoutes";

const BASE = "https://summitbuildings.com";

const PRODUCT_NOTES: Record<string, string> = {
  "economy-shed": "Lowest cost per square foot. Metal siding only. Utility or lofted barn.",
  "budget-pro-utility": "A-frame utility. 7 foot 9 inch walls. Sizes 8x8 to 14x40.",
  "budget-pro-lofted-barn": "Gambrel roof with one loft. Affordable barn styling.",
  "pro-utility-shed": "LP SmartSide, 7 foot 9 inch walls, ridge vent, 3/4 inch T&G floor.",
  "pro-lofted-barn": "Best seller. Two lofts, loft ladder, classic barn styling.",
  cabin: "Cabin / tiny home layouts. Finished interior and electrical options.",
  "barn-cabin": "Lofted barn cabin. 50-year siding warranty, 40-year roof warranty.",
  "modern-shed": "Single slope roof. LP SmartSide, 6 inch overhangs.",
  garage: "9x7 insulated overhead door. Floor joists 12 inches on center. Vehicle ready.",
  carports: "Steel carports and RV covers. Hurricane and tornado rated options.",
};

const HUB_NOTES: Record<string, string> = {
  "/styles": "All building styles. Canonical starting point for the catalog.",
  "/styles/utility": "A-frame / utility roof style hub.",
  "/styles/barn": "Gambrel / barn roof style hub. Not the /barn ads page.",
  "/styles/modern": "Single slope / modern roof style hub.",
  "/styles/greenhouse": "Greenhouses.",
  "/styles/animal-shelters": "Animal shelters, dog kennels, chicken coops.",
};

function abs(path: string): string {
  return `${BASE}${path}`;
}

function productLabel(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function GET() {
  const products = PRODUCT_STYLE_ROUTES.map((r) => {
    const path = `/styles/${r.slug}`;
    const note = PRODUCT_NOTES[r.slug] || "Product page.";
    return `- [${productLabel(r.slug)}](${abs(path)}): ${note}`;
  }).join("\n");

  const hubs = STYLE_HUB_PATHS.map((path) => {
    const name =
      path === "/styles"
        ? "All styles"
        : path.split("/").pop()!.replace(/-/g, " ");
    const label = name.replace(/\b\w/g, (c) => c.toUpperCase());
    return `- [${label}](${abs(path)}): ${HUB_NOTES[path] || "Style hub."}`;
  }).join("\n");

  const browse = TYPES_CATEGORY_PATHS.map((path) => {
    const label =
      path === "/types"
        ? "Browse by use"
        : path.replace("/types/", "").replace(/-/g, " ");
    const titled = label.replace(/\b\w/g, (c) => c.toUpperCase());
    return `- [${titled}](${abs(path)}): Secondary browse. Product cards go to /styles/{slug}.`;
  }).join("\n");

  const body = `# Summit Portable Buildings

> Portable storage sheds, barns, cabins, and garages hand-crafted in Farmington, Missouri. Free delivery within 50 miles in Missouri, Illinois, Kentucky, and Arkansas. Phone 573-747-4700.

Canonical product URLs are https://summitbuildings.com/styles/{slug}. Older paths such as /economy-shed and /types/basic-storage/economy-shed redirect there. Live lot inventory is on ShedSuite, not this domain. /barn is a traditional-shed landing page, not the barn style hub.

## Products

${products}

## Building styles

${hubs}

## Company

- [Financing and rent to own](${abs("/financing")}): No credit check rent to own, 90-day payoff, and financed payments.
- [Contact](${abs("/contact-us")}): Lot address, phone, quote form.
- [About](${abs("/about-us")}): Company, warranties, how buildings are built.
- [Buyers guide](${abs("/buyers-guide")}): How to choose a portable building.
- [Traditional A-frame sheds](${abs("/traditional-sheds")}): Utility-style sheds overview.
- [Gallery](${abs("/gallery")}): Photos.

## Optional

${browse}
- [Homepage](${abs("/")}): Farmington dealer, delivery area, start here.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
