"use client";

import { lazy, Suspense } from "react";
import { useOptionalAdminAuth } from "@/contexts/useOptionalAdminAuth";
import { useCMSContent } from "@/hooks/useCMSContent";
import { ContactUsView } from "@/components/ContactUsView";

const ContactUsEditable = lazy(() => import("@/components/ContactUsEditable"));

interface ContactUsPageClientProps {
  initialContent: any;
}

export default function ContactUsPageClient({
  initialContent,
}: ContactUsPageClientProps) {
  const { isAdmin } = useOptionalAdminAuth();
  const { content, isLoading } = useCMSContent("contact-us", initialContent);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (isAdmin) {
    return (
      <Suspense fallback={<ContactUsView content={content} />}>
        <ContactUsEditable initialContent={content} />
      </Suspense>
    );
  }

  return <ContactUsView content={content} />;
}
