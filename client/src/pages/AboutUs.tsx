/**
 * AboutUs Page - CMS-First Architecture
 * PUBLIC VERSION: NO admin code bundled
 * 
 * Pattern:
 * - Public users: Get lightweight view component
 * - Admins: Lazy-load editable variant on demand
 */

import { lazy, Suspense } from 'react';
import { useOptionalAdminAuth } from '@/contexts/useOptionalAdminAuth';
import { useCMSContent } from '@/hooks/useCMSContent';
import { aboutUsDefaults } from './defaults/aboutUsDefaults';
import { AboutUsView } from '@/components/AboutUsView';

// Lazy-load admin variant ONLY when needed
const AboutUsEditable = lazy(() => import('./AboutUsEditable'));

export default function AboutUs() {
  const { isAdmin } = useOptionalAdminAuth();
  const { content, isLoading } = useCMSContent(
    'about-us',
    aboutUsDefaults
  );
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-pulse text-lg text-muted-foreground">
            Loading About Us...
          </div>
        </div>
      </div>
    );
  }
  
  // ADMIN: Lazy-load editable version
  // This loads admin-bundle.js chunk ONLY for admins
  if (isAdmin) {
    return (
      <Suspense fallback={<AboutUsView content={content} />}>
        <AboutUsEditable initialContent={content} />
      </Suspense>
    );
  }
  
  // PUBLIC: Pure view component (NO admin code in bundle)
  return <AboutUsView content={content} />;
}
