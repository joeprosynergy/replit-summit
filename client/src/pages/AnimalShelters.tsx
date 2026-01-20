/**
 * Animal Shelters Page - Refactored for CMS-First Architecture
 * SPECIAL LAYOUT - Has 3 sub-products (Animal Shelter, Dog Kennel, Chicken Coop)
 */

import { lazy, Suspense } from 'react';
import { useOptionalAdminAuth } from '@/contexts/useOptionalAdminAuth';
import { useCMSContent } from '@/hooks/useCMSContent';
import { animalSheltersDefaults, AnimalSheltersContent } from './defaults/animalSheltersDefaults';
import { AnimalSheltersView } from '@/components/AnimalSheltersView';

// Lazy-load admin component
const AnimalSheltersEditable = lazy(() => import('@/components/AnimalSheltersEditable'));

export default function AnimalShelters() {
  const { isAdmin } = useOptionalAdminAuth();
  const { content, isLoading } = useCMSContent<AnimalSheltersContent>(
    'animal-shelters',
    animalSheltersDefaults
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-pulse text-lg text-muted-foreground">
            Loading Animal Shelters...
          </div>
        </div>
      </div>
    );
  }

  // ADMIN: Lazy-load editable version
  if (isAdmin) {
    return (
      <Suspense fallback={<AnimalSheltersView content={content} />}>
        <AnimalSheltersEditable initialContent={content} />
      </Suspense>
    );
  }

  // PUBLIC: Pure view component
  return <AnimalSheltersView content={content} />;
}
