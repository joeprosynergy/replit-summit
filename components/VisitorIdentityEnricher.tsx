"use client";

import { useEffect } from 'react';

/**
 * Mid-form identity capture.
 *
 * Watches every email/phone-shaped input on the page. When the visitor
 * blurs a field with a syntactically valid value, fires a one-shot
 * enrichment beacon to Summit AI tagging the visitor's existing
 * sessions with email/phone. This makes the visitor reachable by
 * email/phone for downstream attribution recovery — important for 3D
 * submissions, where the lead enters the database via GHL with no IP
 * we can match against.
 *
 * Privacy: only fires AFTER the visitor has typed a complete-looking
 * email/phone and tabbed away (i.e. they were already intending to
 * submit it). Privacy policy disclosure was added separately.
 *
 * Renders nothing.
 */

const COOKIE_NAME = 'summit_visitor_id';
const ENDPOINT = process.env.NEXT_PUBLIC_SUMMIT_AI_URL
  ? `${process.env.NEXT_PUBLIC_SUMMIT_AI_URL}/api/webhook/visitor-session`
  : 'https://summit-ai-nextjs.vercel.app/api/webhook/visitor-session';

const FIRED_KEY = '__summit_enrich_fired__';
// Lightweight format checks — server can validate further, the goal
// here is to not spam the endpoint with partial typing.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+\d][\d\s\-().+ ]{6,}$/;

function getVisitorId(): string | null {
  if (typeof document === 'undefined') return null;
  const prefix = `${COOKIE_NAME}=`;
  const match = document.cookie.split('; ').find((c) => c.startsWith(prefix));
  return match ? match.slice(prefix.length) : null;
}

function looksLikeEmail(el: HTMLInputElement): boolean {
  if (el.type === 'email') return true;
  const name = (el.name || el.id || '').toLowerCase();
  return /(email|e[-_]?mail)/.test(name);
}

function looksLikePhone(el: HTMLInputElement): boolean {
  if (el.type === 'tel') return true;
  const name = (el.name || el.id || '').toLowerCase();
  return /(phone|tel|mobile|cell)/.test(name);
}

function fired(): Record<string, boolean> {
  if (typeof window === 'undefined') return {};
  // sessionStorage is per-tab; we re-fire once per tab per type which
  // is the right rate (one email + one phone per visit).
  try {
    const raw = window.sessionStorage.getItem(FIRED_KEY);
    if (raw) return JSON.parse(raw) as Record<string, boolean>;
  } catch { /* fall through */ }
  return {};
}

function markFired(state: Record<string, boolean>): void {
  try {
    window.sessionStorage.setItem(FIRED_KEY, JSON.stringify(state));
  } catch { /* ignore */ }
}

function send(visitorId: string, payload: { email?: string; phone?: string }): void {
  fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      visitor_id: visitorId,
      enrich: true,
      ...payload,
    }),
    keepalive: true,
    credentials: 'omit',
  }).catch(() => { /* silent */ });
}

export default function VisitorIdentityEnricher() {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const onBlur = (e: FocusEvent) => {
      try {
        const visitorId = getVisitorId();
        if (!visitorId) return;
        const el = e.target as HTMLElement | null;
        if (!el || el.tagName !== 'INPUT') return;
        const input = el as HTMLInputElement;
        const value = (input.value || '').trim();
        if (!value) return;

        const state = fired();
        if (looksLikeEmail(input)) {
          if (state.email) return;
          if (!EMAIL_RE.test(value)) return;
          state.email = true;
          markFired(state);
          send(visitorId, { email: value.toLowerCase() });
        } else if (looksLikePhone(input)) {
          if (state.phone) return;
          if (!PHONE_RE.test(value)) return;
          state.phone = true;
          markFired(state);
          // Pass raw value; server can normalize.
          send(visitorId, { phone: value });
        }
      } catch { /* silent */ }
    };

    // Capture phase catches blurs in shadow-rooted form components too.
    document.addEventListener('blur', onBlur, true);
    return () => document.removeEventListener('blur', onBlur, true);
  }, []);

  return null;
}
