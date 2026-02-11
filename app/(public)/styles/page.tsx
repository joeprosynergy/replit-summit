import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/seo";
import { fetchPageContent } from "@/lib/supabase/server";
import { stylesDefaults } from "@/data/defaults/stylesDefaults";
import { getCategoryJsonLd, getBreadcrumbJsonLd, JsonLdScript } from "@/lib/structuredData";
import StylesPageClient from "./StylesPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchPageContent("styles");
  const content = data?.mainContent as Record<string, any> | null;

  return {
    title: { absolute: content?.metaTitle || stylesDefaults.metaTitle },
    description: content?.metaDescription || stylesDefaults.metaDescription,
    alternates: {
      canonical: "https://summitbuildings.com/styles",
    },
    openGraph: {
      title: content?.metaTitle || stylesDefaults.metaTitle,
      description: content?.metaDescription || stylesDefaults.metaDescription,
      url: "https://summitbuildings.com/styles",
      images: [OG_IMAGE],
    },
  };
}

export default async function StylesPage() {
  const data = await fetchPageContent("styles");
  const cmsContent = data?.mainContent as Record<string, any> | null;

  const initialContent = cmsContent
    ? { ...stylesDefaults, ...cmsContent }
    : stylesDefaults;

  return (
    <>
      <JsonLdScript data={getBreadcrumbJsonLd([
        { name: "Home", url: "/" },
        { name: "Styles", url: "/styles" },
      ])} />
      <JsonLdScript
        data={getCategoryJsonLd({
          name: initialContent.metaTitle,
          description: initialContent.metaDescription,
          url: "/styles",
          items: [
            { name: "Utility Style", url: "/styles/utility" },
            { name: "Barn Style", url: "/styles/barn" },
            { name: "Modern Style", url: "/styles/modern" },
            { name: "Greenhouse", url: "/styles/greenhouse" },
            { name: "Animal Shelters", url: "/styles/animal-shelters" },
          ],
        })}
      />
      <StylesPageClient initialContent={initialContent} />
    </>
  );
}
