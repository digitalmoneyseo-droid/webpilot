import { ContactForm } from "@/components/contact-form";
import { EditorialHero } from "@/components/editorial-hero";
import type { Locale } from "@/lib/i18n";

export function ContactPage({ locale }: { locale: Locale }) {
  return <main id="main-content"><EditorialHero title={locale === "de" ? "Planen wir deinen nächsten Schritt." : "Let’s plan your next move."} copy={locale === "de" ? "Erzähl uns, woran du arbeitest, wo es gerade stockt und wie ein gutes Ergebnis aussehen würde." : "Tell us what you are building, where progress is getting stuck, and what a strong outcome would look like."} /><section className="bg-dark px-page py-section text-inverse"><div className="mx-auto max-w-[760px] rounded-card border border-white/10 bg-[#181818] p-8 shadow-dark-surface max-[600px]:p-5"><ContactForm locale={locale} /></div></section></main>;
}
