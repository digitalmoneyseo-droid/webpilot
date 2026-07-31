import { CtaButton } from "@/components/cta-button";
import { localizePath, t, type Locale } from "@/lib/i18n";

export function FinalCta({ locale, singleLine = false }: { locale: Locale; singleLine?: boolean }) {
  return (
    <section className="flex min-h-[28rem] flex-col items-center justify-center border-b border-white/15 bg-black px-page py-section text-center text-inverse max-[600px]:px-4.5">
      <div className="reveal" data-reveal>
        <h2 className={`mx-auto text-display-sm text-white ${singleLine ? "w-max max-w-full whitespace-nowrap max-[900px]:w-auto max-[900px]:whitespace-normal" : "max-w-[18ch]"}`}>{t(locale, "finalCta.title")}</h2>
        <p className="mx-auto mt-6 mb-7 max-w-[35rem] text-cta-copy text-dark-muted">{t(locale, "finalCta.copy")}</p>
        <CtaButton href={localizePath("/contact", locale)} light>{t(locale, "home.ctaConsult")}</CtaButton>
      </div>
    </section>
  );
}
