import assert from 'node:assert/strict';
import { afterEach, beforeEach, test } from 'node:test';
import {
  LOTLINE_LEAD_URL,
  mapLotlineLeadPayload,
  notifyLotlineLead,
} from './lotline-lead.ts';

type FetchCall = { url: unknown; init?: RequestInit };

let originalFetch: typeof fetch;
let fetchCalls: FetchCall[];
let fetchImpl: (url: unknown, init?: RequestInit) => Promise<Response>;

function jsonBody(call: FetchCall): Record<string, unknown> {
  assert.equal(typeof call.init?.body, 'string');
  return JSON.parse(call.init!.body as string) as Record<string, unknown>;
}

beforeEach(() => {
  originalFetch = globalThis.fetch;
  fetchCalls = [];
  fetchImpl = async () => new Response('{}', { status: 200 });
  globalThis.fetch = (async (url: unknown, init?: RequestInit) => {
    fetchCalls.push({ url, init });
    return fetchImpl(url, init);
  }) as typeof fetch;
});

afterEach(() => {
  globalThis.fetch = originalFetch;
});

test('LOTLINE_LEAD_URL is lotoffice.app public summit lead', () => {
  assert.equal(LOTLINE_LEAD_URL, 'https://lotoffice.app/api/v1/public/summit/lead');
});

test('empty phone after trim skips fetch', () => {
  notifyLotlineLead({ name: 'Ada', phone: '', email: 'ada@example.com' });
  notifyLotlineLead({ name: 'Ada', phone: '   ', email: 'ada@example.com' });
  notifyLotlineLead({ name: 'Ada', phone: null, email: 'ada@example.com' });
  notifyLotlineLead({ name: 'Ada', phone: undefined, email: 'ada@example.com' });
  assert.equal(fetchCalls.length, 0);
});

test('does not invent a phone in the mapped payload', () => {
  const mapped = mapLotlineLeadPayload({
    name: 'Ada Lovelace',
    firstName: 'Ada',
    lastName: 'Lovelace',
    email: 'ada@example.com',
    zipCode: '63640',
    phone: '  ',
  });
  assert.equal('phone' in mapped, false);
  assert.equal(mapped.name, 'Ada Lovelace');
  assert.equal(mapped.email, 'ada@example.com');
  assert.equal(mapped.zipCode, '63640');
});

test('maps name, phone, email, zip, UTMs, and gclid', () => {
  const mapped = mapLotlineLeadPayload({
    name: 'Ada Lovelace',
    firstName: 'Ada',
    lastName: 'Lovelace',
    phone: ' 555-0100 ',
    email: ' ada@example.com ',
    zipCode: '63640',
    interest: 'cabin',
    size: 'medium',
    contactMethod: 'text',
    landing_url: 'https://summitbuildings.com/?gclid=g1',
    tracking: {
      gclid: 'g1',
      utm_source: 'google',
      utm_medium: 'cpc',
      utm_campaign: 'sheds',
      utm_content: 'hero',
      utm_term: 'storage shed',
      search_term: 'should-not-map',
    },
  });

  assert.deepEqual(mapped, {
    name: 'Ada Lovelace',
    firstName: 'Ada',
    lastName: 'Lovelace',
    phone: '555-0100',
    email: 'ada@example.com',
    zipCode: '63640',
    interest: 'cabin',
    size: 'medium',
    contactMethod: 'text',
    landing_url: 'https://summitbuildings.com/?gclid=g1',
    gclid: 'g1',
    utm_source: 'google',
    utm_medium: 'cpc',
    utm_campaign: 'sheds',
    utm_content: 'hero',
    utm_term: 'storage shed',
  });
});

test('notifyLotlineLead POSTs the mapped payload and does not invent phones', () => {
  notifyLotlineLead(
    {
      name: 'Ada Lovelace',
      phone: '555-0100',
      email: 'ada@example.com',
      zipCode: '63640',
      message: '   ',
      tracking: { gclid: 'g1', utm_source: 'google', other: 'ignore' },
    },
    { keepalive: true },
  );

  assert.equal(fetchCalls.length, 1);
  assert.equal(fetchCalls[0].url, LOTLINE_LEAD_URL);
  assert.equal(fetchCalls[0].init?.method, 'POST');
  assert.equal(fetchCalls[0].init?.keepalive, true);
  assert.equal(
    (fetchCalls[0].init?.headers as Record<string, string>)['Content-Type'],
    'application/json',
  );

  const body = jsonBody(fetchCalls[0]);
  assert.equal(body.phone, '555-0100');
  assert.equal(body.name, 'Ada Lovelace');
  assert.equal(body.email, 'ada@example.com');
  assert.equal(body.zipCode, '63640');
  assert.equal(body.gclid, 'g1');
  assert.equal(body.utm_source, 'google');
  assert.equal('message' in body, false);
  assert.equal('other' in body, false);
});

test('fetch rejection is swallowed and must not throw to caller', async () => {
  fetchImpl = async () => {
    throw new Error('Lotline down');
  };

  assert.doesNotThrow(() =>
    notifyLotlineLead({ name: 'Ada', phone: '555-0100' }),
  );
  assert.equal(fetchCalls.length, 1);

  await Promise.resolve();
});

test('synchronous fetch throw is swallowed and must not throw to caller', () => {
  globalThis.fetch = (() => {
    throw new Error('fetch exploded');
  }) as typeof fetch;

  assert.doesNotThrow(() =>
    notifyLotlineLead({ name: 'Ada', phone: '555-0100' }),
  );
});
