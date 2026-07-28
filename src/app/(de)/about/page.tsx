import type { Metadata } from "next";
import { LocaleShell } from "@/components/locale-shell";
import { AboutPage } from "@/components/pages/about-page";
import { pageMetadata } from "@/lib/site";
export const metadata: Metadata = pageMetadata({ locale: "de", pathname: "/about", title: "Über uns", description: "Webpilot Studio." });
export default function Page() { return <LocaleShell locale="de" pathname="/about"><AboutPage locale="de" /></LocaleShell>; }
