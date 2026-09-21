/**
 * JSON-LD Structured Data for SEO
 * Provides schema.org structured data for Google rich results.
 */

const SITE_URL = "https://summitbuildings.com";
const LOGO_URL = "https://res.cloudinary.com/dwhwbbbev/image/upload/f_auto,q_auto,w_200/summit-buildings/summit-logo";

const BUSINESS_INFO = {
  name: "Summit Portable Buildings",
  description:
    "Affordable, high quality, hand crafted storage buildings built in the USA. Serving Missouri, Illinois, Kentucky, and Arkansas.",
  phone: "+15737474700",
  phoneDisplay: "573-747-4700",
  email: "ervin@summitbuildings.com",
  address: {
    street: "7336 State Highway 32",
    city: "Farmington",
    state: "MO",
    zip: "63640",
    country: "US",
  },
  geo: {
    latitude: 37.7808,
    longitude: -90.4218,
  },
  areaServed: ["Missouri", "Illinois", "Kentucky", "Arkansas"],
  foundingYear: 2016,
  priceRange: "$$",
};

/** LocalBusiness + Organization schema for homepage */
export function getHomepageJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#business`,
      name: BUSINESS_INFO.name,
      description: BUSINESS_INFO.description,
      url: SITE_URL,
      logo: LOGO_URL,
      image: LOGO_URL,
      telephone: BUSINESS_INFO.phone,
      email: BUSINESS_INFO.email,
      foundingDate: `${BUSINESS_INFO.foundingYear}`,
      priceRange: BUSINESS_INFO.priceRange,
      address: {
        "@type": "PostalAddress",
        streetAddress: BUSINESS_INFO.address.street,
        addressLocality: BUSINESS_INFO.address.city,
        addressRegion: BUSINESS_INFO.address.state,
        postalCode: BUSINESS_INFO.address.zip,
        addressCountry: BUSINESS_INFO.address.country,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: BUSINESS_INFO.geo.latitude,
        longitude: BUSINESS_INFO.geo.longitude,
      },
      areaServed: BUSINESS_INFO.areaServed.map((state) => ({
        "@type": "State",
        name: state,
      })),
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "17:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Saturday",
          opens: "09:00",
          closes: "15:00",
        },
      ],
      sameAs: [],
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: BUSINESS_INFO.name,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: LOGO_URL,
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: BUSINESS_INFO.phone,
        contactType: "sales",
        areaServed: "US",
        availableLanguage: "English",
      },
    },
  ];
}

function absoluteUrl(path: string): string {
  return path.startsWith("http") ? path : `${SITE_URL}${path}`;
}

function productDisplayName(content: Record<string, unknown>): string {
  const meta = typeof content.metaTitle === "string" ? content.metaTitle : "";
  const stripped = meta.replace(/\s*\|\s*Summit Portable Buildings\s*$/i, "").trim();
  if (stripped) return stripped;
  const highlight = typeof content.titleHighlight === "string" ? content.titleHighlight.trim() : "";
  return highlight || "Portable Building";
}

export type ProductSpec = { name: string; value: string };

function nestedProductLabel(item: Record<string, unknown>): string {
  if (typeof item.name === "string" && item.name.trim()) return item.name.trim();
  const id = typeof item.id === "string" ? item.id : "";
  if (id === "carports") return "Carport";
  if (id === "rv-covers") return "RV Cover";
  if (typeof item.highlight === "string" && item.highlight.trim()) {
    return item.highlight.trim();
  }
  return "Specification";
}

