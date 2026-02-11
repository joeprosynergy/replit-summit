import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/seo";
import { fetchPageContent } from "@/lib/supabase/server";
import { deluxeStorageCabinsDefaults } from "@/data/defaults/deluxeStorageCabinsDefaults";
import { getCategoryJsonLd, getBreadcrumbJsonLd, JsonLdScript } from "@/lib/structuredData";
import DeluxeStorageCabinsPageClient from "./DeluxeStorageCabinsPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchPageContent("deluxe-storage-cabins");
  const content = data?.mainContent as Record<string, any> | null;

  return {
    title: { absolute: content?.metaTitle || deluxeStorageCabinsDefaults.metaTitle },
    description: content?.metaDescription || deluxeStorageCabinsDefaults.metaDescription,
    alternates: {
      canonical: "https://summitbuildings.com/types/deluxe-storage-cabins",
    },
    openGraph: {
      title: content?.metaTitle || deluxeStorageCabinsDefaults.metaTitle,
      description: content?.metaDescription || deluxeStorageCabinsDefaults.metaDescription,
      url: "https://summitbuildings.com/types/deluxe-storage-cabins",
      images: [OG_IMAGE],
    },
  };
}

export default async function DeluxeStorageCabinsPage() {
  const data = await fetchPageContent("deluxe-storage-cabins");
  const cmsContent = data?.mainContent as Record<string, any> | null;

  const initialContent = cmsContent
    ? { ...deluxeStorageCabinsDefaults, ...cmsContent }
    : deluxeStorageCabinsDefaults;

  return (
    <>
      <JsonLdScript data={getBreadcrumbJsonLd([
        { name: "Home", url: "/" },
        { name: "Our Models", url: "/types" },
        { name: "Deluxe Storage & Cabins", url: "/types/deluxe-storage-cabins" },
      ])} />
      <JsonLdScript
        data={getCategoryJsonLd({
          name: initialContent.metaTitle,
          description: initialContent.metaDescription,
          url: "/types/deluxe-storage-cabins",
          items: [
            { name: "Pro Utility Shed", url: "/types/deluxe-storage-cabins/pro-utility-shed" },
            { name: "Pro Lofted Barn", url: "/types/deluxe-storage-cabins/pro-lofted-barn" },
            { name: "Cabin", url: "/types/deluxe-storage-cabins/cabin" },
            { name: "Barn Cabin", url: "/types/deluxe-storage-cabins/barn-cabin" },
            { name: "Modern Shed", url: "/types/deluxe-storage-cabins/modern-shed" },
          ],
        })}
      />
      <DeluxeStorageCabinsPageClient initialContent={initialContent} />
    </>
  );
}
