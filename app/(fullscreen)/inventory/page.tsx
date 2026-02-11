import type { Metadata } from "next";
import { Suspense } from "react";
import InventoryPageClient from "./InventoryPageClient";

export const metadata: Metadata = {
  title: { absolute: "Inventory | Summit Portable Buildings" },
  description: "Browse our current inventory of portable buildings available for immediate purchase.",
  alternates: {
    canonical: "https://summitbuildings.com/inventory",
  },
};

export default function InventoryPage() {
  return (
    <Suspense fallback={
      <div className="h-screen w-full flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    }>
      <InventoryPageClient />
    </Suspense>
  );
}
