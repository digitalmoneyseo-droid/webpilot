import type { APIRoute } from "astro";
import { getInsights, getProjects, getServices } from "@/lib/content";
import { absoluteUrl, siteMode } from "@/lib/site";

const escapeXml = (value: string) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

export const GET: APIRoute = async () => {
  const routes = new Set<string>();
  if (siteMode === "live") {
    ["/", "/work", "/about", "/insights", "/contact", "/privacy", "/imprint", "/konzept", "/en", "/en/work", "/en/about", "/en/insights", "/en/contact", "/en/privacy", "/en/imprint", "/en/concept"].forEach((route) => routes.add(route));
    for (const locale of ["de", "en"] as const) {
      const prefix = locale === "de" ? "" : "/en";
      const [projects, services, insights] = await Promise.all([getProjects(locale), getServices(locale), getInsights(locale)]);
      projects.filter((entry) => entry.data.indexable).forEach((entry) => routes.add(`${prefix}/work/${entry.data.slug}`));
      services.filter((entry) => entry.data.indexable).forEach((entry) => routes.add(`${prefix}/services/${entry.data.slug}`));
      insights.filter((entry) => entry.data.indexable).forEach((entry) => routes.add(`${prefix}/insights/${entry.data.slug}`));
    }
  }
  const urls = [...routes].sort().map((route) => `<url><loc>${escapeXml(absoluteUrl(route))}</loc></url>`).join("");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
