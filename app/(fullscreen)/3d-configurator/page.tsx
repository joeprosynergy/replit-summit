import type { Metadata } from "next";
import { Suspense } from "react";
import Configurator3DPageClient from "./Configurator3DPageClient";

export const metadata: Metadata = {
  title: { absolute: "3D Configurator | Summit Portable Buildings" },
  description: "Design your custom portable building with our interactive 3D configurator.",
  alternates: {
    canonical: "https://summitbuildings.com/3d-configurator",
  },
};

export default function Configurator3DPage() {
  return (
    <Suspense fallback={
      <div className="h-screen w-full flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    }>
      <Configurator3DPageClient />
    </Suspense>
  );
}
