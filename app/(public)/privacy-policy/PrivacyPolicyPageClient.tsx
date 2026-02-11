"use client";

import { lazy, Suspense } from "react";
import { useOptionalAdminAuth } from "@/contexts/useOptionalAdminAuth";
import { useCMSContent } from "@/hooks/useCMSContent";
import { PrivacyPolicyView } from "@/components/PrivacyPolicyView";

const PrivacyPolicyEditable = lazy(() => import("@/components/PrivacyPolicyEditable"));

interface PrivacyPolicyPageClientProps {
  initialContent: any;
}

export default function PrivacyPolicyPageClient({
  initialContent,
}: PrivacyPolicyPageClientProps) {
  const { isAdmin } = useOptionalAdminAuth();
  const { content, isLoading } = useCMSContent(
    "privacy-policy",
    initialContent
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (isAdmin) {
    return (
      <Suspense fallback={<PrivacyPolicyView content={content} />}>
        <PrivacyPolicyEditable initialContent={content} />
      </Suspense>
    );
  }

  return <PrivacyPolicyView content={content} />;
}
