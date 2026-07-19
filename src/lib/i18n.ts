import { dictionaries } from "@/i18n/translations";
import type { Locale } from "@/domain/catalog";

export { locales, type Locale } from "@/domain/catalog";

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
  return localizePath(base, locale);
}
