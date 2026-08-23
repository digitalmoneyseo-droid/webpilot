import { dictionaries, type MessageKey } from "../i18n/translations";
import { defaultLocale, hasLocale, localeConfig, locales, type Locale } from "../i18n/config";
export { alternatePath, localizePath } from "@/lib/locale-path";

export { defaultLocale, hasLocale, localeConfig, locales, type Locale };

export function t(locale: Locale, key: MessageKey): string {
  return dictionaries[locale][key];
}
