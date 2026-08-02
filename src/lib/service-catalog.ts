import {
  servicesContent,
  type AutomationAnimationCopy,
  type CampaignAnimationCopy,
  type OptimizationAnimationCopy,
  type ServiceCopy,
  type ServiceId,
  type WebExperienceAnimationCopy,
} from "@/i18n/services";
import { localizePath, type Locale } from "@/lib/i18n";

export type ServiceAnimation =
  | { type: "web-experience"; copy: WebExperienceAnimationCopy }
  | { type: "optimization"; copy: OptimizationAnimationCopy }
  | { type: "campaign"; copy: CampaignAnimationCopy }
  | { type: "automation"; copy: AutomationAnimationCopy };

export type ServiceCatalogEntry = {
  id: ServiceId;
  copy: ServiceCopy;
  animation: ServiceAnimation;
  href: string;
  reverse: boolean;
  theme: string;
};

export const serviceOrder: readonly ServiceId[] = [
  "websites-apps",
  "seo-ai-visibility",
  "paid-campaigns",
  "ai-automation",
];

const servicePolicy: Record<ServiceId, { reverse: boolean; theme: string }> = {
  "websites-apps": { reverse: false, theme: "bg-white text-ink" },
  "seo-ai-visibility": { reverse: true, theme: "bg-white text-ink" },
  "paid-campaigns": { reverse: false, theme: "bg-white text-ink" },
  "ai-automation": { reverse: true, theme: "bg-[var(--ds-gray-100)] text-ink" },
};

export function getServicePath(id: ServiceId, locale: Locale): string {
  return localizePath(`/services/${id}`, locale);
}

export function getServiceCatalog(locale: Locale): ServiceCatalogEntry[] {
  const content = servicesContent[locale];
  const copyById = new Map(content.services.map((service) => [service.id, service]));
  if (content.services.length !== serviceOrder.length || copyById.size !== serviceOrder.length) {
    throw new Error(`Service identities must be unique and complete for ${locale}.`);
  }

  const animationById: Record<ServiceId, ServiceAnimation> = {
    "websites-apps": { type: "web-experience", copy: content.webExperienceAnimation },
    "seo-ai-visibility": { type: "optimization", copy: content.optimizationAnimation },
    "paid-campaigns": { type: "campaign", copy: content.campaignAnimation },
    "ai-automation": { type: "automation", copy: content.automationAnimation },
  };

  return serviceOrder.map((id) => {
    const copy = copyById.get(id);
    if (!copy) throw new Error(`Missing ${id} service copy for ${locale}.`);
    const policy = servicePolicy[id];
    return {
      id,
      copy,
      animation: animationById[id],
      href: getServicePath(id, locale),
      reverse: policy.reverse,
      theme: policy.theme,
    };
  });
}
