import type { Metadata } from "next";
import { LocaleShell } from "@/components/locale-shell";
import { getServiceDescription, ServicePage } from "@/components/pages/service-page";
import { pageMetadata } from "@/lib/site";

const pathname = "/services/seo-ai-visibility";
export const metadata: Metadata = pageMetadata({ locale: "de", pathname, title: "SEO & KI-Sichtbarkeit", description: getServiceDescription("de", "seo-ai-visibility") });
export default function Page() { return <LocaleShell locale="de" pathname={pathname}><ServicePage locale="de" serviceId="seo-ai-visibility" /></LocaleShell>; }
