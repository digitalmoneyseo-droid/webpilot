import { LocaleShell } from "@/components/locale-shell";
import type { Locale } from "@/lib/i18n";

export function LocaleDocument({ children, locale }: { children: React.ReactNode; locale: Locale }) {
  return (
    <html lang={locale} data-scroll-behavior="smooth">
      <body className="flex min-h-screen flex-col overflow-x-hidden bg-canvas font-sans text-ink antialiased">
        <LocaleShell locale={locale}>{children}</LocaleShell>
      </body>
    </html>
  );
}
