import React, { createContext, useContext, ReactNode, useRef, useMemo, useEffect } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import type { User } from '@supabase/supabase-js';

interface AdminAuthContextValue {
  user: User | null;
  isAdmin: boolean;
  isLoading: boolean;
  isRevalidating: boolean;
  error: string | null;
  recheckAdmin: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

export function useAdminAuthContext(): AdminAuthContextValue {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuthContext must be used within an AdminAuthProvider');
  }
  return context;
}

export function useAdminAuthContextOptional(): AdminAuthContextValue | null {
  return useContext(AdminAuthContext);
}

interface AdminAuthProviderProps {
  children: ReactNode;
}

export function AdminAuthProvider({ children }: AdminAuthProviderProps) {
  const authState = useAdminAuth();
  
  const hasEverVerifiedAdmin = useRef<boolean>(false);
  const hasCompletedInitialLoad = useRef<boolean>(false);
  
  useEffect(() => {
    if (!authState.isLoading) {
      hasCompletedInitialLoad.current = true;
      if (authState.isAdmin) {
        hasEverVerifiedAdmin.current = true;
      }
      if (!authState.user) {
        hasEverVerifiedAdmin.current = false;
      }
    }
  }, [authState.isLoading, authState.isAdmin, authState.user]);
  
  const stableAuthState = useMemo(() => {
    const isRevalidating = authState.isLoading && hasCompletedInitialLoad.current && hasEverVerifiedAdmin.current;
    
    return {
      ...authState,
      isRevalidating,
      isAdmin: isRevalidating ? true : authState.isAdmin,
    };
  }, [authState]);
  
  return (
    <AdminAuthContext.Provider value={stableAuthState}>
      {children}
    </AdminAuthContext.Provider>
  );
}
