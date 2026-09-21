import { Suspense } from "react";
import type { Metadata } from "next";
import { fetchPageContent } from "@/lib/supabase/server";
import { cabinDefaults } from "@/data/defaults/cabinDefaults";
import { getProductJsonLd, getBreadcrumbJsonLd, JsonLdScript } from "@/lib/structuredData";
import { OG_IMAGE } from "@/lib/seo";
import CabinPageClient from "./CabinPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchPageContent("cabin");
  const content = data?.mainContent as Record<string, any> | null;

  return {
    title: { absolute: content?.metaTitle || cabinDefaults.metaTitle },
    description: content?.metaDescription || cabinDefaults.metaDescription,
    alternates: {
      canonical: "https://summitbuildings.com/styles/cabin",
    },
    openGraph: {
      title: content?.metaTitle || cabinDefaults.metaTitle,
      description: content?.metaDescription || cabinDefaults.metaDescription,
      url: "https://summitbuildings.com/styles/cabin",
      images: [OG_IMAGE],
    },
  };
}

export default async function CabinPage() {
  const data = await fetchPageContent("cabin");
  const cmsContent = data?.mainContent as Record<string, any> | null;

  const initialContent = cmsContent
    ? { ...cabinDefaults, ...cmsContent }
    : cabinDefaults;

  return (
    <>
      <JsonLdScript data={getBreadcrumbJsonLd([
        { name: "Home", url: "/" },
        { name: "Building Styles", url: "/styles" },
        { name: "Cabin", url: "/styles/cabin" },
      ])} />
      <JsonLdScript data={getProductJsonLd({
        name: initialContent.metaTitle,
        description: initialContent.metaDescription,
        image: initialContent.heroImage,
        url: "/styles/cabin",
        category: "Deluxe Storage & Cabins",
      })} />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-pulse text-muted-foreground">Loading...</div></div>}>
        <CabinPageClient initialContent={initialContent} />
      </Suspense>
    </>
  );
}
