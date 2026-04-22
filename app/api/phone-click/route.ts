import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseAdminClient } from '@/lib/supabase/server'
import { createHash } from 'crypto'

/**
 * Phone click attribution endpoint.
 *
 * GTM fires on tel: link clicks and POSTs the visitor's attribution context
 * (UTMs, gclid, referrer, landing page) here. We persist it to Supabase so
 * the phone-attribution matching service can later correlate the click with
 * a connected RingCentral call (within a ±30s timestamp window) and enrich
 * the resulting GHL lead with source data.
 *
 * Uses navigator.sendBeacon on the client side to survive the tel: handoff.
 */

const TEXT_MAX = 1024
const UA_MAX = 512

function clip(v: unknown, max = TEXT_MAX): string | null {
  if (v === null || v === undefined) return null
  const s = String(v).trim()
  if (!s) return null
  return s.length > max ? s.slice(0, max) : s
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 })
  }

  const supabase = createServerSupabaseAdminClient()
  if (!supabase) {
    return NextResponse.json({ error: 'supabase not configured' }, { status: 500 })
  }

  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim()
  const ip_hash = ip ? createHash('sha256').update(ip).digest('hex') : null

  const row = {
    visitor_id: clip(body.visitor_id),
    session_id: clip(body.session_id),
    utm_source: clip(body.utm_source),
    utm_medium: clip(body.utm_medium),
    utm_campaign: clip(body.utm_campaign),
    utm_content: clip(body.utm_content),
    utm_term: clip(body.utm_term),
    gclid: clip(body.gclid),
    referrer: clip(body.referrer),
    landing_page: clip(body.landing_page),
    page_url: clip(body.page_url),
    user_agent: clip(body.user_agent, UA_MAX),
    ip_hash,
  }

  const { error } = await supabase.from('phone_click_events').insert(row)

  if (error) {
    console.error('[phone-click] insert failed:', error.message)
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
