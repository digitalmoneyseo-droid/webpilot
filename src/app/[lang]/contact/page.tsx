import type { Metadata } from "next";
import { LocaleShell } from "@/components/locale-shell";
import { ContactPage } from "@/components/pages/contact-page";
import { localizePath, t } from "@/lib/i18n";
import { getRouteLocale, type LocaleRouteParams } from "@/lib/locale-route";
import { isServiceId } from "@/lib/service-catalog";
import { pageMetadata } from "@/lib/site";

type Props = { params: LocaleRouteParams; searchParams: Promise<{ service?: string | string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await getRouteLocale(params);
  return pageMetadata({ locale, pathname: localizePath("/contact", locale), title: t(locale, "nav.contact"), description: t(locale, "contact.copy") });
}

export default async function Page({ params, searchParams }: Props) {
  const [locale, { service: serviceParam }] = await Promise.all([getRouteLocale(params), searchParams]);
  const serviceId = typeof serviceParam === "string" && isServiceId(serviceParam) ? serviceParam : undefined;
  const pathname = localizePath("/contact", locale);
  return <LocaleShell locale={locale} pathname={pathname}><ContactPage locale={locale} serviceId={serviceId} /></LocaleShell>;
}
