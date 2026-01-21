/**
 * Budget Pro - Utility Page - Refactored for CMS-First Architecture
 * PUBLIC VERSION: NO admin code bundled
 */

import { lazy, Suspense } from 'react';
import { useOptionalAdminAuth } from '@/contexts/useOptionalAdminAuth';
import { useCMSContent } from '@/hooks/useCMSContent';
import { budgetProUtilityDefaults, budgetProUtilityConfig } from './defaults/budgetProUtilityDefaults';
import { ProductPageView } from '@/components/ProductPageView';
import { ProductPageContent } from './defaults/productPageTypes';

const ProductPageEditable = lazy(() => import('@/components/ProductPageEditable'));

export default function BudgetProUtility() {
  const { isAdmin } = useOptionalAdminAuth();
  const { content, isLoading } = useCMSContent<ProductPageContent>(
    budgetProUtilityConfig.slug,
    budgetProUtilityDefaults
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-pulse text-lg text-muted-foreground">
            Loading Budget Pro - Utility...
          </div>
        </div>
      </div>
    );
  }

  if (isAdmin) {
    return (
      <Suspense fallback={<ProductPageView content={content} config={budgetProUtilityConfig} />}>
        <ProductPageEditable initialContent={content} config={budgetProUtilityConfig} />
      </Suspense>
    );
  }

  return <ProductPageView content={content} config={budgetProUtilityConfig} />;
}
