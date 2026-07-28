import type { Metadata } from "next";
import { LocaleShell } from "@/components/locale-shell";
import { getSolutionsDescription, SolutionsPage } from "@/components/pages/solutions-page";
import { pageMetadata } from "@/lib/site";
export const metadata: Metadata = pageMetadata({ locale: "en", pathname: "/en/solutions", title: "Solutions", description: getSolutionsDescription("en") });
export default function Page() { return <LocaleShell locale="en" pathname="/en/solutions"><SolutionsPage locale="en" /></LocaleShell>; }
