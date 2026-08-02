import type { Metadata } from "next";
import { LocaleShell } from "@/components/locale-shell";
import { AboutPage } from "@/components/pages/about-page";
import { pageMetadata } from "@/lib/site";
export const metadata: Metadata = pageMetadata({ locale: "en", pathname: "/en/about", title: "About us", description: "Meet Webpilot, an independent studio for websites, apps, visibility, paid campaigns, AI, and automation." });
export default function Page() { return <LocaleShell locale="en" pathname="/en/about"><AboutPage locale="en" /></LocaleShell>; }
