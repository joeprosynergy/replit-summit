"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getBackendClient } from '@/lib/backendClient';

const AuthCallback = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      const client = getBackendClient();
      if (!client) {
        setError('Backend not configured');
        return;
      }

      try {
        // Check if Supabase already auto-processed the auth tokens.
        // Supabase client detects #access_token in URL and processes it automatically,
        // then clears the hash. So we check for existing session first.
        const { data: sessionData } = await client.auth.getSession();
        
        if (sessionData?.session) {
          router.replace('/admin');
          return;
        }

        // If no session yet, check URL parameters
        const searchParams = new URLSearchParams(window.location.search);
        const code = searchParams.get('code');
        const hash = window.location.hash;

        if (code) {
          // PKCE flow - exchange code for session
          const { error: exchangeError } = await client.auth.exchangeCodeForSession(code);
          
          if (exchangeError) {
            setError(exchangeError.message);
            return;
          }
          
          router.replace('/admin');
        } else if (hash && hash.includes('access_token')) {
          // Implicit flow - Supabase should auto-process, but poll just in case
          for (let i = 0; i < 10; i++) {
            await new Promise(resolve => setTimeout(resolve, 300));
            const { data } = await client.auth.getSession();
            if (data.session) {
              router.replace('/admin');
              return;
            }
          }
          setError('Session not established');
        } else if (hash && hash.includes('error')) {
          const params = new URLSearchParams(hash.substring(1));
          const errorDesc = params.get('error_description');
          setError(errorDesc || 'Authentication failed');
        } else {
          // No URL params - give Supabase a moment to process, then check again
          await new Promise(resolve => setTimeout(resolve, 500));
          const { data: retrySession } = await client.auth.getSession();
          
          if (retrySession?.session) {
            router.replace('/admin');
            return;
          }
          
          setError('No authentication data received');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Authentication failed');
      }
    };

    handleCallback();
  }, [router]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="w-full max-w-sm space-y-4 text-center">
          <h1 className="text-xl font-semibold text-destructive">Authentication Failed</h1>
          <p className="text-sm text-muted-foreground">{error}</p>
          <a href="/admin/login" className="text-primary hover:underline">
            Try again
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 w-full max-w-xs">
        <p className="text-muted-foreground">Completing sign in...</p>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full animate-pulse w-2/3" />
        </div>
      </div>
    </div>
  );
};

export default AuthCallback;
