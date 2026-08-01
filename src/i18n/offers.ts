import type { Locale } from "@/lib/i18n";

export type OfferId = "foundation" | "optimization" | "campaign" | "partnership";

export type OfferCopy = {
  id: OfferId;
  title: string;
  intro: string;
  rows: readonly [label: string, copy: string][];
  cta: string;
};

export type FoundationAnimationCopy = {
  title: string;
  assembling: string;
  ready: string;
  modules: readonly { label: string; detail: string }[];
};

export type OptimizationAnimationCopy = {
  query: string;
  resultLabel: string;
  rankLabel: string;
  topRankedLabel: string;
  winnerDescription: string;
  descriptions: readonly string[];
};

export type CampaignAnimationCopy = { metricLabel: string };

export type PartnershipAnimationCopy = {
  title: string;
  status: string;
  workstreams: readonly string[];
  stages: readonly string[];
};

export type OffersCopy = {
  offers: readonly OfferCopy[];
  foundationAnimation: FoundationAnimationCopy;
  optimizationAnimation: OptimizationAnimationCopy;
  campaignAnimation: CampaignAnimationCopy;
  partnershipAnimation: PartnershipAnimationCopy;
};

export const offersContent = {
  de: {
    offers: [
      {
        id: "foundation",
        title: "Fundament",
        intro: "Baue oder erneuere die digitale Grundlage, mit der dein Unternehmen sichtbar wird, verkauft und arbeitet.",
        rows: [
          ["Für wen es ideal ist", "Unternehmen, die eine Marke, Website, App oder ein digitales Produkt neu aufbauen oder grundlegend erneuern."],
          ["Welches Ergebnis du erwarten kannst", "Eine klare, startbereite Grundlage, die zu deinen Kunden und Geschäftszielen passt."],
          ["Was wir aufbauen", "Marke und UX, Websites und Apps, digitale Produkte sowie passende KI- und Automatisierungslösungen."],
        ],
        cta: "Fundament entdecken",
      },
      {
        id: "optimization",
        title: "Optimierung",
        intro: "Verbessere bestehende Websites, Produkte, Sichtbarkeit und Abläufe Monat für Monat.",
        rows: [
          ["Für wen es ideal ist", "Unternehmen mit einer funktionierenden Grundlage, die mehr Sichtbarkeit, Conversion oder Effizienz erreichen möchten."],
          ["Welches Ergebnis du erwarten kannst", "Kontinuierliche Verbesserungen auf Basis klarer Prioritäten und echter Leistungsdaten."],
          ["Was wir verbessern", "SEO und KI-Sichtbarkeit, Conversion, UX, Analytics, bestehende Automatisierungen und technische Abläufe."],
        ],
        cta: "Optimierung entdecken",
      },
      {
        id: "campaign",
        title: "Kampagne",
        intro: "Verwandle bezahlte Reichweite mit messbaren Kampagnen und klaren Conversion-Pfaden in qualifizierte Anfragen.",
        rows: [
          ["Für wen es ideal ist", "Unternehmen, die mit Werbung skalieren möchten."],
          ["Welches Ergebnis du erwarten kannst", "Bessere Entscheidungsgrundlagen, schnellere Lernzyklen und qualifiziertere Nachfrage."],
          ["Was die Kampagne verbindet", "Strategie, Anzeigen, Landingpages, Creative, Tracking und Lead-Routing als durchgängiger Conversion-Pfad."],
        ],
        cta: "Kampagne entdecken",
      },
      {
        id: "partnership",
        title: "Integrierte Partnerschaft",
        intro: "Fundament, Optimierung und Kampagne werden über eine gemeinsame Roadmap koordiniert.",
        rows: [
          ["Für wen es ideal ist", "Unternehmen, bei denen mehrere digitale Bereiche gemeinsam geplant, umgesetzt und verbessert werden müssen."],
          ["Welches Ergebnis du erwarten kannst", "Ein abgestimmter Arbeitsrhythmus mit klaren Prioritäten statt voneinander getrennter Einzelmaßnahmen."],
          ["Wie die Zusammenarbeit funktioniert", "Eine gemeinsame Roadmap verbindet Strategie, Umsetzung, Tests und laufende Priorisierung über alle relevanten Bereiche hinweg."],
        ],
        cta: "Partnerschaft entdecken",
      },
    ],
    foundationAnimation: {
      title: "Systemplan",
      assembling: "Im Aufbau",
      ready: "Startbereit",
      modules: [
        { label: "Marke", detail: "Identität & UX" },
        { label: "Website", detail: "Web & Apps" },
        { label: "Produkt", detail: "Digitale Systeme" },
        { label: "Automation", detail: "KI & Abläufe" },
      ],
    },
    optimizationAnimation: {
      query: "Beste Agentur für digitales Wachstum",
      resultLabel: "Suchergebnisse",
      rankLabel: "Rang",
      topRankedLabel: "Top platziert",
      winnerDescription: "Digitale Systeme für profitables Wachstum",
      descriptions: ["Strategie und digitale Kampagnen", "Digitale Erlebnisse für wachsende Marken", "Performance Marketing und Optimierung"],
    },
    campaignAnimation: { metricLabel: "neue qualifizierte Anfragen" },
    partnershipAnimation: {
      title: "Gemeinsame Roadmap",
      status: "Im Takt",
      workstreams: ["Fundament", "Optimierung", "Kampagne"],
      stages: ["Strategie", "Umsetzung", "Lernen"],
    },
  },
  en: {
    offers: [
      {
        id: "foundation",
        title: "Foundation",
        intro: "Build or replace the digital foundation your business needs to get noticed, sell, and operate.",
        rows: [
          ["Who it is best for", "Businesses building or replacing a brand, website, app, or digital product."],
          ["The outcome you can expect", "A clear, launch-ready foundation designed around your customers and business goals."],
          ["What we can build", "Brand and UX, websites and apps, digital products, plus the right AI and automation solutions."],
        ],
        cta: "Explore Foundation",
      },
      {
        id: "optimization",
        title: "Optimization",
        intro: "Improve existing websites, products, visibility, and workflows month by month.",
        rows: [
          ["Who it is best for", "Businesses with a working foundation that need better visibility, conversion, or efficiency."],
          ["The outcome you can expect", "Continuous improvements guided by clear priorities and real performance data."],
          ["What we improve", "SEO and AI visibility, conversion, UX, analytics, existing automations, and technical workflows."],
        ],
        cta: "Explore Optimization",
      },
      {
        id: "campaign",
        title: "Campaign",
        intro: "Turn paid reach into qualified inquiries with measurable campaigns and clear conversion paths.",
        rows: [
          ["Who it is best for", "Businesses ready to scale with paid advertising."],
          ["The outcome you can expect", "Clearer acquisition decisions, faster learning cycles, and better-qualified demand."],
          ["What the campaign connects", "Strategy, ads, landing pages, creative, tracking, and lead routing in one continuous conversion path."],
        ],
        cta: "Explore Campaign",
      },
      {
        id: "partnership",
        title: "Integrated Partnership",
        intro: "Foundation, Optimization, and Campaign are coordinated through one shared roadmap.",
        rows: [
          ["Who it is best for", "Businesses that need several digital areas to be planned, delivered, and improved together."],
          ["The outcome you can expect", "One coordinated working rhythm with clear priorities instead of disconnected initiatives."],
          ["How the partnership works", "One shared roadmap connects strategy, delivery, testing, and ongoing prioritization across every relevant area."],
        ],
        cta: "Explore Partnership",
      },
    ],
    foundationAnimation: {
      title: "System blueprint",
      assembling: "Assembling",
      ready: "Launch ready",
      modules: [
        { label: "Brand", detail: "Identity & UX" },
        { label: "Website", detail: "Web & apps" },
        { label: "Product", detail: "Digital systems" },
        { label: "Automation", detail: "AI & workflows" },
      ],
    },
    optimizationAnimation: {
      query: "Best digital growth agency",
      resultLabel: "Search results",
      rankLabel: "Rank",
      topRankedLabel: "Top ranked",
      winnerDescription: "Digital systems for profitable growth",
      descriptions: ["Strategy and digital campaigns", "Digital experiences for growing brands", "Performance marketing and optimization"],
    },
    campaignAnimation: { metricLabel: "new qualified inquiries" },
    partnershipAnimation: {
      title: "Shared roadmap",
      status: "In sync",
      workstreams: ["Foundation", "Optimization", "Campaign"],
      stages: ["Strategy", "Delivery", "Learning"],
    },
  },
} satisfies Record<Locale, OffersCopy>;
