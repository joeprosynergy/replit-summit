import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/seo";
import { fetchPageContent } from "@/lib/supabase/server";
import TraditionalShedPageClient from "@/components/TraditionalShedPageClient";
import { traditionalShedDefaults } from "@/data/defaults/traditionalShedDefaults";

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchPageContent("traditional-sheds");
  const content = data?.mainContent as Record<string, any> | null;

  const title = content?.metaTitle || traditionalShedDefaults.metaTitle;
  const description = content?.metaDescription || traditionalShedDefaults.metaDescription;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: "https://summitbuildings.com/traditional-sheds",
    },
    openGraph: {
      title,
      description,
      url: "https://summitbuildings.com/traditional-sheds",
      images: [OG_IMAGE],
    },
  };
}

export default async function TraditionalShedsPage() {
  return <TraditionalShedPageClient slug="traditional-sheds" defaults={traditionalShedDefaults} />;
}
