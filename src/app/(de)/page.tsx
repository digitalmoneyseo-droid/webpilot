import type { Metadata } from "next";
import { LocaleShell } from "@/components/locale-shell";
import { getHomeDescription, HomePage } from "@/components/pages/home-page";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({ locale: "de", pathname: "/", description: getHomeDescription("de") });
export default function Page() { return <LocaleShell locale="de" pathname="/"><HomePage locale="de" /></LocaleShell>; }
