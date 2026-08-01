import type { MetadataRoute } from "next";
import { portfolioRoutes } from "@/lib/portfolio-routes";
import { absoluteUrl } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", portfolioRoutes.de.indexPath, "/solutions", "/about", "/contact", "/en", portfolioRoutes.en.indexPath, "/en/solutions", "/en/about", "/en/contact"];
  return routes.sort().map((route) => ({ url: absoluteUrl(route) }));
}
