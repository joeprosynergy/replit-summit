"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * IframePreloader
 *
 * Preloads external iframe content (Inventory, 3D Configurator, Blog)
 * in hidden off-screen iframes after the main page is idle.
 *
 * - Waits 3 seconds + browser idle before loading
 * - Skips preloading on pages that already show these iframes
 * - Hidden iframes warm the browser cache so the real pages load near-instantly
 * - Zero impact on initial page load performance
 */

const PRELOAD_IFRAMES = [
  {
    url: "https://summitportablebuildings.shedsuite.com/821",
    title: "Preload: Inventory",
  },
  {
    url: "https://summitbuildings.shedpro.co/",
    title: "Preload: 3D Configurator",
  },
  {
    url: "https://summitbuildings.superblog.click",
    title: "Preload: Blog",
  },
];

// Pages that already display one of these iframes — don't double-load
const SKIP_PATHS = ["/inventory", "/3d-configurator", "/blog"];

export function IframePreloader() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Don't preload on pages that already show the iframe
    if (SKIP_PATHS.some((p) => pathname.startsWith(p))) return;

    // Wait 3 seconds after mount, then wait for browser idle
    const timer = setTimeout(() => {
      if ("requestIdleCallback" in window) {
        const idleId = requestIdleCallback(() => setShouldLoad(true), {
          timeout: 5000,
        });
        return () => cancelIdleCallback(idleId);
      } else {
        // Fallback for Safari (no requestIdleCallback)
        setShouldLoad(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []); // Only run once on initial mount

  if (!shouldLoad) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        width: 0,
        height: 0,
        overflow: "hidden",
        opacity: 0,
        pointerEvents: "none",
        zIndex: -1,
      }}
    >
      {PRELOAD_IFRAMES.map(({ url, title }) => (
        <iframe
          key={url}
          src={url}
          title={title}
          tabIndex={-1}
          style={{ width: 1, height: 1, border: "none" }}
        />
      ))}
    </div>
  );
}

export default IframePreloader;
