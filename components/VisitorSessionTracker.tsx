"use client";

import { useEffect } from 'react';
import { getTrackingParams, getLandingUrl } from '@/lib/tracking-params';

/**
 * First-party visitor session beacon.
 *
 * Sets a long-lived summit_visitor_id cookie on first visit and fires a
 * single ping per page mount to the Summit AI visitor-session endpoint
 * with attribution data + landing URL + referrer. The server captures
 * IP + user-agent from the request.
 *
 * Purpose: recover marketing attribution for leads that come back
 * without the original gclid/UTM (e.g. ShedPro 3D submissions strip
 * query strings). The lead handler later matches by (ip, user_agent)
 * within 48h.
 *
 * Renders nothing. Failures are silent — never blocks the page.
 */

const COOKIE_NAME = 'summit_visitor_id';
const COOKIE_MAX_AGE_SECS = 60 * 60 * 24 * 90; // 90 days

const ENDPOINT = process.env.NEXT_PUBLIC_SUMMIT_AI_URL
  ? `${process.env.NEXT_PUBLIC_SUMMIT_AI_URL}/api/webhook/visitor-session`
  : 'https://summit-ai-nextjs.vercel.app/api/webhook/visitor-session';

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const prefix = `${name}=`;
  const match = document.cookie.split('; ').find((c) => c.startsWith(prefix));
  return match ? match.slice(prefix.length) : null;
}

function setCookie(name: string, value: string, maxAgeSecs: number): void {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=${value}; path=/; max-age=${maxAgeSecs}; SameSite=Lax`;
}

function getOrCreateVisitorId(): string {
  const existing = readCookie(COOKIE_NAME);
  if (existing) return existing;
  // crypto.randomUUID is supported in all modern browsers we serve.
  // Fall back to a timestamp+random combo if running in an oddly-old runtime.
  const id =
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : `v-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  setCookie(COOKIE_NAME, id, COOKIE_MAX_AGE_SECS);
  return id;
}

export default function VisitorSessionTracker() {
  useEffect(() => {
    try {
      const visitorId = getOrCreateVisitorId();
      const tracking = getTrackingParams();
      const payload = {
        visitor_id: visitorId,
        page_path: window.location.pathname,
        landing_url: getLandingUrl(),
        referrer: document.referrer || null,
        ...tracking,
      };

      // keepalive lets the beacon survive navigation away from the page,
      // and it's the recommended pattern for analytics-style fire-and-forget
      // posts (sendBeacon doesn't support custom headers cleanly).
      fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
        credentials: 'omit',
      }).catch(() => {
        /* swallow — never break the page */
      });
    } catch {
      /* swallow */
    }
  }, []);

  return null;
}
