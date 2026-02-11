"use client";

import { useOptionalAdminAuth } from "@/contexts/useOptionalAdminAuth";
import { useCMSContent } from "@/hooks/useCMSContent";
import { BuyersGuideView } from "@/components/BuyersGuideView";
import BuyersGuideGate from "@/components/BuyersGuideGate";
import type { BuyersGuideContent } from "@/data/defaults/buyersGuideDefaults";

interface BuyersGuidePageClientProps {
  initialContent: any;
}

export default function BuyersGuidePageClient({
  initialContent,
}: BuyersGuidePageClientProps) {
  const { isAdmin } = useOptionalAdminAuth();
  const { content, isLoading } = useCMSContent<BuyersGuideContent>(
    "buyers-guide",
    initialContent
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  // Public users go through the gate; admins bypass it
  if (isAdmin) {
    return <BuyersGuideView content={content} />;
  }

  return (
    <BuyersGuideGate bypassGate={false}>
      <BuyersGuideView content={content} />
    </BuyersGuideGate>
  );
}
