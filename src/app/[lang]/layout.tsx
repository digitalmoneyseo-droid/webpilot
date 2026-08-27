import "../globals.css";
import type { Metadata, Viewport } from "next";
import { LocaleDocument } from "@/components/locale-document";
import { defaultLocale, hasLocale, prefixedLocales } from "@/lib/i18n";
import type { LocaleRouteParams } from "@/lib/locale-route";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://suchio.digitalmoneyseo.workers.dev"),
  icons: { icon: [{ url: "/suchio-favicon.svg", type: "image/svg+xml" }, { url: "/suchio-favicon-32x32.png", sizes: "32x32" }], apple: "/apple-touch-icon.png" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#FAF9F6" };

export function generateStaticParams() {
  return prefixedLocales.map((lang) => ({ lang }));
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: LocaleRouteParams }) {
  const { lang } = await params;
  const locale = hasLocale(lang) ? lang : defaultLocale;
  return <LocaleDocument locale={locale}>{children}</LocaleDocument>;
}
