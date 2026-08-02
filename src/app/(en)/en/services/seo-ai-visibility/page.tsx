import type { Metadata } from "next";
import { LocaleShell } from "@/components/locale-shell";
import { getServiceDescription, ServicePage } from "@/components/pages/service-page";
import { pageMetadata } from "@/lib/site";

const pathname = "/en/services/seo-ai-visibility";
export const metadata: Metadata = pageMetadata({ locale: "en", pathname, title: "SEO & AI Visibility", description: getServiceDescription("en", "seo-ai-visibility") });
export default function Page() { return <LocaleShell locale="en" pathname={pathname}><ServicePage locale="en" serviceId="seo-ai-visibility" /></LocaleShell>; }
