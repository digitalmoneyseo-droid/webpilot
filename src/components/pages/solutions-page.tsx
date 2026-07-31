import { Bot, ChartNoAxesCombined, Compass, FileText, FlaskConical, Gauge, Globe, Handshake, Images, Info, Layers, MousePointerClick, Palette, RadioTower, Rocket, Search, TrendingUp, Workflow } from "lucide-react";
import { CtaButton } from "@/components/cta-button";
import { Faq } from "@/components/faq";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { getSolutionFaqs } from "@/lib/content";
import { localizePath, type Locale } from "@/lib/i18n";

const content = {
  de: {
    title: "Lösungen",
    description: "Fokussierte Angebote für digitale Grundlagen, laufende Optimierung und bezahlte Kampagnen – einzeln oder als Integrierte Partnerschaft.",
    heading: "Starte mit dem, was dein Unternehmen",
    accent: "jetzt braucht.",
    intro: "Ob Website, App, digitales Produkt, bessere Akquise oder ein automatisierter Ablauf: Wähle ein fokussiertes Angebot oder verbinde mehrere Bereiche in einer Integrierten Partnerschaft.",
    sectionHeading: "Fokussiert, wenn es sinnvoll ist. Integriert, wenn es darauf ankommt.",
    sectionCopy: "Starte mit einer klar definierten Priorität oder verbinde alle digitalen Disziplinen über eine gemeinsame Roadmap und einen verantwortlichen Partner.",
    scope: "Typischer Umfang",
    note: "Nach einem kostenlosen Erstgespräch erhältst du ein klares Angebot mit Leistungsumfang, Zeitplan, Honorar und allen Kosten für Drittanbieter.",
    partnership: ["Integrierte Partnerschaft", "Für Unternehmen, die mehrere digitale Prioritäten über eine gemeinsame Roadmap planen, umsetzen und kontinuierlich verbessern möchten.", "Partnerschaft besprechen"],
    closing: ["Noch unsicher, wo du starten solltest?", "Wir klären deine Ausgangslage, den wichtigsten Engpass und den nächsten Schritt mit dem größten Potenzial.", "Erstgespräch buchen"],
    plans: [
      ["Fundament", "Für Marken, Produkte und Plattformen.", "Fundament besprechen", ["Strategie, Positionierung & Customer Journeys", "Marke, UX & UI Design", "Websites, Web-Apps & Mobile Apps", "Produktdesign & Entwicklung", "Analytics, CRM & Integrationen", "KI-Funktionen & Workflow-Automatisierung", "Launch-Support"]],
      ["Optimierung", "Für bessere Ergebnisse aus Bestehendem.", "Optimierung planen", ["Monatliche Prioritäten & Performance-Reviews", "SEO, lokale Suche & KI-Sichtbarkeit", "Content- & Conversion-Optimierung", "Website-, App- & Produktverbesserungen", "Analytics, Attribution & Tests", "KI- & Automatisierungsverbesserungen", "Technische Wartung & Support"]],
      ["Kampagne", "Für planbare Nachfrage durch Paid Media.", "Kampagne besprechen", ["Kampagnen- & Angebotsstrategie", "Google Ads & Paid Social", "Landingpages & Kampagnenerlebnisse", "Ad Creatives, Zielgruppen- & Angebotstests", "Analytics, Tracking & Attribution", "CRM-Routing & Follow-up-Automatisierung", "Kontinuierliche Kampagnenoptimierung"]],
    ],
    faqHeading: "Häufige Fragen zu den Angeboten",
  },
  en: {
    title: "Solutions",
    description: "Three focused offers for digital foundations, ongoing optimization, and paid campaigns—available separately or through an integrated partnership.",
    heading: "Start with what your business",
    accent: "needs next.",
    intro: "Whether the next priority is a website, app, digital product, stronger acquisition, or an automated workflow, choose a focused engagement or connect several areas through one partnership.",
    sectionHeading: "Focused when it should be. Integrated when it needs to be.",
    sectionCopy: "Start with one defined priority or connect every digital discipline through a shared roadmap and one accountable partner.",
    scope: "Typical scope",
    note: "After a free consultation, you’ll receive a clear proposal outlining the scope, timeline, fees, and any third-party costs.",
    partnership: ["Integrated Partnership", "For businesses that need multiple digital priorities planned, delivered, and improved through one shared roadmap.", "Discuss partnership"],
    closing: ["Not sure where to start?", "We clarify your current situation, the most important bottleneck, and the next move with the greatest potential.", "Book a consultation"],
    plans: [
      ["Foundation", "For brands, products, and platforms.", "Discuss your foundation", ["Strategy, positioning & customer journeys", "Brand, UX & UI design", "Websites, web apps & mobile apps", "Product design & development", "Analytics, CRM & integrations", "AI features & workflow automation", "Launch support"]],
      ["Optimization", "For better results from what already works.", "Plan your optimization", ["Monthly priorities & performance reviews", "SEO, local search & AI visibility", "Content & conversion optimization", "Website, app & product improvements", "Analytics, attribution & testing", "AI & automation improvements", "Technical maintenance & support"]],
      ["Campaign", "For predictable demand through paid media.", "Discuss a campaign", ["Campaign & offer strategy", "Google Ads & paid social", "Landing pages & campaign experiences", "Ad creative, audience & offer testing", "Analytics, tracking & attribution", "CRM routing & follow-up automation", "Continuous campaign optimization"]],
    ],
    faqHeading: "Common questions about the offers",
  },
} as const;

