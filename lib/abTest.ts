/**
 * Homepage A/B test client helper.
 *
 * The variant is assigned server-side by middleware.ts and persisted in
 * the `summit_homepage_variant` cookie. This helper reads it for
 * client-side tracking (form submissions, analytics).
 */

export const HOMEPAGE_AB_COOKIE = "summit_homepage_variant";

export type HomepageVariant = "v1" | "v2";

export function getHomepageVariant(): HomepageVariant | null {
  if (typeof document === "undefined") return null;
  const prefix = `${HOMEPAGE_AB_COOKIE}=`;
  const match = document.cookie.split("; ").find((c) => c.startsWith(prefix));
  if (!match) return null;
  const v = match.slice(prefix.length);
  return v === "v1" || v === "v2" ? v : null;
}
