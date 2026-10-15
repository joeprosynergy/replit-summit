import type { Metadata } from "next";
import { fetchPageContent } from "@/lib/supabase/server";
import { animalSheltersDefaults } from "@/data/defaults/animalSheltersDefaults";
import { getProductJsonLdFromContent, getBreadcrumbJsonLd, JsonLdScript } from "@/lib/structuredData";
import { OG_IMAGE } from "@/lib/seo";
import AnimalSheltersPageClient from "./AnimalSheltersPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchPageContent("animal-shelters");
  const content = data?.mainContent as Record<string, any> | null;

  return {
    title: { absolute: content?.metaTitle || animalSheltersDefaults.metaTitle },
    description: content?.metaDescription || animalSheltersDefaults.metaDescription,
    alternates: {
      canonical: "https://www.summitbuildings.com/styles/animal-shelters",
    },
    openGraph: {
      title: content?.metaTitle || animalSheltersDefaults.metaTitle,
      description: content?.metaDescription || animalSheltersDefaults.metaDescription,
      url: "https://www.summitbuildings.com/styles/animal-shelters",
      images: [OG_IMAGE],
    },
  };
}

export default async function AnimalSheltersPage() {
  const data = await fetchPageContent("animal-shelters");
  const cmsContent = data?.mainContent as Record<string, any> | null;

  const initialContent = cmsContent
    ? { ...animalSheltersDefaults, ...cmsContent }
    : animalSheltersDefaults;

  return (
    <>
      <JsonLdScript data={getBreadcrumbJsonLd([
        { name: "Home", url: "/" },
        { name: "Styles", url: "/styles" },
        { name: "Animal Shelters", url: "/styles/animal-shelters" },
      ])} />
      <JsonLdScript data={getProductJsonLdFromContent(initialContent, {
        url: "/styles/animal-shelters",
        category: "Specialty Buildings",
      })} />
      <AnimalSheltersPageClient initialContent={initialContent} />
    </>
  );
}
