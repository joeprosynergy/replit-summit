import type { Metadata } from "next";
import { fetchPageContent } from "@/lib/supabase/server";
import { stylesUtilityDefaults } from "@/data/defaults/stylesUtilityDefaults";
import { getBreadcrumbJsonLd, JsonLdScript } from "@/lib/structuredData";
import { OG_IMAGE } from "@/lib/seo";
import StylesUtilityPageClient from "./StylesUtilityPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchPageContent("styles-utility");
  const content = data?.mainContent as Record<string, any> | null;

  return {
    title: { absolute: content?.metaTitle || stylesUtilityDefaults.metaTitle },
    description: content?.metaDescription || stylesUtilityDefaults.metaDescription,
    alternates: {
      canonical: "https://summitbuildings.com/styles/utility",
    },
    openGraph: {
      title: content?.metaTitle || stylesUtilityDefaults.metaTitle,
      description: content?.metaDescription || stylesUtilityDefaults.metaDescription,
      url: "https://summitbuildings.com/styles/utility",
      images: [OG_IMAGE],
    },
  };
}

export default async function StylesUtilityPage() {
  const data = await fetchPageContent("styles-utility");
  const cmsContent = data?.mainContent as Record<string, any> | null;

  const initialContent = cmsContent
    ? { ...stylesUtilityDefaults, ...cmsContent }
    : stylesUtilityDefaults;

  return (
    <>
      <JsonLdScript data={getBreadcrumbJsonLd([
        { name: "Home", url: "/" },
        { name: "Styles", url: "/styles" },
        { name: "Utility", url: "/styles/utility" },
      ])} />
      <StylesUtilityPageClient initialContent={initialContent} />
    </>
  );
}
