import type { Metadata } from "next";
import { LegalPage } from "@/components/pages/legal-page";
import { defaultLocale, localizePath, t } from "@/lib/i18n";
import { pageMetadata } from "@/lib/site";

export const dynamic = "force-static";

export function generateMetadata(): Metadata {
  const metadata = pageMetadata({ locale: defaultLocale, pathname: localizePath("/imprint", defaultLocale), title: t(defaultLocale, "imprint.title"), description: t(defaultLocale, "meta.imprintDescription") });
  return { ...metadata, robots: { index: false, follow: true } };
}

export default function Page() {
  return <LegalPage locale={defaultLocale} kind="imprint" />;
}
