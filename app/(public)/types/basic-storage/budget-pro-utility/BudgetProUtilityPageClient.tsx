"use client";

import { useOptionalAdminAuth } from "@/contexts/useOptionalAdminAuth";
import { useCMSContent } from "@/hooks/useCMSContent";
import { ProductPageView } from "@/components/ProductPageView";
import type { ProductPageConfig } from "@/data/defaults/productPageTypes";
import { lazy, Suspense } from "react";

const ProductPageEditable = lazy(() => import("@/components/ProductPageEditable"));

interface BudgetProUtilityPageClientProps {
  initialContent: any;
  config: ProductPageConfig;
}

export default function BudgetProUtilityPageClient({ initialContent, config }: BudgetProUtilityPageClientProps) {
  const { isAdmin } = useOptionalAdminAuth();
  const { content, isLoading } = useCMSContent("budget-pro-utility", initialContent);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (isAdmin) {
    return (
      <Suspense fallback={<ProductPageView content={content} config={config} />}>
        <ProductPageEditable initialContent={content} config={config} />
      </Suspense>
    );
  }

  return <ProductPageView content={content} config={config} />;
}
