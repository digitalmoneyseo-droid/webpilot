import type { Metadata } from "next";
import { LocaleShell } from "@/components/locale-shell";
import { getServiceDescription, ServicePage } from "@/components/pages/service-page";
import { pageMetadata } from "@/lib/site";

const pathname = "/services/websites-apps";
export const metadata: Metadata = pageMetadata({ locale: "de", pathname, title: "Websites & Apps", description: getServiceDescription("de", "websites-apps") });
export default function Page() { return <LocaleShell locale="de" pathname={pathname}><ServicePage locale="de" serviceId="websites-apps" /></LocaleShell>; }
