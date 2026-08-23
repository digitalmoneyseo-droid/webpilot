import { OfferOverview, type OfferOverviewService } from "@/components/offer-overview";
import type { Locale } from "@/lib/i18n";
import { getServiceCatalog } from "@/lib/service-catalog";

export function OfferOverviewShell({ locale }: { locale: Locale }) {
  const services = getServiceCatalog(locale).map(({ id, animation, copy, href, reverse, theme }) => ({
    id,
    animation,
    copy: {
      name: copy.name,
      summary: copy.summary,
      rows: copy.rows,
      cta: copy.cta,
    },
    href,
    reverse,
    theme,
  } satisfies OfferOverviewService));

  return <OfferOverview locale={locale} services={services} />;
}
