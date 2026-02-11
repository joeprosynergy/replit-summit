import { Suspense } from "react";
import type { Metadata } from "next";
import { fetchPageContent } from "@/lib/supabase/server";
import { garageDefaults, garageConfig } from "@/data/defaults/garageDefaults";
import { getProductJsonLd, getBreadcrumbJsonLd, JsonLdScript } from "@/lib/structuredData";
import { OG_IMAGE } from "@/lib/seo";
import GaragePageClient from "./GaragePageClient";

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchPageContent("garage");
  const content = data?.mainContent as Record<string, any> | null;

  return {
    title: { absolute: content?.metaTitle || garageDefaults.metaTitle },
    description: content?.metaDescription || garageDefaults.metaDescription,
    alternates: {
      canonical: "https://summitbuildings.com/types/garages-carports/garage",
    },
    openGraph: {
      title: content?.metaTitle || garageDefaults.metaTitle,
      description: content?.metaDescription || garageDefaults.metaDescription,
      url: "https://summitbuildings.com/types/garages-carports/garage",
      images: [OG_IMAGE],
    },
  };
}

export default async function GaragePage() {
  const data = await fetchPageContent("garage");
  const cmsContent = data?.mainContent as Record<string, any> | null;

  const initialContent = cmsContent
    ? { ...garageDefaults, ...cmsContent }
    : garageDefaults;

  return (
    <>
      <JsonLdScript data={getBreadcrumbJsonLd([
        { name: "Home", url: "/" },
        { name: "Our Models", url: "/types" },
        { name: "Garages & Carports", url: "/types/garages-carports" },
        { name: "Garage", url: "/types/garages-carports/garage" },
      ])} />
      <JsonLdScript data={getProductJsonLd({
        name: initialContent.metaTitle,
        description: initialContent.metaDescription,
        image: initialContent.heroImage,
        url: "/types/garages-carports/garage",
        category: "Garages & Carports",
      })} />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-pulse text-muted-foreground">Loading...</div></div>}>
        <GaragePageClient initialContent={initialContent} config={garageConfig} />
      </Suspense>
    </>
  );
}
