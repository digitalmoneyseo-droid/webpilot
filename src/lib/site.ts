export const siteUrl = new URL(import.meta.env.PUBLIC_SITE_URL || "https://webpilot.studio");
export const turnstileSiteKey = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA";
export const analyticsEnabled = Boolean(import.meta.env.PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN);

export function robotsDirective(indexable = true): string {
  return indexable ? "index, follow" : "noindex, follow";
}

export function absoluteUrl(path: string): string {
  return new URL(path, siteUrl).toString();
}
