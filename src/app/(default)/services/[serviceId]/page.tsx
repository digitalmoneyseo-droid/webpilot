import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { getServiceDescription, ServicePage } from "@/components/pages/service-page";
import { getServiceCopy } from "@/i18n/services";
import { defaultLocale } from "@/lib/i18n";
import { getServicePath, resolveServiceRouteSlug, serviceOrder, serviceRouteSlugs } from "@/lib/service-routes";
import { pageMetadata } from "@/lib/site";

type Props = { params: Promise<{ serviceId: string }> };

export const dynamic = "force-static";

export function generateStaticParams() {
  return serviceOrder.map((serviceId) => ({ serviceId: serviceRouteSlugs[serviceId] }));
}

async function getServiceId(params: Props["params"]) {
  const { serviceId: routeSlug } = await params;
  const resolution = resolveServiceRouteSlug(routeSlug);
  if (resolution.kind === "current") return resolution.serviceId;
  if (resolution.kind === "legacy") permanentRedirect(getServicePath(resolution.serviceId, defaultLocale));
  notFound();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const serviceId = await getServiceId(params);
  const copy = getServiceCopy(defaultLocale, serviceId);
  return pageMetadata({ locale: defaultLocale, pathname: getServicePath(serviceId, defaultLocale), title: copy.name, description: getServiceDescription(defaultLocale, serviceId) });
}

export default async function Page({ params }: Props) {
  const serviceId = await getServiceId(params);
  return <ServicePage locale={defaultLocale} serviceId={serviceId} />;
}
