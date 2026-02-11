import { Suspense } from "react";
import type { Metadata } from "next";
import { fetchPageContent } from "@/lib/supabase/server";
import { animalSheltersDefaults } from "@/data/defaults/animalSheltersDefaults";
import { getProductJsonLd, getBreadcrumbJsonLd, JsonLdScript } from "@/lib/structuredData";
import { OG_IMAGE } from "@/lib/seo";
import AnimalSheltersPageClient from "./AnimalSheltersPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchPageContent("animal-shelters");
  const content = data?.mainContent as Record<string, any> | null;

  return {
    title: { absolute: content?.metaTitle || animalSheltersDefaults.metaTitle },
    description: content?.metaDescription || animalSheltersDefaults.metaDescription,
    alternates: {
      canonical: "https://summitbuildings.com/styles/animal-shelters",
    },
    openGraph: {
      title: content?.metaTitle || animalSheltersDefaults.metaTitle,
      description: content?.metaDescription || animalSheltersDefaults.metaDescription,
      url: "https://summitbuildings.com/styles/animal-shelters",
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
      <JsonLdScript data={getProductJsonLd({
        name: initialContent.metaTitle,
        description: initialContent.metaDescription,
        image: initialContent.heroImage,
        url: "/styles/animal-shelters",
        category: "Specialty Buildings",
      })} />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-pulse text-muted-foreground">Loading...</div></div>}>
        <AnimalSheltersPageClient initialContent={initialContent} />
      </Suspense>
    </>
  );
}
