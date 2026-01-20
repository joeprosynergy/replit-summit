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
          const { data, error: exchangeError } = await client.auth.exchangeCodeForSession(code);
          
          if (exchangeError) {
            setError(exchangeError.message);
            return;
          }
        } else if (hash && hash.includes('access_token')) {
          // Supabase processes hash automatically on page load
          // Poll for session to be ready
          let sessionEstablished = false;
          
          for (let i = 0; i < 10; i++) {
            await new Promise(resolve => setTimeout(resolve, 300));
            
            try {
              const { data } = await client.auth.getSession();
              if (data.session) {
                sessionEstablished = true;
                break;
              }
            } catch (err) {
              // Continue polling
            }
          }

          if (!sessionEstablished) {
            console.warn('[AuthCallback] Session not established after polling');
          }
        } else if (hash && hash.includes('error')) {
          const params = new URLSearchParams(hash.substring(1));
          const error = params.get('error');
          const errorDesc = params.get('error_description');
          
          setError(errorDesc || error || 'Authentication failed');
          return;
        } else {
          setError('No authentication data received');
          return;
        }

        // Small delay before redirect
        await new Promise(resolve => setTimeout(resolve, 500));
        
        navigate('/admin', { replace: true });
      } catch (err) {
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
