import type { Metadata } from "next";
import { fetchPageContent } from "@/lib/supabase/server";
import { cabinDefaults } from "@/data/defaults/cabinDefaults";
import { getProductJsonLdFromContent, getBreadcrumbJsonLd, JsonLdScript } from "@/lib/structuredData";
import { OG_IMAGE } from "@/lib/seo";
import CabinPageClient from "./CabinPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchPageContent("cabin");
  const content = data?.mainContent as Record<string, any> | null;

  return {
    title: { absolute: content?.metaTitle || cabinDefaults.metaTitle },
    description: content?.metaDescription || cabinDefaults.metaDescription,
    alternates: {
      canonical: "https://www.summitbuildings.com/styles/cabin",
    },
    openGraph: {
      title: content?.metaTitle || cabinDefaults.metaTitle,
      description: content?.metaDescription || cabinDefaults.metaDescription,
      url: "https://www.summitbuildings.com/styles/cabin",
      images: [OG_IMAGE],
    },
  };
}

export default async function CabinPage() {
  const data = await fetchPageContent("cabin");
  const cmsContent = data?.mainContent as Record<string, any> | null;

  const initialContent = cmsContent
    ? { ...cabinDefaults, ...cmsContent }
    : cabinDefaults;

  return (
    <>
      <JsonLdScript data={getBreadcrumbJsonLd([
        { name: "Home", url: "/" },
        { name: "Building Styles", url: "/styles" },
        { name: "Cabin", url: "/styles/cabin" },
      ])} />
      <JsonLdScript data={getProductJsonLdFromContent(initialContent, {
        url: "/styles/cabin",
        category: "Deluxe Storage & Cabins",
      })} />
      <CabinPageClient initialContent={initialContent} />
    </>
  );
}
