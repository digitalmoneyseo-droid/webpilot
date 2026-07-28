import type { Metadata } from "next";
import { LocaleShell } from "@/components/locale-shell";
import { HomePage } from "@/components/pages/home-page";
import { pageMetadata } from "@/lib/site";

const description = "We build websites, apps, and digital products, improve visibility and conversion, run paid campaigns, and automate workflows—as a focused engagement or an integrated partnership.";
export const metadata: Metadata = pageMetadata({ locale: "en", pathname: "/en", description });
export default function Page() { return <LocaleShell locale="en" pathname="/en"><HomePage locale="en" /></LocaleShell>; }
