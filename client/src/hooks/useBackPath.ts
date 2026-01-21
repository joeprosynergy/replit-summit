import { useLocation } from 'react-router-dom';

interface BackPathConfig {
  defaultPath: string;
  defaultLabel: string;
  stylesPath?: string;
  stylesLabel?: string;
}

export function useBackPath(config: BackPathConfig) {
  const location = useLocation();
  const state = location.state as { from?: string } | null;
  
  // Check if user came from a styles path (via Link state)
  const cameFromStyles = state?.from?.startsWith('/styles');
  
  if (cameFromStyles && state?.from) {
    return {
      path: state.from,
      label: config.stylesLabel || '← Back to Styles',
    };
  }
  
  // Check current URL path - if we're on a /styles/* route, use styles back path
  const currentPath = location.pathname;
  if (currentPath.startsWith('/styles/')) {
    return {
      path: config.stylesPath || '/styles',
      label: config.stylesLabel || '← Back to Styles',
    };
  }
  
  // Default fallback for /types/* routes
  return {
    path: config.defaultPath,
    label: config.defaultLabel,
  };
}
