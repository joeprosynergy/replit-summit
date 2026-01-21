/**
 * Financing Page - CMS-First Architecture
 * PUBLIC VERSION: NO admin code bundled
 * 
 * Pattern:
 * - Public users: Get lightweight view component
 * - Admins: Lazy-load editable variant on demand
 */

import { lazy, Suspense } from 'react';
import { useOptionalAdminAuth } from '@/contexts/useOptionalAdminAuth';
import { useCMSContent } from '@/hooks/useCMSContent';
import { financingDefaults, type FinancingContent } from '@/pages/defaults/financingDefaults';
import { FinancingView } from '@/components/FinancingView';

// Lazy-load admin variant ONLY when needed
const FinancingEditable = lazy(() => import('./FinancingEditable'));

export default function Financing() {
  const { isAdmin } = useOptionalAdminAuth();
  const { content, isLoading } = useCMSContent<FinancingContent>(
    'financing',
    financingDefaults
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-pulse text-lg text-muted-foreground">
            Loading Financing...
          </div>
        </div>
      </div>
    );
  }

  // ADMIN: Lazy-load editable version
  if (isAdmin) {
    return (
      <Suspense fallback={<FinancingView content={content} />}>
        <FinancingEditable initialContent={content} />
      </Suspense>
    );
  }

  // PUBLIC: Pure view component (NO admin code in bundle)
  return <FinancingView content={content} />;
}
