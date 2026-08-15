import { dictionaries, type MessageKey } from "../i18n/translations";
import { defaultLocale, hasLocale, localeConfig, locales, type Locale } from "../i18n/config";

export { defaultLocale, hasLocale, localeConfig, locales, type Locale };

export function t(locale: Locale, key: MessageKey): string {
  return dictionaries[locale][key];
}

export function localizePath(path: string, locale: Locale): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (locale === defaultLocale) return normalized;
  return normalized === "/" ? `/${locale}` : `/${locale}${normalized}`;
}

function basePath(pathname: string): string {
  const [firstSegment, ...rest] = pathname.split("/").filter(Boolean);
  if (!firstSegment || !hasLocale(firstSegment)) return pathname;
  return rest.length ? `/${rest.join("/")}` : "/";
}

export function alternatePath(pathname: string, locale: Locale): string {
  const rawBase = basePath(pathname);
  const base = rawBase.length > 1 ? rawBase.replace(/\/$/, "") : rawBase;
  return localizePath(base, locale);
}
