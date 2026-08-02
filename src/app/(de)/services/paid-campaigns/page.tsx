import type { Metadata } from "next";
import { LocaleShell } from "@/components/locale-shell";
import { getServiceDescription, ServicePage } from "@/components/pages/service-page";
import { pageMetadata } from "@/lib/site";

const pathname = "/services/paid-campaigns";
export const metadata: Metadata = pageMetadata({ locale: "de", pathname, title: "Werbekampagnen", description: getServiceDescription("de", "paid-campaigns") });
export default function Page() { return <LocaleShell locale="de" pathname={pathname}><ServicePage locale="de" serviceId="paid-campaigns" /></LocaleShell>; }
