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

// Super admin email that bypasses all checks
const SUPER_ADMIN_EMAIL = 'joe@summitbuildings.com';

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
      // Check profile for approval status
      const { data: profile, error } = await client
        .from('profiles')
        .select('approval_status')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) {
        console.warn('Failed to check approval status:', error);
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
      console.error('Error checking approval status:', err);
      return { isAdmin: false, approvalStatus: null };
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
        console.error('[useAdminAuth] Auth check timed out after 5s - forcing fallback');
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
          const { isAdmin, approvalStatus } = await checkApprovalStatus(
            client,
            session.user.id,
            session.user.email || ''
          );
          
          if (mounted) {
            setState({ 
              user: session.user, 
              isAdmin, 
              isLoading: false, 
              error: null,
              approvalStatus,
            });
          }
        } catch (err: any) {
          if (mounted) {
            setState({
              user: session.user,
              isAdmin: false,
              isLoading: false,
              error: `Admin check failed: ${err.message}`,
              approvalStatus: null,
            });
          }
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
            const { isAdmin, approvalStatus } = await checkApprovalStatus(
              client,
              user.id,
              user.email || ''
            );
            
            setState({ 
              user, 
              isAdmin, 
              isLoading: false, 
              error: null,
              approvalStatus,
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
                const { isAdmin, approvalStatus } = await checkApprovalStatus(
                  client,
                  session.user.id,
                  session.user.email || ''
                );
                
                setState({
                  user: session.user,
                  isAdmin,
                  isLoading: false,
                  error: null,
                  approvalStatus,
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
