import { Suspense } from "react";
import type { Metadata } from "next";
import { fetchPageContent } from "@/lib/supabase/server";
import { budgetProUtilityDefaults, budgetProUtilityConfig } from "@/data/defaults/budgetProUtilityDefaults";
import { getProductJsonLd, JsonLdScript } from "@/lib/structuredData";
import BudgetProUtilityPageClient from "./BudgetProUtilityPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchPageContent("budget-pro-utility");
  const content = data?.mainContent as Record<string, any> | null;

  return {
    title: { absolute: content?.metaTitle || budgetProUtilityDefaults.metaTitle },
    description: content?.metaDescription || budgetProUtilityDefaults.metaDescription,
    alternates: {
      canonical: "https://summitbuildings.com/types/basic-storage/budget-pro-utility",
    },
    openGraph: {
      title: content?.metaTitle || budgetProUtilityDefaults.metaTitle,
      description: content?.metaDescription || budgetProUtilityDefaults.metaDescription,
      url: "https://summitbuildings.com/types/basic-storage/budget-pro-utility",
    },
  };
}

export default async function BudgetProUtilityPage() {
  const data = await fetchPageContent("budget-pro-utility");
  const cmsContent = data?.mainContent as Record<string, any> | null;

  const initialContent = cmsContent
    ? { ...budgetProUtilityDefaults, ...cmsContent }
    : budgetProUtilityDefaults;

  return (
    <>
      <JsonLdScript data={getProductJsonLd({
        name: initialContent.metaTitle,
        description: initialContent.metaDescription,
        image: initialContent.heroImage,
        url: "/types/basic-storage/budget-pro-utility",
        category: "Basic Storage",
      })} />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-pulse text-muted-foreground">Loading...</div></div>}>
        <BudgetProUtilityPageClient initialContent={initialContent} config={budgetProUtilityConfig} />
      </Suspense>
    </>
  );
}
