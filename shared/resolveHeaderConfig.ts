import {
  HeaderConfig,
  NAV_CONFIG_VERSION,
  defaultHeaderConfig,
} from '@/shared/navigationSchema';

const DEAD_LOGO_HOST = 'res.cloudinary.com/dmbzcxslt';

function usableLogo(url: string | undefined): string | undefined {
  if (!url) return undefined;
  if (url.includes(DEAD_LOGO_HOST)) return undefined;
  return url;
}

/**
 * Use code nav defaults until CMS stores navVersion 2+.
 * Keep CMS logo and CTAs so a working uploaded logo is not replaced by a stale URL.
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
    const logoImage = usableLogo(cmsConfig.logoImage) ?? defaultHeaderConfig.logoImage;
    return { ...cmsConfig, logoImage };
  }

  return {
    ...defaultHeaderConfig,
    logoImage: usableLogo(cmsConfig?.logoImage) ?? defaultHeaderConfig.logoImage,
    logoAlt: cmsConfig?.logoAlt || defaultHeaderConfig.logoAlt,
    ctaPhone: cmsConfig?.ctaPhone || defaultHeaderConfig.ctaPhone,
    ctaPhoneDisplay: cmsConfig?.ctaPhoneDisplay || defaultHeaderConfig.ctaPhoneDisplay,
    ctaButtonText: cmsConfig?.ctaButtonText || defaultHeaderConfig.ctaButtonText,
    ctaButtonLink: cmsConfig?.ctaButtonLink || defaultHeaderConfig.ctaButtonLink,
    ctaButtonIsRoute: cmsConfig?.ctaButtonIsRoute ?? defaultHeaderConfig.ctaButtonIsRoute,
  };
}
