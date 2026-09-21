import { Suspense } from "react";
import type { Metadata } from "next";
import { fetchPageContent } from "@/lib/supabase/server";
import { proLoftedBarnDefaults, proLoftedBarnConfig } from "@/data/defaults/proLoftedBarnDefaults";
import { getProductJsonLdFromContent, getBreadcrumbJsonLd, JsonLdScript } from "@/lib/structuredData";
import { OG_IMAGE } from "@/lib/seo";
import ProLoftedBarnPageClient from "./ProLoftedBarnPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchPageContent("pro-lofted-barn");
  const content = data?.mainContent as Record<string, any> | null;

  return {
    title: { absolute: content?.metaTitle || proLoftedBarnDefaults.metaTitle },
    description: content?.metaDescription || proLoftedBarnDefaults.metaDescription,
    alternates: {
      canonical: "https://summitbuildings.com/styles/pro-lofted-barn",
    },
    openGraph: {
      title: content?.metaTitle || proLoftedBarnDefaults.metaTitle,
      description: content?.metaDescription || proLoftedBarnDefaults.metaDescription,
      url: "https://summitbuildings.com/styles/pro-lofted-barn",
      images: [OG_IMAGE],
    },
  };
}

export default async function ProLoftedBarnPage() {
  const data = await fetchPageContent("pro-lofted-barn");
  const cmsContent = data?.mainContent as Record<string, any> | null;

  const initialContent = cmsContent
    ? { ...proLoftedBarnDefaults, ...cmsContent }
    : proLoftedBarnDefaults;

  return (
    <>
      <JsonLdScript data={getBreadcrumbJsonLd([
        { name: "Home", url: "/" },
        { name: "Building Styles", url: "/styles" },
        { name: "Pro Lofted Barn", url: "/styles/pro-lofted-barn" },
      ])} />
      <JsonLdScript data={getProductJsonLdFromContent(initialContent, {
        url: "/styles/pro-lofted-barn",
        category: "Deluxe Storage & Cabins",
      })} />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-pulse text-muted-foreground">Loading...</div></div>}>
        <ProLoftedBarnPageClient initialContent={initialContent} config={proLoftedBarnConfig} />
      </Suspense>
    </>
  );
}
