import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/seo";
import { fetchPageContent } from "@/lib/supabase/server";
import TraditionalShedV2PageClient from "@/components/TraditionalShedV2PageClient";
import { traditionalShedV2Defaults } from "@/data/defaults/traditionalShedV2Defaults";

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchPageContent("traditional-sheds-v2");
  const content = data?.mainContent as Record<string, any> | null;

  const title = content?.metaTitle || traditionalShedV2Defaults.metaTitle;
  const description = content?.metaDescription || traditionalShedV2Defaults.metaDescription;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: "https://summitbuildings.com/traditional-sheds-v2",
    },
    openGraph: {
      title,
      description,
      url: "https://summitbuildings.com/traditional-sheds-v2",
      images: [OG_IMAGE],
    },
  };
}

export default async function TraditionalShedsV2Page() {
  return <TraditionalShedV2PageClient slug="traditional-sheds-v2" defaults={traditionalShedV2Defaults} />;
}
