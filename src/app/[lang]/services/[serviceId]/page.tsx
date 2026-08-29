import { notFound, permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import { getServiceDescription, ServicePage } from "@/components/pages/service-page";
import { getServiceCopy } from "@/i18n/services";
import { getRouteLocale } from "@/lib/locale-route";
import { getServicePath, resolveServiceRouteSlug, serviceOrder, serviceRouteSlugs } from "@/lib/service-routes";
import { prefixedLocales } from "@/lib/i18n";
import { pageMetadata } from "@/lib/site";

type Props = { params: Promise<{ lang: string; serviceId: string }> };

export const dynamic = "force-static";

export function generateStaticParams() {
  return prefixedLocales.flatMap((lang) => serviceOrder.map((serviceId) => ({ lang, serviceId: serviceRouteSlugs[serviceId] })));
}

async function getPageParams(params: Props["params"]) {
  const { lang, serviceId: routeSlug } = await params;
  const locale = await getRouteLocale(Promise.resolve({ lang }));
  const resolution = resolveServiceRouteSlug(routeSlug);
  if (resolution.kind === "current") return { locale, serviceId: resolution.serviceId };
  if (resolution.kind === "legacy") permanentRedirect(getServicePath(resolution.serviceId, locale));
  notFound();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, serviceId } = await getPageParams(params);
  const copy = getServiceCopy(locale, serviceId);
  return pageMetadata({ locale, pathname: getServicePath(serviceId, locale), title: copy.name, description: getServiceDescription(locale, serviceId) });
}

export default async function Page({ params }: Props) {
  const { locale, serviceId } = await getPageParams(params);
  return <ServicePage locale={locale} serviceId={serviceId} />;
}
