import type { Metadata } from "next";
import { fetchPageContent } from "@/lib/supabase/server";
import { garagesCarportsDefaults } from "@/data/defaults/garagesCarportsDefaults";
import { getCategoryJsonLd, JsonLdScript } from "@/lib/structuredData";
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
