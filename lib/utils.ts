import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Normalizes image URLs to absolute paths.
 * - Returns absolute URLs (http/https/data:) unchanged
 * - Converts relative paths to absolute paths from root
 * - Returns placeholder for empty/invalid URLs
 */
export function normalizeImageUrl(url: string | undefined | null, fallback?: string): string {
  if (!url || typeof url !== 'string' || url.trim() === '') {
    return fallback || '/placeholder.svg';
  }
  
  const trimmed = url.trim();
  
  // Already absolute - return as-is
  if (trimmed.startsWith('http://') || 
      trimmed.startsWith('https://') || 
      trimmed.startsWith('data:') ||
      trimmed.startsWith('//')) {
    return trimmed;
  }
  
  // Ensure relative paths start from root
  if (trimmed.startsWith('/')) {
    return trimmed;
  }
  
  // Convert relative path to absolute from root
  return '/' + trimmed;
}
