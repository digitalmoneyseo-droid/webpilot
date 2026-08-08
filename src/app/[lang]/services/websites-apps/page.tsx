import type { Metadata } from "next";
import { LocaleShell } from "@/components/locale-shell";
import { getServiceDescription, ServicePage } from "@/components/pages/service-page";
import { getServiceCopy } from "@/i18n/services";
import { getRouteLocale, type LocaleRouteParams } from "@/lib/locale-route";
import { getServicePath } from "@/lib/service-catalog";
import { pageMetadata } from "@/lib/site";

const serviceId = "websites-apps";
type Props = { params: LocaleRouteParams };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await getRouteLocale(params);
  return pageMetadata({ locale, pathname: getServicePath(serviceId, locale), title: getServiceCopy(locale, serviceId).name, description: getServiceDescription(locale, serviceId) });
}

export default async function Page({ params }: Props) {
  const locale = await getRouteLocale(params);
  const pathname = getServicePath(serviceId, locale);
  return <LocaleShell locale={locale} pathname={pathname}><ServicePage locale={locale} serviceId={serviceId} /></LocaleShell>;
}
