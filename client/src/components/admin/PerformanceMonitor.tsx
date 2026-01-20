import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Activity,
  Zap,
  HardDrive,
  Clock,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
} from 'lucide-react';
import { useCMSHealth, useCMSCache } from '@/hooks/useCMSContent';

/**
 * Performance Monitor Component
 * Displays bundle size, performance metrics, CMS health, and cache statistics.
 */

interface PerformanceMetrics {
  fcp: number | null; // First Contentful Paint
  lcp: number | null; // Largest Contentful Paint
  fid: number | null; // First Input Delay
  cls: number | null; // Cumulative Layout Shift
  ttfb: number | null; // Time to First Byte
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
  });
  const [jsHeapSize, setJsHeapSize] = useState<{
    used: number;
    total: number;
    limit: number;
  } | null>(null);
  const [loadedChunks, setLoadedChunks] = useState<string[]>([]);

  const cmsHealth = useCMSHealth();
  const cmsCache = useCMSCache();

  useEffect(() => {
    // Collect performance metrics
    if ('performance' in window) {
      // Web Vitals
      if (window.performance.getEntriesByType) {
        const paintEntries = window.performance.getEntriesByType('paint');
        const fcpEntry = paintEntries.find(e => e.name === 'first-contentful-paint');
        if (fcpEntry) {
          setMetrics(prev => ({ ...prev, fcp: fcpEntry.startTime }));
        }

        const navigationEntries = window.performance.getEntriesByType('navigation');
        if (navigationEntries.length > 0) {
          const navEntry = navigationEntries[0] as PerformanceNavigationTiming;
          setMetrics(prev => ({
            ...prev,
            ttfb: navEntry.responseStart - navEntry.requestStart,
          }));
        }
      }

      // Memory usage (Chrome only)
      if ('memory' in performance) {
        const memory = (performance as { memory: { usedJSHeapSize: number; totalJSHeapSize: number; jsHeapSizeLimit: number } }).memory;
        setJsHeapSize({
          used: memory.usedJSHeapSize,
          total: memory.totalJSHeapSize,
          limit: memory.jsHeapSizeLimit,
        });
      }
    }

    // Detect loaded script chunks
    const scripts = Array.from(document.querySelectorAll('script[src]'));
    const chunks = scripts
      .map(script => {
        const src = script.getAttribute('src') || '';
        const match = src.match(/\/assets\/(.+?)-[a-f0-9]+\.js/);
        return match ? match[1] : null;
      })
      .filter(Boolean) as string[];
    setLoadedChunks(chunks);
  }, []);

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const formatMs = (ms: number | null): string => {
    if (ms === null) return 'N/A';
    return Math.round(ms) + 'ms';
  };

  const getScoreColor = (value: number | null, thresholds: [number, number]): string => {
    if (value === null) return 'text-muted-foreground';
    if (value <= thresholds[0]) return 'text-green-500';
    if (value <= thresholds[1]) return 'text-yellow-500';
    return 'text-destructive';
  };

  const memoryUsagePercent = jsHeapSize
    ? (jsHeapSize.used / jsHeapSize.total) * 100
    : 0;

  const isAdminChunkLoaded = loadedChunks.some(chunk => 
    chunk.includes('admin') || chunk.includes('editable')
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Performance Monitor
        </CardTitle>
        <CardDescription>
          Bundle size, load metrics, and CMS health status
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Web Vitals */}
        <div>
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Core Web Vitals
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">First Contentful Paint</p>
              <p className={`text-lg font-mono ${getScoreColor(metrics.fcp, [1800, 3000])}`}>
                {formatMs(metrics.fcp)}
              </p>
              <p className="text-xs text-muted-foreground">Target: &lt; 1.8s</p>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Time to First Byte</p>
              <p className={`text-lg font-mono ${getScoreColor(metrics.ttfb, [800, 1800])}`}>
                {formatMs(metrics.ttfb)}
              </p>
              <p className="text-xs text-muted-foreground">Target: &lt; 800ms</p>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Largest Contentful Paint</p>
              <p className={`text-lg font-mono ${getScoreColor(metrics.lcp, [2500, 4000])}`}>
                {formatMs(metrics.lcp)}
              </p>
              <p className="text-xs text-muted-foreground">Target: &lt; 2.5s</p>
            </div>
          </div>
        </div>

        {/* Memory Usage */}
        {jsHeapSize && (
          <div>
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <HardDrive className="w-4 h-4" />
              Memory Usage
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>JS Heap Used</span>
                <span className="font-mono">{formatBytes(jsHeapSize.used)}</span>
              </div>
              <Progress value={memoryUsagePercent} className="h-2" />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{Math.round(memoryUsagePercent)}% of {formatBytes(jsHeapSize.total)}</span>
                <span>Limit: {formatBytes(jsHeapSize.limit)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Loaded Chunks */}
        <div>
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Loaded JavaScript Chunks
          </h3>
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {loadedChunks.map((chunk, idx) => (
                <Badge
                  key={idx}
                  variant={chunk.includes('admin') ? 'destructive' : 'secondary'}
                >
                  {chunk}
                </Badge>
              ))}
            </div>
            {isAdminChunkLoaded ? (
              <p className="text-xs text-yellow-600 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                Admin bundle loaded (expected for admin users)
              </p>
            ) : (
              <p className="text-xs text-green-600 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Public bundle only (optimized)
              </p>
            )}
          </div>
        </div>

        {/* CMS Health */}
        <div>
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Activity className="w-4 h-4" />
            CMS Health Status
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Service Status</span>
              <Badge variant={cmsHealth.available ? 'default' : 'destructive'}>
                {cmsHealth.available ? (
                  <>
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Available
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Degraded
                  </>
                )}
              </Badge>
            </div>

            {!cmsHealth.available && (
              <>
                <div className="text-sm">
                  <p className="text-muted-foreground mb-1">Consecutive Failures:</p>
                  <p className="font-mono text-destructive">{cmsHealth.consecutiveFailures}</p>
                </div>
                {cmsHealth.lastError && (
                  <div className="text-sm">
                    <p className="text-muted-foreground mb-1">Last Error:</p>
                    <p className="font-mono text-xs text-destructive">{cmsHealth.lastError}</p>
                  </div>
                )}
                <Button
                  onClick={() => cmsHealth.resetHealth()}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset Health Status
                </Button>
              </>
            )}

            <div className="text-xs text-muted-foreground">
              Last checked: {new Date(cmsHealth.lastCheck).toLocaleTimeString()}
            </div>
          </div>
        </div>

        {/* Cache Statistics */}
        <div>
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <HardDrive className="w-4 h-4" />
            Content Cache
          </h3>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Cached Pages</p>
                <p className="text-2xl font-mono">{cmsCache.stats.totalItems}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Cache Size</p>
                <p className="text-2xl font-mono">{formatBytes(cmsCache.stats.totalSize)}</p>
              </div>
            </div>

            {cmsCache.stats.totalItems > 0 && (
              <>
                <div className="text-xs text-muted-foreground space-y-1">
                  {cmsCache.stats.oldestItem && (
                    <p>
                      Oldest: {new Date(cmsCache.stats.oldestItem).toLocaleString()}
                    </p>
                  )}
                  {cmsCache.stats.newestItem && (
                    <p>
                      Newest: {new Date(cmsCache.stats.newestItem).toLocaleString()}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      cmsCache.clearAll();
                      cmsCache.refresh();
                    }}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    Clear All Cache
                  </Button>
                  <Button
                    onClick={() => cmsCache.refresh()}
                    variant="outline"
                    size="sm"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Recommendations */}
        <div className="border-t pt-4">
          <h3 className="text-sm font-semibold mb-2">Recommendations</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {metrics.fcp && metrics.fcp > 3000 && (
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                <span>FCP is slow. Consider reducing bundle size or using code splitting.</span>
              </li>
            )}
            {memoryUsagePercent > 75 && (
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                <span>High memory usage detected. Clear cache or reload page.</span>
              </li>
            )}
            {!cmsHealth.available && (
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                <span>CMS service degraded. Content is being served from cache/defaults.</span>
              </li>
            )}
            {cmsCache.stats.totalItems > 20 && (
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                <span>Large cache size. Consider clearing old cached content.</span>
              </li>
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
