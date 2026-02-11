import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OG_IMAGE } from "@/lib/seo";
import { fetchPageContent } from "@/lib/supabase/server";
import DynamicPageClient from "./DynamicPageClient";

interface DynamicPageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: DynamicPageProps): Promise<Metadata> {
  const { slug } = await params;
  const fullSlug = slug.join("/");

  const data = await fetchPageContent(fullSlug);
  const content = data?.mainContent as Record<string, any> | null;

  if (!content) {
    return {
      title: "Page Not Found",
    };
  }

  const title = content?.metaTitle || content?.title || content?.heading || "Summit Portable Buildings";
  const description = content?.metaDescription || content?.description || "";

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: `https://summitbuildings.com/${fullSlug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://summitbuildings.com/${fullSlug}`,
      images: [OG_IMAGE],
    },
  };
}

export default async function DynamicPage({ params }: DynamicPageProps) {
  const { slug } = await params;
  const fullSlug = slug.join("/");

  // Try to fetch page data from CMS
  const data = await fetchPageContent(fullSlug);

  if (!data) {
    notFound();
  }

  const cmsContent = data?.mainContent as Record<string, any> | null;

  return <DynamicPageClient slug={fullSlug} initialContent={cmsContent || {}} />;
}
