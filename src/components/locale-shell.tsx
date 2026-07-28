import { ClientEffects } from "@/components/client-effects";
import { CursorParticles } from "@/components/cursor-particles";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { Locale } from "@/lib/i18n";

export function LocaleShell({ locale, pathname, children }: { locale: Locale; pathname: string; children: React.ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#main-content">{locale === "de" ? "Zum Inhalt springen" : "Skip to content"}</a>
      <ClientEffects />
      <CursorParticles />
      <SiteHeader locale={locale} pathname={pathname} />
      {children}
      <SiteFooter locale={locale} />
    </>
  );
}
