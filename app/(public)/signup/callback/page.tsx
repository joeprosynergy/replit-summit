import type { Metadata } from "next";
import { Suspense } from "react";
import SignupCallback from "@/components/admin-pages/SignupCallback";

export const metadata: Metadata = {
  title: { absolute: "Sign Up | Summit Portable Buildings" },
  robots: { index: false, follow: false },
};

export default function SignupCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Processing...</div>
      </div>
    }>
      <SignupCallback />
    </Suspense>
  );
}
