import type { APIRoute } from "astro";
import { getProjects, getServices } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

const escapeXml = (value: string) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

export const GET: APIRoute = async () => {
  const routes = new Set<string>();
  ["/", "/work", "/about", "/contact", "/privacy", "/imprint", "/en", "/en/work", "/en/about", "/en/contact", "/en/privacy", "/en/imprint"].forEach((route) => routes.add(route));
  for (const locale of ["de", "en"] as const) {
    const prefix = locale === "de" ? "" : "/en";
    const [projects, services] = await Promise.all([getProjects(locale), getServices(locale)]);
    projects.forEach((entry) => routes.add(`${prefix}/work/${entry.data.slug}`));
    services.forEach((entry) => routes.add(`${prefix}/services/${entry.data.slug}`));
  }
  const urls = [...routes].sort().map((route) => `<url><loc>${escapeXml(absoluteUrl(route))}</loc></url>`).join("");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
