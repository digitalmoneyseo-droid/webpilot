import "../globals.css";
import type { Metadata, Viewport } from "next";
import { LocaleDocument } from "@/components/locale-document";
import { defaultLocale } from "@/lib/i18n";
import { googleSiteVerification, siteOrigin } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  icons: { icon: [{ url: "/suchio-favicon.svg", type: "image/svg+xml" }, { url: "/suchio-favicon-32x32.png", sizes: "32x32" }], apple: "/apple-touch-icon.png" },
  verification: { google: googleSiteVerification },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#FAF9F6" };

export default function DefaultLocaleLayout({ children }: { children: React.ReactNode }) {
  return <LocaleDocument locale={defaultLocale}>{children}</LocaleDocument>;
}
