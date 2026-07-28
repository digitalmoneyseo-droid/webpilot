import type { Metadata } from "next";
import { LocaleShell } from "@/components/locale-shell";
import { getSolutionsDescription, SolutionsPage } from "@/components/pages/solutions-page";
import { pageMetadata } from "@/lib/site";
export const metadata: Metadata = pageMetadata({ locale: "de", pathname: "/solutions", title: "Lösungen", description: getSolutionsDescription("de") });
export default function Page() { return <LocaleShell locale="de" pathname="/solutions"><SolutionsPage locale="de" /></LocaleShell>; }
