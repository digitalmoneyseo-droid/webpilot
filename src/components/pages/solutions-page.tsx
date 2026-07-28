import { Bot, ChartNoAxesCombined, Compass, FileText, FlaskConical, Gauge, Globe, Handshake, Images, Info, Layers, MousePointerClick, Palette, RadioTower, Rocket, Search, TrendingUp, Workflow } from "lucide-react";
import { CtaButton } from "@/components/cta-button";
import { Faq } from "@/components/faq";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { localizePath, type Locale } from "@/lib/i18n";

const content = {
  de: {
    title: "Lösungen",
    description: "Drei fokussierte Angebote für digitale Grundlagen, laufende Optimierung und bezahlte Kampagnen – einzeln oder als integrierte Partnerschaft.",
    heading: "Starte mit dem, was dein Unternehmen",
    accent: "jetzt braucht.",
    intro: "Ob Website, App, digitales Produkt, bessere Akquise oder ein automatisierter Ablauf: Wähle ein fokussiertes Angebot oder verbinde mehrere Bereiche in einer Partnerschaft.",
    sectionHeading: "Drei fokussierte Angebote",
    sectionCopy: "Jedes Angebot löst eine klare Ausgangslage. Der konkrete Umfang richtet sich nach deinen Zielen, bestehenden Grundlagen und Prioritäten.",
    scope: "Typischer Umfang",
    note: "Nach einem kostenlosen Erstgespräch erhältst du ein klares Angebot mit Leistungsumfang, Zeitplan, Honorar und allen Kosten für Drittanbieter.",
    partnership: ["Partnerschaft", "Für eine gemeinsame digitale Roadmap.", "Partnerschaft besprechen"],
    closing: ["Noch unsicher, wo du starten solltest?", "Wir klären deine Ausgangslage, den wichtigsten Engpass und den nächsten Schritt mit dem größten Potenzial.", "Erstgespräch buchen"],
    plans: [
      ["Fundament", "Für Marken, Produkte und Plattformen.", "Fundament besprechen", ["Strategie, Positionierung & Customer Journeys", "Marke, UX & UI Design", "Websites, Web-Apps & Mobile Apps", "Produktdesign & Entwicklung", "Analytics, CRM & Integrationen", "KI-Funktionen & Workflow-Automatisierung", "Launch-Support"]],
      ["Optimierung", "Für bessere Ergebnisse aus Bestehendem.", "Optimierung planen", ["Monatliche Prioritäten & Performance-Reviews", "SEO, lokale Suche & KI-Sichtbarkeit", "Content- & Conversion-Optimierung", "Website-, App- & Produktverbesserungen", "Analytics, Attribution & Tests", "KI- & Automatisierungsverbesserungen", "Technische Wartung & Support"]],
      ["Kampagnen", "Für planbare Nachfrage durch Paid Media.", "Kampagne besprechen", ["Kampagnen- & Angebotsstrategie", "Google Ads & Paid Social", "Landingpages & Kampagnenerlebnisse", "Ad Creatives, Zielgruppen- & Angebotstests", "Analytics, Tracking & Attribution", "CRM-Routing & Follow-up-Automatisierung", "Kontinuierliche Kampagnenoptimierung"]],
    ],
    faqHeading: "Häufige Fragen zu den Angeboten",
    faqs: [
      ["Kann ich mit einem einzelnen Angebot starten?", "Ja. Fundament, Optimierung und Kampagnen können unabhängig voneinander beauftragt werden. Wenn später weitere Bereiche hinzukommen, kann daraus eine Partnerschaft entstehen."],
      ["Muss das Fundament immer zuerst umgesetzt werden?", "Nein. Wenn deine bestehende Website, App oder technische Grundlage tragfähig ist, können wir direkt mit Optimierung oder Kampagnen beginnen. Den tatsächlichen Bedarf klären wir vor dem Angebot."],
      ["Wie wird der konkrete Leistungsumfang festgelegt?", "Im Erstgespräch klären wir Ziel, Ausgangslage, Prioritäten und vorhandene Systeme. Danach erhältst du einen konkreten Vorschlag mit Leistungsumfang, Zeitplan, Honorar und relevanten Drittanbieterkosten."],
      ["Was umfasst die Partnerschaft?", "Die Partnerschaft verbindet Fundament, Optimierung und Kampagnen in einer gemeinsamen Roadmap. Dazu können Websites, Apps, Produktarbeit, SEO, Content, Paid Media, Analytics, CRM, KI und Automatisierung gehören. Priorisiert wird, was für dein Unternehmen gerade den größten Nutzen schafft."],
      ["Sind KI und Automatisierung separate Zusatzleistungen?", "Nicht zwingend. KI-Funktionen und Automatisierung können Teil des Fundaments, der laufenden Optimierung, einer Kampagne oder der Partnerschaft sein. Sie werden nur eingesetzt, wenn sie ein konkretes Problem sinnvoll lösen."],
    ],
  },
  en: {
    title: "Solutions",
    description: "Three focused offers for digital foundations, ongoing optimization, and paid campaigns—available separately or through an integrated partnership.",
    heading: "Start with what your business",
    accent: "needs next.",
    intro: "Whether the next priority is a website, app, digital product, stronger acquisition, or an automated workflow, choose a focused engagement or connect several areas through one partnership.",
    sectionHeading: "Three focused offers",
    sectionCopy: "Each offer addresses a clear starting point. The exact scope is shaped around your goals, current setup, and priorities.",
    scope: "Typical scope",
    note: "After a free consultation, you’ll receive a clear proposal outlining the scope, timeline, fees, and any third-party costs.",
    partnership: ["Partnership", "For one shared digital roadmap.", "Discuss a partnership"],
    closing: ["Not sure where to start?", "We clarify your current situation, the most important bottleneck, and the next move with the greatest potential.", "Book a consultation"],
    plans: [
      ["Foundation", "For brands, products, and platforms.", "Discuss your foundation", ["Strategy, positioning & customer journeys", "Brand, UX & UI design", "Websites, web apps & mobile apps", "Product design & development", "Analytics, CRM & integrations", "AI features & workflow automation", "Launch support"]],
      ["Optimization", "For better results from what already works.", "Plan your optimization", ["Monthly priorities & performance reviews", "SEO, local search & AI visibility", "Content & conversion optimization", "Website, app & product improvements", "Analytics, attribution & testing", "AI & automation improvements", "Technical maintenance & support"]],
      ["Campaigns", "For predictable demand through paid media.", "Discuss a campaign", ["Campaign & offer strategy", "Google Ads & paid social", "Landing pages & campaign experiences", "Ad creative, audience & offer testing", "Analytics, tracking & attribution", "CRM routing & follow-up automation", "Continuous campaign optimization"]],
    ],
    faqHeading: "Common questions about the offers",
    faqs: [
      ["Can we start with one offer?", "Yes. Foundation, Optimization, and Campaigns can be commissioned independently. If more areas become relevant later, the work can develop into a Partnership."],
      ["Does Foundation always have to come first?", "No. If your existing website, app, or technical foundation is strong enough, we can begin directly with Optimization or Campaigns. We confirm what is actually needed before preparing the proposal."],
      ["How is the exact scope defined?", "During the initial consultation, we clarify the goal, current situation, priorities, and existing systems. You then receive a concrete proposal covering scope, timeline, fees, and relevant third-party costs."],
      ["What does Partnership include?", "Partnership brings Foundation, Optimization, and Campaigns into one shared roadmap. It can include websites, apps, product work, SEO, content, paid media, analytics, CRM, AI, and automation. We prioritize the work that creates the most value for your business now."],
      ["Are AI and automation separate add-ons?", "Not necessarily. AI features and automation can be part of Foundation, ongoing Optimization, a Campaign, or Partnership. We use them only when they solve a specific problem in a practical way."],
    ],
  },
} as const;

