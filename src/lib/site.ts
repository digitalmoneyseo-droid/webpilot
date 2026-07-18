export type SiteMode = "preview" | "concept" | "live";

function parseMode(value: string | undefined): SiteMode {
  return value === "preview" || value === "live" ? value : "concept";
}

export const siteMode = parseMode(import.meta.env.PUBLIC_SITE_MODE);
export const siteUrl = new URL(import.meta.env.PUBLIC_SITE_URL || "https://webpilot.studio");
export const turnstileSiteKey = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA";
export const contactFormEnabled = siteMode !== "concept" && import.meta.env.CONTACT_FORM_ENABLED === "true";
export const analyticsEnabled = siteMode === "live";

export function robotsDirective(indexable = true): string {
  if (siteMode !== "live") return "noindex, nofollow, noarchive";
  return indexable ? "index, follow" : "noindex, follow";
}

export function absoluteUrl(path: string): string {
  return new URL(path, siteUrl).toString();
}
