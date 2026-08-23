import type { Metadata } from "next";
import { LegalDraftPage } from "@/components/pages/legal-draft-page";
import { localizePath, t } from "@/lib/i18n";
import { getRouteLocale, type LocaleRouteParams } from "@/lib/locale-route";
import { pageMetadata } from "@/lib/site";

type Props = { params: LocaleRouteParams };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await getRouteLocale(params);
  const metadata = pageMetadata({
    locale,
    pathname: localizePath("/imprint", locale),
    title: t(locale, "imprint.title"),
    description: t(locale, "meta.imprintDescription"),
  });

  return { ...metadata, robots: { index: false, follow: true } };
}

export default async function Page({ params }: Props) {
  const locale = await getRouteLocale(params);
  return <LegalDraftPage locale={locale} kind="imprint" />;
}
