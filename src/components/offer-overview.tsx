"use client";

import { Handshake, Layers, Plus, RadioTower, TrendingUp } from "lucide-react";
import { useState } from "react";
import { CtaButton } from "@/components/cta-button";
import { localizePath, type Locale } from "@/lib/i18n";

export function OfferOverview({ locale }: { locale: Locale }) {
  const offers = locale === "de" ? [
    ["Fundament", "Baue oder erneuere die digitale Grundlage, mit der dein Unternehmen sichtbar wird, verkauft und arbeitet.", "Unternehmen, die eine Marke, Website, App oder ein digitales Produkt neu aufbauen oder grundlegend erneuern.", "Eine klare, startbereite Grundlage, die zu deinen Kunden und Geschäftszielen passt.", "Was wir aufbauen", "Marke und UX, Websites und Apps, digitale Produkte sowie passende KI- und Automatisierungslösungen.", ["Marke & UX", "Websites & Apps", "KI & Automatisierung"]],
    ["Optimierung", "Verbessere bestehende Websites, Produkte, Sichtbarkeit und Abläufe Monat für Monat.", "Unternehmen mit einer funktionierenden Grundlage, die mehr Sichtbarkeit, Conversion oder Effizienz erreichen möchten.", "Kontinuierliche Verbesserungen auf Basis klarer Prioritäten und echter Leistungsdaten.", "Was wir verbessern", "SEO und KI-Sichtbarkeit, Conversion, UX, Analytics, bestehende Automatisierungen und technische Abläufe.", ["SEO & KI-Suche", "Conversion & UX", "Analytics & Tests"]],
    ["Kampagnen", "Verwandle bezahlte Reichweite mit messbaren Kampagnen und klaren Conversion-Pfaden in qualifizierte Anfragen.", "Unternehmen, die mit Werbung skalieren möchten.", "Bessere Entscheidungsgrundlagen, schnellere Lernzyklen und qualifiziertere Nachfrage.", "Was die Kampagne verbindet", "Strategie, Anzeigen, Landingpages, Creative, Tracking und Lead-Routing als durchgängiger Conversion-Pfad.", ["Google Ads", "Paid Social", "Lead-Routing"]],
    ["Partnerschaft", "Fundament, Optimierung und Kampagnen werden über eine gemeinsame Roadmap koordiniert.", "Unternehmen, bei denen mehrere digitale Bereiche gemeinsam geplant, umgesetzt und verbessert werden müssen.", "Ein abgestimmter Arbeitsrhythmus mit klaren Prioritäten statt voneinander getrennter Einzelmaßnahmen.", "Wie die Zusammenarbeit funktioniert", "Eine gemeinsame Roadmap verbindet Strategie, Umsetzung, Tests und laufende Priorisierung über alle relevanten Bereiche hinweg.", ["Fundament", "Optimierung", "Kampagnen"]],
  ] as const : [
    ["Foundation", "Build or replace the digital foundation your business needs to get noticed, sell, and operate.", "Businesses building or replacing a brand, website, app, or digital product.", "A clear, launch-ready foundation designed around your customers and business goals.", "What we can build", "Brand and UX, websites and apps, digital products, plus the right AI and automation solutions.", ["Brand & UX", "Websites & apps", "AI & automation"]],
    ["Optimization", "Improve existing websites, products, visibility, and workflows month by month.", "Businesses with a working foundation that need better visibility, conversion, or efficiency.", "Continuous improvements guided by clear priorities and real performance data.", "What we improve", "SEO and AI visibility, conversion, UX, analytics, existing automations, and technical workflows.", ["SEO & AI search", "Conversion & UX", "Analytics & testing"]],
    ["Campaigns", "Turn paid reach into qualified inquiries with measurable campaigns and clear conversion paths.", "Businesses ready to scale with paid advertising.", "Clearer acquisition decisions, faster learning cycles, and better-qualified demand.", "What the campaign connects", "Strategy, ads, landing pages, creative, tracking, and lead routing in one continuous conversion path.", ["Google Ads", "Paid social", "Lead routing"]],
    ["Partnership", "Foundation, optimization, and campaigns are coordinated through one shared roadmap.", "Businesses that need several digital areas to be planned, delivered, and improved together.", "One coordinated working rhythm with clear priorities instead of disconnected initiatives.", "How the partnership works", "One shared roadmap connects strategy, delivery, testing, and ongoing prioritization across every relevant area.", ["Foundation", "Optimization", "Campaigns"]],
  ] as const;
  const icons = [Layers, TrendingUp, RadioTower, Handshake];
  const themes = ["bg-[#151513] text-white", "bg-[#dfe9ff] text-ink", "bg-[var(--wave-blue)] text-white", "bg-[#ecece7] text-ink"];
  return <div className="mx-auto max-w-[70rem]">{offers.map((offer, index) => {
    const [title, intro, bestFor, outcome, detailLabel, detail, visualItems] = offer;
    const Icon = icons[index]!;
    return <Offer key={title} locale={locale} index={index} title={title} intro={intro} rows={[[locale === "de" ? "Für wen es ideal ist" : "Who it is best for", bestFor], [locale === "de" ? "Welches Ergebnis du erwarten kannst" : "The outcome you can expect", outcome], [detailLabel, detail]]} visualItems={visualItems} Icon={Icon} theme={themes[index]!} />;
  })}</div>;
}

