/**
 * Greenhouse Page - Refactored for CMS-First Architecture
 * PUBLIC VERSION: NO admin code bundled
 */

import { lazy, Suspense } from 'react';
import { useOptionalAdminAuth } from '@/contexts/useOptionalAdminAuth';
import { useCMSContent } from '@/hooks/useCMSContent';
import { greenhouseDefaults, greenhouseConfig } from './defaults/greenhouseDefaults';
import { ProductPageView } from '@/components/ProductPageView';
import { ProductPageContent } from './defaults/productPageTypes';

const ProductPageEditable = lazy(() => import('@/components/ProductPageEditable'));

export default function Greenhouse() {
  const { isAdmin } = useOptionalAdminAuth();
  const { content, isLoading } = useCMSContent<ProductPageContent>(
    greenhouseConfig.slug,
    greenhouseDefaults
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-pulse text-lg text-muted-foreground">
            Loading Greenhouse...
          </div>
        </div>
      </div>
    );
  }

  if (isAdmin) {
    return (
      <Suspense fallback={<ProductPageView content={content} config={greenhouseConfig} />}>
        <ProductPageEditable initialContent={content} config={greenhouseConfig} />
      </Suspense>
    );
  }

  return <ProductPageView content={content} config={greenhouseConfig} />;
}
