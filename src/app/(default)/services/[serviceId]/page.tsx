import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceDescription, ServicePage } from "@/components/pages/service-page";
import { getServiceCopy } from "@/i18n/services";
import { defaultLocale } from "@/lib/i18n";
import { getServicePath, isServiceId, serviceOrder } from "@/lib/service-catalog";
import { pageMetadata } from "@/lib/site";

type Props = { params: Promise<{ serviceId: string }> };

export const dynamic = "force-static";

export function generateStaticParams() {
  return serviceOrder.map((serviceId) => ({ serviceId }));
}

async function getServiceId(params: Props["params"]) {
  const { serviceId } = await params;
  if (!isServiceId(serviceId)) notFound();
  return serviceId;
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
