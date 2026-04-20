import { getTrackingParams, TrackingParams } from '@/lib/tracking-params'

/**
 * Fire a GHL external-tracking form submission event.
 *
 * Calls our first-party /api/ghl-track proxy, which forwards to GHL's
 * backend server-side. This bypasses Safari's Intelligent Tracking
 * Prevention (ITP) which silently blocks direct browser POSTs to
 * known-tracker domains like backend.leadconnectorhq.com.
 *
 * If GHL's own tracking script loaded successfully we also grab its
 * sessionId so prior anonymous page views on the contact's browser
 * get attributed to the new contact.
 *
 * Pass `tracking` explicitly when you captured params on mount — by
 * the time the user submits they may have navigated to a non-landing
 * page where URL params are no longer present.
 */
export function trackFormSubmit(params: {
  formId: string
  firstName?: string
  lastName?: string
  email: string
  phone?: string
  postalCode?: string
  extra?: Record<string, string>
  tracking?: TrackingParams
}) {
  if (typeof window === 'undefined') return

  // Grab GHL session info if the tracking script loaded (for page-view
  // attribution). On Safari the script loads but its outbound POSTs are
  // blocked; the session state is still available to read.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any
  const sessionId: string | undefined = w._lcTracking?.tracker?.state?.sessionId

  const tracking = params.tracking ?? getTrackingParams()

  const formData: Record<string, string> = {
    first_name: params.firstName || '',
    last_name: params.lastName || '',
    email: params.email,
    phone: params.phone || '',
    postal_code: params.postalCode || '',
    ...tracking,
    ...(params.extra || {}),
  }

  const payload = {
    formId: params.formId,
    formData,
    sessionId,
    url: window.location.href,
    title: document.title,
    path: window.location.pathname,
    referrer: document.referrer,
  }

  // Fire-and-forget. keepalive lets the request survive page navigation.
  try {
    fetch('/api/ghl-track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {})
  } catch {
    // ignore — Summit AI webhook is the reliable fallback
  }
}