/** Feature lines already shown on the page (arrays, nested products, Economy card features). */
export function collectProductSpecs(content: Record<string, unknown>): ProductSpec[] {
  const out: ProductSpec[] = [];
  const seen = new Set<string>();
  const push = (name: string, value: unknown) => {
    if (typeof value !== "string" || !value.trim()) return;
    const trimmed = value.trim();
    const key = `${name}|${trimmed}`;
    if (seen.has(key)) return;
    seen.add(key);
    out.push({ name, value: trimmed });
  };

  if (Array.isArray(content.features)) {
    content.features.forEach((value) => push("Specification", value));
  }
  let i = 1;
  while (content[`feature${i}`]) {
    push("Specification", content[`feature${i}`]);
    i += 1;
  }
  for (const [key, value] of Object.entries(content)) {
    if (/^card\d+Feature\d+$/.test(key)) push("Specification", value);
  }

  if (Array.isArray(content.shelters)) {
    for (const item of content.shelters) {
      if (!item || typeof item !== "object") continue;
      const rec = item as Record<string, unknown>;
      const label = nestedProductLabel(rec);
      if (Array.isArray(rec.features)) {
        rec.features.forEach((value) => push(label, value));
      }
    }
  }
  for (const key of ["carportProduct", "rvProduct"]) {
    const item = content[key];
    if (!item || typeof item !== "object" || Array.isArray(item)) continue;
    const rec = item as Record<string, unknown>;
    const label = nestedProductLabel(rec);
    if (Array.isArray(rec.features)) {
      rec.features.forEach((value) => push(label, value));
    }
  }

  return out;
}

function warrantyPromises(specs: string[]) {
  return specs
    .filter((line) => /warranty/i.test(line))
    .map((line) => {
      const years = line.match(/(\d+)\s*-?\s*year/i);
      return {
        "@type": "WarrantyPromise",
        name: line,
        ...(years && {
          durationOfWarranty: {
            "@type": "QuantitativeValue",
            value: Number(years[1]),
            unitCode: "ANN",
          },
        }),
      };
    });
}

function materialsFromSpecs(specs: string[]): string | undefined {
  const found: string[] = [];
  const blob = specs.join(" ");
  if (/LP SmartSide/i.test(blob)) found.push("LP SmartSide");
  if (/metal siding/i.test(blob)) found.push("Metal siding");
  if (/Advantech|AdvanTech|Advantec/i.test(blob)) found.push("AdvanTech flooring");
  if (/T\s*&\s*G|tongue/i.test(blob) && !found.includes("AdvanTech flooring")) {
    found.push("Tongue and groove flooring");
  }
  return found.length ? found.join(", ") : undefined;
}

function startingPrice(content: Record<string, unknown>): string | undefined {
  const fields = [content.subtitle, content.metaDescription, content.description];
  for (const field of fields) {
    if (typeof field !== "string") continue;
    const match = field.match(/Starting at \$([0-9,]+(?:\.\d+)?)/i);
    if (match) return match[1].replace(/,/g, "");
  }
  return undefined;
}

/** Product schema using the same spec lines the page already shows. */
export function getProductJsonLd(product: {
  name: string;
  description: string;
  image: string;
  url: string;
  category?: string;
  sku?: string;
  specs?: Array<string | ProductSpec>;
  sizes?: string;
  freeDelivery?: boolean;
  price?: string;
}) {
  const specs: ProductSpec[] = (product.specs || [])
    .map((spec) =>
      typeof spec === "string" ? { name: "Specification", value: spec } : spec
    )
    .filter((spec) => spec.value);
  const specValues = specs.map((spec) => spec.value);
  const additionalProperty = [
    ...specs.map((spec) => ({
      "@type": "PropertyValue",
      name: spec.name,
      value: spec.value,
    })),
    ...(product.sizes
      ? [{ "@type": "PropertyValue", name: "Available sizes", value: product.sizes }]
      : []),
    ...(product.freeDelivery
      ? [
          {
            "@type": "PropertyValue",
            name: "Delivery",
            value: "Free delivery within 50 miles",
          },
        ]
      : []),
  ];
  const warranties = warrantyPromises(specValues);
  const material = materialsFromSpecs(specValues);
  const productUrl = absoluteUrl(product.url);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    ...(product.image && { image: absoluteUrl(product.image) }),
    url: productUrl,
    brand: {
      "@type": "Brand",
      name: BUSINESS_INFO.name,
    },
    manufacturer: {
      "@type": "Organization",
      name: BUSINESS_INFO.name,
      url: SITE_URL,
    },
    ...(product.category && { category: product.category }),
    ...(product.sku && { sku: product.sku }),
    ...(material && { material }),
    ...(warranties.length === 1 && { warranty: warranties[0] }),
    ...(warranties.length > 1 && { warranty: warranties }),
    ...(additionalProperty.length && { additionalProperty }),
    offers: {
      "@type": "Offer",
      url: productUrl,
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
      ...(product.price && { price: product.price }),
      areaServed: BUSINESS_INFO.areaServed,
      seller: {
        "@type": "Organization",
        name: BUSINESS_INFO.name,
      },
    },
  };
}

