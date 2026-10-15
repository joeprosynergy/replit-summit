import type { Metadata } from "next";
import { fetchPageContent } from "@/lib/supabase/server";
import { modernShedDefaults } from "@/data/defaults/modernShedDefaults";
import { getProductJsonLdFromContent, getBreadcrumbJsonLd, JsonLdScript } from "@/lib/structuredData";
import { OG_IMAGE } from "@/lib/seo";
import ModernShedPageClient from "./ModernShedPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchPageContent("modern-shed");
  const content = data?.mainContent as Record<string, any> | null;

  return {
    title: { absolute: content?.metaTitle || modernShedDefaults.metaTitle },
    description: content?.metaDescription || modernShedDefaults.metaDescription,
    alternates: {
      canonical: "https://www.summitbuildings.com/styles/modern-shed",
    },
    openGraph: {
      title: content?.metaTitle || modernShedDefaults.metaTitle,
      description: content?.metaDescription || modernShedDefaults.metaDescription,
      url: "https://www.summitbuildings.com/styles/modern-shed",
      images: [OG_IMAGE],
    },
  };
}

export default async function ModernShedPage() {
  const data = await fetchPageContent("modern-shed");
  const cmsContent = data?.mainContent as Record<string, any> | null;

  const initialContent = cmsContent
    ? { ...modernShedDefaults, ...cmsContent }
    : modernShedDefaults;

  return (
    <>
      <JsonLdScript data={getBreadcrumbJsonLd([
        { name: "Home", url: "/" },
        { name: "Building Styles", url: "/styles" },
        { name: "Modern Shed", url: "/styles/modern-shed" },
      ])} />
      <JsonLdScript data={getProductJsonLdFromContent(initialContent, {
        url: "/styles/modern-shed",
        category: "Deluxe Storage & Cabins",
      })} />
      <ModernShedPageClient initialContent={initialContent} />
    </>
  );
}
