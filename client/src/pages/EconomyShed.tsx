/**
 * Economy Shed Page - Refactored for CMS-First Architecture
 * PUBLIC VERSION: NO admin code bundled
 * 
 * Pattern:
 * - Public users: Get lightweight view component
 * - Admins: Lazy-load editable variant on demand
 */

import { lazy, Suspense } from 'react';
import { useOptionalAdminAuth } from '@/contexts/useOptionalAdminAuth';
import { useCMSContent } from '@/hooks/useCMSContent';
import { economyShedDefaults } from './defaults/economyShedDefaults';
import { EconomyShedView } from '@/components/EconomyShedView';

// Lazy-load admin variant ONLY when needed
const EconomyShedEditable = lazy(() => import('./EconomyShedEditable'));

export default function EconomyShed() {
  const { isAdmin, user } = useOptionalAdminAuth();
  const { content, isLoading, source } = useCMSContent(
    'economy-shed',
    economyShedDefaults
  );
  
  // DEBUG: Check admin status
  console.log('[EconomyShed] Admin status:', { isAdmin, userEmail: user?.email, hasUser: !!user });
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-pulse text-lg text-muted-foreground">
            Loading Economy Shed...
          </div>
        </div>
      </div>
    );
  }
  
  // ADMIN: Lazy-load editable version
  // This loads admin-bundle.js chunk ONLY for admins
  if (isAdmin) {
    console.log('[EconomyShed] Rendering ADMIN editable version');
    return (
      <Suspense fallback={<EconomyShedView content={content} />}>
        <EconomyShedEditable initialContent={content} />
      </Suspense>
    );
  }
  
  // PUBLIC: Pure view component (NO admin code in bundle)
  console.log('[EconomyShed] Rendering PUBLIC view (no editing)');
  return <EconomyShedView content={content} />;
}
