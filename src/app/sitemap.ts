import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { getServicePath, serviceOrder } from "@/lib/service-catalog";
export default function sitemap(): MetadataRoute.Sitemap {
  const serviceRoutes = serviceOrder.flatMap((service) => [getServicePath(service, "de"), getServicePath(service, "en")]);
  const routes = ["/", "/about", "/contact", "/en", "/en/about", "/en/contact", ...serviceRoutes];
  return routes.sort().map((route) => ({ url: absoluteUrl(route) }));
}
