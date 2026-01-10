import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBackendClient } from '@/lib/backendClient';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      const client = getBackendClient();
      if (!client) {
        setError('Backend not configured');
        return;
      }

      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get('code');
      const hash = window.location.hash;

      try {
        if (code) {
          console.log('[AuthCallback] Exchanging code for session...');
          const { data, error: exchangeError } = await client.auth.exchangeCodeForSession(code);
          
          if (exchangeError) {
            console.error('[AuthCallback] Exchange error:', exchangeError);
            setError(exchangeError.message);
            return;
          }
          
          console.log('[AuthCallback] Session established:', !!data?.session);
        } else if (hash) {
          console.log('[AuthCallback] Getting session from hash...');
          const { error: sessionError } = await client.auth.getSession();
          
          if (sessionError) {
            console.error('[AuthCallback] Session error:', sessionError);
            setError(sessionError.message);
            return;
          }
        }

        await new Promise(resolve => setTimeout(resolve, 500));
        
        navigate('/admin', { replace: true });
      } catch (err) {
        console.error('[AuthCallback] Unexpected error:', err);
        setError(err instanceof Error ? err.message : 'Authentication failed');
      }
    };

    handleCallback();
  }, [navigate]);

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
