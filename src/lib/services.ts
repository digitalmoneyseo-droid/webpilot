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
      en: "We create distinctive brands, high-converting websites, and useful web and mobile apps designed for long-term growth.",
      de: "Wir entwickeln unverwechselbare Marken, conversionstarke Websites und nützliche Web- und Mobile-Apps für langfristiges Wachstum.",
    },
    symbol: "build",
  },
  {
    id: "grow",
    number: "02",
    title: { en: "Grow", de: "Wachsen" },
    description: {
      en: "We increase visibility and demand through SEO, AI search, content, paid acquisition, analytics, and conversion optimization.",
      de: "Wir steigern Sichtbarkeit und Nachfrage durch SEO, KI-Suche, Content, Paid Acquisition, Analytics und Conversion-Optimierung.",
    },
    symbol: "grow",
  },
  {
    id: "automate",
    number: "03",
    title: { en: "Automate", de: "Automatisieren" },
    description: {
      en: "We build AI agents, workflow automations, CRM systems, and intelligent tools that reduce manual work.",
      de: "Wir entwickeln KI-Agenten, Workflow-Automatisierungen, CRM-Systeme und intelligente Tools, die manuelle Arbeit reduzieren.",
    },
    symbol: "automate",
  },
] as const;

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