export function SolutionsPage({ locale }: { locale: Locale }) {
  const copy = content[locale];
  const contact = localizePath("/contact", locale);
  const icons = [Layers, TrendingUp, RadioTower];
  const scopeIcons = [[Compass, Palette, Globe, Bot, ChartNoAxesCombined, Workflow, Rocket], [TrendingUp, Search, FileText, MousePointerClick, FlaskConical, Workflow, Gauge], [Compass, MousePointerClick, Globe, Images, ChartNoAxesCombined, Workflow, Gauge]];
  return <main id="main-content">
    <section className="grid px-page pt-[var(--page-title-top)] pb-16 text-center"><Reveal><h1 className="m-0 mx-auto text-display-sm font-semibold">{copy.heading} <em className="font-bold text-[var(--wave-blue)]">{copy.accent}</em></h1><p className="mx-auto mt-6 max-w-reading text-body-lg font-medium text-muted">{copy.intro}</p></Reveal></section>
    <section className="px-page pb-section"><div className="mx-auto mb-10 max-w-[76rem]"><h2 className="text-heading-lg font-semibold">{copy.sectionHeading}</h2><p className="mt-4 max-w-reading text-body text-muted">{copy.sectionCopy}</p></div><div className="mx-auto grid max-w-[76rem] gap-4 md:grid-cols-3">{copy.plans.map(([name, intro, cta, scope], index) => { const Icon = icons[index]!; return <Reveal className="h-full" delay={index * 55} key={name}><article className="flex h-full flex-col gap-6 rounded-card border border-line bg-surface p-5 shadow-surface"><header><Icon className="mb-7 size-[42px]" strokeWidth={1.7} /><h2 className="text-[28px] font-semibold">{name}</h2><p className="mt-3 text-[18px] text-muted">{intro}</p><CtaButton href={contact} className="mt-5 w-full justify-between">{cta}</CtaButton></header><section><h3 className="mb-3 text-label font-semibold text-muted uppercase">{copy.scope}</h3><ul className="grid gap-2.5">{scope.map((item, itemIndex) => { const ItemIcon = scopeIcons[index]![itemIndex]!; return <li className="flex gap-2.5 text-card-body" key={item}><ItemIcon className="mt-0.5 size-4.5 shrink-0 text-[#74746f]" strokeWidth={1.8} /><span>{item}</span></li>; })}</ul></section></article></Reveal>; })}</div>
      <Reveal className="mx-auto mt-4 max-w-[76rem]"><article id="partnership" className="rounded-card bg-dark p-8 text-inverse"><Handshake className="mb-7 size-[42px]" /><h2 className="text-heading-lg font-semibold">{copy.partnership[0]}</h2><p className="mt-3 text-[18px] text-dark-muted">{copy.partnership[1]}</p><CtaButton href={contact} className="mt-5" light>{copy.partnership[2]}</CtaButton><section className="mt-8 grid grid-cols-3 gap-6 border-t border-white/15 pt-6 max-[900px]:grid-cols-1">{copy.plans.map(([name, , , scope]) => <div className="rounded-xl bg-white/[.045] p-4" key={name}><h3 className="mb-4 font-semibold">{name}</h3><ul className="grid gap-2">{scope.map((item) => <li className="border-t border-white/10 pt-2 text-card-body text-dark-muted" key={item}>{item}</li>)}</ul></div>)}</section></article></Reveal><p className="mx-auto mt-6 flex max-w-4xl gap-3 rounded-card border border-[#bfd2f7] border-l-4 border-l-[var(--wave-blue)] bg-[#edf3ff] px-4 py-3 text-small text-[#555550]"><Info className="size-4 shrink-0 text-[var(--wave-blue)]" />{copy.note}</p></section>
    <section className="faq-section px-page py-section"><SectionHeading title={copy.faqHeading} align="center" /><div className="mx-auto max-w-[820px]"><Faq items={copy.faqs.map(([question, answer]) => ({ data: { question, answer } }))} id={`solutions-${locale}`} /></div></section>
    <section className="bg-dark px-page py-section text-inverse text-center"><h2 className="text-heading-lg font-semibold">{copy.closing[0]}</h2><p className="mx-auto mt-6 mb-7 max-w-narrow text-body text-dark-muted">{copy.closing[1]}</p><CtaButton href={contact} light>{copy.closing[2]}</CtaButton></section>
  </main>;
}

export function getSolutionsDescription(locale: Locale) {
  return content[locale].description;
}
