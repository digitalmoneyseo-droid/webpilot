import type { Metadata } from "next";
import { LocaleShell } from "@/components/locale-shell";
import { AboutPage } from "@/components/pages/about-page";
import { pageMetadata } from "@/lib/site";
export const metadata: Metadata = pageMetadata({ locale: "de", pathname: "/about", title: "Über uns", description: "Lerne Webpilot kennen: ein unabhängiges Studio für digitales Wachstum und Technologie, das kreative Qualität mit wirtschaftlicher Verantwortung verbindet." });
export default function Page() { return <LocaleShell locale="de" pathname="/about"><AboutPage locale="de" /></LocaleShell>; }
