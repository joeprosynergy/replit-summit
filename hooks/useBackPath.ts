"use client";

import { usePathname, useSearchParams } from 'next/navigation';

interface BackPathConfig {
  defaultPath: string;
  defaultLabel: string;
  stylesPath?: string;
  stylesLabel?: string;
}

export function useBackPath(config: BackPathConfig) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Check if user navigated from a styles page via ?from=styles query param
  const cameFromStyles = searchParams.get('from') === 'styles' || pathname.startsWith('/styles/');

  if (cameFromStyles && config.stylesPath && config.stylesLabel) {
    return {
      path: config.stylesPath,
      label: config.stylesLabel,
    };
  }

  if (cameFromStyles) {
    return {
      path: '/styles',
      label: '← Back to Styles',
    };
  }

  // Default fallback for /types/* routes or direct navigation
  return {
    path: config.defaultPath,
    label: config.defaultLabel,
  };
}
