import type { Locale } from "@/lib/i18n";

type SolutionPlan = readonly [name: string, intro: string, cta: string, scope: readonly string[]];

export type SolutionsCopy = {
  description: string;
  heading: string;
  accent: string;
  intro: string;
  sectionHeading: string;
  sectionCopy: string;
  scope: string;
  note: string;
  partnership: readonly [string, string, string];
  closing: readonly [string, string, string];
  plans: readonly SolutionPlan[];
  faqHeading: string;
};

export const solutionsContent = {
  de: {
    description: "Fokussierte Angebote für digitale Grundlagen, laufende Optimierung und bezahlte Kampagnen – einzeln oder als Integrierte Partnerschaft.",
    heading: "Starte mit dem, was dein Unternehmen",
    accent: "jetzt braucht.",
    intro: "Ob Website, App, digitales Produkt, bessere Akquise oder ein automatisierter Ablauf: Wähle ein fokussiertes Angebot oder verbinde mehrere Bereiche in einer Integrierten Partnerschaft.",
    sectionHeading: "Fokussiert, wenn es sinnvoll ist. Integriert, wenn es darauf ankommt.",
    sectionCopy: "Starte mit einer klar definierten Priorität oder verbinde alle digitalen Disziplinen über eine gemeinsame Roadmap und einen verantwortlichen Partner.",
    scope: "Typischer Umfang",
    note: "Nachdem wir dein Projekt besprochen haben, erhältst du ein klares Angebot mit Leistungsumfang, Zeitplan, Honorar und allen Kosten für Drittanbieter.",
    partnership: ["Integrierte Partnerschaft", "Für Unternehmen, die mehrere digitale Prioritäten über eine gemeinsame Roadmap planen, umsetzen und kontinuierlich verbessern möchten.", "Partnerschaft besprechen"],
    closing: ["Noch unsicher, wo du starten solltest?", "Wir klären deine Ausgangslage, den wichtigsten Engpass und den nächsten Schritt mit dem größten Potenzial.", "Projekt besprechen"],
    plans: [
      ["Fundament", "Für Marken, Produkte und Plattformen.", "Fundament besprechen", ["Strategie, Positionierung & Customer Journeys", "Marke, UX & UI Design", "Websites, Web-Apps & Mobile Apps", "Produktdesign & Entwicklung", "Analytics, CRM & Integrationen", "KI-Funktionen & Workflow-Automatisierung", "Launch-Support"]],
      ["Optimierung", "Für bessere Ergebnisse aus Bestehendem.", "Optimierung planen", ["Monatliche Prioritäten & Performance-Reviews", "SEO, lokale Suche & KI-Sichtbarkeit", "Content- & Conversion-Optimierung", "Website-, App- & Produktverbesserungen", "Analytics, Attribution & Tests", "KI- & Automatisierungsverbesserungen", "Technische Wartung & Support"]],
      ["Kampagne", "Für planbare Nachfrage durch Paid Media.", "Kampagne besprechen", ["Kampagnen- & Angebotsstrategie", "Google Ads & Paid Social", "Landingpages & Kampagnenerlebnisse", "Ad Creatives, Zielgruppen- & Angebotstests", "Analytics, Tracking & Attribution", "CRM-Routing & Follow-up-Automatisierung", "Kontinuierliche Kampagnenoptimierung"]],
    ],
    faqHeading: "Häufige Fragen zu den Angeboten",
  },
  en: {
    description: "Three focused offers for digital foundations, ongoing optimization, and paid campaigns—available separately or through an integrated partnership.",
    heading: "Start with what your business",
    accent: "needs next.",
    intro: "Whether the next priority is a website, app, digital product, stronger acquisition, or an automated workflow, choose a focused engagement or connect several areas through one partnership.",
    sectionHeading: "Focused when it should be. Integrated when it needs to be.",
    sectionCopy: "Start with one defined priority or connect every digital discipline through a shared roadmap and one accountable partner.",
    scope: "Typical scope",
    note: "After we discuss your project, you’ll receive a clear proposal outlining the scope, timeline, fees, and any third-party costs.",
    partnership: ["Integrated Partnership", "For businesses that need multiple digital priorities planned, delivered, and improved through one shared roadmap.", "Discuss the partnership"],
    closing: ["Not sure where to start?", "We clarify your current situation, the most important bottleneck, and the next move with the greatest potential.", "Discuss your project"],
    plans: [
      ["Foundation", "For brands, products, and platforms.", "Discuss your foundation", ["Strategy, positioning & customer journeys", "Brand, UX & UI design", "Websites, web apps & mobile apps", "Product design & development", "Analytics, CRM & integrations", "AI features & workflow automation", "Launch support"]],
      ["Optimization", "For better results from what already works.", "Plan your optimization", ["Monthly priorities & performance reviews", "SEO, local search & AI visibility", "Content & conversion optimization", "Website, app & product improvements", "Analytics, attribution & testing", "AI & automation improvements", "Technical maintenance & support"]],
      ["Campaign", "For predictable demand through paid media.", "Discuss a campaign", ["Campaign & offer strategy", "Google Ads & paid social", "Landing pages & campaign experiences", "Ad creative, audience & offer testing", "Analytics, tracking & attribution", "CRM routing & follow-up automation", "Continuous campaign optimization"]],
    ],
    faqHeading: "Common questions about the offers",
  },
} satisfies Record<Locale, SolutionsCopy>;
