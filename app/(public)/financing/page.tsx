import type { Metadata } from "next";
import { fetchPageContent } from "@/lib/supabase/server";
import { financingDefaults } from "@/data/defaults/financingDefaults";
import FinancingPageClient from "./FinancingPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchPageContent("financing");
  const content = data?.mainContent as Record<string, any> | null;

  return {
    title: { absolute: content?.metaTitle || financingDefaults.metaTitle },
    description:
      content?.metaDescription || financingDefaults.metaDescription,
    alternates: {
      canonical: "https://summitbuildings.com/financing",
    },
    openGraph: {
      title: content?.metaTitle || financingDefaults.metaTitle,
      description:
        content?.metaDescription || financingDefaults.metaDescription,
      url: "https://summitbuildings.com/financing",
    },
  };
}

export default async function FinancingPage() {
  const data = await fetchPageContent("financing");
  const cmsContent = data?.mainContent as Record<string, any> | null;

  const initialContent = cmsContent
    ? { ...financingDefaults, ...cmsContent }
    : financingDefaults;

  return <FinancingPageClient initialContent={initialContent} />;
}
