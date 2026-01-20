/**
 * Pro Lofted Barn Page - Refactored for CMS-First Architecture
 * PUBLIC VERSION: NO admin code bundled
 */

import { lazy, Suspense } from 'react';
import { useOptionalAdminAuth } from '@/contexts/useOptionalAdminAuth';
import { useCMSContent } from '@/hooks/useCMSContent';
import { proLoftedBarnDefaults, proLoftedBarnConfig } from './defaults/proLoftedBarnDefaults';
import { ProductPageView } from '@/components/ProductPageView';
import { ProductPageContent } from './defaults/productPageTypes';

const ProductPageEditable = lazy(() => import('@/components/ProductPageEditable'));

export default function ProLoftedBarn() {
  const { isAdmin } = useOptionalAdminAuth();
  const { content, isLoading } = useCMSContent<ProductPageContent>(
    proLoftedBarnConfig.slug,
    proLoftedBarnDefaults
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-pulse text-lg text-muted-foreground">
            Loading Pro - Lofted Barn...
          </div>
        </div>
      </div>
    );
  }

  if (isAdmin) {
    return (
      <Suspense fallback={<ProductPageView content={content} config={proLoftedBarnConfig} />}>
        <ProductPageEditable initialContent={content} config={proLoftedBarnConfig} />
      </Suspense>
    );
  }

  return <ProductPageView content={content} config={proLoftedBarnConfig} />;
}
