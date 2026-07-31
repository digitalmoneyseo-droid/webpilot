import { EditorialHero } from "@/components/editorial-hero";
import { FinalCta } from "@/components/final-cta";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { studioLocation, t, type Locale } from "@/lib/i18n";

export function AboutPage({ locale }: { locale: Locale }) {
  const principles = [
    [t(locale, "The people you meet do the work"), t(locale, "The people you meet research, design, build, and improve the work.")],
    [t(locale, "Evidence before opinion"), t(locale, "Taste matters, but customer insight, performance data, and a clear strategic argument keep the work honest.")],
    [t(locale, "Work as one team"), t(locale, "We plan brand, product, tech, marketing, content, data, and AI together.")],
    [t(locale, "Use before show"), t(locale, "We use new tech when it helps the work, not when it only looks good in a pitch.")],
  ] as const;

  return (
    <main id="main-content">
      <EditorialHero
        title={t(locale, "Small by design. Broad where it matters.")}
        copy={t(locale, "Webpilot is an independent digital growth and technology studio for companies that want creative quality and commercial accountability in the same room.")}
      >
        <span className="mt-2 rounded-full bg-[var(--ds-gray-100)] px-3 py-1.5 font-mono text-meta text-[var(--ds-gray-800)]">
          {studioLocation(locale)}
        </span>
      </EditorialHero>

      <section className="border-y border-line bg-white px-page py-section">
        <div className="mx-auto grid max-w-[70rem] grid-cols-[minmax(15rem,.78fr)_minmax(0,1.22fr)] gap-x-[clamp(3rem,8vw,8rem)] gap-y-8 max-[800px]:grid-cols-1">
          <Reveal>
            <h2 className="m-0 max-w-[12ch] text-heading-lg">{t(locale, "Our point of view")}</h2>
          </Reveal>
          <Reveal className="grid max-w-[45rem] gap-6" delay={60}>
            <p className="m-0 text-body-lg text-[var(--ds-gray-1000)]">
              {t(locale, "Growth is not a department. It comes from a clear promise, a useful product, a visible brand, and continuous learning.")}
            </p>
            <p className="m-0 text-body-lg text-[var(--ds-gray-900)]">
              {t(locale, "That is why our team crosses traditional agency lines. The same people shaping the story understand how the experience will be built, discovered, measured, and improved.")}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-page py-section">
        <div className="mx-auto max-w-[70rem]">
          <SectionHeading
            title={t(locale, "How we work.")}
            copy={t(locale, "Connected work from first idea to measurable growth.")}
          />
          <div className="grid grid-cols-2 gap-x-[clamp(2rem,7vw,6rem)] max-[700px]:grid-cols-1">
            {principles.map(([heading, copy], index) => (
              <Reveal className="border-t border-line py-8" delay={index * 50} key={heading}>
                <h3 className="m-0 max-w-[22ch] text-heading-sm">{heading}</h3>
                <p className="mt-3 mb-0 max-w-[38rem] text-body text-muted">{copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCta locale={locale} />
    </main>
  );
}
