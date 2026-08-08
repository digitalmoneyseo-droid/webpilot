import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { getServicePath, serviceOrder } from "@/lib/service-catalog";
import { localizePath, locales } from "@/lib/i18n";
export default function sitemap(): MetadataRoute.Sitemap {
  const serviceRoutes = locales.flatMap((locale) => serviceOrder.map((service) => getServicePath(service, locale)));
  const routes = locales.flatMap((locale) => [localizePath("/", locale), localizePath("/about", locale), localizePath("/contact", locale)]).concat(serviceRoutes);
  return routes.sort().map((route) => ({ url: absoluteUrl(route) }));
}