function Offer({ locale, index, title, intro, rows, visualItems, Icon, theme }: { locale: Locale; index: number; title: string; intro: string; rows: readonly (readonly [string, string])[]; visualItems: readonly string[]; Icon: typeof Layers; theme: string }) {
  const [open, setOpen] = useState<number | null>(0);
  return <div className="mb-20 last:mb-0"><article className="grid grid-cols-2 items-center gap-x-8 max-[900px]:grid-cols-1 max-[900px]:gap-10">
    <div className={`min-w-0 max-w-[31rem] ${index % 2 ? "min-[901px]:order-2 min-[901px]:justify-self-end" : ""}`}><h3 className="m-0 text-[clamp(1.75rem,4vw,2.125rem)] leading-[1.18] font-semibold">{title}</h3><p className="mt-4 max-w-[46ch] text-body-lg leading-body text-muted">{intro}</p>
      <div className="mt-8 border-t border-line">{rows.map(([label, copy], row) => <div className={`faq-item border-b border-line ${open === row ? "is-open" : ""}`} key={label}><button className="grid min-h-16 w-full grid-cols-[minmax(0,1fr)_1.5rem] items-center gap-4 bg-transparent py-4 text-left" type="button" aria-expanded={open === row} onClick={() => setOpen(open === row ? null : row)}><span className="text-body font-semibold">{label}</span><span className="faq-toggle grid size-6 place-items-center"><Plus className="size-4.5" /></span></button><div className="faq-answer" aria-hidden={open !== row}><div><p className="m-0 max-w-[44ch] pb-5 text-[16px] leading-body text-muted">{copy}</p></div></div></div>)}</div>
      <CtaButton href={index === 3 ? `${localizePath("/solutions", locale)}#partnership` : localizePath("/solutions", locale)} className="mt-6">{locale === "de" ? `${title} entdecken` : `Explore ${title}`}</CtaButton>
    </div>
    <div className={`relative grid aspect-[1.1/1] min-h-[24rem] overflow-hidden rounded-card p-10 ${theme} ${index % 2 ? "min-[901px]:order-1" : ""} max-[900px]:aspect-[4/3] max-[900px]:min-h-0`} aria-hidden="true"><span className="justify-self-end text-label font-semibold tabular-nums opacity-45">0{index + 1}</span><div className="self-center justify-self-center"><div className="grid size-28 place-items-center rounded-full border border-current/20 bg-white/10"><Icon className="size-12" strokeWidth={1.35} /></div></div><div className="grid grid-cols-3 gap-2 self-end max-[600px]:grid-cols-1">{visualItems.map((item) => <span className="flex min-h-14 items-center justify-center rounded-xl border border-current/15 bg-white/[.07] px-3 text-center text-caption font-semibold" key={item}>{item}</span>)}</div></div>
  </article></div>;
}
