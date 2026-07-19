import type { ServiceEntry } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

export const servicePillarIds = ["build", "grow", "automate"] as const;
export type ServicePillarId = (typeof servicePillarIds)[number];

interface ServicePillarDefinition {
  id: ServicePillarId;
  number: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  symbol: "build" | "grow" | "automate";
}

export const servicePillars: readonly ServicePillarDefinition[] = [
  {
    id: "build",
    number: "01",
    title: { en: "Build", de: "Aufbauen" },
    description: {
      en: "Make the right thing with clarity, care, and the confidence to put it into the world.",
      de: "Das Richtige mit Klarheit, Sorgfalt und dem Mut entwickeln, es in die Welt zu bringen.",
    },
    symbol: "build",
  },
  {
    id: "grow",
    number: "02",
    title: { en: "Grow", de: "Wachsen" },
    description: {
      en: "Turn useful work into durable attention, demand, and momentum that compounds.",
      de: "Aus guter Arbeit nachhaltige Aufmerksamkeit, Nachfrage und wachsende Dynamik schaffen.",
    },
    symbol: "grow",
  },
  {
    id: "automate",
    number: "03",
    title: { en: "Automate", de: "Automatisieren" },
    description: {
      en: "Remove repetitive work without removing human judgment, context, or control.",
      de: "Wiederholbare Arbeit reduzieren, ohne menschliches Urteilsvermögen, Kontext oder Kontrolle zu verlieren.",
    },
    symbol: "automate",
  },
] as const;

export const serviceCategoryIds = ["web-app-design", "seo-geo", "paid-campaigns", "ai-automation"] as const;
export type ServiceCategoryId = (typeof serviceCategoryIds)[number];

export interface ServiceCategoryDefinition {
  id: ServiceCategoryId;
  number: string;
  icon: "design" | "search" | "campaign" | "automation";
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  href: string;
  services: readonly string[];
}

export const serviceCategories: readonly ServiceCategoryDefinition[] = [
  {
    id: "web-app-design",
    number: "01",
    icon: "design",
    title: { en: "Web & app design", de: "Web- & App-Design" },
    description: {
      en: "Distinctive websites and digital products, designed and engineered around a clear business goal.",
      de: "Unverwechselbare Websites und digitale Produkte, gestaltet und entwickelt für ein klares Geschäftsziel.",
    },
    href: "/services/website-design-development",
    services: ["branding-identity", "website-design-development", "app-design-development"],
  },
  {
    id: "seo-geo",
    number: "02",
    icon: "search",
    title: { en: "SEO & GEO", de: "SEO & GEO" },
    description: {
      en: "Technical and editorial visibility across search engines, answer engines, and AI recommendations.",
      de: "Technische und redaktionelle Sichtbarkeit in Suchmaschinen, Antwortsystemen und KI-Empfehlungen.",
    },
    href: "/services/seo-ai-search",
    services: ["seo-ai-search", "content-social"],
  },
  {
    id: "paid-campaigns",
    number: "03",
    icon: "campaign",
    title: { en: "Paid advertising campaigns", de: "Paid-Advertising-Kampagnen" },
    description: {
      en: "Strategy, creative, landing pages, and measurement for accountable paid acquisition.",
      de: "Strategie, Creative, Landingpages und Messung für verantwortbare bezahlte Akquisition.",
    },
    href: "/services/paid-acquisition",
    services: ["paid-acquisition", "analytics-cro"],
  },
  {
    id: "ai-automation",
    number: "04",
    icon: "automation",
    title: { en: "AI & automation", de: "KI & Automatisierung" },
    description: {
      en: "Useful agents and connected workflows that save time while keeping people in control.",
      de: "Nützliche Agenten und verbundene Workflows, die Zeit sparen und Menschen die Kontrolle lassen.",
    },
    href: "/services/ai-automation",
    services: ["ai-automation"],
  },
] as const;

export function localizedCategoryTitle(category: ServiceCategoryDefinition, locale: Locale): string {
  return category.title[locale];
}

export function localizedCategoryDescription(category: ServiceCategoryDefinition, locale: Locale): string {
  return category.description[locale];
}

export function servicesForPillar(services: ServiceEntry[], pillar: ServicePillarId): ServiceEntry[] {
  return services.filter((service) => service.data.pillar === pillar);
}

export function localizedPillarTitle(pillar: ServicePillarDefinition, locale: Locale): string {
  return pillar.title[locale];
}

export function localizedPillarDescription(pillar: ServicePillarDefinition, locale: Locale): string {
  return pillar.description[locale];
}

export function localizedServiceCount(count: number, locale: Locale): string {
  if (locale === "de") return `${count} ${count === 1 ? "Leistung" : "Leistungen"}`;
  return `${count} ${count === 1 ? "service" : "services"}`;
}
