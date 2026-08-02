"use client";

import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { CollapsePanel } from "@/components/collapse-panel";
import { CtaButton } from "@/components/cta-button";
import { OfferAnimation } from "@/components/offer-animations/offer-animation";
import { getOfferCatalog, type OfferCatalogEntry } from "@/lib/offer-catalog";
import type { Locale } from "@/lib/i18n";

export function OfferOverview({ locale }: { locale: Locale }) {
  const offers = getOfferCatalog(locale);
  return <div className="mx-auto max-w-[70rem]">{offers.map((offer, index) => <Offer key={offer.id} locale={locale} offer={offer} revealDelay={index * 50} />)}</div>;
}

function Offer({ locale, offer, revealDelay }: { locale: Locale; offer: OfferCatalogEntry; revealDelay: number }) {
  const [open, setOpen] = useState<number | null>(0);
  const { copy } = offer;

  return <div className="reveal mb-[clamp(5rem,8vw,7rem)] last:mb-0" data-reveal style={{ "--reveal-delay": `${revealDelay}ms` } as React.CSSProperties}>
    <article className="grid grid-cols-2 items-center gap-x-8 max-[900px]:grid-cols-1 max-[900px]:gap-10">
      <div className={`min-w-0 max-w-[31rem] ${offer.reverse ? "min-[901px]:order-2 min-[901px]:justify-self-end" : ""}`}>
        <h3 className="m-0 text-heading-md">{copy.need}</h3>
        <p className="mt-4 max-w-[46ch] text-body-lg text-muted">{copy.intro}</p>
        <div className="relative mt-8">{copy.rows.map(([label, detail], row) => {
          const panelId = `offer-${offer.id}-${row}`;
          const buttonId = `${panelId}-button`;
          const expanded = open === row;
          return <div className={`relative before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:z-1 before:h-px before:bg-[var(--ds-gray-alpha-200)] before:content-[''] last:after:pointer-events-none last:after:absolute last:after:inset-x-0 last:after:bottom-0 last:after:z-1 last:after:h-px last:after:bg-[var(--ds-gray-alpha-200)] last:after:content-[''] ${expanded ? "[&_.faq-toggle_svg]:rotate-90" : ""}`} key={label}>
            <h4 className="m-0"><button id={buttonId} className="grid min-h-16 w-full cursor-pointer grid-cols-[minmax(0,1fr)_1.5rem] items-center gap-4 rounded-md bg-transparent px-2 py-4 text-left transition-colors duration-150" type="button" aria-expanded={expanded} aria-controls={panelId} onClick={() => setOpen(expanded ? null : row)}><span className="text-body font-semibold">{label}</span><span className="faq-toggle grid size-6 place-items-center" aria-hidden="true"><ChevronRight className="size-4.5 transition-transform duration-200 ease-[cubic-bezier(.4,0,.2,1)] motion-reduce:transition-none" strokeWidth={1.7} /></span></button></h4>
            <CollapsePanel id={panelId} labelledBy={buttonId} expanded={expanded}><p className="m-0 max-w-[44ch] px-2 pb-5 text-body text-muted">{detail}</p></CollapsePanel>
          </div>;
        })}</div>
        <CtaButton href={offer.href} className="mt-6">{copy.cta}</CtaButton>
      </div>
      <div className={`relative grid min-w-0 aspect-[1.1/1] min-h-[24rem] overflow-hidden rounded-card p-10 shadow-[var(--ds-shadow-border)] [&>*]:relative ${offer.theme} ${offer.reverse ? "min-[901px]:order-1" : ""} max-[900px]:mx-auto max-[900px]:aspect-[4/3] max-[900px]:min-h-0 max-[900px]:w-full max-[900px]:max-w-[44rem] max-[600px]:h-[clamp(19rem,68vw,25rem)] max-[600px]:aspect-auto max-[600px]:p-4`} aria-hidden="true">
        <OfferAnimation animation={offer.animation} locale={locale} />
      </div>
    </article>
  </div>;
}
