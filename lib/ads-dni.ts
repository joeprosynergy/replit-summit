/**
 * First-party Dynamic Number Insertion (DNI) for Google Ads sessions.
 *
 * Ads visitors see/dial the Twilio tracking number; everyone else keeps the
 * public main number that ships in HTML/CMS defaults/JSON-LD.
 *
 * Safety rules:
 * - Client-side only. Never changes server HTML, structured data, or defaults.
 * - Non-ads sessions: one boolean check, then return — no observer, no walk.
 * - Only rewrites the main business number (digits 5737474700). Other numbers
 *   are untouched by construction.
 * - Never mutates script/style/noscript/textarea/input/contenteditable (protects
 *   JSON-LD and admin CMS editors).
 * - Fail-safe: any throw disconnects and leaves the page as rendered.
 * - PhoneClickCapture still works: it listens for a[href^="tel:"] clicks and
 *   does not care which number is in the href.
 */

import {
  captureTrackingParams,
  getSessionTrackingParams,
} from '@/lib/tracking-params';

/** Public main number as digits only (no country code). */
export const MAIN_DIGITS = '5737474700';

/** Twilio ads DNI number as digits only (no country code). */
export const ADS_DIGITS = '5737474052';

/** href shape used across the site (matches existing tel: links). */
export const ADS_TEL_HREF = 'tel:5737474052';

/** Display form for visible text swaps. */
export const ADS_DISPLAY = '573-747-4052';

const PAID_MEDIUMS = new Set([
  'cpc',
  'ppc',
  'paid',
  'paidsearch',
  'paid_search',
]);

/**
 * Main-number text patterns in use on the site:
 * 573-747-4700, (573) 747-4700, 573.747.4700, +1 573-747-4700, bare 5737474700, etc.
 *
 * Trailing `(?!\d)` is fine on all targets. Leading digit-guard is done in the
 * replace callback (not a lookbehind) so Safari/iOS ≤16.3 never throws on
 * module parse — this file is in the root layout chunk.
 */
const MAIN_NUMBER_TEXT_RE =
  /(?:\+?1[-.\s]?)?\(?573\)?[-.\s]?747[-.\s]?4700(?!\d)/g;

const SKIP_TAGS = new Set([
  'SCRIPT',
  'STYLE',
  'NOSCRIPT',
  'TEXTAREA',
  'INPUT',
  'SELECT',
  'OPTION',
]);

/**
 * True when this browser session is from paid Google Ads traffic.
 * Pure — takes already-merged tracking params (from getTrackingParams).
 */
export function isAdsSession(params: Record<string, string>): boolean {
  if (params.gclid && params.gclid.trim()) return true;

  const source = (params.utm_source || '').trim().toLowerCase();
  const medium = (params.utm_medium || '').trim().toLowerCase();
  if (source === 'google' && PAID_MEDIUMS.has(medium)) return true;

  return false;
}

/**
 * Strip non-digits, then drop a leading country-code 1 on 11-digit NANP numbers.
 * Pure — unit-testable without DOM.
 */
export function normalizePhoneDigits(raw: string): string {
  const digits = String(raw || '').replace(/\D/g, '');
  if (digits.length === 11 && digits.startsWith('1')) return digits.slice(1);
  return digits;
}

/** True when a tel: href points at the public main number. */
export function isMainNumberTelHref(href: string): boolean {
  if (!href || !href.toLowerCase().startsWith('tel:')) return false;
  // tel: may include separators or extensions; take the number part only
  const numberPart = href.slice(4).split(/[;?]/)[0] || '';
  return normalizePhoneDigits(numberPart) === MAIN_DIGITS;
}

/**
 * Replace main-number text formats with the ads display number.
 * Returns the input unchanged when there is no match (idempotent after swap).
 */
export function replaceMainNumberInText(text: string): string {
  if (!text || !text.includes('4700')) return text; // cheap reject
  MAIN_NUMBER_TEXT_RE.lastIndex = 0;
  return text.replace(
    MAIN_NUMBER_TEXT_RE,
    (match: string, offset: number, full: string) => {
      // Skip if the char immediately before the match is a digit (embedded IDs)
      const prev = offset > 0 ? full[offset - 1] : '';
      if (prev && /\d/.test(prev)) return match;
      return ADS_DISPLAY;
    }
  );
}

