import type { Metadata } from "next";
import { LocaleShell } from "@/components/locale-shell";
import { WorkIndexPage } from "@/components/pages/work-index-page";
import { pageMetadata } from "@/lib/site";
export const metadata: Metadata = pageMetadata({ locale: "de", pathname: "/work", title: "Portfolio", description: "Ausgewählte fiktive Arbeiten für Marken, Digital, Wachstum und KI." });
export default function Page() { return <LocaleShell locale="de" pathname="/work"><WorkIndexPage locale="de" /></LocaleShell>; }
