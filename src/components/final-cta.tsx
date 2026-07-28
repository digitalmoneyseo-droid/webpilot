import { CtaButton } from "@/components/cta-button";
import { localizePath, t, type Locale } from "@/lib/i18n";

export function FinalCta({ locale }: { locale: Locale }) {
  return (
    <section className="final-cta flex min-h-80 flex-col items-center justify-center bg-dark px-page py-section text-center text-inverse max-[600px]:min-h-88 max-[600px]:px-4.5">
      <h2 className="mx-auto max-w-[18ch] text-heading-lg font-semibold">{locale === "de" ? "Finden wir deinen nächsten besten Schritt." : "Let’s find your next best move."}</h2>
      <p className="mx-auto mt-6 mb-7 max-w-narrow text-body text-dark-muted">{locale === "de" ? "Ein fokussiertes Gespräch über deine Ziele, Engpässe und größten Chancen." : "A focused conversation about your goals, bottlenecks, and biggest opportunities."}</p>
      <CtaButton href={localizePath("/contact", locale)} light>{t(locale, "Book a consultation")}</CtaButton>
    </section>
  );
}
