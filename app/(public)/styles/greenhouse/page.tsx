import { Suspense } from "react";
import type { Metadata } from "next";
import { fetchPageContent } from "@/lib/supabase/server";
import { greenhouseDefaults, greenhouseConfig } from "@/data/defaults/greenhouseDefaults";
import { getProductJsonLd, getBreadcrumbJsonLd, JsonLdScript } from "@/lib/structuredData";
import { OG_IMAGE } from "@/lib/seo";
import GreenhousePageClient from "./GreenhousePageClient";

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchPageContent("greenhouse");
  const content = data?.mainContent as Record<string, any> | null;

  return {
    title: { absolute: content?.metaTitle || greenhouseDefaults.metaTitle },
    description: content?.metaDescription || greenhouseDefaults.metaDescription,
    alternates: {
      canonical: "https://summitbuildings.com/styles/greenhouse",
    },
    openGraph: {
      title: content?.metaTitle || greenhouseDefaults.metaTitle,
      description: content?.metaDescription || greenhouseDefaults.metaDescription,
      url: "https://summitbuildings.com/styles/greenhouse",
      images: [OG_IMAGE],
    },
  };
}

export default async function GreenhousePage() {
  const data = await fetchPageContent("greenhouse");
  const cmsContent = data?.mainContent as Record<string, any> | null;

  const initialContent = cmsContent
    ? { ...greenhouseDefaults, ...cmsContent }
    : greenhouseDefaults;

  return (
    <>
      <JsonLdScript data={getBreadcrumbJsonLd([
        { name: "Home", url: "/" },
        { name: "Styles", url: "/styles" },
        { name: "Greenhouse", url: "/styles/greenhouse" },
      ])} />
      <JsonLdScript data={getProductJsonLd({
        name: initialContent.metaTitle,
        description: initialContent.metaDescription,
        image: initialContent.heroImage,
        url: "/styles/greenhouse",
        category: "Specialty Buildings",
      })} />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-pulse text-muted-foreground">Loading...</div></div>}>
        <GreenhousePageClient initialContent={initialContent} config={greenhouseConfig} />
      </Suspense>
    </>
  );
}
