import {
  HeaderConfig,
  NAV_CONFIG_VERSION,
  defaultHeaderConfig,
} from '@/shared/navigationSchema';

/**
 * Use code defaults until CMS stores navVersion 2+.
 * Prevents stale flat header links in Supabase from overriding dropdown nav.
 */
export function resolveHeaderConfig(
  cmsConfig: HeaderConfig | null | undefined
): HeaderConfig {
  if (
    cmsConfig &&
    typeof cmsConfig.navVersion === 'number' &&
    cmsConfig.navVersion >= NAV_CONFIG_VERSION &&
    Array.isArray(cmsConfig.navLinks) &&
    cmsConfig.navLinks.length > 0
  ) {
    return cmsConfig;
  }

  return defaultHeaderConfig;
}
