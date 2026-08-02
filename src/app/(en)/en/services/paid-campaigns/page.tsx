import type { Metadata } from "next";
import { LocaleShell } from "@/components/locale-shell";
import { getServiceDescription, ServicePage } from "@/components/pages/service-page";
import { pageMetadata } from "@/lib/site";

const pathname = "/en/services/paid-campaigns";
export const metadata: Metadata = pageMetadata({ locale: "en", pathname, title: "Paid Campaigns", description: getServiceDescription("en", "paid-campaigns") });
export default function Page() { return <LocaleShell locale="en" pathname={pathname}><ServicePage locale="en" serviceId="paid-campaigns" /></LocaleShell>; }
