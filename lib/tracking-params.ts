/**
 * Extract tracking params from the current URL for lead attribution.
 *
 * Covers the standard UTMs that already fed Summit AI attribution, plus
 * the Google Ads ValueTrack params now surfaced via the account-level
 * Final URL Suffix (matched keyword, actual search query, match type,
 * campaign / ad group / creative IDs).
 *
 * ValueTrack param names are normalized to descriptive snake_case keys
 * so downstream systems (GHL custom fields, Summit AI `leads` table)
 * all use the same names end to end.
 *
 * Persistence: URL params are captured into sessionStorage on first
 * arrival (via captureTrackingParams) so they survive client-side
 * navigation away from the landing page before the user submits a form.
 * gclid also falls back to the `_gcl_aw` cookie (set by Google Ads
 * auto-tagging via GTM) so we don't lose attribution when the user
 * navigates within the SPA.
 */

export type TrackingParams = Record<string, string>;

const STORAGE_KEY = 'summit_tracking_params';
const LANDING_URL_KEY = 'summit_landing_url';

const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid',
] as const;

const VALUETRACK_MAP: Array<[string, string]> = [
  ['q', 'search_term'],
  ['kw', 'matched_keyword'],
  ['matchtype', 'match_type'],
  ['campaignid', 'campaign_id'],
  ['adgroupid', 'ad_group_id'],
  ['creative', 'creative'],
];

const ALL_TRACKING_KEYS = new Set<string>([
  ...UTM_KEYS,
  ...VALUETRACK_MAP.map(([, k]) => k),
]);

function readFromUrl(): TrackingParams {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  const out: TrackingParams = {};

  for (const key of UTM_KEYS) {
    const val = params.get(key);
    if (val) out[key] = val;
  }
  for (const [urlKey, fieldKey] of VALUETRACK_MAP) {
    const val = params.get(urlKey);
    if (val) out[fieldKey] = val;
  }
  return out;
}

function readFromStorage(): TrackingParams {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== 'object') return {};
    const out: TrackingParams = {};
    for (const [k, v] of Object.entries(parsed as Record<string, unknown>)) {
      if (typeof v === 'string' && v && ALL_TRACKING_KEYS.has(k)) out[k] = v;
    }
    return out;
  } catch {
    return {};
  }
}

function readGclidCookie(): string | null {
  if (typeof document === 'undefined') return null;
  // _gcl_aw format: "GCL.<timestamp>.<gclid>"
  const match = document.cookie.match(/(?:^|;\s*)_gcl_aw=([^;]+)/);
  if (!match) return null;
  const parts = decodeURIComponent(match[1]).split('.');
  return parts.length >= 3 ? parts.slice(2).join('.') : null;
}

/**
 * Capture URL tracking params into sessionStorage. Safe to call on every
 * page mount — only writes when URL has new tracking info, and merges
 * with anything already stored so the original landing-page attribution
 * wins. Call this from a top-level client component so it runs even on
 * pages that don't render a form.
 */
export function captureTrackingParams(): void {
  if (typeof window === 'undefined') return;

  // ─── First-touch landing URL ──────────────────────────────
  // Persist the very first URL the visitor hit — query string and all —
  // so a form submitted later on a clean URL like /contact-us can still
  // report the original landing URL with ?gclid=… for attribution.
  // First write wins: a return visit to /?gclid=NEW must not overwrite
  // the original landing context that drove the session.
  try {
    if (!window.sessionStorage.getItem(LANDING_URL_KEY)) {
      window.sessionStorage.setItem(
        LANDING_URL_KEY,
        window.location.href,
      );
    }
  } catch {
    /* storage disabled — skip */
  }

  const fromUrl = readFromUrl();
  if (Object.keys(fromUrl).length === 0) return;

  const existing = readFromStorage();
  // Existing storage wins so we don't overwrite the original landing
  // attribution if the user revisits with a different (or stripped) URL.
  const merged: TrackingParams = { ...fromUrl, ...existing };
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch {
    /* storage may be disabled (private mode) — fall back to URL-only */
  }
}

/**
 * Read the first-touch landing URL captured by captureTrackingParams.
 * Returns null if storage is empty or unavailable; callers should fall
 * back to window.location.href.
 */
export function getLandingUrl(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = window.sessionStorage.getItem(LANDING_URL_KEY);
    if (stored) return stored;
  } catch {
    /* fall through */
  }
  return window.location.href;
}

/**
 * Read tracking params for a form submission. Order of precedence:
 *   1. sessionStorage (original landing-page params, survives navigation)
 *   2. current URL query string
 *   3. _gcl_aw cookie (gclid only) as a final fallback
 */
export function getTrackingParams(): TrackingParams {
  if (typeof window === 'undefined') return {};

  const stored = readFromStorage();
  const fromUrl = readFromUrl();
  // Stored wins (it's the original landing context); URL fills any gaps.
  const merged: TrackingParams = { ...fromUrl, ...stored };

  if (!merged.gclid) {
    const cookieGclid = readGclidCookie();
    if (cookieGclid) merged.gclid = cookieGclid;
  }

  return merged;
}
