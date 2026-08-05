"use client";

import { useEffect } from 'react';
import { initAdsDni } from '@/lib/ads-dni';

/**
 * Mounts first-party ads DNI once. Non-ads sessions do nothing after a
 * single isAdsSession check (see lib/ads-dni). Renders nothing.
 */
export default function AdsDni() {
  useEffect(() => {
    const cleanup = initAdsDni();
    return cleanup;
  }, []);
  return null;
}
