/**
 * Contact Us Page - CMS-First Architecture
 * PUBLIC VERSION: NO admin code bundled
 * 
 * Pattern:
 * - Public users: Get lightweight view component
 * - Admins: Lazy-load editable variant on demand
 */

import { lazy, Suspense } from 'react';
import { useOptionalAdminAuth } from '@/contexts/useOptionalAdminAuth';
import { useCMSContent } from '@/hooks/useCMSContent';
import { contactUsDefaults } from './defaults/contactUsDefaults';
import { ContactUsView } from '@/components/ContactUsView';

// Lazy-load admin variant ONLY when needed
const ContactUsEditable = lazy(() => import('./ContactUsEditable'));

export default function ContactUs() {
  const { isAdmin } = useOptionalAdminAuth();
  const { content, isLoading } = useCMSContent(
    'contact-us',
    contactUsDefaults
  );
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-pulse text-lg text-muted-foreground">
            Loading Contact Us...
          </div>
        </div>
      </div>
    );
  }
  
  // ADMIN: Lazy-load editable version
  // This loads admin-bundle.js chunk ONLY for admins
  if (isAdmin) {
    return (
      <Suspense fallback={<ContactUsView content={content} />}>
        <ContactUsEditable initialContent={content} />
      </Suspense>
    );
  }
  
  // PUBLIC: Pure view component (NO admin code in bundle)
  return <ContactUsView content={content} />;
}
