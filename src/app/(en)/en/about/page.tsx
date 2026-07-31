import type { Metadata } from "next";
import { LocaleShell } from "@/components/locale-shell";
import { AboutPage } from "@/components/pages/about-page";
import { pageMetadata } from "@/lib/site";
export const metadata: Metadata = pageMetadata({ locale: "en", pathname: "/en/about", title: "About us", description: "Meet Webpilot, an independent digital growth and technology studio connecting creative quality with commercial accountability." });
export default function Page() { return <LocaleShell locale="en" pathname="/en/about"><AboutPage locale="en" /></LocaleShell>; }
