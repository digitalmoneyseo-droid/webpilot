import type { Metadata } from "next";
import { ContactPage } from "@/components/pages/contact-page";
import { defaultLocale, localizePath, t } from "@/lib/i18n";
import { pageMetadata } from "@/lib/site";

export const dynamic = "force-static";

export function generateMetadata(): Metadata {
  return pageMetadata({ locale: defaultLocale, pathname: localizePath("/contact", defaultLocale), title: t(defaultLocale, "nav.contact"), description: t(defaultLocale, "contact.copy") });
}

export default function Page() {
  return <ContactPage locale={defaultLocale} />;
}
