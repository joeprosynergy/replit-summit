import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/seo";
import { fetchPageContent } from "@/lib/supabase/server";
import { homeDefaults } from "@/data/defaults/homeDefaults";
import HomePageClient from "./HomePageClient";
import { getHomepageJsonLd, JsonLdScript } from "@/lib/structuredData";

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchPageContent("home");
  const content = data?.mainContent as Record<string, any> | null;

  const title = content?.metaTitle || homeDefaults.metaTitle;
  const description = content?.metaDescription || homeDefaults.metaDescription;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: "https://summitbuildings.com",
    },
    openGraph: {
      title,
      description,
      url: "https://summitbuildings.com",
      images: [OG_IMAGE],
    },
  };
}

export default async function HomePage() {
  const data = await fetchPageContent("home");
  const cmsContent = data?.mainContent as Record<string, any> | null;

  const initialContent = cmsContent
    ? { ...homeDefaults, ...cmsContent }
    : homeDefaults;

  return (
    <>
      <JsonLdScript data={getHomepageJsonLd()} />
      <HomePageClient initialContent={initialContent} />
    </>
  );
}
