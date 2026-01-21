/**
 * Utility Shed Page - Refactored for CMS-First Architecture
 * PUBLIC VERSION: NO admin code bundled
 * 
 * Pattern:
 * - Public users: Get lightweight view component
 * - Admins: Lazy-load editable variant on demand
 */

import { lazy, Suspense } from 'react';
import { useOptionalAdminAuth } from '@/contexts/useOptionalAdminAuth';
import { useCMSContent } from '@/hooks/useCMSContent';
import { utilityShedDefaults, utilityShedConfig } from './defaults/utilityShedDefaults';
import { ProductPageView } from '@/components/ProductPageView';
import { ProductPageContent } from './defaults/productPageTypes';

// Lazy-load admin variant ONLY when needed
const ProductPageEditable = lazy(() => import('@/components/ProductPageEditable'));

export default function UtilityShed() {
  const { isAdmin } = useOptionalAdminAuth();
  const { content, isLoading } = useCMSContent<ProductPageContent>(
    utilityShedConfig.slug,
    utilityShedDefaults
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-pulse text-lg text-muted-foreground">
            Loading Pro - Utility Shed...
          </div>
        </div>
      </div>
    );
  }

  // ADMIN: Lazy-load editable version
  if (isAdmin) {
    return (
      <Suspense fallback={<ProductPageView content={content} config={utilityShedConfig} />}>
        <ProductPageEditable initialContent={content} config={utilityShedConfig} />
      </Suspense>
    );
  }

  // PUBLIC: Pure view component (NO admin code in bundle)
  return <ProductPageView content={content} config={utilityShedConfig} />;
}
