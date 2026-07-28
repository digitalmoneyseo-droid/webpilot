import type { Metadata } from "next";
import { LocaleShell } from "@/components/locale-shell";
import { ContactPage } from "@/components/pages/contact-page";
import { pageMetadata } from "@/lib/site";
export const metadata: Metadata = pageMetadata({ locale: "en", pathname: "/en/contact", title: "Contact", description: "Webpilot Studio." });
export default function Page() { return <LocaleShell locale="en" pathname="/en/contact"><ContactPage locale="en" /></LocaleShell>; }
