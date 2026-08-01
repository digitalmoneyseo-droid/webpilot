import "../globals.css";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://webpilot.studio"),
  icons: { icon: [{ url: "/icon.svg", type: "image/svg+xml" }, { url: "/favicon-32x32.png", sizes: "32x32" }], apple: "/apple-touch-icon.png" },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#FAF9F6" };

export default function GermanLayout({ children }: { children: React.ReactNode }) {
  return <html lang="de"><body className="flex min-h-screen flex-col overflow-x-hidden bg-canvas font-sans text-ink antialiased">{children}</body></html>;
}
