"use client";

import { useEffect } from 'react';
import { initBuilderLinkCapture } from '@/lib/builder-link-capture';

/**
 * Mounts the global builder-link decorator (see lib/builder-link-capture.ts).
 * Renders nothing. Sibling of PhoneClickCapture in app/providers.tsx.
 */
export default function BuilderLinkCapture() {
  useEffect(() => {
    const cleanup = initBuilderLinkCapture();
    return cleanup;
  }, []);
  return null;
}
