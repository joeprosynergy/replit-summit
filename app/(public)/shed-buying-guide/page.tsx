import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/seo";
import { fetchPageContent } from "@/lib/supabase/server";
import ShedGuidePageClient from "@/components/ShedGuidePageClient";
import { shedGuideDefaults } from "@/data/defaults/shedGuideDefaults";

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchPageContent("shed-buying-guide");
  const content = data?.mainContent as Record<string, any> | null;

  const title = content?.metaTitle || shedGuideDefaults.metaTitle;
  const description = content?.metaDescription || shedGuideDefaults.metaDescription;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: "https://summitbuildings.com/shed-buying-guide",
    },
    openGraph: {
      title,
      description,
      url: "https://summitbuildings.com/shed-buying-guide",
      images: [OG_IMAGE],
    },
  };
}

export default async function ShedBuyingGuidePage() {
  return <ShedGuidePageClient slug="shed-buying-guide" defaults={shedGuideDefaults} />;
}
