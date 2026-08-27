import type { Metadata } from "next";
import { getHomeDescription, HomePage } from "@/components/pages/home-page";
import { localizePath, prefixedLocales } from "@/lib/i18n";
import { getRouteLocale, type LocaleRouteParams } from "@/lib/locale-route";
import { pageMetadata } from "@/lib/site";

type Props = { params: LocaleRouteParams };

export const dynamic = "force-static";

export function generateStaticParams() {
  return prefixedLocales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await getRouteLocale(params);
  return pageMetadata({ locale, pathname: localizePath("/", locale), description: getHomeDescription(locale) });
}

export default async function Page({ params }: Props) {
  const locale = await getRouteLocale(params);
  return <HomePage locale={locale} />;
}
