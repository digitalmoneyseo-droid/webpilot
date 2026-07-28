import type { Metadata } from "next";
import { LocaleShell } from "@/components/locale-shell";
import { HomePage } from "@/components/pages/home-page";
import { pageMetadata } from "@/lib/site";

const description = "Wir entwickeln Websites, Apps und digitale Produkte, verbessern Sichtbarkeit und Conversion, setzen Paid Campaigns um und automatisieren Abläufe – als fokussierte Zusammenarbeit oder integrierte Partnerschaft.";
export const metadata: Metadata = pageMetadata({ locale: "de", pathname: "/", description });
export default function Page() { return <LocaleShell locale="de" pathname="/"><HomePage locale="de" /></LocaleShell>; }
