"use client";

import { useOptionalAdminAuth } from "@/contexts/useOptionalAdminAuth";
import { useCMSContent } from "@/hooks/useCMSContent";
import { ProductPageView } from "@/components/ProductPageView";
import type { ProductPageConfig } from "@/data/defaults/productPageTypes";
import { lazy, Suspense } from "react";

const ProductPageEditable = lazy(() => import("@/components/ProductPageEditable"));

interface GaragePageClientProps {
  initialContent: any;
  config: ProductPageConfig;
}

export default function GaragePageClient({ initialContent, config }: GaragePageClientProps) {
  const { isAdmin } = useOptionalAdminAuth();
  const { content } = useCMSContent("garage", initialContent);

  // Render the server-provided content immediately (initialContent is already the CMS content
  // merged with defaults), so the initial HTML contains the real page instead of "Loading...".
  // useCMSContent still refreshes from the CMS after mount.

  if (isAdmin) {
    return (
      <Suspense fallback={<ProductPageView content={content} config={config} />}>
        <ProductPageEditable initialContent={content} config={config} />
      </Suspense>
    );
  }

  return <ProductPageView content={content} config={config} />;
}
