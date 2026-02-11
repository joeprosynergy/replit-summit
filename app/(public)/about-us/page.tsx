import type { Metadata } from "next";
import { fetchPageContent } from "@/lib/supabase/server";
import { aboutUsDefaults } from "@/data/defaults/aboutUsDefaults";
import AboutUsPageClient from "./AboutUsPageClient";
import { getAboutPageJsonLd, JsonLdScript } from "@/lib/structuredData";

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchPageContent("about-us");
  const content = data?.mainContent as Record<string, any> | null;

  return {
    title: { absolute: content?.metaTitle || aboutUsDefaults.metaTitle },
    description:
      content?.metaDescription || aboutUsDefaults.metaDescription,
    alternates: {
      canonical: "https://summitbuildings.com/about-us",
    },
    openGraph: {
      title: content?.metaTitle || aboutUsDefaults.metaTitle,
      description:
        content?.metaDescription || aboutUsDefaults.metaDescription,
      url: "https://summitbuildings.com/about-us",
    },
  };
}

export default async function AboutUsPage() {
  const data = await fetchPageContent("about-us");
  const cmsContent = data?.mainContent as Record<string, any> | null;

  // Merge CMS content with defaults (CMS wins)
  const initialContent = cmsContent
    ? { ...aboutUsDefaults, ...cmsContent }
    : aboutUsDefaults;

  return (
    <>
      <JsonLdScript data={getAboutPageJsonLd()} />
      <AboutUsPageClient initialContent={initialContent} />
    </>
  );
}
