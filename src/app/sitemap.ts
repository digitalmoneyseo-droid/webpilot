import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/work", "/solutions", "/about", "/contact", "/en", "/en/work", "/en/solutions", "/en/about", "/en/contact"];
  return routes.sort().map((route) => ({ url: absoluteUrl(route) }));
}
