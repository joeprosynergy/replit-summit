"use client";

import { getBackendClient, isBackendAvailable } from './backendClient';

/**
 * CMS Fallback Manager
 * Implements a multi-layer fallback strategy: CMS → Cache → Defaults
 * Ensures content is always available even when CMS is unavailable.
 */

interface CachedContent {
  data: any;
  timestamp: number;
  slug: string;
}

interface CMSHealth {
  available: boolean;
  lastCheck: number;
  consecutiveFailures: number;
  lastError?: string;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const CACHE_KEY_PREFIX = 'cms_content_';
const HEALTH_KEY = 'cms_health';
const MAX_CONSECUTIVE_FAILURES = 5; // Increased since we have faster 2s timeout

export class CMSFallbackManager {
  private static defaults = new Map<string, any>();
  private static cmsHealth: CMSHealth = {
    available: true,
    lastCheck: Date.now(),
    consecutiveFailures: 0,
  };

  /**
   * Register default content for a page.
   * This serves as the ultimate fallback when CMS and cache are unavailable.
   */
  static register(slug: string, defaults: any): void {
    this.defaults.set(slug, defaults);
    console.log(`[CMSFallback] Registered defaults for ${slug}`);
  }

  /**
   * Unregister defaults for a page.
   */
  static unregister(slug: string): void {
    this.defaults.delete(slug);
  }

  /**
   * Get content with intelligent fallback strategy.
   */
  static async getContent<T = any>(slug: string): Promise<{
    data: T | null;
    source: 'cms' | 'cache' | 'defaults';
    fromCache?: boolean;
  }> {
    // 1. Try CMS (primary source)
    if (this.shouldTryCMS()) {
      try {
        const cmsData = await this.fetchFromCMS(slug);
        if (this.isValid(cmsData)) {
          this.markCMSSuccess();
          this.cacheContent(slug, cmsData);
          return { data: cmsData as T, source: 'cms' };
        }
      } catch (error: any) {
        console.warn('[CMSFallback] CMS fetch failed:', error.message);
        this.markCMSFailure(error.message);
      }
    }

    // 2. Try browser cache (if recently loaded)
    const cached = this.getCachedContent(slug);
    if (cached && !this.isStale(cached)) {
      console.log(`[CMSFallback] Using cached content for ${slug}`);
      return { data: cached.data as T, source: 'cache', fromCache: true };
    }

    // 3. Use registered defaults (last resort)
    const defaults = this.defaults.get(slug);
    if (defaults) {
      console.warn(`[CMSFallback] Using defaults for ${slug} (CMS unavailable)`);
      return { data: defaults as T, source: 'defaults' };
    }

    console.error(`[CMSFallback] No fallback available for ${slug}`);
    return { data: null, source: 'defaults' };
  }

