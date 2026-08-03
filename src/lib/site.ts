import type { Metadata } from "next";
import { alternatePath, type Locale } from "@/lib/i18n";

export const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://webpilot.studio");

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
  const pageTitle = title
    ? `${title} | Webpilot`
    : locale === "de"
      ? "Webpilot | Websites, Wachstum & Automatisierung"
      : "Webpilot | Websites, Growth & Automation";
  const image = absoluteUrl("/webpilot-social-card.png");
  return {
    title: pageTitle,
    description,
    robots: { index: true, follow: true },
    alternates: {
      canonical: absoluteUrl(pathname),
      languages: {
        de: absoluteUrl(alternatePath(pathname, "de")),
        en: absoluteUrl(alternatePath(pathname, "en")),
        "x-default": absoluteUrl(alternatePath(pathname, "de")),
      },
    },
    openGraph: {
      type: "website",
      siteName: "Webpilot",
      locale: locale === "de" ? "de_DE" : "en_US",
      title: pageTitle,
      description,
      url: absoluteUrl(pathname),
      images: [image],
    },
    twitter: { card: "summary_large_image", title: pageTitle, description, images: [image] },
  };
}
