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
  title: { default: "Fifth Signal — Digital Growth & AI Studio", template: "%s — Fifth Signal" },
  description: "A full-stack growth and technology partner for ambitious brands.",
  applicationName: "Fifth Signal",
  keywords: ["digital growth studio", "AI studio", "brand", "web design", "SEO", "automation"],
  authors: [{ name: "Fifth Signal" }],
  creator: "Fifth Signal",
  openGraph: {
    type: "website",
    siteName: "Fifth Signal",
    title: "Fifth Signal — Digital Growth & AI Studio",
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
