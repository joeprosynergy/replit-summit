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
      console.log('[checkApprovalStatus] Starting profile query for userId:', userId);
      
      // Retry logic with increasing timeouts
      let profile = null;
      let error = null;
      const maxRetries = 3;
      const timeouts = [3000, 5000, 8000]; // 3s, 5s, 8s
      
      for (let attempt = 0; attempt < maxRetries; attempt++) {
        console.log(`[checkApprovalStatus] Attempt ${attempt + 1}/${maxRetries} with ${timeouts[attempt]}ms timeout`);
        
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
          console.log(`[checkApprovalStatus] Attempt ${attempt + 1} succeeded`);
          break; // Success, exit retry loop
        } catch (retryErr) {
          console.warn(`[checkApprovalStatus] Attempt ${attempt + 1} failed:`, retryErr);
          if (attempt === maxRetries - 1) {
            throw retryErr; // Final attempt failed, throw the error
          }
          // Wait a bit before retrying
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
      
      console.log('[checkApprovalStatus] Profile query completed:', {
        userId,
        email,
        hasProfile: !!profile,
        hasError: !!error,
        errorMsg: error?.message,
        approvalStatus: profile?.approval_status,
        profileData: profile
      });
      
      // #region agent log
      console.log('[useAdminAuth] Profile check:', {
        userId,
        email,
        hasProfile: !!profile,
        hasError: !!error,
        errorMsg: error?.message,
        approvalStatus: profile?.approval_status,
        profileData: profile
      });
      fetch('http://127.0.0.1:7242/ingest/f4257b34-1dc4-4061-84a5-733cc267b72d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useAdminAuth.ts:41',message:'profile check',data:{userId:userId,email:email,hasProfile:!!profile,hasError:!!error,errorMsg:error?.message,approvalStatus:profile?.approval_status},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'D1,D5'})}).catch(()=>{});
      // #endregion

      if (error) {
        console.warn('[useAdminAuth] Failed to check approval status:', error);
        return { isAdmin: false, approvalStatus: null };
      }

      if (!profile) {
        // No profile yet - user hasn't completed signup
        // #region agent log
        console.log('[useAdminAuth] No profile found for userId:', userId);
        fetch('http://127.0.0.1:7242/ingest/f4257b34-1dc4-4061-84a5-733cc267b72d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useAdminAuth.ts:50',message:'no profile found',data:{userId:userId},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'D5'})}).catch(()=>{});
        // #endregion
        return { isAdmin: false, approvalStatus: null };
      }

      const approvalStatus = profile.approval_status as 'pending' | 'approved' | 'rejected';
      const isAdmin = approvalStatus === 'approved';

      return { isAdmin, approvalStatus };
    } catch (err) {
      console.error('[checkApprovalStatus] Error checking approval status:', err);
      console.error('[checkApprovalStatus] Error details:', {
        message: err instanceof Error ? err.message : 'Unknown error',
        userId,
        email
      });
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
        console.log('[useAdminAuth] Auth state change:', { event, hasSession: !!session, hasUser: !!session?.user });
        console.log('[useAdminAuth] Step 1: mounted =', mounted);
        if (!mounted) return;
        authResolved = true;
        console.log('[useAdminAuth] Step 2: authResolved set to true');
        
        if (!session?.user) {
          console.log('[useAdminAuth] No session/user - setting as logged out');
          setState({ user: null, isAdmin: false, isLoading: false, error: null, approvalStatus: null });
          return;
        }

        console.log('[useAdminAuth] Step 3: About to check approval status for user:', session.user.id);
        try {
          // Check approval status from profiles table
          const result = await checkApprovalStatus(
            client,
            session.user.id,
            session.user.email || ''
          );
          
          console.log('[useAdminAuth] Step 4: Approval check complete:', result);
          
          // If query timed out, don't update state yet - keep loading
          if ((result as any).timedOut) {
            console.log('[useAdminAuth] Query timed out, keeping loading state - waiting for retry or next event');
            return; // Don't update state, wait for next auth event
          }
          
          if (mounted) {
            console.log('[useAdminAuth] Step 5: Setting state with admin status');
            setState({ 
              user: session.user, 
              isAdmin: result.isAdmin, 
              isLoading: false, 
              error: null,
              approvalStatus: result.approvalStatus,
            });
          }
        } catch (err: any) {
          console.error('[useAdminAuth] ERROR in auth state change:', err);
          // On error, keep loading state instead of denying access
          console.log('[useAdminAuth] Keeping loading state due to error');
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
              console.log('[checkInitialAuth] Profile query timed out, waiting for auth state change');
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
                  console.log('[checkInitialAuth/session] Profile query timed out, waiting for auth state change');
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
