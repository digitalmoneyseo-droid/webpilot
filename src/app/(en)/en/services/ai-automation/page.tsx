import type { Metadata } from "next";
import { LocaleShell } from "@/components/locale-shell";
import { getServiceDescription, ServicePage } from "@/components/pages/service-page";
import { pageMetadata } from "@/lib/site";

const pathname = "/en/services/ai-automation";
export const metadata: Metadata = pageMetadata({ locale: "en", pathname, title: "AI & Automation", description: getServiceDescription("en", "ai-automation") });
export default function Page() { return <LocaleShell locale="en" pathname={pathname}><ServicePage locale="en" serviceId="ai-automation" /></LocaleShell>; }