function isInsideSkippedRegion(node: Node): boolean {
  let el: Element | null =
    node.nodeType === Node.ELEMENT_NODE
      ? (node as Element)
      : node.parentElement;

  while (el) {
    if (SKIP_TAGS.has(el.tagName)) return true;
    if (el instanceof HTMLElement && el.isContentEditable) return true;
    // Admin toolbar / edit shells — never push ads numbers into CMS
    if (el.hasAttribute('data-no-dni') || el.closest('[data-no-dni]')) {
      return true;
    }
    el = el.parentElement;
  }
  return false;
}

/**
 * Walk root and swap main-number tel hrefs + visible text.
 * Safe to call repeatedly (idempotent). Does not throw to callers —
 * individual node failures are swallowed so one bad node can't stop the rest.
 */
export function applyDni(root: ParentNode): void {
  // Tel links first
  const anchors =
    typeof (root as Document | Element).querySelectorAll === 'function'
      ? (root as Document | Element).querySelectorAll<HTMLAnchorElement>(
          'a[href^="tel:"], a[href^="TEL:"]'
        )
      : [];

  for (const a of Array.from(anchors)) {
    try {
      if (isInsideSkippedRegion(a)) continue;
      const href = a.getAttribute('href') || '';
      if (!isMainNumberTelHref(href)) continue;
      a.setAttribute('href', ADS_TEL_HREF);
    } catch {
      /* never break the page over one anchor */
    }
  }

  // Visible text nodes
  if (typeof document === 'undefined' || !document.createTreeWalker) return;

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node: Node) {
      if (!node.nodeValue || !node.nodeValue.includes('4700')) {
        return NodeFilter.FILTER_REJECT;
      }
      if (isInsideSkippedRegion(node)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const textNodes: Text[] = [];
  let current = walker.nextNode();
  while (current) {
    textNodes.push(current as Text);
    current = walker.nextNode();
  }

  for (const textNode of textNodes) {
    try {
      const before = textNode.nodeValue || '';
      const after = replaceMainNumberInText(before);
      if (after !== before) textNode.nodeValue = after;
    } catch {
      /* swallow */
    }
  }
}

let cleanup: (() => void) | null = null;

/**
 * Start DNI if this is an ads session. Idempotent.
 * Returns a cleanup function (disconnect observer / clear raf).
 * Non-ads sessions: no-op cleanup.
 */
export function initAdsDni(): () => void {
  if (typeof document === 'undefined') return () => {};
  if (cleanup) return cleanup;

  const noop = () => {
    cleanup = null;
  };

  try {
    // Belt-and-braces: capture landing params even if effect order shifts.
    // Session-scoped only (URL + sessionStorage) — not the ~90-day _gcl_aw
    // cookie — so organic/direct return visits never show the ads number.
    captureTrackingParams();
    const params = getSessionTrackingParams();
    if (!isAdsSession(params)) {
      cleanup = noop;
      return cleanup;
    }

    let applying = false;
    let rafId: number | null = null;
    // Declare observer before runApply so a first-pass throw can disconnect it
    // (avoids TDZ ReferenceError if applyDni throws before observer is assigned).
    let observer: MutationObserver | null = null;

    const runApply = () => {
      if (applying) return;
      applying = true;
      try {
        applyDni(document.body || document.documentElement);
      } catch {
        // Hard fail-safe: stop observing so we never thrash a broken page
        try {
          observer?.disconnect();
        } catch {
          /* ignore */
        }
        if (rafId != null) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      } finally {
        applying = false;
      }
    };

    const scheduleApply = () => {
      if (rafId != null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        runApply();
      });
    };

    observer = new MutationObserver(() => {
      if (applying) return;
      scheduleApply();
    });

    const target = document.body || document.documentElement;
    observer.observe(target, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    // First pass after observer is live so fail-safe disconnect works.
    runApply();

    cleanup = () => {
      try {
        observer?.disconnect();
      } catch {
        /* ignore */
      }
      if (rafId != null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      cleanup = null;
    };
    return cleanup;
  } catch {
    cleanup = noop;
    return cleanup;
  }
}
