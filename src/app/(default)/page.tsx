import type { Metadata } from "next";
import { getHomeDescription, HomePage } from "@/components/pages/home-page";
import { defaultLocale, localizePath } from "@/lib/i18n";
import { pageMetadata } from "@/lib/site";

export const dynamic = "force-static";

export function generateMetadata(): Metadata {
  return pageMetadata({ locale: defaultLocale, pathname: localizePath("/", defaultLocale), description: getHomeDescription(defaultLocale) });
}

export default function Page() {
  return <HomePage locale={defaultLocale} />;
}
