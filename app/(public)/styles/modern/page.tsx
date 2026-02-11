import type { Metadata } from "next";
import { fetchPageContent } from "@/lib/supabase/server";
import { stylesModernDefaults } from "@/data/defaults/stylesModernDefaults";
import StylesModernPageClient from "./StylesModernPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchPageContent("styles-modern");
  const content = data?.mainContent as Record<string, any> | null;

  return {
    title: { absolute: content?.metaTitle || stylesModernDefaults.metaTitle },
    description: content?.metaDescription || stylesModernDefaults.metaDescription,
    alternates: {
      canonical: "https://summitbuildings.com/styles/modern",
    },
    openGraph: {
      title: content?.metaTitle || stylesModernDefaults.metaTitle,
      description: content?.metaDescription || stylesModernDefaults.metaDescription,
      url: "https://summitbuildings.com/styles/modern",
    },
  };
}

export default async function StylesModernPage() {
  const data = await fetchPageContent("styles-modern");
  const cmsContent = data?.mainContent as Record<string, any> | null;

  const initialContent = cmsContent
    ? { ...stylesModernDefaults, ...cmsContent }
    : stylesModernDefaults;

  return <StylesModernPageClient initialContent={initialContent} />;
}
