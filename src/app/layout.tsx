import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { LanguageProvider } from "@/components/language-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: { default: "Webpilot — Studio für digitales Wachstum & KI", template: "%s — Webpilot" },
  description: "Ein ganzheitlicher Wachstums- und Technologiepartner für ambitionierte Marken.",
  applicationName: "Webpilot",
  keywords: ["digital growth studio", "AI studio", "brand", "web design", "SEO", "automation"],
  authors: [{ name: "Webpilot" }],
  creator: "Webpilot",
  openGraph: {
    type: "website",
    siteName: "Webpilot",
    title: "Webpilot — Studio für digitales Wachstum & KI",
    description: "Marke, Technologie, Wachstum und KI als ein System.",
  },
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full"><LanguageProvider><SiteHeader />{children}</LanguageProvider></body>
    </html>
  );
}
