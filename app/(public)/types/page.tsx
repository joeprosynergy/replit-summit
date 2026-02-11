import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/seo";
import { fetchPageContent } from "@/lib/supabase/server";
import { ourModelsDefaults } from "@/data/defaults/ourModelsDefaults";
import { getCategoryJsonLd, getBreadcrumbJsonLd, JsonLdScript } from "@/lib/structuredData";
import OurModelsPageClient from "./OurModelsPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchPageContent("types");
  const content = data?.mainContent as Record<string, any> | null;

  return {
    title: { absolute: content?.metaTitle || ourModelsDefaults.metaTitle },
    description: content?.metaDescription || ourModelsDefaults.metaDescription,
    alternates: {
      canonical: "https://summitbuildings.com/types",
    },
    openGraph: {
      title: content?.metaTitle || ourModelsDefaults.metaTitle,
      description: content?.metaDescription || ourModelsDefaults.metaDescription,
      url: "https://summitbuildings.com/types",
      images: [OG_IMAGE],
    },
  };
}

export default async function OurModelsPage() {
  const data = await fetchPageContent("types");
  const cmsContent = data?.mainContent as Record<string, any> | null;

  const initialContent = cmsContent
    ? { ...ourModelsDefaults, ...cmsContent }
    : ourModelsDefaults;

  return (
    <>
      <JsonLdScript data={getBreadcrumbJsonLd([
        { name: "Home", url: "/" },
        { name: "Our Models", url: "/types" },
      ])} />
      <JsonLdScript
        data={getCategoryJsonLd({
          name: initialContent.metaTitle,
          description: initialContent.metaDescription,
          url: "/types",
          items: [
            { name: "Basic Storage", url: "/types/basic-storage" },
            { name: "Deluxe Storage & Cabins", url: "/types/deluxe-storage-cabins" },
            { name: "Garages & Carports", url: "/types/garages-carports" },
          ],
        })}
      />
      <OurModelsPageClient initialContent={initialContent} />
    </>
  );
}
