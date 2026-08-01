import type { Metadata } from "next";
import { LocaleShell } from "@/components/locale-shell";
import { ContactPage } from "@/components/pages/contact-page";
import { t } from "@/lib/i18n";
import { pageMetadata } from "@/lib/site";
export const metadata: Metadata = pageMetadata({ locale: "en", pathname: "/en/contact", title: t("en", "nav.contact"), description: t("en", "contact.copy") });
export default function Page() { return <LocaleShell locale="en" pathname="/en/contact"><ContactPage locale="en" /></LocaleShell>; }
