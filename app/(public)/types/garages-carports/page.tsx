import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/seo";
import { fetchPageContent } from "@/lib/supabase/server";
import { garagesCarportsDefaults } from "@/data/defaults/garagesCarportsDefaults";
import { getCategoryJsonLd, getBreadcrumbJsonLd, JsonLdScript } from "@/lib/structuredData";
import GaragesCarportsPageClient from "./GaragesCarportsPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchPageContent("garages-carports");
  const content = data?.mainContent as Record<string, any> | null;

  return {
    title: { absolute: content?.metaTitle || garagesCarportsDefaults.metaTitle },
    description: content?.metaDescription || garagesCarportsDefaults.metaDescription,
    alternates: {
      canonical: "https://summitbuildings.com/types/garages-carports",
    },
    openGraph: {
      title: content?.metaTitle || garagesCarportsDefaults.metaTitle,
      description: content?.metaDescription || garagesCarportsDefaults.metaDescription,
      url: "https://summitbuildings.com/types/garages-carports",
      images: [OG_IMAGE],
    },
  };
}

export default async function GaragesCarportsPage() {
  const data = await fetchPageContent("garages-carports");
  const cmsContent = data?.mainContent as Record<string, any> | null;

  const initialContent = cmsContent
    ? { ...garagesCarportsDefaults, ...cmsContent }
    : garagesCarportsDefaults;

  return (
    <>
      <JsonLdScript data={getBreadcrumbJsonLd([
        { name: "Home", url: "/" },
        { name: "Our Models", url: "/types" },
        { name: "Garages & Carports", url: "/types/garages-carports" },
      ])} />
      <JsonLdScript
        data={getCategoryJsonLd({
          name: initialContent.metaTitle,
          description: initialContent.metaDescription,
          url: "/types/garages-carports",
          items: [
            { name: "Garage", url: "/types/garages-carports/garage" },
            { name: "Carports", url: "/types/garages-carports/carports" },
          ],
        })}
      />
      <GaragesCarportsPageClient initialContent={initialContent} />
    </>
  );
}
