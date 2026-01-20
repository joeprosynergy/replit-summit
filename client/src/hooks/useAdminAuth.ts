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
        console.error('[useAdminAuth] Auth check timed out after 5s - forcing fallback');
        // Force a fallback state - assume not logged in
        setState({
          user: null,
          isAdmin: false,
          isLoading: false,
          error: null,
        });
        authResolved = true;
      }
    }, 5000);

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
        // Quick check if we have a session in localStorage
        const storageKeys = Object.keys(localStorage).filter(k => k.includes('auth-token'));
        
        // Try getUser with short timeout
        try {
          const getUserTimeout = new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error('getUser timeout')), 2000)
          );
          
          const { data: { user }, error: userError } = await Promise.race([
            client.auth.getUser(),
            getUserTimeout
          ]);
          
          if (!mounted) return;
          authResolved = true;
          
          if (user && !userError) {
            // Success - we have a user
            const isAdminEmail = user.email?.includes('@summitbuildings.com') || user.email === 'joe@summitbuildings.com';
            
            setState({ 
              user, 
              isAdmin: isAdminEmail, 
              isLoading: false, 
              error: null 
            });
            return;
          }
        } catch (getUserErr) {
          // Fallback: Check if we have a session token in storage
          if (storageKeys.length > 0) {
            // We have auth tokens - try getSession as fallback
            try {
              const sessionTimeout = new Promise<never>((_, reject) =>
                setTimeout(() => reject(new Error('getSession timeout')), 2000)
              );
              
              const { data: { session } } = await Promise.race([
                client.auth.getSession(),
                sessionTimeout
              ]);
              
              if (!mounted) return;
              authResolved = true;
              
              if (session?.user) {
                const isAdminEmail = session.user.email?.includes('@summitbuildings.com') || 
                                    session.user.email === 'joe@summitbuildings.com';
                
                setState({
                  user: session.user,
                  isAdmin: isAdminEmail,
                  isLoading: false,
                  error: null
                });
                return;
              }
            } catch (sessionErr) {
              // Session also unavailable
            }
          }
        }
        
        // No user found
        if (!mounted) return;
        authResolved = true;
        
        setState({ user: null, isAdmin: false, isLoading: false, error: null });
        
      } catch (err: any) {
        if (mounted) {
          authResolved = true;
          setState({
            user: null,
            isAdmin: false,
            isLoading: false,
            error: null, // Don't show error, just treat as not logged in
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
