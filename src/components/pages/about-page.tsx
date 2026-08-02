import { EditorialHero } from "@/components/editorial-hero";
import { FinalCta } from "@/components/final-cta";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { t, type Locale } from "@/lib/i18n";

export function AboutPage({ locale }: { locale: Locale }) {
  const principles = [
    ["about.principle1Title", "about.principle1Copy"],
    ["about.principle2Title", "about.principle2Copy"],
    ["about.principle3Title", "about.principle3Copy"],
    ["about.principle4Title", "about.principle4Copy"],
  ] as const;

  return (
    <main id="main-content">
      <EditorialHero
        title={t(locale, "about.title")}
        copy={t(locale, "about.copy")}
      />

      <section className="bg-canvas px-page py-section">
        <div className="mx-auto grid max-w-[70rem] grid-cols-[minmax(15rem,.78fr)_minmax(0,1.22fr)] gap-x-[clamp(3rem,8vw,8rem)] gap-y-8 max-[800px]:grid-cols-1">
          <Reveal>
            <h2 className="m-0 max-w-[12ch] text-heading-lg">{t(locale, "about.pov")}</h2>
          </Reveal>
          <Reveal className="grid max-w-[45rem] gap-6" delay={60}>
            <p className="m-0 text-body-lg text-ink">
              {t(locale, "about.pov1")}
            </p>
            <p className="m-0 text-body-lg text-muted">
              {t(locale, "about.pov2")}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-page py-section">
        <div className="mx-auto max-w-[70rem]">
          <SectionHeading
            title={t(locale, "about.howTitle")}
            copy={t(locale, "about.howCopy")}
          />
          <div className="grid grid-cols-2 gap-x-[clamp(2rem,7vw,6rem)] max-[700px]:grid-cols-1">
            {principles.map(([headingKey, copyKey], index) => (
              <Reveal className="py-8" delay={index * 50} key={headingKey}>
                <h3 className="m-0 max-w-[22ch] text-heading-sm">{t(locale, headingKey)}</h3>
                <p className="mt-3 mb-0 max-w-[38rem] text-body text-muted">{t(locale, copyKey)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCta locale={locale} />
    </main>
  );
}
