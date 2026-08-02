"use client";

import { AutomationFlowAnimation } from "@/components/offer-animations/automation-flow-animation";
import { CampaignGrowthAnimation } from "@/components/offer-animations/campaign-growth-animation";
import { OptimizationSearchAnimation } from "@/components/offer-animations/optimization-search-animation";
import { WebExperienceAnimation } from "@/components/offer-animations/web-experience-animation";
import type { ServiceAnimation as ServiceAnimationDefinition } from "@/lib/service-catalog";
import type { Locale } from "@/lib/i18n";

export function OfferAnimation({ animation, locale }: { animation: ServiceAnimationDefinition; locale: Locale }) {
  switch (animation.type) {
    case "web-experience": return <WebExperienceAnimation copy={animation.copy} />;
    case "optimization": return <OptimizationSearchAnimation copy={animation.copy} />;
    case "campaign": return <CampaignGrowthAnimation copy={animation.copy} locale={locale} />;
    case "automation": return <AutomationFlowAnimation copy={animation.copy} />;
  }
}
