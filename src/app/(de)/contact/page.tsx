import type { Metadata } from "next";
import { LocaleShell } from "@/components/locale-shell";
import { ContactPage } from "@/components/pages/contact-page";
import { t } from "@/lib/i18n";
import { isServiceId } from "@/lib/service-catalog";
import { pageMetadata } from "@/lib/site";
export const metadata: Metadata = pageMetadata({ locale: "de", pathname: "/contact", title: t("de", "nav.contact"), description: t("de", "contact.copy") });
export default async function Page({ searchParams }: { searchParams: Promise<{ service?: string | string[] }> }) {
  const serviceParam = (await searchParams).service;
  const serviceId = typeof serviceParam === "string" && isServiceId(serviceParam) ? serviceParam : undefined;
  return <LocaleShell locale="de" pathname="/contact"><ContactPage locale="de" serviceId={serviceId} /></LocaleShell>;
}
