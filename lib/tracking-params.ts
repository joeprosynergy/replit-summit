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
 */

export type TrackingParams = Record<string, string>;

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

export function getTrackingParams(): TrackingParams {
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
