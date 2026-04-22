-- Phase 2: Phone attribution tables
-- Stores click events (from GTM tel: trigger) and call attributions (matched by Phase 4 service)

create table if not exists phone_click_events (
  id uuid primary key default gen_random_uuid(),
  clicked_at timestamptz not null default now(),
  visitor_id text,
  session_id text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  gclid text,
  referrer text,
  landing_page text,
  page_url text,
  user_agent text,
  ip_hash text,
  matched_call_id text,
  matched_at timestamptz,
  ghl_contact_id text,
  created_at timestamptz not null default now()
);

create index if not exists phone_click_events_clicked_at_idx
  on phone_click_events(clicked_at);

create index if not exists phone_click_events_matched_call_id_idx
  on phone_click_events(matched_call_id);

create index if not exists phone_click_events_visitor_id_idx
  on phone_click_events(visitor_id);

create table if not exists phone_call_attributions (
  id uuid primary key default gen_random_uuid(),
  rc_call_id text not null unique,
  caller_number text,
  call_started_at timestamptz,
  call_duration_sec integer,
  attribution_method text,  -- 'rc_click_match_exact' | 'rc_click_match_fuzzy' | 'unattributed'
  matched_click_id uuid references phone_click_events(id),
  ghl_contact_id text,
  created_at timestamptz not null default now()
);

create index if not exists phone_call_attributions_call_started_at_idx
  on phone_call_attributions(call_started_at);

create index if not exists phone_call_attributions_attribution_method_idx
  on phone_call_attributions(attribution_method);

-- RLS: no public access. The /api/phone-click endpoint writes via service role key.
alter table phone_click_events enable row level security;
alter table phone_call_attributions enable row level security;
