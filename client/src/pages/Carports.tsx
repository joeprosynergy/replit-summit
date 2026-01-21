/**
 * Carports Page - Refactored for CMS-First Architecture
 * SPECIAL LAYOUT - Has 2 sub-products (Carports, RV Covers)
 */

import { lazy, Suspense } from 'react';
import { useOptionalAdminAuth } from '@/contexts/useOptionalAdminAuth';
import { useCMSContent } from '@/hooks/useCMSContent';
import { carportsDefaults, CarportsContent } from './defaults/carportsDefaults';
import { CarportsView } from '@/components/CarportsView';

// Lazy-load admin component
const CarportsEditable = lazy(() => import('@/components/CarportsEditable'));

export default function Carports() {
  const { isAdmin } = useOptionalAdminAuth();
  const { content, isLoading } = useCMSContent<CarportsContent>(
    'carports',
    carportsDefaults
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-pulse text-lg text-muted-foreground">
            Loading Carports & RV Covers...
          </div>
        </div>
      </div>
    );
  }

  // ADMIN: Lazy-load editable version
  if (isAdmin) {
    return (
      <Suspense fallback={<CarportsView content={content} />}>
        <CarportsEditable initialContent={content} />
      </Suspense>
    );
  }

  // PUBLIC: Pure view component
  return <CarportsView content={content} />;
}
