import type { Metadata } from "next";
import { LocaleShell } from "@/components/locale-shell";
import { AboutPage } from "@/components/pages/about-page";
import { pageMetadata } from "@/lib/site";
export const metadata: Metadata = pageMetadata({ locale: "en", pathname: "/en/about", title: "About us", description: "Webpilot Studio." });
export default function Page() { return <LocaleShell locale="en" pathname="/en/about"><AboutPage locale="en" /></LocaleShell>; }
