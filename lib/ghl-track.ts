/**
 * Fire a GHL external-tracking form submission event.
 *
 * Calls the GHL tracker directly via `window._lcTracking.tracker.sendEvent()`
 * rather than dispatching a synthetic submit event on a hidden form. Direct
 * API call is reliable; form-submit-based capture failed intermittently when
 * triggered from within React event handlers.
 *
 * Safe to call anywhere — if GHL's tracker isn't loaded (ad blocker, network
 * error, ITP), this silently no-ops.
 */
export function trackFormSubmit(params: {
  formId: string
  firstName?: string
  lastName?: string
  email: string
  phone?: string
  postalCode?: string
  extra?: Record<string, string>
}) {
  if (typeof window === 'undefined') return
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tracker = (window as any)._lcTracking?.tracker
  if (!tracker || typeof tracker.sendEvent !== 'function') return
  try {
    const formData: Record<string, string> = {
      first_name: params.firstName || '',
      last_name: params.lastName || '',
      email: params.email,
      phone: params.phone || '',
      postal_code: params.postalCode || '',
      ...(params.extra || {}),
    }
    tracker.sendEvent({
      type: 'external_form_submission',
      formId: params.formId,
      formData,
    })
  } catch {
    // silently ignore — Summit AI webhook is the reliable fallback
  }
}
