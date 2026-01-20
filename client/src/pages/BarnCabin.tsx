/**
 * Barn Cabin (Lofted Cabin) Page - Refactored for CMS-First Architecture
 * PUBLIC VERSION: NO admin code bundled
 */

import { lazy, Suspense } from 'react';
import { useOptionalAdminAuth } from '@/contexts/useOptionalAdminAuth';
import { useCMSContent } from '@/hooks/useCMSContent';
import { barnCabinDefaults, barnCabinConfig } from './defaults/barnCabinDefaults';
import { ProductPageView } from '@/components/ProductPageView';
import { ProductPageContent } from './defaults/productPageTypes';

const ProductPageEditable = lazy(() => import('@/components/ProductPageEditable'));

export default function BarnCabin() {
  const { isAdmin } = useOptionalAdminAuth();
  const { content, isLoading } = useCMSContent<ProductPageContent>(
    barnCabinConfig.slug,
    barnCabinDefaults
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-pulse text-lg text-muted-foreground">
            Loading Lofted Cabin...
          </div>
        </div>
      </div>
    );
  }

  if (isAdmin) {
    return (
      <Suspense fallback={<ProductPageView content={content} config={barnCabinConfig} />}>
        <ProductPageEditable initialContent={content} config={barnCabinConfig} />
      </Suspense>
    );
  }

  return <ProductPageView content={content} config={barnCabinConfig} />;
}
