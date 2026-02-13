/**
 * Lightweight hover-based prefetch hints.
 *
 * Instead of loading full iframes in hidden containers (which tanks
 * Lighthouse scores), we inject <link rel="preconnect"> into <head>
 * when the user hovers over a navigation link. This warms up DNS + TCP + TLS
 * for the external domain so the iframe loads faster when they click.
 *
 * Zero cost until hover — no network requests, no JS execution, no CLS.
 */

const injected = new Set<string>();

function injectPreconnect(href: string) {
  if (injected.has(href)) return;
  injected.add(href);

  const link = document.createElement("link");
  link.rel = "preconnect";
  link.href = href;
  document.head.appendChild(link);

  const dns = document.createElement("link");
  dns.rel = "dns-prefetch";
  dns.href = href;
  document.head.appendChild(dns);
}

/** Maps internal routes to the external domains their iframes load */
const ROUTE_DOMAINS: Record<string, string[]> = {
  "/inventory": ["https://summitportablebuildings.shedsuite.com"],
  "/3d-configurator": ["https://summitbuildings.shedpro.co"],
  "/blog": ["https://summitbuildings.superblog.click"],
};

/**
 * Call on mouseEnter of a navigation link.
 * If the route has an associated external iframe domain, injects
 * preconnect hints so the connection is warm by the time they click.
 */
export function prefetchForRoute(route: string) {
  const domains = ROUTE_DOMAINS[route];
  if (domains) {
    domains.forEach(injectPreconnect);
  }
}
