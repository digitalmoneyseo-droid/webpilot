import { dictionaries, type MessageKey } from "../i18n/translations";

export const locales = ["de", "en"] as const;
export type Locale = (typeof locales)[number];

export function t(locale: Locale, key: MessageKey): string {
  return dictionaries[locale][key];
}

export function studioLocation(locale: Locale): string {
  return t(locale, "footer.location");
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
