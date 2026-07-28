import type { Metadata } from "next";
import { LocaleShell } from "@/components/locale-shell";
import { ContactPage } from "@/components/pages/contact-page";
import { pageMetadata } from "@/lib/site";
export const metadata: Metadata = pageMetadata({ locale: "de", pathname: "/contact", title: "Kontakt", description: "Webpilot Studio." });
export default function Page() { return <LocaleShell locale="de" pathname="/contact"><ContactPage locale="de" /></LocaleShell>; }
