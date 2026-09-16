/**
 * Dual-post website form leads to Lotline public.lead.create.
 *
 * Fire-and-forget: a Lotline 4xx/5xx/timeout must not fail the visitor form.
 * Skip the POST only when phone is empty after trim. Do not invent phones.
 */

export const LOTLINE_LEAD_URL =
  'https://lotoffice.app/api/v1/public/summit/lead';

const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
] as const;

export type LotlineLeadFields = {
  name?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
  email?: string | null;
  message?: string | null;
  zipCode?: string | null;
  interest?: string | null;
  size?: string | null;
  contactMethod?: string | null;
  landing_url?: string | null;
  tracking?: Record<string, string>;
};

function trim(v: unknown): string {
  if (v === null || v === undefined) return '';
  return String(v).trim();
}

function setIf(out: Record<string, string>, key: string, value: unknown): void {
  const s = trim(value);
  if (s) out[key] = s;
}

/** Map form fields onto Lotline camelCase aliases plus attribution. */
export function mapLotlineLeadPayload(input: LotlineLeadFields): Record<string, string> {
  const out: Record<string, string> = {};
  setIf(out, 'name', input.name);
  setIf(out, 'firstName', input.firstName);
  setIf(out, 'lastName', input.lastName);
  setIf(out, 'phone', input.phone);
  setIf(out, 'email', input.email);
  setIf(out, 'message', input.message);
  setIf(out, 'zipCode', input.zipCode);
  setIf(out, 'interest', input.interest);
  setIf(out, 'size', input.size);
  setIf(out, 'contactMethod', input.contactMethod);
  setIf(out, 'landing_url', input.landing_url);

  const tracking = input.tracking ?? {};
  setIf(out, 'gclid', tracking.gclid);
  for (const key of UTM_KEYS) {
    setIf(out, key, tracking[key]);
  }
  return out;
}

/**
 * POST a lead to Lotline without blocking the visitor.
 * `keepalive` should match the other form fetches on that submit path.
 */
export function notifyLotlineLead(
  input: LotlineLeadFields,
  options?: { keepalive?: boolean },
): void {
  if (!trim(input.phone)) return;

  const payload = mapLotlineLeadPayload(input);
  try {
    void fetch(LOTLINE_LEAD_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: options?.keepalive === true,
    }).catch(() => {});
  } catch {
    // Lotline must not fail the visitor form.
  }
}
