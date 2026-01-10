import { useLocation } from 'react-router-dom';

interface BackPathConfig {
  defaultPath: string;
  defaultLabel: string;
  stylesPath: string;
  stylesLabel: string;
}

export function useBackPath(config: BackPathConfig) {
  const location = useLocation();
  const state = location.state as { from?: string } | null;
  
  // Check if user came from a styles path
  const cameFromStyles = state?.from?.startsWith('/styles');
  
  if (cameFromStyles && state?.from) {
    return {
      path: state.from,
      label: config.stylesLabel,
    };
  }
  
  return {
    path: config.defaultPath,
    label: config.defaultLabel,
  };
}
