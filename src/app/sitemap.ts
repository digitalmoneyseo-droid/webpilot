import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { getServicePath, serviceOrder } from "@/lib/service-catalog";
import { defaultLocale, localizePath, locales, type Locale } from "@/lib/i18n";

type LocalizedRoute = (locale: Locale) => string;

function languageAlternates(route: LocalizedRoute): Record<string, string> {
  return {
    ...Object.fromEntries(locales.map((locale) => [locale, absoluteUrl(route(locale))])),
    "x-default": absoluteUrl(route(defaultLocale)),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: LocalizedRoute[] = [
    (locale) => localizePath("/", locale),
    (locale) => localizePath("/about", locale),
    (locale) => localizePath("/contact", locale),
    ...serviceOrder.map((service) => (locale: Locale) => getServicePath(service, locale)),
  ];

  return routes
    .flatMap((route) => locales.map((locale) => ({
      url: absoluteUrl(route(locale)),
      alternates: { languages: languageAlternates(route) },
    })))
    .sort((left, right) => left.url.localeCompare(right.url));
}
