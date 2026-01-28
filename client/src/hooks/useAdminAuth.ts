import { useState, useEffect, useCallback } from 'react';
import type { User } from '@supabase/supabase-js';
import { getBackendClient } from '@/lib/backendClient';

interface AdminAuthState {
  user: User | null;
  isAdmin: boolean;
  isLoading: boolean;
  error: string | null;
  approvalStatus: 'pending' | 'approved' | 'rejected' | null;
  recheckAdmin: () => Promise<void>;
}

// Super admin email that bypasses all checks (configurable via env var)
const SUPER_ADMIN_EMAIL = import.meta.env.VITE_SUPER_ADMIN_EMAIL || 'joe@summitbuildings.com';

export function useAdminAuth(): AdminAuthState {
  const [state, setState] = useState<Omit<AdminAuthState, 'recheckAdmin'>>({
    user: null,
    isAdmin: false,
    isLoading: true,
    error: null,
    approvalStatus: null,
  });

  const checkApprovalStatus = useCallback(async (client: any, userId: string, email: string): Promise<{
    isAdmin: boolean;
    approvalStatus: 'pending' | 'approved' | 'rejected' | null;
  }> => {
    // Super admin always has access
    if (email === SUPER_ADMIN_EMAIL) {
      return { isAdmin: true, approvalStatus: 'approved' };
    }

    try {
      // Retry logic with increasing timeouts
      let profile = null;
      let error = null;
      const maxRetries = 3;
      const timeouts = [3000, 5000, 8000]; // 3s, 5s, 8s
      
      for (let attempt = 0; attempt < maxRetries; attempt++) {
        const queryPromise = client
          .from('profiles')
          .select('approval_status')
          .eq('user_id', userId)
          .maybeSingle();
        
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error(`Profile query timeout after ${timeouts[attempt]}ms`)), timeouts[attempt])
        );
        
        try {
          const result = await Promise.race([queryPromise, timeoutPromise]) as any;
          profile = result.data;
          error = result.error;
          break; // Success, exit retry loop
        } catch (retryErr) {
          if (attempt === maxRetries - 1) {
            throw retryErr; // Final attempt failed, throw the error
          }
          // Wait a bit before retrying
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }

      if (error) {
        return { isAdmin: false, approvalStatus: null };
      }

      if (!profile) {
        // No profile yet - user hasn't completed signup
        return { isAdmin: false, approvalStatus: null };
      }

      const approvalStatus = profile.approval_status as 'pending' | 'approved' | 'rejected';
      const isAdmin = approvalStatus === 'approved';

      return { isAdmin, approvalStatus };
    } catch (err) {
      // Return special value to indicate we should keep loading, not deny access
      return { isAdmin: false, approvalStatus: null, timedOut: true } as any;
    }
  }, []);

  const recheckAdmin = useCallback(async () => {
    const client = getBackendClient();
    if (!client || !state.user) return;
    
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    const { isAdmin, approvalStatus } = await checkApprovalStatus(
      client, 
      state.user.id, 
      state.user.email || ''
    );
    
    setState(prev => ({ 
      ...prev, 
      isAdmin, 
      approvalStatus,
      isLoading: false, 
      error: null 
    }));
  }, [state.user, checkApprovalStatus]);

  useEffect(() => {
    const client = getBackendClient();
    
    if (!client) {
      setState({ user: null, isAdmin: false, isLoading: false, error: 'Backend not configured', approvalStatus: null });
      return;
    }

    let mounted = true;
    let authResolved = false;

    const timeoutId = setTimeout(() => {
      if (!authResolved && mounted) {
        setState({
          user: null,
          isAdmin: false,
          isLoading: false,
          error: null,
          approvalStatus: null,
        });
        authResolved = true;
      }
    }, 5000);

    const { data: { subscription } } = client.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;
        authResolved = true;
        
        if (!session?.user) {
          setState({ user: null, isAdmin: false, isLoading: false, error: null, approvalStatus: null });
          return;
        }

        try {
          // Check approval status from profiles table
          const result = await checkApprovalStatus(
            client,
            session.user.id,
            session.user.email || ''
          );
          
          // If query timed out, don't update state yet - keep loading
          if ((result as any).timedOut) {
            return; // Don't update state, wait for next auth event
          }
          
          if (mounted) {
            setState({ 
              user: session.user, 
              isAdmin: result.isAdmin, 
              isLoading: false, 
              error: null,
              approvalStatus: result.approvalStatus,
            });
          }
        } catch (err: any) {
          // On error, keep loading state instead of denying access
        }
      }
    );

    const checkInitialAuth = async () => {
      try {
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
            // Check approval status
            const result = await checkApprovalStatus(
              client,
              user.id,
              user.email || ''
            );
            
            // If timed out, don't set state - wait for onAuthStateChange
            if ((result as any).timedOut) {
              return;
            }
            
            setState({ 
              user, 
              isAdmin: result.isAdmin, 
              isLoading: false, 
              error: null,
              approvalStatus: result.approvalStatus,
            });
            return;
          }
        } catch (getUserErr) {
          // Fallback: Check if we have a session token in storage
          const storageKeys = Object.keys(localStorage).filter(k => k.includes('auth-token'));
          if (storageKeys.length > 0) {
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
                const result = await checkApprovalStatus(
                  client,
                  session.user.id,
                  session.user.email || ''
                );
                
                // If timed out, don't set state - wait for auth state change
                if ((result as any).timedOut) {
                  return;
                }
                
                setState({
                  user: session.user,
                  isAdmin: result.isAdmin,
                  isLoading: false,
                  error: null,
                  approvalStatus: result.approvalStatus,
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
        
        setState({ user: null, isAdmin: false, isLoading: false, error: null, approvalStatus: null });
        
      } catch (err: any) {
        if (mounted) {
          authResolved = true;
          setState({
            user: null,
            isAdmin: false,
            isLoading: false,
            error: null,
            approvalStatus: null,
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
  }, [checkApprovalStatus]);

  return { ...state, recheckAdmin };
}
