import type { Metadata } from "next";
import { LocaleShell } from "@/components/locale-shell";
import { WorkIndexPage } from "@/components/pages/work-index-page";
import { pageMetadata } from "@/lib/site";
export const metadata: Metadata = pageMetadata({ locale: "en", pathname: "/en/work", title: "Portfolio", description: "Selected fictional work across brand, digital, growth, and AI." });
export default function Page() { return <LocaleShell locale="en" pathname="/en/work"><WorkIndexPage locale="en" /></LocaleShell>; }
