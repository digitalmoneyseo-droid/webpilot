import { ChartNoAxesCombined, Handshake, Info, ListOrdered, PackageCheck, SlidersHorizontal, Target } from "lucide-react";
import { CtaButton } from "@/components/cta-button";
import { Faq } from "@/components/faq";
import { FinalCta } from "@/components/final-cta";
import { OfferOverview } from "@/components/offer-overview";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { WorkRibbon } from "@/components/work-ribbon";
import { getFaqs, getProjects } from "@/lib/content";
import { localizePath, t, type Locale } from "@/lib/i18n";

export function getHomeDescription(locale: Locale): string {
  return t(locale, "home.heroDescription");
}

export function HomePage({ locale }: { locale: Locale }) {
  const projects = getProjects(locale);
  const faqs = getFaqs(locale);
  const benefits = [
    [Handshake, "home.benefit1Title", "home.benefit1Copy"],
    [SlidersHorizontal, "home.benefit2Title", "home.benefit2Copy"],
    [ChartNoAxesCombined, "home.benefit3Title", "home.benefit3Copy"],
  ] as const;
  const steps = [
    [Target, "home.step1Title", "home.step1Copy"],
    [ListOrdered, "home.step2Title", "home.step2Copy"],
    [PackageCheck, "home.step3Title", "home.step3Copy"],
  ] as const;
  const title = <>{t(locale, "home.heroLine1")} <br /><em className="hero-accent">{t(locale, "home.heroAccent")}</em> {t(locale, "home.heroLine2")}</>;
  return <main id="main-content">
    <section id="intro" className="hero--home relative isolate grid min-h-0 bg-white [place-items:start_center] px-page pt-[clamp(8rem,13vw,10rem)] pb-12"><div className="flex w-full max-w-[62rem] flex-col items-center text-center"><h1 className="shiny-text mt-6 mb-6 w-full max-w-[18ch] text-display-lg text-ink">{title}</h1><p className="hero-copy m-0 max-w-narrow text-lead text-muted">{getHomeDescription(locale)}</p><div className="hero-actions mt-8 flex gap-3 max-[600px]:w-[min(20rem,100%)] max-[600px]:flex-col max-[600px]:[&_a]:w-full"><CtaButton href={localizePath("/contact", locale)}>{t(locale, "home.ctaConsult")}</CtaButton><CtaButton href={localizePath("/work", locale)} light>{t(locale, "home.ctaWork")}</CtaButton></div></div></section>
    <section id="solutions" className="bg-white pb-section"><WorkRibbon projects={projects} locale={locale} label={t(locale, "home.selectedWork")} /><div className="px-page"><p className="reveal mx-auto mt-6 flex w-fit max-w-4xl items-start gap-3 rounded-control border-0 bg-[var(--ds-blue-100)] px-4 py-3 text-small text-muted shadow-[inset_0_0_0_1px_var(--ds-blue-300)]" data-reveal><Info className="mt-0.5 size-4 shrink-0 text-[var(--wave-blue)]" aria-hidden="true" /><span>{t(locale, "home.fictionNote")}</span></p></div><div className="px-page pt-section"><SectionHeading title={t(locale, "home.section1Title")} copy={t(locale, "home.section1Copy")} align="center" /></div><div className="px-page pt-section-compact"><OfferOverview locale={locale} /></div></section>
    <section id="why" className="px-page py-section"><SectionHeading title={t(locale, "home.whyTitle")} align="center" /><div className="grid grid-cols-6 gap-0 max-[900px]:grid-cols-1">{benefits.map(([Icon, headingKey, copyKey], index) => <Reveal className="col-span-2 px-8 py-10 text-center" delay={index * 50} key={headingKey}><div className="grid min-h-22 place-items-center text-ink"><Icon className="size-[42px]" strokeWidth={1.7} aria-hidden="true" /></div><h3 className="mt-6 mb-2 text-heading-sm">{t(locale, headingKey)}</h3><p className="m-0 text-body text-muted">{t(locale, copyKey)}</p></Reveal>)}</div></section>
    <section id="process" className="bg-white px-page py-section"><SectionHeading title={t(locale, "home.processTitle")} copy={t(locale, "home.processCopy")} align="center" /><ol className="process-list m-0 mx-auto grid max-w-[62rem] list-none grid-cols-3 gap-4 p-0 pt-[52px] max-[900px]:grid-cols-1 max-[900px]:pt-0" data-reveal>{steps.map(([Icon, headingKey, copyKey], index) => <li className="process-step relative rounded-card bg-white p-6 shadow-[var(--ds-shadow-border)] max-[900px]:pl-18" style={{ "--process-delay": `${index * 70}ms` } as React.CSSProperties} key={headingKey}><span className="process-node absolute -top-[52px] left-[calc(50%_-_19px)] grid size-[38px] place-items-center rounded-full bg-ink font-mono text-meta text-white tabular-nums max-[900px]:top-6 max-[900px]:left-5" aria-hidden="true">{index + 1}</span><Icon className="block size-8" strokeWidth={1.7} aria-hidden="true" /><div className="pt-4"><h3 className="mt-0 mb-2 text-heading-sm">{t(locale, headingKey)}</h3><p className="text-body text-muted">{t(locale, copyKey)}</p></div></li>)}</ol></section>
    <section id="faq" className="bg-white px-page py-section"><SectionHeading title={t(locale, "home.faqHeading")} align="center" /><div className="mx-auto max-w-[820px]"><Faq items={faqs} id={`home-faq-${locale}`} /></div></section><FinalCta locale={locale} singleLine />
  </main>;
}
