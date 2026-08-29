import type { Metadata } from "next";
import { LegalPage } from "@/components/pages/legal-page";
import { localizePath, prefixedLocales, t } from "@/lib/i18n";
import { getRouteLocale, type LocaleRouteParams } from "@/lib/locale-route";
import { noIndexPageMetadata } from "@/lib/site";

type Props = { params: LocaleRouteParams };

export const dynamic = "force-static";

export function generateStaticParams() {
  return prefixedLocales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await getRouteLocale(params);
  return noIndexPageMetadata({
    locale,
    pathname: localizePath("/imprint", locale),
    title: t(locale, "imprint.title"),
    description: t(locale, "meta.imprintDescription"),
  });

}

export default async function Page({ params }: Props) {
  const locale = await getRouteLocale(params);
  return <LegalPage locale={locale} kind="imprint" />;
}
