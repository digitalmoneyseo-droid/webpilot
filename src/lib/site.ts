import type { Metadata } from "next";
import { alternatePath, defaultLocale, localeConfig, locales, t, type Locale } from "@/lib/i18n";

const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://suchio.digitalmoneyseo.workers.dev");

export function absoluteUrl(path: string): string {
  return new URL(path, siteUrl).toString();
}

export function pageMetadata({
  locale,
  pathname,
  title,
  description,
}: {
  locale: Locale;
  pathname: string;
  title?: string;
  description: string;
}): Metadata {
  const pageTitle = title ? `${title} | Suchio` : t(locale, "meta.siteTitle");
  const image = absoluteUrl("/suchio-social-card.png");
  const languageAlternates = Object.fromEntries(locales.map((candidate) => [candidate, absoluteUrl(alternatePath(pathname, candidate))]));
  return {
    title: pageTitle,
    description,
    robots: { index: true, follow: true },
    alternates: {
      canonical: absoluteUrl(pathname),
      languages: {
        ...languageAlternates,
        "x-default": absoluteUrl(alternatePath(pathname, defaultLocale)),
      },
    },
    openGraph: {
      type: "website",
      siteName: "Suchio",
      locale: localeConfig[locale].openGraphLocale,
      alternateLocale: locales.filter((candidate) => candidate !== locale).map((candidate) => localeConfig[candidate].openGraphLocale),
      title: pageTitle,
      description,
      url: absoluteUrl(pathname),
      images: [image],
    },
    twitter: { card: "summary_large_image", title: pageTitle, description, images: [image] },
  };
}
