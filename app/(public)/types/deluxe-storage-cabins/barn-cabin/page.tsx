import { Suspense } from "react";
import type { Metadata } from "next";
import { fetchPageContent } from "@/lib/supabase/server";
import { barnCabinDefaults, barnCabinConfig } from "@/data/defaults/barnCabinDefaults";
import { getProductJsonLd, JsonLdScript } from "@/lib/structuredData";
import BarnCabinPageClient from "./BarnCabinPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchPageContent("barn-cabin");
  const content = data?.mainContent as Record<string, any> | null;

  return {
    title: { absolute: content?.metaTitle || barnCabinDefaults.metaTitle },
    description: content?.metaDescription || barnCabinDefaults.metaDescription,
    alternates: {
      canonical: "https://summitbuildings.com/types/deluxe-storage-cabins/barn-cabin",
    },
    openGraph: {
      title: content?.metaTitle || barnCabinDefaults.metaTitle,
      description: content?.metaDescription || barnCabinDefaults.metaDescription,
      url: "https://summitbuildings.com/types/deluxe-storage-cabins/barn-cabin",
    },
  };
}

export default async function BarnCabinPage() {
  const data = await fetchPageContent("barn-cabin");
  const cmsContent = data?.mainContent as Record<string, any> | null;

  const initialContent = cmsContent
    ? { ...barnCabinDefaults, ...cmsContent }
    : barnCabinDefaults;

  return (
    <>
      <JsonLdScript data={getProductJsonLd({
        name: initialContent.metaTitle,
        description: initialContent.metaDescription,
        image: initialContent.heroImage,
        url: "/types/deluxe-storage-cabins/barn-cabin",
        category: "Deluxe Storage & Cabins",
      })} />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-pulse text-muted-foreground">Loading...</div></div>}>
        <BarnCabinPageClient initialContent={initialContent} config={barnCabinConfig} />
      </Suspense>
    </>
  );
}
