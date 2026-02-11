/**
 * JSON-LD Structured Data for SEO
 * Provides schema.org structured data for Google rich results.
 */

const SITE_URL = "https://summitbuildings.com";
const LOGO_URL = "https://res.cloudinary.com/dmbzcxslt/image/upload/v1734462395/summit-logo_qfbfod.png";

const BUSINESS_INFO = {
  name: "Summit Portable Buildings",
  description:
    "Affordable, high quality, hand crafted storage buildings built in the USA. Serving Missouri, Illinois, Kentucky, and Arkansas.",
  phone: "+15737474700",
  phoneDisplay: "(573) 747-4700",
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

/** Product schema for individual product pages */
export function getProductJsonLd(product: {
  name: string;
  description: string;
  image: string;
  url: string;
  category?: string;
  sku?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image.startsWith("http")
      ? product.image
      : `${SITE_URL}${product.image}`,
    url: product.url.startsWith("http")
      ? product.url
      : `${SITE_URL}${product.url}`,
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
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
      seller: {
        "@type": "Organization",
        name: BUSINESS_INFO.name,
      },
    },
  };
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
