/**
 * Cabin Page - Refactored for CMS-First Architecture
 * INDIVIDUAL TREATMENT - Uses Cabin-specific View and Editable components
 */

import { lazy, Suspense } from 'react';
import { useOptionalAdminAuth } from '@/contexts/useOptionalAdminAuth';
import { useCMSContent } from '@/hooks/useCMSContent';
import { cabinDefaults, CabinContent } from './defaults/cabinDefaults';
import { CabinView } from '@/components/CabinView';

// Lazy-load admin variant ONLY when needed
const CabinEditable = lazy(() => import('@/components/CabinEditable'));

export default function Cabin() {
  const { isAdmin } = useOptionalAdminAuth();
  const { content, isLoading } = useCMSContent<CabinContent>(
    'cabin',
    cabinDefaults
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-pulse text-lg text-muted-foreground">
            Loading Summit Cabin...
          </div>
        </div>
      </div>
    );
  }

  // ADMIN: Lazy-load editable version
  if (isAdmin) {
    return (
      <Suspense fallback={<CabinView content={content} />}>
        <CabinEditable initialContent={content} />
      </Suspense>
    );
  }

  // PUBLIC: Pure view component (NO admin code in bundle)
  return <CabinView content={content} />;
}
