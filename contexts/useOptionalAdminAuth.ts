"use client";

import { useContext } from "react";
import { AdminAuthContext } from "@/contexts/AdminAuthContext";

export function useOptionalAdminAuth() {
  return useContext(AdminAuthContext) ?? {
    isAdmin: false,
    isRevalidating: false,
    isLoading: false,
    user: null,
    error: null,
    approvalStatus: null,
    recheckAdmin: async () => {},
  };
}