export function SolutionsPage({ locale }: { locale: Locale }) {
  const copy = content[locale];
  const faqs = getSolutionFaqs(locale);
  const contact = localizePath("/contact", locale);
  const icons = [Layers, TrendingUp, RadioTower];
  const scopeIcons = [[Compass, Palette, Globe, Bot, ChartNoAxesCombined, Workflow, Rocket], [TrendingUp, Search, FileText, MousePointerClick, FlaskConical, Workflow, Gauge], [Compass, MousePointerClick, Globe, Images, ChartNoAxesCombined, Workflow, Gauge]];
  return <main id="main-content">
    <section className="grid px-page pt-[var(--page-title-top)] pb-16 text-center"><Reveal><h1 className="m-0 mx-auto text-display-sm">{copy.heading} <em className="text-[var(--wave-blue)]">{copy.accent}</em></h1><p className="mx-auto mt-6 max-w-reading text-body-lg text-muted">{copy.intro}</p></Reveal></section>
    <section className="px-page pb-section"><Reveal className="mx-auto mb-10 max-w-[76rem]"><h2 className="text-heading-lg">{copy.sectionHeading}</h2><p className="mt-4 max-w-reading text-body-lg text-muted">{copy.sectionCopy}</p></Reveal><Reveal className="mx-auto grid min-w-0 max-w-[76rem] gap-4 md:grid-cols-3">{copy.plans.map(([name, intro, cta, scope], index) => { const Icon = icons[index]!; return <article className="flex h-full min-w-0 flex-col gap-6 rounded-card border border-line bg-surface p-5 shadow-surface max-[430px]:p-4" key={name}><header className="min-w-0"><Icon className="mb-4 block size-[42px]" strokeWidth={1.7} aria-hidden="true" /><h2 className="m-0 text-heading-md">{name}</h2><p className="mt-3 line-clamp-2 text-body text-muted">{intro}</p><CtaButton href={contact} className="mt-5 w-full min-w-0 justify-between">{cta}</CtaButton></header><section className="min-w-0"><h3 className="mb-3 font-mono text-label text-muted uppercase">{copy.scope}</h3><ul className="m-0 grid min-w-0 list-none gap-2.5 p-0">{scope.map((item, itemIndex) => { const ItemIcon = scopeIcons[index]![itemIndex]!; return <li className="flex min-w-0 gap-2.5 text-card-body" key={item}><ItemIcon className="mt-0.5 size-4.5 shrink-0 text-[#74746f]" strokeWidth={1.8} aria-hidden="true" /><span className="min-w-0">{item}</span></li>; })}</ul></section></article>; })}</Reveal>
      <Reveal className="mx-auto mt-4 max-w-[76rem]"><article id="partnership" className="rounded-card bg-dark p-8 text-[#d4d4d4] [--dark-muted:#d4d4d4] [&_:is(h1,h2,h3,h4)]:text-white"><header className="flex items-start justify-between gap-6 max-[700px]:flex-col"><div><Handshake className="mb-4 block size-[42px]" strokeWidth={1.7} aria-hidden="true" /><h2 className="m-0 text-heading-lg">{copy.partnership[0]}</h2><p className="mt-3 max-w-[52rem] text-body-lg">{copy.partnership[1]}</p></div><CtaButton href={contact} className="shrink-0 max-[700px]:w-full" light>{copy.partnership[2]}</CtaButton></header><section className="mt-8 border-t border-white/15 pt-6"><h3 className="mb-3 font-mono text-label uppercase">{copy.scope}</h3><div className="grid grid-cols-3 gap-6 max-[900px]:grid-cols-1">{copy.plans.map(([name, , , scope], index) => { const Icon = icons[index]!; return <div className="rounded-xl bg-white/[.06] p-4" key={name}><div className="mb-5 flex items-center gap-3"><Icon className="size-6 shrink-0" strokeWidth={1.7} aria-hidden="true" /><h4 className="m-0 font-medium">{name}</h4></div><ul className="m-0 grid list-none gap-2.5 p-0">{scope.map((item, itemIndex) => { const ItemIcon = scopeIcons[index]![itemIndex]!; return <li className="flex gap-2.5 text-card-body" key={item}><ItemIcon className="mt-0.5 size-4.5 shrink-0 text-[#a1a1a1]" strokeWidth={1.8} aria-hidden="true" /><span>{item}</span></li>; })}</ul></div>; })}</div></section></article></Reveal><p className="reveal mx-auto mt-6 flex w-fit max-w-4xl items-start gap-3 rounded-control border-0 bg-[var(--ds-blue-100)] px-4 py-3 text-small text-[var(--ds-gray-900)] shadow-[inset_0_0_0_1px_var(--ds-blue-300)]" data-reveal><Info className="mt-0.5 size-4 shrink-0 text-[var(--wave-blue)]" aria-hidden="true" /><span>{copy.note}</span></p></section>
    <section className="bg-white px-page py-section"><SectionHeading title={copy.faqHeading} align="center" /><div className="mx-auto max-w-[820px]"><Faq items={faqs} id={`solutions-${locale}`} /></div></section>
    <section className="bg-dark px-page py-section text-center text-inverse [&_:is(h1,h2,h3,h4)]:text-white"><Reveal><h2 className="mx-auto max-w-[18ch] text-display-sm">{copy.closing[0]}</h2><p className="mx-auto mt-6 mb-7 max-w-[35rem] text-cta-copy text-dark-muted">{copy.closing[1]}</p><CtaButton href={contact} light>{copy.closing[2]}</CtaButton></Reveal></section>
  </main>;
}

export function getSolutionsDescription(locale: Locale) {
  return content[locale].description;
}
