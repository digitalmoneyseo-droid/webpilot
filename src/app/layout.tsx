import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: { default: "Webpilot — Digital Growth & AI Studio", template: "%s — Webpilot" },
  description: "A full-stack growth and technology partner for ambitious brands.",
  applicationName: "Webpilot",
  keywords: ["digital growth studio", "AI studio", "brand", "web design", "SEO", "automation"],
  authors: [{ name: "Webpilot" }],
  creator: "Webpilot",
  openGraph: {
    type: "website",
    siteName: "Webpilot",
    title: "Webpilot — Digital Growth & AI Studio",
    description: "Brand, technology, growth, and AI—working as one system.",
  },
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full"><SiteHeader />{children}</body>
    </html>
  );
}
