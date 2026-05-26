"use client";

import { useEffect } from 'react';
import { initPhoneClickCapture } from '@/lib/phone-click-capture';

/**
 * Mounts the global tel-link click capture once. The actual work is a single
 * delegated listener on `document` (see lib/phone-click-capture), so this
 * component renders nothing and adds no per-element handlers.
 */
export default function PhoneClickCapture() {
  useEffect(() => {
    const cleanup = initPhoneClickCapture();
    return cleanup;
  }, []);
  return null;
}
