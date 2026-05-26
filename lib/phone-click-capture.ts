/**
 * First-party phone-click capture.
 *
 * Records every click on a `tel:` link, carrying the visitor's stored
 * attribution context (gclid / UTMs / landing URL / visitor id), and beacons
 * it to /api/phone-click. The phone-attribution matcher later correlates the
 * click with a connected RingCentral call (±30s window) and enriches the
 * resulting GHL lead with source data.
 *
 * Why in code and not GTM: this feeds our OWN data pipeline (Supabase →
 * matcher → CRM), so it must be version-controlled, type-checked, and visible
 * in code review — unlike vendor marketing pixels (GA4 / Ads conversions),
 * which stay in GTM. A single delegated listener on `document` catches every
 * `tel:` link site-wide without touching individual components.
 *
 * Reuses the exact attribution source that already makes form attribution
 * reliable: `getTrackingParams()` (sessionStorage + _gcl_aw cookie) and the
 * `summit_visitor_id` cookie set by VisitorSessionTracker.
 */

import { getTrackingParams, getLandingUrl } from '@/lib/tracking-params';

const VISITOR_COOKIE = 'summit_visitor_id';

export interface PhoneClickPayload {
  visitor_id: string | null;
  session_id: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  gclid: string | null;
  referrer: string | null;
  landing_page: string | null;
  page_url: string | null;
  user_agent: string | null;
}

export interface PhoneClickContext {
  visitorId?: string | null;
  tracking?: Record<string, string>;
  referrer?: string | null;
  landingPage?: string | null;
  pageUrl?: string | null;
  userAgent?: string | null;
}

const clean = (v: string | null | undefined): string | null => {
  if (v === null || v === undefined) return null;
  const s = String(v).trim();
  return s ? s : null;
};

/**
 * Pure payload builder — no DOM access, so it can be unit-tested in isolation.
 * Maps the merged tracking params + page context to the exact shape the
 * /api/phone-click route persists.
 */
export function buildPhoneClickPayload(ctx: PhoneClickContext): PhoneClickPayload {
  const t = ctx.tracking ?? {};
  return {
    visitor_id: clean(ctx.visitorId),
    session_id: null, // website has no per-tab session id; visitor_id is the join key
    utm_source: clean(t.utm_source),
    utm_medium: clean(t.utm_medium),
    utm_campaign: clean(t.utm_campaign),
    utm_content: clean(t.utm_content),
    utm_term: clean(t.utm_term),
    gclid: clean(t.gclid),
    referrer: clean(ctx.referrer),
    landing_page: clean(ctx.landingPage),
    page_url: clean(ctx.pageUrl),
    user_agent: clean(ctx.userAgent),
  };
}

function readVisitorCookie(): string | null {
  if (typeof document === 'undefined') return null;
  const prefix = `${VISITOR_COOKIE}=`;
  const match = document.cookie.split('; ').find((c) => c.startsWith(prefix));
  return match ? match.slice(prefix.length) : null;
}

function findTelAnchor(target: EventTarget | null): HTMLAnchorElement | null {
  if (!(target instanceof Element)) return null;
  return target.closest<HTMLAnchorElement>('a[href^="tel:"]');
}

let cleanup: (() => void) | null = null;

/**
 * Attach a single delegated click listener that beacons tel-link clicks.
 * Idempotent — calling twice is a no-op. Returns a cleanup function.
 */
export function initPhoneClickCapture(): () => void {
  if (typeof document === 'undefined') return () => {};
  if (cleanup) return cleanup; // already initialized

  const handler = (e: MouseEvent) => {
    // Ignore modified clicks (open-in-new-tab etc.) — those won't dial.
    if (e.defaultPrevented || e.button !== 0) return;
    const link = findTelAnchor(e.target);
    if (!link) return;

    try {
      const payload = buildPhoneClickPayload({
        visitorId: readVisitorCookie(),
        tracking: getTrackingParams(),
        referrer: typeof document !== 'undefined' ? document.referrer || null : null,
        landingPage: getLandingUrl(),
        pageUrl: typeof window !== 'undefined' ? window.location.href : null,
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent || null : null,
      });

      // fetch + keepalive (not sendBeacon) so we can send JSON with a proper
      // Content-Type and survive the tel: handoff / tab backgrounding on mobile.
      // Matches the VisitorSessionTracker beacon pattern. Fire-and-forget:
      // never block the dialer, never throw into the click path.
      void fetch('/api/phone-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
        credentials: 'omit',
      }).catch(() => {
        /* swallow — attribution is best-effort */
      });
    } catch {
      /* never break the dialer */
    }
  };

  // Capture phase so we still record even if a component stops propagation.
  // passive: we never preventDefault — the dialer must open normally.
  document.addEventListener('click', handler, { capture: true, passive: true });

  cleanup = () => {
    document.removeEventListener('click', handler, { capture: true });
    cleanup = null;
  };
  return cleanup;
}
