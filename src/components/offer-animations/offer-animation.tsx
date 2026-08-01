"use client";

import { CampaignGrowthAnimation } from "@/components/offer-animations/campaign-growth-animation";
import { FoundationBlueprintAnimation } from "@/components/offer-animations/foundation-blueprint-animation";
import { OptimizationSearchAnimation } from "@/components/offer-animations/optimization-search-animation";
import { PartnershipRoadmapAnimation } from "@/components/offer-animations/partnership-roadmap-animation";
import type { OfferAnimation as OfferAnimationDefinition } from "@/lib/offer-catalog";
import type { Locale } from "@/lib/i18n";

export function OfferAnimation({ animation, locale }: { animation: OfferAnimationDefinition; locale: Locale }) {
  switch (animation.type) {
    case "foundation": return <FoundationBlueprintAnimation copy={animation.copy} />;
    case "optimization": return <OptimizationSearchAnimation copy={animation.copy} />;
    case "campaign": return <CampaignGrowthAnimation copy={animation.copy} locale={locale} />;
    case "partnership": return <PartnershipRoadmapAnimation copy={animation.copy} />;
  }
}
