/**
 * PrivacyPolicy Page - CMS-First Architecture
 * PUBLIC VERSION: NO admin code bundled
 * 
 * Pattern:
 * - Public users: Get lightweight view component
 * - Admins: Lazy-load editable variant on demand
 */

import { lazy, Suspense } from 'react';
import { useOptionalAdminAuth } from '@/contexts/useOptionalAdminAuth';
import { useCMSContent } from '@/hooks/useCMSContent';
import { privacyPolicyDefaults } from './defaults/privacyPolicyDefaults';
import { PrivacyPolicyView } from '@/components/PrivacyPolicyView';

// Lazy-load admin variant ONLY when needed
const PrivacyPolicyEditable = lazy(() => import('./PrivacyPolicyEditable'));

export default function PrivacyPolicy() {
  const { isAdmin } = useOptionalAdminAuth();
  const { content, isLoading } = useCMSContent(
    'privacy-policy',
    privacyPolicyDefaults
  );
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-pulse text-lg text-muted-foreground">
            Loading Privacy Policy...
          </div>
        </div>
      </div>
    );
  }
  
  // ADMIN: Lazy-load editable version
  // This loads admin-bundle.js chunk ONLY for admins
  if (isAdmin) {
    return (
      <Suspense fallback={<PrivacyPolicyView content={content} />}>
        <PrivacyPolicyEditable initialContent={content} />
      </Suspense>
    );
  }
  
  // PUBLIC: Pure view component (NO admin code in bundle)
  return <PrivacyPolicyView content={content} />;
}