/** Build Product JSON-LD from CMS/default page content. Does not invent specs or prices. */
export function getProductJsonLdFromContent(
  content: object,
  opts: { url: string; category?: string }
) {
  const rec = content as Record<string, unknown>;
  const specs = collectProductSpecs(rec);
  const subtitle = typeof rec.subtitle === "string" ? rec.subtitle : "";
  const sizes = /size/i.test(subtitle) ? subtitle : undefined;
  const blob = [rec.metaDescription, rec.description, rec.importantNote, rec.featureNote]
    .filter((v) => typeof v === "string")
    .join(" ");
  const gallery = Array.isArray(rec.galleryImages) ? rec.galleryImages[0] : null;
  const gallerySrc =
    gallery && typeof gallery === "object" && gallery !== null && "src" in gallery
      ? (gallery as { src?: unknown }).src
      : undefined;
  const image =
    (typeof rec.heroImage === "string" && rec.heroImage) ||
    (typeof rec.galleryImage1 === "string" && rec.galleryImage1) ||
    (typeof gallerySrc === "string" && gallerySrc) ||
    "";
  const description =
    (typeof rec.metaDescription === "string" && rec.metaDescription) ||
    (typeof rec.description === "string" && rec.description) ||
    "";

  return getProductJsonLd({
    name: productDisplayName(rec),
    description,
    image,
    url: opts.url,
    category: opts.category,
    specs,
    sizes,
    freeDelivery: /free delivery/i.test(blob),
    price: startingPrice(rec),
  });
}

/** ItemList schema for category/listing pages */
export function getCategoryJsonLd(category: {
  name: string;
  description: string;
  url: string;
  items: Array<{
    name: string;
    url: string;
    image?: string;
  }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: category.name,
    description: category.description,
    url: category.url.startsWith("http")
      ? category.url
      : `${SITE_URL}${category.url}`,
    numberOfItems: category.items.length,
    itemListElement: category.items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
      ...(item.image && {
        image: item.image.startsWith("http")
          ? item.image
          : `${SITE_URL}${item.image}`,
      }),
    })),
  };
}

/** ContactPage schema */
export function getContactPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Summit Portable Buildings",
    description:
      "Get in touch with Summit Portable Buildings for quotes, questions, and custom storage building inquiries.",
    url: `${SITE_URL}/contact-us`,
    mainEntity: {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#business`,
      name: BUSINESS_INFO.name,
      telephone: BUSINESS_INFO.phone,
      email: BUSINESS_INFO.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: BUSINESS_INFO.address.street,
        addressLocality: BUSINESS_INFO.address.city,
        addressRegion: BUSINESS_INFO.address.state,
        postalCode: BUSINESS_INFO.address.zip,
        addressCountry: BUSINESS_INFO.address.country,
      },
    },
  };
}

/** AboutPage schema */
export function getAboutPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Summit Portable Buildings",
    description:
      "Learn about Summit Portable Buildings — a family-owned company building quality storage solutions since 2016.",
    url: `${SITE_URL}/about-us`,
    mainEntity: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: BUSINESS_INFO.name,
      foundingDate: `${BUSINESS_INFO.foundingYear}`,
      description: BUSINESS_INFO.description,
    },
  };
}

/** BreadcrumbList schema for multi-level product catalog navigation */
export function getBreadcrumbJsonLd(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

/** Helper: renders a JSON-LD script tag for use in Next.js page.tsx */
export function JsonLdScript({ data }: { data: object | object[] }) {
  const jsonLd = Array.isArray(data) ? data : [data];
  return (
    <>
      {jsonLd.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
