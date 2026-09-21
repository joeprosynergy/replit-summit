import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/seo";
import { fetchPageContent } from "@/lib/supabase/server";
import { financingDefaults } from "@/data/defaults/financingDefaults";
import FinancingPageClient from "../financing/FinancingPageClient";
import { getRentToOwnJsonLd, JsonLdScript } from "@/lib/structuredData";

function rentToOwnCopy(content: Record<string, any> | null) {
  const merged = content
    ? {
        ...financingDefaults,
        ...content,
        rentToOwn: {
          ...financingDefaults.rentToOwn,
          ...(content.rentToOwn || {}),
        },
      }
    : financingDefaults;
  const rto = merged.rentToOwn || financingDefaults.rentToOwn;
  return {
    merged,
    title: `${rto.heading} | Summit Portable Buildings`,
    description: rto.description,
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchPageContent("financing");
  const content = data?.mainContent as Record<string, any> | null;
  const { title, description } = rentToOwnCopy(content);

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: "https://summitbuildings.com/rent-to-own",
    },
    openGraph: {
      title,
      description,
      url: "https://summitbuildings.com/rent-to-own",
      images: [OG_IMAGE],
    },
  };
}

export default async function RentToOwnPage() {
  const data = await fetchPageContent("financing");
  const cmsContent = data?.mainContent as Record<string, any> | null;
  const { merged } = rentToOwnCopy(cmsContent);

  return (
    <>
      <JsonLdScript data={getRentToOwnJsonLd(merged)} />
      <FinancingPageClient initialContent={merged} mode="rent-to-own" />
    </>
  );
}
