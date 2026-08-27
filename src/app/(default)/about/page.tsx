import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/about-page";
import { defaultLocale, localizePath, t } from "@/lib/i18n";
import { pageMetadata } from "@/lib/site";

export const dynamic = "force-static";

export function generateMetadata(): Metadata {
  return pageMetadata({ locale: defaultLocale, pathname: localizePath("/about", defaultLocale), title: t(defaultLocale, "nav.about"), description: t(defaultLocale, "meta.aboutDescription") });
}

export default function Page() {
  return <AboutPage locale={defaultLocale} />;
}
