import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/seo";
import { fetchPageContent } from "@/lib/supabase/server";
import TraditionalShedV2PageClient from "@/components/TraditionalShedV2PageClient";
import { barnDefaults } from "@/data/defaults/barnDefaults";

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchPageContent("barn");
  const content = data?.mainContent as Record<string, any> | null;

  const title = content?.metaTitle || barnDefaults.metaTitle;
  const description = content?.metaDescription || barnDefaults.metaDescription;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: "https://summitbuildings.com/barn",
    },
    openGraph: {
      title,
      description,
      url: "https://summitbuildings.com/barn",
      images: [OG_IMAGE],
    },
  };
}

export default async function BarnPage() {
  return <TraditionalShedV2PageClient slug="barn" defaults={barnDefaults as any} />;
}
