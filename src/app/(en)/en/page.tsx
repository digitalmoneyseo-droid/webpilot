import type { Metadata } from "next";
import { LocaleShell } from "@/components/locale-shell";
import { getHomeDescription, HomePage } from "@/components/pages/home-page";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({ locale: "en", pathname: "/en", description: getHomeDescription("en") });
export default function Page() { return <LocaleShell locale="en" pathname="/en"><HomePage locale="en" /></LocaleShell>; }
