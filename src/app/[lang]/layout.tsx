import "../globals.css";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { locales } from "@/lib/i18n";
import { getRouteLocale, type LocaleRouteParams } from "@/lib/locale-route";

export const metadata: Metadata = {
  metadataBase: new URL(Bun.env.NEXT_PUBLIC_SITE_URL ?? "https://webpilot.studio"),
  icons: { icon: [{ url: "/webpilot-favicon.svg", type: "image/svg+xml" }, { url: "/webpilot-favicon-32x32.png", sizes: "32x32" }], apple: "/apple-touch-icon.png" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#FAF9F6" };

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: LocaleRouteParams }) {
  const locale = await getRouteLocale(params);
  return <html lang={locale} data-scroll-behavior="smooth"><body className="flex min-h-screen flex-col overflow-x-hidden bg-canvas font-sans text-ink antialiased">{children}<Analytics /></body></html>;
}
