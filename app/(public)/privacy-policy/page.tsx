import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/seo";
import { fetchPageContent } from "@/lib/supabase/server";
import { privacyPolicyDefaults } from "@/data/defaults/privacyPolicyDefaults";
import PrivacyPolicyPageClient from "./PrivacyPolicyPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchPageContent("privacy-policy");
  const content = data?.mainContent as Record<string, any> | null;

  return {
    title: { absolute: content?.metaTitle || privacyPolicyDefaults.metaTitle },
    description:
      content?.metaDescription || privacyPolicyDefaults.metaDescription,
    alternates: {
      canonical: "https://summitbuildings.com/privacy-policy",
    },
    openGraph: {
      title: content?.metaTitle || privacyPolicyDefaults.metaTitle,
      description:
        content?.metaDescription || privacyPolicyDefaults.metaDescription,
      url: "https://summitbuildings.com/privacy-policy",
      images: [OG_IMAGE],
    },
  };
}

export default async function PrivacyPolicyPage() {
  const data = await fetchPageContent("privacy-policy");
  const cmsContent = data?.mainContent as Record<string, any> | null;

  const initialContent = cmsContent
    ? { ...privacyPolicyDefaults, ...cmsContent }
    : privacyPolicyDefaults;

  return <PrivacyPolicyPageClient initialContent={initialContent} />;
}
