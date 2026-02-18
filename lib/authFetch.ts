"use client";

import { getBackendClient } from './backendClient';

/**
 * Fetch wrapper that includes Supabase auth token for protected API calls.
 * Use this for any API endpoints that require authentication.
 */
export async function authFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const client = getBackendClient();
  
  if (!client) {
    throw new Error('Backend client not available');
  }

  const { data: { session }, error: sessionError } = await client.auth.getSession();

  if (sessionError || !session) {
    throw new Error('Not authenticated. Please log in.');
  }

  const headers = new Headers(options.headers);
  headers.set('Authorization', `Bearer ${session.access_token}`);
  
  return fetch(url, {
    ...options,
    headers,
  });
}

/**
 * Helper for authenticated JSON POST requests
 */
export async function authPost<T = unknown>(
  url: string,
  data: unknown
): Promise<T> {
  const response = await authFetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Request failed: ${response.status}`);
  }

  return response.json();
}
