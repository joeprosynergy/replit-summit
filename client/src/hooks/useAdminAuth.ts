import { useState, useEffect, useCallback } from 'react';
import type { User } from '@supabase/supabase-js';
import { getBackendClient } from '@/lib/backendClient';
import { checkIsAdmin } from '@/lib/adminAuth';

interface AdminAuthState {
  user: User | null;
  isAdmin: boolean;
  isLoading: boolean;
  error: string | null;
  recheckAdmin: () => Promise<void>;
}

export function useAdminAuth(): AdminAuthState {
  const [state, setState] = useState<Omit<AdminAuthState, 'recheckAdmin'>>({
    user: null,
    isAdmin: false,
    isLoading: true,
    error: null,
  });

  const recheckAdmin = useCallback(async () => {
    const client = getBackendClient();
    if (!client || !state.user) return;
    
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    const result = await checkIsAdmin(client);
    setState(prev => ({ 
      ...prev, 
      isAdmin: result.isAdmin, 
      isLoading: false, 
      error: result.error 
    }));
  }, [state.user]);

  useEffect(() => {
    const client = getBackendClient();
    
    if (!client) {
      setState({ user: null, isAdmin: false, isLoading: false, error: 'Backend not configured' });
      return;
    }

    let mounted = true;
    let authResolved = false;

    const timeoutId = setTimeout(() => {
      if (!authResolved && mounted) {
        console.error('[useAdminAuth] Auth check timed out after 10s');
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: 'Auth check timed out. Verify backend connection.',
        }));
      }
    }, 10000);

    const { data: { subscription } } = client.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;
        authResolved = true;
        
        if (!session?.user) {
          setState({ user: null, isAdmin: false, isLoading: false, error: null });
          return;
        }

        try {
          const result = await checkIsAdmin(client);
          
          if (mounted) {
            setState({ 
              user: session.user, 
              isAdmin: result.isAdmin, 
              isLoading: false, 
              error: result.error 
            });
          }
        } catch (err: any) {
          if (mounted) {
            setState({
              user: session.user,
              isAdmin: false,
              isLoading: false,
              error: `Admin check failed: ${err.message}`,
            });
          }
        }
      }
    );

    const checkInitialAuth = async () => {
      try {
        const { data: { user }, error: userError } = await client.auth.getUser();
        
        if (!mounted) return;
        authResolved = true;
        
        if (userError) {
          setState({ user: null, isAdmin: false, isLoading: false, error: `Auth error: ${userError.message}` });
          return;
        }
        
        if (!user) {
          setState({ user: null, isAdmin: false, isLoading: false, error: null });
          return;
        }

        const result = await checkIsAdmin(client);
        
        if (mounted) {
          setState({ 
            user, 
            isAdmin: result.isAdmin, 
            isLoading: false, 
            error: result.error 
          });
        }
      } catch (err: any) {
        if (mounted) {
          authResolved = true;
          setState({
            user: null,
            isAdmin: false,
            isLoading: false,
            error: `Auth check failed: ${err.message}`,
          });
        }
      }
    };

    checkInitialAuth();

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
      subscription.unsubscribe();
    };
  }, []);

  return { ...state, recheckAdmin };
}
