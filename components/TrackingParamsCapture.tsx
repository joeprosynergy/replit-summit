"use client";

import { useEffect } from 'react';
import { captureTrackingParams } from '@/lib/tracking-params';

/**
 * Mount-once tracking-param capture. Persists URL UTMs / gclid /
 * Google Ads ValueTrack params into sessionStorage so attribution
 * survives client-side navigation away from the landing page before
 * the visitor submits a form. Renders nothing.
 */
export default function TrackingParamsCapture() {
  useEffect(() => {
    captureTrackingParams();
  }, []);
  return null;
}
