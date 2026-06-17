/**
 * Carry attribution across the hop to the ShedPro 3D builder.
 *
 * Google Ads only points at summitbuildings.com — never at the builder
 * (`summitbuildings.shedpro.co`, a 3rd-party subdomain on a different
 * domain, so cookies can't cross). A visitor arrives from an ad, we capture
 * their gclid/UTMs (sessionStorage via tracking-params) + a first-party
 * `summit_visitor_id`, then they click through to the builder and the click
 * id is lost — the builder lead lands in the CRM with no source.
 *
 * Fix: a single delegated listener decorates every outbound link to the
 * builder, at click time, with the visitor's stored attribution + visitor_id.
 * That lets Google attribute the builder conversion to the original click,
 * and — if the builder's form forwards URL params — carries the source onto
 * the lead in our CRM too.
 *
 * Mirrors `phone-click-capture.ts`: same attribution source (`getTrackingParams`
 * + the `summit_visitor_id` cookie), same idempotent global-listener shape.
 * Never preventDefault — the link must navigate normally.
 */

import { getTrackingParams } from '@/lib/tracking-params';

const VISITOR_COOKIE = 'summit_visitor_id';

// Matches the builder host and any subdomain of shedpro.co.
const BUILDER_HOST_RE = /(^|\.)shedpro\.co$/i;

// Attribution keys forwarded onto the builder URL (whatever we have).
// Mirrors the keys tracking-params captures; visitor_id is appended separately.
const FORWARD_KEYS = [
  'gclid',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'search_term',
  'matched_keyword',
  'match_type',
  'campaign_id',
  'ad_group_id',
  'creative',
] as const;

function readVisitorCookie(): string | null {
  if (typeof document === 'undefined') return null;
  const prefix = `${VISITOR_COOKIE}=`;
  const match = document.cookie.split('; ').find((c) => c.startsWith(prefix));
  return match ? match.slice(prefix.length) : null;
}

export function isBuilderUrl(href: string): boolean {
  if (!href) return false;
  try {
    const base = typeof window !== 'undefined' ? window.location.href : 'https://summitbuildings.com';
    return BUILDER_HOST_RE.test(new URL(href, base).hostname);
  } catch {
    return false;
  }
}

/**
 * Pure URL decorator — no DOM access, so it can be unit-tested. Adds the
 * tracking params + visitor_id as query params, never overwriting one the
 * URL already carries (so it's idempotent across repeated decoration).
 */
export function decorateBuilderUrl(
  href: string,
  tracking: Record<string, string>,
  visitorId: string | null
): string {
  try {
    const base = typeof window !== 'undefined' ? window.location.href : 'https://summitbuildings.com';
    const u = new URL(href, base);
    for (const k of FORWARD_KEYS) {
      const v = tracking[k];
      if (v && !u.searchParams.has(k)) u.searchParams.set(k, v);
    }
    if (visitorId && !u.searchParams.has('visitor_id')) {
      u.searchParams.set('visitor_id', visitorId);
    }
    return u.toString();
  } catch {
    return href;
  }
}

/**
 * DOM convenience: decorate a builder URL with the live tracking context.
 * Safe to call from any client component (reads sessionStorage + cookie).
 */
export function buildBuilderUrl(href: string): string {
  return decorateBuilderUrl(href, getTrackingParams(), readVisitorCookie());
}

function findBuilderAnchor(target: EventTarget | null): HTMLAnchorElement | null {
  if (!(target instanceof Element)) return null;
  const a = target.closest<HTMLAnchorElement>('a[href]');
  if (!a) return null;
  // a.href is the resolved absolute URL; getAttribute may be relative.
  return isBuilderUrl(a.href) ? a : null;
}

let cleanup: (() => void) | null = null;

/**
 * Attach a single delegated listener that rewrites builder links in place
 * before navigation. Idempotent — calling twice is a no-op. Returns a
 * cleanup function.
 *
 * Uses both `pointerdown` (fires before navigation for left / middle / cmd /
 * touch clicks, so new-tab opens get the decorated URL too) and `click` (for
 * keyboard activation). Decoration is idempotent, so handling both is safe.
 */
export function initBuilderLinkCapture(): () => void {
  if (typeof document === 'undefined') return () => {};
  if (cleanup) return cleanup; // already initialized

  const handler = (e: Event) => {
    const link = findBuilderAnchor(e.target);
    if (!link) return;
    try {
      const decorated = buildBuilderUrl(link.href);
      if (decorated && decorated !== link.href) link.href = decorated;
    } catch {
      /* never break the link */
    }
  };

  document.addEventListener('pointerdown', handler, { capture: true, passive: true });
  document.addEventListener('click', handler, { capture: true, passive: true });

  cleanup = () => {
    document.removeEventListener('pointerdown', handler, { capture: true });
    document.removeEventListener('click', handler, { capture: true });
    cleanup = null;
  };
  return cleanup;
}
