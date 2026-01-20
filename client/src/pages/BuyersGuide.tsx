/**
 * BuyersGuide Page - CMS-First Architecture
 * PUBLIC VERSION: NO admin code bundled
 * 
 * Pattern:
 * - Public users: Get lightweight view component
 * - Admins: Lazy-load editable variant on demand
 */

import { lazy, Suspense } from 'react';
import { useOptionalAdminAuth } from '@/contexts/useOptionalAdminAuth';
import { useCMSContent } from '@/hooks/useCMSContent';
import { buyersGuideDefaults, type BuyersGuideContent } from '@/pages/defaults/buyersGuideDefaults';
import { BuyersGuideView } from '@/components/BuyersGuideView';

// Lazy-load admin variant ONLY when needed
const BuyersGuideEditable = lazy(() => import('./BuyersGuideEditable'));

export default function BuyersGuide() {
  const { isAdmin } = useOptionalAdminAuth();
  const { content, isLoading } = useCMSContent<BuyersGuideContent>(
    'buyers-guide',
    buyersGuideDefaults
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-pulse text-lg text-muted-foreground">
            Loading Buyer's Guide...
          </div>
        </div>
      </div>
    );
  }

  // ADMIN: Lazy-load editable version
  if (isAdmin) {
    return (
      <Suspense fallback={<BuyersGuideView content={content} />}>
        <BuyersGuideEditable initialContent={content} />
      </Suspense>
    );
  }

  // PUBLIC: Pure view component (NO admin code in bundle)
  return <BuyersGuideView content={content} />;
}
