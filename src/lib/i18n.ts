import { dictionaries } from "@/i18n/translations";

export const locales = ["de", "en"] as const;
export type Locale = (typeof locales)[number];

export function t(locale: Locale, english: string): string {
  return (dictionaries[locale] as Readonly<Record<string, string>>)[english] ?? english;
}

export function localizePath(path: string, locale: Locale): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (locale === "de") return normalized;
  return normalized === "/" ? "/en" : `/en${normalized}`;
}

export function basePath(pathname: string): string {
  if (pathname === "/en" || pathname === "/en/") return "/";
  return pathname.startsWith("/en/") ? pathname.slice(3) : pathname;
}

export function alternatePath(pathname: string, locale: Locale): string {
  const rawBase = basePath(pathname);
  const base = rawBase.length > 1 ? rawBase.replace(/\/$/, "") : rawBase;
  if (base === "/concept" || base === "/konzept") return locale === "de" ? "/konzept" : "/en/concept";
  return localizePath(base, locale);
}

export function localeFromPath(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "de";
}

export function formatDate(locale: Locale, date: Date): string {
  return new Intl.DateTimeFormat(locale === "de" ? "de-DE" : "en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}
