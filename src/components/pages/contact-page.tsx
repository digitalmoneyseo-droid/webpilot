import { ContactForm } from "@/components/contact-form";
import { EditorialHero } from "@/components/editorial-hero";
import { t, type Locale } from "@/lib/i18n";

export function ContactPage({ locale }: { locale: Locale }) {
  return (
    <main id="main-content">
      <EditorialHero
        title={t(locale, "contact.title")}
        copy={t(locale, "contact.copy")}
      />
      <section className="px-page pb-section">
        <div className="reveal mx-auto max-w-[50rem] rounded-card bg-black p-[clamp(1.25rem,5vw,3rem)] text-white shadow-[var(--ds-shadow-border-medium)]" data-reveal>
          <header className="mb-8 flex items-end justify-between gap-6 border-b border-white/15 pb-6 max-[600px]:items-start max-[600px]:flex-col max-[600px]:gap-3">
            <div>
              <h2 className="m-0 text-heading-md text-white">{locale === "de" ? "Das Wesentliche reicht." : "The essentials are enough."}</h2>
              <p className="mt-2 mb-0 max-w-[38rem] text-body text-[#b7b7bd]">
                {locale === "de" ? "Name, E-Mail und genug Kontext, damit wir deinen nächsten sinnvollen Schritt verstehen." : "Your name, email, and enough context for us to understand the next useful move."}
              </p>
            </div>
            <a className="shrink-0 text-small text-white underline decoration-white/35 underline-offset-4 hover:decoration-white" href="mailto:hello@webpilot.studio">
              hello@webpilot.studio
            </a>
          </header>
          <ContactForm locale={locale} />
        </div>
      </section>
    </main>
  );
}
