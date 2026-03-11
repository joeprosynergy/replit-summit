import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/seo";
import { fetchPageContent } from "@/lib/supabase/server";
import LocationPageClient from "@/components/LocationPageClient";
import { farmingtonDefaults } from "@/data/defaults/locationDefaults";

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchPageContent("farmington-mo");
  const content = data?.mainContent as Record<string, any> | null;

  const title = content?.metaTitle || farmingtonDefaults.metaTitle;
  const description = content?.metaDescription || farmingtonDefaults.metaDescription;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: "https://summitbuildings.com/farmington-mo",
    },
    openGraph: {
      title,
      description,
      url: "https://summitbuildings.com/farmington-mo",
      images: [OG_IMAGE],
    },
  };
}

export default async function FarmingtonPage() {
  return <LocationPageClient slug="farmington-mo" defaults={farmingtonDefaults} />;
}
