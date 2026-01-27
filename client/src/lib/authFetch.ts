import { getBackendClient } from './backendClient';

/**
 * Fetch wrapper that includes Supabase auth token for protected API calls.
 * Use this for any API endpoints that require authentication.
 */
export async function authFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/f4257b34-1dc4-4061-84a5-733cc267b72d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'authFetch.ts:10',message:'authFetch called',data:{url:url,method:options.method||'GET'},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'A1'})}).catch(()=>{});
  // #endregion
  const client = getBackendClient();
  
  if (!client) {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/f4257b34-1dc4-4061-84a5-733cc267b72d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'authFetch.ts:17',message:'backend client not available',data:{},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'A1'})}).catch(()=>{});
    // #endregion
    throw new Error('Backend client not available');
  }

  // Get the current session
  const { data: { session }, error } = await client.auth.getSession();
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/f4257b34-1dc4-4061-84a5-733cc267b72d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'authFetch.ts:25',message:'getSession result',data:{hasSession:!!session,hasError:!!error,errorMsg:error?.message},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'A1'})}).catch(()=>{});
  // #endregion
  
  if (error || !session) {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/f4257b34-1dc4-4061-84a5-733cc267b72d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'authFetch.ts:30',message:'no session - throwing error',data:{},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'A1'})}).catch(()=>{});
    // #endregion
    throw new Error('Not authenticated. Please log in.');
  }

  // Add authorization header
  const headers = new Headers(options.headers);
  headers.set('Authorization', `Bearer ${session.access_token}`);
  
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/f4257b34-1dc4-4061-84a5-733cc267b72d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'authFetch.ts:40',message:'making authenticated fetch',data:{url:url},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'A1'})}).catch(()=>{});
  // #endregion
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
