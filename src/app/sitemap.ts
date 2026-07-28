import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/work", "/solutions", "/about", "/contact", "/en", "/en/work", "/en/solutions", "/en/about", "/en/contact"];
  for (const locale of ["de", "en"] as const) for (const { data } of getProjects(locale)) routes.push(`${locale === "de" ? "" : "/en"}/work/${data.slug}`);
  return routes.sort().map((route) => ({ url: absoluteUrl(route) }));
}
