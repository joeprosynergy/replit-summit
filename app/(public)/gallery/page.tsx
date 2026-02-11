import type { Metadata } from "next";
import { fetchPageContent } from "@/lib/supabase/server";
import { galleryDefaults } from "@/data/defaults/galleryDefaults";
import GalleryPageClient from "./GalleryPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchPageContent("gallery");
  const content = data?.mainContent as Record<string, any> | null;

  return {
    title: { absolute: content?.metaTitle || galleryDefaults.metaTitle },
    description: content?.metaDescription || galleryDefaults.metaDescription,
    alternates: {
      canonical: "https://summitbuildings.com/gallery",
    },
    openGraph: {
      title: content?.metaTitle || galleryDefaults.metaTitle,
      description: content?.metaDescription || galleryDefaults.metaDescription,
      url: "https://summitbuildings.com/gallery",
    },
  };
}

export default async function GalleryPage() {
  const data = await fetchPageContent("gallery");
  const cmsContent = data?.mainContent as Record<string, any> | null;

  const initialContent = cmsContent
    ? { ...galleryDefaults, ...cmsContent }
    : galleryDefaults;

  return <GalleryPageClient initialContent={initialContent} />;
}
