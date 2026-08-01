import { offersContent, type CampaignAnimationCopy, type FoundationAnimationCopy, type OfferCopy, type OfferId, type OptimizationAnimationCopy, type PartnershipAnimationCopy } from "@/i18n/offers";
import { localizePath, type Locale } from "@/lib/i18n";

export type OfferAnimation =
  | { type: "foundation"; copy: FoundationAnimationCopy }
  | { type: "optimization"; copy: OptimizationAnimationCopy }
  | { type: "campaign"; copy: CampaignAnimationCopy }
  | { type: "partnership"; copy: PartnershipAnimationCopy };

export type OfferCatalogEntry = {
  id: OfferId;
  copy: OfferCopy;
  animation: OfferAnimation;
  href: string;
  reverse: boolean;
  theme: string;
};

const offerOrder: readonly OfferId[] = ["foundation", "optimization", "campaign", "partnership"];
const offerPolicy: Record<OfferId, { reverse: boolean; anchor?: string; theme: string }> = {
  foundation: { reverse: false, theme: "bg-white text-ink" },
  optimization: { reverse: true, theme: "bg-white text-ink" },
  campaign: { reverse: false, theme: "bg-white text-ink" },
  partnership: { reverse: true, anchor: "partnership", theme: "bg-[var(--ds-gray-100)] text-ink" },
};

export function getOfferCatalog(locale: Locale): OfferCatalogEntry[] {
  const content = offersContent[locale];
  const copyById = new Map(content.offers.map((offer) => [offer.id, offer]));
  if (content.offers.length !== offerOrder.length || copyById.size !== offerOrder.length) {
    throw new Error(`Offer identities must be unique and complete for ${locale}.`);
  }
  const animationById: Record<OfferId, OfferAnimation> = {
    foundation: { type: "foundation", copy: content.foundationAnimation },
    optimization: { type: "optimization", copy: content.optimizationAnimation },
    campaign: { type: "campaign", copy: content.campaignAnimation },
    partnership: { type: "partnership", copy: content.partnershipAnimation },
  };

  return offerOrder.map((id) => {
    const copy = copyById.get(id);
    if (!copy) throw new Error(`Missing ${id} Offer copy for ${locale}.`);
    const policy = offerPolicy[id];
    const path = localizePath("/solutions", locale);
    return { id, copy, animation: animationById[id], href: policy.anchor ? `${path}#${policy.anchor}` : path, reverse: policy.reverse, theme: policy.theme };
  });
}
