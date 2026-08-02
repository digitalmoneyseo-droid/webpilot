import type { Metadata } from "next";
import { LocaleShell } from "@/components/locale-shell";
import { getServiceDescription, ServicePage } from "@/components/pages/service-page";
import { pageMetadata } from "@/lib/site";

const pathname = "/en/services/websites-apps";
export const metadata: Metadata = pageMetadata({ locale: "en", pathname, title: "Websites & Apps", description: getServiceDescription("en", "websites-apps") });
export default function Page() { return <LocaleShell locale="en" pathname={pathname}><ServicePage locale="en" serviceId="websites-apps" /></LocaleShell>; }
