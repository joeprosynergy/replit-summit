import { Suspense } from "react";
import type { Metadata } from "next";
import { fetchPageContent } from "@/lib/supabase/server";
import { modernShedDefaults } from "@/data/defaults/modernShedDefaults";
import { getProductJsonLd, JsonLdScript } from "@/lib/structuredData";
import ModernShedPageClient from "./ModernShedPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchPageContent("modern-shed");
  const content = data?.mainContent as Record<string, any> | null;

  return {
    title: { absolute: content?.metaTitle || modernShedDefaults.metaTitle },
    description: content?.metaDescription || modernShedDefaults.metaDescription,
    alternates: {
      canonical: "https://summitbuildings.com/types/deluxe-storage-cabins/modern-shed",
    },
    openGraph: {
      title: content?.metaTitle || modernShedDefaults.metaTitle,
      description: content?.metaDescription || modernShedDefaults.metaDescription,
      url: "https://summitbuildings.com/types/deluxe-storage-cabins/modern-shed",
    },
  };
}

export default async function ModernShedPage() {
  const data = await fetchPageContent("modern-shed");
  const cmsContent = data?.mainContent as Record<string, any> | null;

  const initialContent = cmsContent
    ? { ...modernShedDefaults, ...cmsContent }
    : modernShedDefaults;

  return (
    <>
      <JsonLdScript data={getProductJsonLd({
        name: initialContent.metaTitle,
        description: initialContent.metaDescription,
        image: initialContent.heroImage,
        url: "/types/deluxe-storage-cabins/modern-shed",
        category: "Deluxe Storage & Cabins",
      })} />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-pulse text-muted-foreground">Loading...</div></div>}>
        <ModernShedPageClient initialContent={initialContent} />
      </Suspense>
    </>
  );
}
