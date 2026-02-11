import type { Metadata } from "next";
import { fetchPageContent } from "@/lib/supabase/server";
import { homeDefaults } from "@/data/defaults/homeDefaults";
import HomePageClient from "./HomePageClient";
import { getHomepageJsonLd, JsonLdScript } from "@/lib/structuredData";

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchPageContent("home");
  const content = data?.mainContent as Record<string, any> | null;

  return {
    title: { absolute: content?.metaTitle || homeDefaults.metaTitle },
    description: content?.metaDescription || homeDefaults.metaDescription,
    alternates: {
      canonical: "https://summitbuildings.com",
    },
    openGraph: {
      title: content?.metaTitle || homeDefaults.metaTitle,
      description: content?.metaDescription || homeDefaults.metaDescription,
      url: "https://summitbuildings.com",
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
