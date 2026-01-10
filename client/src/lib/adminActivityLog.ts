import { supabase } from '@/integrations/supabase/client';

interface ActivityLogEntry {
  pageSlug: string;
  action: 'update' | 'publish' | 'rollback';
  fieldPath?: string;
  oldValue?: string;
  newValue?: string;
}

export const logAdminActivity = async (entry: ActivityLogEntry): Promise<void> => {
  if (!supabase) {
    console.log('[Admin Activity] Backend not available, skipping log');
    return;
  }
  
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    const logEntry = {
      userId: user?.id || 'anonymous',
      pageSlug: entry.pageSlug,
      action: entry.action,
      fieldPath: entry.fieldPath,
      oldValue: entry.oldValue,
      newValue: entry.newValue,
      timestamp: new Date().toISOString(),
    };

    console.log('[Admin Activity]', logEntry);
  } catch (error) {
    console.warn('[Admin Activity] Failed to log:', error);
  }
};
