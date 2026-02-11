"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function Configurator3DPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleBack = () => {
    // Priority 1: Check query param
    const fromParam = searchParams.get("from");
    if (fromParam) {
      window.location.href = fromParam;
      return;
    }

    // Priority 2: Check document.referrer (for direct/external navigation)
    const referrer = document.referrer;
    if (referrer) {
      try {
        const referrerUrl = new URL(referrer);
        if (referrerUrl.origin === window.location.origin) {
          window.location.href = referrer;
          return;
        }
      } catch {
        // Invalid URL, fall through to default
      }
    }

    // Priority 3: Default to home
    router.push("/");
  };

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden">
      {/* Top Bar */}
      <div className="h-10 min-h-[40px] bg-white border-b border-gray-200 flex items-center px-4">
        <button
          onClick={handleBack}
          className="text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors"
        >
          ← Back to website
        </button>
      </div>

      {/* Iframe Container */}
      <iframe
        src="https://summitbuildings.shedpro.co/"
        className="w-full border-0 flex-1"
        style={{ height: "calc(100vh - 40px)" }}
        loading="lazy"
        allow="fullscreen"
        title="Summit Portable Buildings 3D Configurator"
      />
    </div>
  );
}
