import type { Metadata } from "next";
import { ContactPage } from "@/components/pages/contact-page";
import { localizePath, prefixedLocales, t } from "@/lib/i18n";
import { getRouteLocale, type LocaleRouteParams } from "@/lib/locale-route";
import { pageMetadata } from "@/lib/site";

type Props = { params: LocaleRouteParams };

export const dynamic = "force-static";

export function generateStaticParams() {
  return prefixedLocales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await getRouteLocale(params);
  return pageMetadata({ locale, pathname: localizePath("/contact", locale), title: t(locale, "nav.contact"), description: t(locale, "contact.copy") });
}

export default async function Page({ params }: Props) {
  const locale = await getRouteLocale(params);
  return <ContactPage locale={locale} />;
}
