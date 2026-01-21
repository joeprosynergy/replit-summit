/**
 * Modern Shed Page - Refactored for CMS-First Architecture
 * SPECIAL LAYOUT - Has unique "Why" cards and uses with descriptions
 */

import { lazy, Suspense } from 'react';
import { useOptionalAdminAuth } from '@/contexts/useOptionalAdminAuth';
import { useCMSContent } from '@/hooks/useCMSContent';
import { modernShedDefaults, ModernShedContent } from './defaults/modernShedDefaults';
import { ModernShedView } from '@/components/ModernShedView';

// Lazy-load admin component
const ModernShedEditable = lazy(() => import('@/components/ModernShedEditable'));

export default function ModernShed() {
  const { isAdmin } = useOptionalAdminAuth();
  const { content, isLoading } = useCMSContent<ModernShedContent>(
    'modern-shed',
    modernShedDefaults
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-pulse text-lg text-muted-foreground">
            Loading Modern Shed...
          </div>
        </div>
      </div>
    );
  }

  // ADMIN: Lazy-load editable version
  if (isAdmin) {
    return (
      <Suspense fallback={<ModernShedView content={content} />}>
        <ModernShedEditable initialContent={content} />
      </Suspense>
    );
  }

  // PUBLIC: Pure view component
  return <ModernShedView content={content} />;
}
