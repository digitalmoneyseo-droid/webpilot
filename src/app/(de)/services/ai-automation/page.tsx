import type { Metadata } from "next";
import { LocaleShell } from "@/components/locale-shell";
import { getServiceDescription, ServicePage } from "@/components/pages/service-page";
import { pageMetadata } from "@/lib/site";

const pathname = "/services/ai-automation";
export const metadata: Metadata = pageMetadata({ locale: "de", pathname, title: "KI & Automatisierung", description: getServiceDescription("de", "ai-automation") });
export default function Page() { return <LocaleShell locale="de" pathname={pathname}><ServicePage locale="de" serviceId="ai-automation" /></LocaleShell>; }
