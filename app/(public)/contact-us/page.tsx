import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/seo";
import { fetchPageContent } from "@/lib/supabase/server";
import { contactUsDefaults } from "@/data/defaults/contactUsDefaults";
import ContactUsPageClient from "./ContactUsPageClient";
import { getContactPageJsonLd, JsonLdScript } from "@/lib/structuredData";

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchPageContent("contact-us");
  const content = data?.mainContent as Record<string, any> | null;

  return {
    title: { absolute: content?.metaTitle || contactUsDefaults.metaTitle },
    description:
      content?.metaDescription || contactUsDefaults.metaDescription,
    alternates: {
      canonical: "https://summitbuildings.com/contact-us",
    },
    openGraph: {
      title: content?.metaTitle || contactUsDefaults.metaTitle,
      description:
        content?.metaDescription || contactUsDefaults.metaDescription,
      url: "https://summitbuildings.com/contact-us",
      images: [OG_IMAGE],
    },
  };
}

export default async function ContactUsPage() {
  const data = await fetchPageContent("contact-us");
  const cmsContent = data?.mainContent as Record<string, any> | null;

  const initialContent = cmsContent
    ? { ...contactUsDefaults, ...cmsContent }
    : contactUsDefaults;

  return (
    <>
      <JsonLdScript data={getContactPageJsonLd()} />
      <ContactUsPageClient initialContent={initialContent} />
    </>
  );
}
