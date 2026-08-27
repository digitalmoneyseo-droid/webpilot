import type { Metadata } from "next";
import { LegalPage } from "@/components/pages/legal-page";
import { defaultLocale, localizePath, t } from "@/lib/i18n";
import { pageMetadata } from "@/lib/site";

export const dynamic = "force-static";

export function generateMetadata(): Metadata {
  const metadata = pageMetadata({ locale: defaultLocale, pathname: localizePath("/privacy", defaultLocale), title: t(defaultLocale, "privacy.title"), description: t(defaultLocale, "meta.privacyDescription") });
  return { ...metadata, robots: { index: false, follow: true } };
}

export default function Page() {
  return <LegalPage locale={defaultLocale} kind="privacy" />;
}
