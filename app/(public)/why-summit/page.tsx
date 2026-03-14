import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/seo";
import { fetchPageContent } from "@/lib/supabase/server";
import WhySummitPageClient from "@/components/WhySummitPageClient";
import { whySummitDefaults } from "@/data/defaults/whySummitDefaults";

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchPageContent("why-summit");
  const content = data?.mainContent as Record<string, any> | null;

  const title = content?.metaTitle || whySummitDefaults.metaTitle;
  const description = content?.metaDescription || whySummitDefaults.metaDescription;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: "https://summitbuildings.com/why-summit",
    },
    openGraph: {
      title,
      description,
      url: "https://summitbuildings.com/why-summit",
      images: [OG_IMAGE],
    },
  };
}

export default async function WhySummitPage() {
  return <WhySummitPageClient slug="why-summit" defaults={whySummitDefaults} />;
}
