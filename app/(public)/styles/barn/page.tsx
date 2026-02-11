import type { Metadata } from "next";
import { fetchPageContent } from "@/lib/supabase/server";
import { stylesBarnDefaults } from "@/data/defaults/stylesBarnDefaults";
import StylesBarnPageClient from "./StylesBarnPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchPageContent("styles-barn");
  const content = data?.mainContent as Record<string, any> | null;

  return {
    title: { absolute: content?.metaTitle || stylesBarnDefaults.metaTitle },
    description: content?.metaDescription || stylesBarnDefaults.metaDescription,
    alternates: {
      canonical: "https://summitbuildings.com/styles/barn",
    },
    openGraph: {
      title: content?.metaTitle || stylesBarnDefaults.metaTitle,
      description: content?.metaDescription || stylesBarnDefaults.metaDescription,
      url: "https://summitbuildings.com/styles/barn",
    },
  };
}

export default async function StylesBarnPage() {
  const data = await fetchPageContent("styles-barn");
  const cmsContent = data?.mainContent as Record<string, any> | null;

  const initialContent = cmsContent
    ? { ...stylesBarnDefaults, ...cmsContent }
    : stylesBarnDefaults;

  return <StylesBarnPageClient initialContent={initialContent} />;
}
