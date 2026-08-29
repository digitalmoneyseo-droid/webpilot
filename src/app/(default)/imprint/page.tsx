import type { Metadata } from "next";
import { LegalPage } from "@/components/pages/legal-page";
import { defaultLocale, localizePath, t } from "@/lib/i18n";
import { noIndexPageMetadata } from "@/lib/site";

export const dynamic = "force-static";

export function generateMetadata(): Metadata {
  return noIndexPageMetadata({ locale: defaultLocale, pathname: localizePath("/imprint", defaultLocale), title: t(defaultLocale, "imprint.title"), description: t(defaultLocale, "meta.imprintDescription") });
}

export default function Page() {
  return <LegalPage locale={defaultLocale} kind="imprint" />;
}
