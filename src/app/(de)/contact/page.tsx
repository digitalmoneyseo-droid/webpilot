import type { Metadata } from "next";
import { LocaleShell } from "@/components/locale-shell";
import { ContactPage } from "@/components/pages/contact-page";
import { t } from "@/lib/i18n";
import { pageMetadata } from "@/lib/site";
export const metadata: Metadata = pageMetadata({ locale: "de", pathname: "/contact", title: t("de", "nav.contact"), description: t("de", "contact.copy") });
export default function Page() { return <LocaleShell locale="de" pathname="/contact"><ContactPage locale="de" /></LocaleShell>; }
