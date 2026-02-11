import { Suspense } from "react";
import type { Metadata } from "next";
import { fetchPageContent } from "@/lib/supabase/server";
import { carportsDefaults } from "@/data/defaults/carportsDefaults";
import { getProductJsonLd, JsonLdScript } from "@/lib/structuredData";
import CarportsPageClient from "./CarportsPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchPageContent("carports");
  const content = data?.mainContent as Record<string, any> | null;

  return {
    title: { absolute: content?.metaTitle || carportsDefaults.metaTitle },
    description: content?.metaDescription || carportsDefaults.metaDescription,
    alternates: {
      canonical: "https://summitbuildings.com/types/garages-carports/carports",
    },
    openGraph: {
      title: content?.metaTitle || carportsDefaults.metaTitle,
      description: content?.metaDescription || carportsDefaults.metaDescription,
      url: "https://summitbuildings.com/types/garages-carports/carports",
    },
  };
}

export default async function CarportsPage() {
  const data = await fetchPageContent("carports");
  const cmsContent = data?.mainContent as Record<string, any> | null;

  const initialContent = cmsContent
    ? { ...carportsDefaults, ...cmsContent }
    : carportsDefaults;

  return (
    <>
      <JsonLdScript data={getProductJsonLd({
        name: initialContent.metaTitle,
        description: initialContent.metaDescription,
        image: initialContent.heroImage,
        url: "/types/garages-carports/carports",
        category: "Garages & Carports",
      })} />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-pulse text-muted-foreground">Loading...</div></div>}>
        <CarportsPageClient initialContent={initialContent} />
      </Suspense>
    </>
  );
}
