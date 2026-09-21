import { Suspense } from "react";
import type { Metadata } from "next";
import { fetchPageContent } from "@/lib/supabase/server";
import { economyShedDefaults } from "@/data/defaults/economyShedDefaults";
import { getProductJsonLdFromContent, getBreadcrumbJsonLd, JsonLdScript } from "@/lib/structuredData";
import { OG_IMAGE } from "@/lib/seo";
import EconomyShedPageClient from "./EconomyShedPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchPageContent("economy-shed");
  const content = data?.mainContent as Record<string, any> | null;

  return {
    title: { absolute: content?.metaTitle || economyShedDefaults.metaTitle },
    description: content?.metaDescription || economyShedDefaults.metaDescription,
    alternates: {
      canonical: "https://summitbuildings.com/styles/economy-shed",
    },
    openGraph: {
      title: content?.metaTitle || economyShedDefaults.metaTitle,
      description: content?.metaDescription || economyShedDefaults.metaDescription,
      url: "https://summitbuildings.com/styles/economy-shed",
      images: [OG_IMAGE],
    },
  };
}

export default async function EconomyShedPage() {
  const data = await fetchPageContent("economy-shed");
  const cmsContent = data?.mainContent as Record<string, any> | null;

  const initialContent = cmsContent
    ? { ...economyShedDefaults, ...cmsContent }
    : economyShedDefaults;

  return (
    <>
      <JsonLdScript data={getBreadcrumbJsonLd([
        { name: "Home", url: "/" },
        { name: "Building Styles", url: "/styles" },
        { name: "Economy Shed", url: "/styles/economy-shed" },
      ])} />
      <JsonLdScript data={getProductJsonLdFromContent(initialContent, {
        url: "/styles/economy-shed",
        category: "Basic Storage",
      })} />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-pulse text-muted-foreground">Loading...</div></div>}>
        <EconomyShedPageClient initialContent={initialContent} />
      </Suspense>
    </>
  );
}
