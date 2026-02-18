"use client";

import { getBackendClient } from '@/lib/backendClient';

interface ActivityLogEntry {
  pageSlug: string;
  action: 'update' | 'publish' | 'rollback' | 'login' | 'logout' | 'approve_user' | 'reject_user';
  fieldPath?: string;
  oldValue?: string;
  newValue?: string;
}

export const logAdminActivity = async (entry: ActivityLogEntry): Promise<void> => {
  const client = getBackendClient();
  if (!client) return;
  
  try {
    const { data: { user } } = await client.auth.getUser();
    if (!user) return;

    const logEntry = {
      user_id: user.id,
      user_email: user.email || null,
      action: entry.action,
      page_slug: entry.pageSlug || null,
      field_path: entry.fieldPath || null,
      old_value: entry.oldValue ? entry.oldValue.substring(0, 5000) : null,
      new_value: entry.newValue ? entry.newValue.substring(0, 5000) : null,
    };

    const { error } = await client
      .from('admin_activity_log')
      .insert(logEntry);

    if (error) {
      console.warn('[Admin Activity] Failed to persist log:', error.message);
    }
  } catch {
    // Silently fail - logging should never break the main flow
  }
};
