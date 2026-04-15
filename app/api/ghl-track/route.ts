import { NextRequest, NextResponse } from 'next/server'

/**
 * First-party proxy for GoHighLevel external-tracking events.
 *
 * Safari's Intelligent Tracking Prevention silently blocks direct POSTs
 * from the browser to `backend.leadconnectorhq.com` (GHL is on the
 * known-tracker list). Proxying through same-origin summitbuildings.com
 * bypasses ITP because it's a first-party request.
 *
 * Client POSTs form data here; we enrich with tracking/location IDs and
 * forward to GHL. If GHL's tracking script loaded client-side we also
 * pass through its sessionId so prior page views get attributed.
 */

const GHL_TRACKING_ID = 'tk_33a3d5407109484983c9ca4b6357a80d'
const GHL_LOCATION_ID = 'DMwQJDbCOiLPu1dejGR4'
const GHL_EVENTS_URL = 'https://backend.leadconnectorhq.com/external-tracking/events'

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 })
  }

  const formId = String(body.formId || 'Unidentified Form')
  const formData = (body.formData || {}) as Record<string, string>
  const sessionId = String(body.sessionId || '').trim() || cryptoRandom()
  const pageUrl = String(body.url || req.headers.get('referer') || '')
  const pageTitle = String(body.title || '')
  const pagePath = String(body.path || '')
  const referrer = String(body.referrer || '')

  const payload = {
    type: 'external_form_submission',
    timestamp: Date.now(),
    formId,
    formData,
    formLabels: {},
    title: pageTitle,
    url: pageUrl,
    path: pagePath,
    referrer,
    userAgent: req.headers.get('user-agent') || '',
    properties: {
      sessionId,
      deviceType: /Mobile|Android|iPhone|iPad/.test(req.headers.get('user-agent') || '')
        ? 'mobile'
        : 'desktop',
    },
    trackingId: GHL_TRACKING_ID,
    locationId: GHL_LOCATION_ID,
    sessionId,
  }

  try {
    const res = await fetch(GHL_EVENTS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      const text = await res.text().catch(() => '')
      return NextResponse.json(
        { ok: false, status: res.status, error: text.slice(0, 200) },
        { status: 502 }
      )
    }
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : 'fetch failed' },
      { status: 502 }
    )
  }
}

function cryptoRandom() {
  const bytes = new Uint8Array(16)
  crypto.getRandomValues(bytes)
  const hex = Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('')
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
}
