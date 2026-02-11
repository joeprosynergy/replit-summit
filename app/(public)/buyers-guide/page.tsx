import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/seo";
import { fetchPageContent } from "@/lib/supabase/server";
import { buyersGuideDefaults } from "@/data/defaults/buyersGuideDefaults";
import BuyersGuidePageClient from "./BuyersGuidePageClient";

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchPageContent("buyers-guide");
  const content = data?.mainContent as Record<string, any> | null;

  return {
    title: { absolute: content?.metaTitle || buyersGuideDefaults.metaTitle },
    description:
      content?.metaDescription || buyersGuideDefaults.metaDescription,
    alternates: {
      canonical: "https://summitbuildings.com/buyers-guide",
    },
    openGraph: {
      title: content?.metaTitle || buyersGuideDefaults.metaTitle,
      description:
        content?.metaDescription || buyersGuideDefaults.metaDescription,
      url: "https://summitbuildings.com/buyers-guide",
      images: [OG_IMAGE],
    },
  };
}

export default async function BuyersGuidePage() {
  const data = await fetchPageContent("buyers-guide");
  const cmsContent = data?.mainContent as Record<string, any> | null;

  const initialContent = cmsContent
    ? { ...buyersGuideDefaults, ...cmsContent }
    : buyersGuideDefaults;

  return <BuyersGuidePageClient initialContent={initialContent} />;
}
