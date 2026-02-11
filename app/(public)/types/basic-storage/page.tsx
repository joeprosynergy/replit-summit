import type { Metadata } from "next";
import { fetchPageContent } from "@/lib/supabase/server";
import { basicStorageDefaults } from "@/data/defaults/basicStorageDefaults";
import { getCategoryJsonLd, JsonLdScript } from "@/lib/structuredData";
import BasicStoragePageClient from "./BasicStoragePageClient";

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchPageContent("basic-storage");
  const content = data?.mainContent as Record<string, any> | null;

  return {
    title: { absolute: content?.metaTitle || basicStorageDefaults.metaTitle },
    description: content?.metaDescription || basicStorageDefaults.metaDescription,
    alternates: {
      canonical: "https://summitbuildings.com/types/basic-storage",
    },
    openGraph: {
      title: content?.metaTitle || basicStorageDefaults.metaTitle,
      description: content?.metaDescription || basicStorageDefaults.metaDescription,
      url: "https://summitbuildings.com/types/basic-storage",
    },
  };
}

export default async function BasicStoragePage() {
  const data = await fetchPageContent("basic-storage");
  const cmsContent = data?.mainContent as Record<string, any> | null;

  const initialContent = cmsContent
    ? { ...basicStorageDefaults, ...cmsContent }
    : basicStorageDefaults;

  return (
    <>
      <JsonLdScript
        data={getCategoryJsonLd({
          name: initialContent.metaTitle,
          description: initialContent.metaDescription,
          url: "/types/basic-storage",
          items: [
            { name: "Economy Shed", url: "/types/basic-storage/economy-shed" },
            { name: "Budget Pro Lofted Barn", url: "/types/basic-storage/budget-pro-lofted-barn" },
            { name: "Budget Pro Utility", url: "/types/basic-storage/budget-pro-utility" },
          ],
        })}
      />
      <BasicStoragePageClient initialContent={initialContent} />
    </>
  );
}