  /**
   * Fetch content from CMS database.
   */
  private static async fetchFromCMS(slug: string): Promise<any> {
    if (!isBackendAvailable()) {
      throw new Error('Backend not configured');
    }

    const client = getBackendClient();
    if (!client) {
      throw new Error('Backend client not available');
    }

    // Add timeout to prevent hanging (3s to account for Supabase latency)
    const timeout = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('CMS fetch timeout after 3s')), 3000)
    );

    const fetchData = async () => {
      // OPTIMIZATION: Fetch page and sections in parallel (cuts latency in half)
      const [pageResult, sectionsResult] = await Promise.all([
        (client as any)
          .from('page_content')
          .select('*')
          .eq('slug', slug)
          .maybeSingle(),
        (client as any)
          .from('section_content')
          .select('*')
          .eq('page_slug', slug)
          .order('order_index', { ascending: true })
      ]);

      const { data: page, error: pageError, status: pageStatus } = pageResult;
      if (pageError || pageStatus !== 200 || !page) {
        throw new Error(pageError?.message || 'Page not found');
      }

      const { data: sections, error: sectionsError, status: sectionsStatus } = sectionsResult;
      if (sectionsError || sectionsStatus !== 200) {
        throw new Error(sectionsError?.message || 'Sections not found');
      }

      // Combine page and sections for backward compatibility
      const mainSection = sections?.find((s: any) => s.section_name === 'main');
      const content = mainSection ? mainSection.content : {};

      return {
        ...content,
        _page: page,
        _sections: sections || [],
      };
    };

    // Race between fetch and timeout
    return Promise.race([fetchData(), timeout]);
  }

  /**
   * Check if content is valid and not empty.
   */
  private static isValid(data: any): boolean {
    if (!data) return false;
    if (typeof data !== 'object') return false;
    
    // Check if it has any meaningful content
    const keys = Object.keys(data).filter(k => !k.startsWith('_'));
    return keys.length > 0;
  }

  /**
   * Cache content in browser storage.
   */
  private static cacheContent(slug: string, data: any): void {
    try {
      const cached: CachedContent = {
        data,
        timestamp: Date.now(),
        slug,
      };
      localStorage.setItem(
        `${CACHE_KEY_PREFIX}${slug}`,
        JSON.stringify(cached)
      );
    } catch (error) {
      console.warn('[CMSFallback] Failed to cache content:', error);
    }
  }

  /**
   * Get cached content from browser storage.
   */
  static getCachedContent(slug: string): CachedContent | null {
    try {
      const item = localStorage.getItem(`${CACHE_KEY_PREFIX}${slug}`);
      if (!item) return null;
      
      return JSON.parse(item) as CachedContent;
    } catch (error) {
      console.warn('[CMSFallback] Failed to read cache:', error);
      return null;
    }
  }

  /**
   * Check if cached content is stale.
   */
  static isStale(cached: CachedContent): boolean {
    const age = Date.now() - cached.timestamp;
    return age > CACHE_DURATION;
  }

  /**
   * Clear cache for a specific slug or all cache.
   */
  static clearCache(slug?: string): void {
    if (slug) {
      localStorage.removeItem(`${CACHE_KEY_PREFIX}${slug}`);
      console.log(`[CMSFallback] Cleared cache for ${slug}`);
    } else {
      // Clear all CMS cache
      const keys = Object.keys(localStorage).filter(key => 
        key.startsWith(CACHE_KEY_PREFIX)
      );
      keys.forEach(key => localStorage.removeItem(key));
      console.log(`[CMSFallback] Cleared all cache (${keys.length} items)`);
    }
  }

  /**
   * Check if we should try fetching from CMS.
   */
  private static shouldTryCMS(): boolean {
    // Always try if available
    if (this.cmsHealth.available) {
      return true;
    }

    // If degraded, try again after cooldown period (reduced to 10s)
    const cooldownPeriod = 10 * 1000;
    const timeSinceLastCheck = Date.now() - this.cmsHealth.lastCheck;
    const remainingCooldown = Math.max(0, cooldownPeriod - timeSinceLastCheck);
    
    if (timeSinceLastCheck > cooldownPeriod) {
      return true;
    }

    return false;
  }

  /**
   * Mark CMS as successfully responding.
   */
  private static markCMSSuccess(): void {
    const wasUnavailable = !this.cmsHealth.available;
    
    this.cmsHealth = {
      available: true,
      lastCheck: Date.now(),
      consecutiveFailures: 0,
    };

    if (wasUnavailable) {
      console.log('[CMSFallback] ✅ CMS service recovered');
    }

    this.persistHealth();
  }

  /**
   * Mark CMS as failed.
   */
  private static markCMSFailure(error: string): void {
    this.cmsHealth.consecutiveFailures++;
    this.cmsHealth.lastCheck = Date.now();
    this.cmsHealth.lastError = error;

    if (this.cmsHealth.consecutiveFailures >= MAX_CONSECUTIVE_FAILURES) {
      this.cmsHealth.available = false;
      console.error(
        `[CMSFallback] ⚠️ CMS service degraded after ${MAX_CONSECUTIVE_FAILURES} failures`
      );
    }

    this.persistHealth();
  }

  /**
   * Get current CMS health status.
   */
  static getHealth(): CMSHealth {
    return { ...this.cmsHealth };
  }

  /**
   * Reset CMS health status (for manual recovery).
   */
  static resetHealth(): void {
    this.cmsHealth = {
      available: true,
      lastCheck: Date.now(),
      consecutiveFailures: 0,
    };
    this.persistHealth();
    console.log('[CMSFallback] Health status reset');
  }

  /**
   * Persist health status to localStorage.
   */
  private static persistHealth(): void {
    try {
      localStorage.setItem(HEALTH_KEY, JSON.stringify(this.cmsHealth));
    } catch (error) {
      console.warn('[CMSFallback] Failed to persist health:', error);
    }
  }

  /**
   * Load health status from localStorage.
   */
  static loadHealth(): void {
    try {
      const item = localStorage.getItem(HEALTH_KEY);
      if (item) {
        this.cmsHealth = JSON.parse(item);
        console.log('[CMSFallback] Loaded health status:', this.cmsHealth);
      }
    } catch (error) {
      console.warn('[CMSFallback] Failed to load health:', error);
    }
  }

  /**
   * Prefetch and cache content for multiple pages.
   */
  static async prefetch(slugs: string[]): Promise<void> {
    console.log(`[CMSFallback] Prefetching ${slugs.length} pages...`);
    
    const promises = slugs.map(async (slug) => {
      try {
        await this.getContent(slug);
      } catch (error) {
        console.warn(`[CMSFallback] Prefetch failed for ${slug}:`, error);
      }
    });

    await Promise.allSettled(promises);
    console.log('[CMSFallback] Prefetch complete');
  }

  /**
   * Get cache statistics.
   */
  static getCacheStats(): {
    totalItems: number;
    totalSize: number;
    oldestItem: number | null;
    newestItem: number | null;
  } {
    const keys = Object.keys(localStorage).filter(key => 
      key.startsWith(CACHE_KEY_PREFIX)
    );
    
    let totalSize = 0;
    let oldestItem: number | null = null;
    let newestItem: number | null = null;

    keys.forEach(key => {
      const item = localStorage.getItem(key);
      if (item) {
        totalSize += item.length;
        
        try {
          const cached: CachedContent = JSON.parse(item);
          if (oldestItem === null || cached.timestamp < oldestItem) {
            oldestItem = cached.timestamp;
          }
          if (newestItem === null || cached.timestamp > newestItem) {
            newestItem = cached.timestamp;
          }
        } catch {}
      }
    });

    return {
      totalItems: keys.length,
      totalSize,
      oldestItem,
      newestItem,
    };
  }
}

// Initialize on module load
if (typeof window !== 'undefined') {
  CMSFallbackManager.loadHealth();
}
