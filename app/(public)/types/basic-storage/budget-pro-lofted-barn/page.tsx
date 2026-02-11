import { Suspense } from "react";
import type { Metadata } from "next";
import { fetchPageContent } from "@/lib/supabase/server";
import { budgetProLoftedBarnDefaults, budgetProLoftedBarnConfig } from "@/data/defaults/budgetProLoftedBarnDefaults";
import { getProductJsonLd, getBreadcrumbJsonLd, JsonLdScript } from "@/lib/structuredData";
import { OG_IMAGE } from "@/lib/seo";
import BudgetProLoftedBarnPageClient from "./BudgetProLoftedBarnPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchPageContent("budget-pro-lofted-barn");
  const content = data?.mainContent as Record<string, any> | null;

  return {
    title: { absolute: content?.metaTitle || budgetProLoftedBarnDefaults.metaTitle },
    description: content?.metaDescription || budgetProLoftedBarnDefaults.metaDescription,
    alternates: {
      canonical: "https://summitbuildings.com/types/basic-storage/budget-pro-lofted-barn",
    },
    openGraph: {
      title: content?.metaTitle || budgetProLoftedBarnDefaults.metaTitle,
      description: content?.metaDescription || budgetProLoftedBarnDefaults.metaDescription,
      url: "https://summitbuildings.com/types/basic-storage/budget-pro-lofted-barn",
      images: [OG_IMAGE],
    },
  };
}

export default async function BudgetProLoftedBarnPage() {
  const data = await fetchPageContent("budget-pro-lofted-barn");
  const cmsContent = data?.mainContent as Record<string, any> | null;

  const initialContent = cmsContent
    ? { ...budgetProLoftedBarnDefaults, ...cmsContent }
    : budgetProLoftedBarnDefaults;

  return (
    <>
      <JsonLdScript data={getBreadcrumbJsonLd([
        { name: "Home", url: "/" },
        { name: "Our Models", url: "/types" },
        { name: "Basic Storage", url: "/types/basic-storage" },
        { name: "Budget Pro Lofted Barn", url: "/types/basic-storage/budget-pro-lofted-barn" },
      ])} />
      <JsonLdScript data={getProductJsonLd({
        name: initialContent.metaTitle,
        description: initialContent.metaDescription,
        image: initialContent.heroImage,
        url: "/types/basic-storage/budget-pro-lofted-barn",
        category: "Basic Storage",
      })} />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-pulse text-muted-foreground">Loading...</div></div>}>
        <BudgetProLoftedBarnPageClient initialContent={initialContent} config={budgetProLoftedBarnConfig} />
      </Suspense>
    </>
  );
}
