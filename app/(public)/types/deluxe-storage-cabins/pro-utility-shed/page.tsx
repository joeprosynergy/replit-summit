import { Suspense } from "react";
import type { Metadata } from "next";
import { fetchPageContent } from "@/lib/supabase/server";
import { utilityShedDefaults, utilityShedConfig } from "@/data/defaults/utilityShedDefaults";
import { getProductJsonLd, JsonLdScript } from "@/lib/structuredData";
import UtilityShedPageClient from "./UtilityShedPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchPageContent("utility-shed");
  const content = data?.mainContent as Record<string, any> | null;

  return {
    title: { absolute: content?.metaTitle || utilityShedDefaults.metaTitle },
    description: content?.metaDescription || utilityShedDefaults.metaDescription,
    alternates: {
      canonical: "https://summitbuildings.com/types/deluxe-storage-cabins/pro-utility-shed",
    },
    openGraph: {
      title: content?.metaTitle || utilityShedDefaults.metaTitle,
      description: content?.metaDescription || utilityShedDefaults.metaDescription,
      url: "https://summitbuildings.com/types/deluxe-storage-cabins/pro-utility-shed",
    },
  };
}

export default async function ProUtilityShedPage() {
  const data = await fetchPageContent("utility-shed");
  const cmsContent = data?.mainContent as Record<string, any> | null;

  const initialContent = cmsContent
    ? { ...utilityShedDefaults, ...cmsContent }
    : utilityShedDefaults;

  return (
    <>
      <JsonLdScript data={getProductJsonLd({
        name: initialContent.metaTitle,
        description: initialContent.metaDescription,
        image: initialContent.heroImage,
        url: "/types/deluxe-storage-cabins/pro-utility-shed",
        category: "Deluxe Storage & Cabins",
      })} />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-pulse text-muted-foreground">Loading...</div></div>}>
        <UtilityShedPageClient initialContent={initialContent} config={utilityShedConfig} />
      </Suspense>
    </>
  );
}
