import { notFound } from "next/navigation";
import { hasLocale, type Locale } from "@/lib/i18n";

export type LocaleRouteParams = Promise<{ lang: string }>;

export async function getRouteLocale(params: LocaleRouteParams): Promise<Locale> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return lang;
}
