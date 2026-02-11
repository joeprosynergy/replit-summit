import { Suspense } from "react";
import type { Metadata } from "next";
import { fetchPageContent } from "@/lib/supabase/server";
import { economyShedDefaults } from "@/data/defaults/economyShedDefaults";
import { getProductJsonLd, getBreadcrumbJsonLd, JsonLdScript } from "@/lib/structuredData";
import { OG_IMAGE } from "@/lib/seo";
import EconomyShedPageClient from "./EconomyShedPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchPageContent("economy-shed");
  const content = data?.mainContent as Record<string, any> | null;

  return {
    title: { absolute: content?.metaTitle || economyShedDefaults.metaTitle },
    description: content?.metaDescription || economyShedDefaults.metaDescription,
    alternates: {
      canonical: "https://summitbuildings.com/types/basic-storage/economy-shed",
    },
    openGraph: {
      title: content?.metaTitle || economyShedDefaults.metaTitle,
      description: content?.metaDescription || economyShedDefaults.metaDescription,
      url: "https://summitbuildings.com/types/basic-storage/economy-shed",
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
        { name: "Our Models", url: "/types" },
        { name: "Basic Storage", url: "/types/basic-storage" },
        { name: "Economy Shed", url: "/types/basic-storage/economy-shed" },
      ])} />
      <JsonLdScript data={getProductJsonLd({
        name: initialContent.metaTitle,
        description: initialContent.metaDescription,
        image: initialContent.heroImage,
        url: "/types/basic-storage/economy-shed",
        category: "Basic Storage",
      })} />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-pulse text-muted-foreground">Loading...</div></div>}>
        <EconomyShedPageClient initialContent={initialContent} />
      </Suspense>
    </>
  );
}
