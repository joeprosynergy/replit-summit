import type { Metadata } from "next";
import { fetchPageContent } from "@/lib/supabase/server";
import { garageDefaults, garageConfig } from "@/data/defaults/garageDefaults";
import { getProductJsonLdFromContent, getBreadcrumbJsonLd, JsonLdScript } from "@/lib/structuredData";
import { OG_IMAGE } from "@/lib/seo";
import GaragePageClient from "./GaragePageClient";

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchPageContent("garage");
  const content = data?.mainContent as Record<string, any> | null;

  return {
    title: { absolute: content?.metaTitle || garageDefaults.metaTitle },
    description: content?.metaDescription || garageDefaults.metaDescription,
    alternates: {
      canonical: "https://www.summitbuildings.com/styles/garage",
    },
    openGraph: {
      title: content?.metaTitle || garageDefaults.metaTitle,
      description: content?.metaDescription || garageDefaults.metaDescription,
      url: "https://www.summitbuildings.com/styles/garage",
      images: [OG_IMAGE],
    },
  };
}

export default async function GaragePage() {
  const data = await fetchPageContent("garage");
  const cmsContent = data?.mainContent as Record<string, any> | null;

  const initialContent = cmsContent
    ? { ...garageDefaults, ...cmsContent }
    : garageDefaults;

  return (
    <>
      <JsonLdScript data={getBreadcrumbJsonLd([
        { name: "Home", url: "/" },
        { name: "Building Styles", url: "/styles" },
        { name: "Garage", url: "/styles/garage" },
      ])} />
      <JsonLdScript data={getProductJsonLdFromContent(initialContent, {
        url: "/styles/garage",
        category: "Garages & Carports",
      })} />
      <GaragePageClient initialContent={initialContent} config={garageConfig} />
    </>
  );
}
