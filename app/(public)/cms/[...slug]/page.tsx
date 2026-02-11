import type { Metadata } from "next";
import CmsFirstPage from "@/components/admin-pages/CmsFirstPage";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

interface CmsPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function CmsPage({ params }: CmsPageProps) {
  const { slug } = await params;
  const fullSlug = slug.join("/");

  return <CmsFirstPage slug={fullSlug} />;
}
