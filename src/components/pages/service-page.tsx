import { ArrowUpRight, CircleGauge, Compass, Layers3 } from "lucide-react";
import Link from "next/link";
import { CtaButton } from "@/components/cta-button";
import { Faq } from "@/components/faq";
import { FaqStructuredData } from "@/components/faq-structured-data";
import { OfferAnimation } from "@/components/offer-animations/offer-animation";
import { ServiceScopeGrid } from "@/components/pages/service-scope-grid";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { getServiceCopy, type ServiceId } from "@/i18n/services";
import { localizePath, t, type Locale } from "@/lib/i18n";
import { getServiceCatalog } from "@/lib/service-catalog";

const outcomeIcons = [Compass, Layers3, CircleGauge] as const;

export function ServicePage({ locale, serviceId }: { locale: Locale; serviceId: ServiceId }) {
  const services = getServiceCatalog(locale);
  const service = services.find((entry) => entry.id === serviceId);
  if (!service) throw new Error(`Missing ${serviceId} service for ${locale}.`);

  const { copy } = service;
  const contact = `${localizePath("/contact", locale)}?service=${serviceId}`;
  const related = services.filter((entry) => entry.id !== serviceId);
  const faqItems = copy.page.faqs.map((faq, index) => ({ id: `${serviceId}-${index}`, data: faq }));

  return (
    <main id="main-content">
      <section className="px-page pt-page-title pb-section">
        <div className="mx-auto grid max-w-layout grid-cols-[minmax(0,.92fr)_minmax(24rem,1.08fr)] items-center gap-split max-[900px]:grid-cols-1">
          <Reveal className="min-w-0 max-w-[39rem]">
            <p className="mb-5 text-small font-medium text-[var(--ds-blue-800)]">{copy.name}</p>
            <h1 className="m-0 text-display-sm text-balance">{copy.page.title}</h1>
            <p className="mt-6 max-w-[38rem] text-lead text-muted text-balance">{copy.page.intro}</p>
            <CtaButton href={contact} className="mt-8">{copy.page.finalCta}</CtaButton>
          </Reveal>
          <Reveal className="min-w-0" delay={70}>
            <div className={`relative grid aspect-[1.1/1] min-h-[24rem] overflow-hidden rounded-card p-10 shadow-surface [&>*]:relative ${service.theme} max-[900px]:mx-auto max-[900px]:aspect-[4/3] max-[900px]:min-h-0 max-[900px]:w-full max-[900px]:max-w-[44rem] max-[600px]:h-[clamp(19rem,68vw,25rem)] max-[600px]:aspect-auto max-[600px]:p-4`} aria-hidden="true">
              <OfferAnimation animation={service.animation} locale={locale} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-canvas px-page py-section">
        <div className="mx-auto max-w-[70rem]">
          <SectionHeading title={copy.page.outcomesHeading} copy={copy.page.outcomesIntro} />
          <div className="grid grid-cols-[1.08fr_.92fr] gap-4 max-[760px]:grid-cols-1">
            <Reveal className="row-span-2 flex min-h-[20rem] flex-col justify-between rounded-card bg-[var(--ds-blue-100)] p-card-fluid shadow-accent-surface max-[760px]:min-h-0">
              {(() => {
                const Icon = outcomeIcons[0];
                const item = copy.page.outcomes[0]!;
                return <><Icon className="size-10 text-[var(--ds-blue-800)]" strokeWidth={1.7} aria-hidden="true" /><div className="mt-16 max-[760px]:mt-10"><h3 className="m-0 text-heading-md">{item.title}</h3><p className="mt-3 max-w-[42ch] text-body-lg text-muted">{item.copy}</p></div></>;
              })()}
            </Reveal>
            {copy.page.outcomes.slice(1).map((item, index) => {
              const Icon = outcomeIcons[index + 1]!;
              return <Reveal className="flex min-h-[9.5rem] items-start gap-5 rounded-card bg-white p-card-padding shadow-surface" delay={(index + 1) * 50} key={item.title}><Icon className="mt-1 size-7 shrink-0" strokeWidth={1.7} aria-hidden="true" /><div><h3 className="m-0 text-heading-sm">{item.title}</h3><p className="mt-2 text-body text-muted">{item.copy}</p></div></Reveal>;
            })}
          </div>
        </div>
      </section>

      <section className="px-page py-section" data-service-scope>
        <div className="mx-auto max-w-[70rem]">
          <SectionHeading title={copy.page.scopeHeading} copy={copy.page.scopeIntro} />
          <ServiceScopeGrid groups={copy.page.scopeGroups} serviceId={serviceId} />
        </div>
      </section>

      <section className="bg-canvas px-page py-section">
        <div className="mx-auto max-w-[70rem]">
          <SectionHeading title={copy.page.processHeading} copy={copy.page.processIntro} align="center" />
          <ol className="mx-auto grid max-w-[62rem] list-none grid-cols-3 gap-grid p-0 max-[760px]:grid-cols-1">
            {copy.page.process.map((item, index) => <Reveal as="li" className="relative pt-7 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-line-strong" delay={index * 50} key={item.title}><span className="font-mono text-small text-[var(--wave-blue)]" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><h3 className="mt-5 mb-0 text-heading-sm">{item.title}</h3><p className="mt-3 text-body text-muted">{item.copy}</p></Reveal>)}
          </ol>
        </div>
      </section>

      <section className="px-page py-section">
        <SectionHeading title={copy.page.faqHeading} align="center" />
        <div className="mx-auto max-w-[820px]"><Faq items={faqItems} id={`service-${serviceId}-${locale}`} /></div>
      </section>
      <FaqStructuredData items={copy.page.faqs} />

      <section className="bg-canvas px-page py-section-compact">
        <div className="mx-auto max-w-[70rem]">
          <h2 className="m-0 text-heading-md">{t(locale, "service.otherServices")}</h2>
          <nav className="mt-6 grid grid-cols-3 gap-3 max-[760px]:grid-cols-1" aria-label={t(locale, "service.otherServices")}>
            {related.map((entry) => <Link className="group flex min-h-24 items-center justify-between gap-4 rounded-card bg-white p-5 text-heading-sm shadow-surface transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-surface-hover motion-reduce:transition-none motion-reduce:hover:translate-y-0" href={entry.href} key={entry.id}><span>{entry.copy.name}</span><ArrowUpRight className="size-5 shrink-0 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 motion-reduce:transition-none motion-reduce:group-hover:transform-none" strokeWidth={1.7} aria-hidden="true" /></Link>)}
          </nav>
        </div>
      </section>

      <section className="flex min-h-[28rem] flex-col items-center justify-center border-b border-inverse-line bg-black px-page py-section text-center text-inverse">
        <Reveal>
          <h2 className="mx-auto max-w-[18ch] text-display-sm text-white">{copy.page.finalTitle}</h2>
          <p className="mx-auto mt-6 mb-7 max-w-[35rem] text-cta-copy text-dark-muted">{copy.page.finalCopy}</p>
          <CtaButton href={contact} light>{copy.page.finalCta}</CtaButton>
        </Reveal>
      </section>
    </main>
  );
}

export function getServiceDescription(locale: Locale, serviceId: ServiceId): string {
  return getServiceCopy(locale, serviceId).page.metaDescription;
}
