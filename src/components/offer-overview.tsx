"use client";

import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { CollapsePanel } from "@/components/collapse-panel";
import { CtaButton } from "@/components/cta-button";
import { OfferAnimation } from "@/components/offer-animations/offer-animation";
import { getServiceCatalog, type ServiceCatalogEntry } from "@/lib/service-catalog";
import type { Locale } from "@/lib/i18n";

export function OfferOverview({ locale }: { locale: Locale }) {
  const services = getServiceCatalog(locale);
  return <div className="mx-auto max-w-[70rem]">{services.map((service, index) => <Service key={service.id} locale={locale} service={service} revealDelay={index * 50} />)}</div>;
}

function Service({ locale, service, revealDelay }: { locale: Locale; service: ServiceCatalogEntry; revealDelay: number }) {
  const [open, setOpen] = useState<number | null>(0);
  const { copy } = service;

  return <div className="reveal mb-content-stack last:mb-0" data-reveal style={{ "--reveal-delay": `${revealDelay}ms` } as React.CSSProperties}>
    <article className="grid grid-cols-2 items-center gap-x-8 max-[900px]:grid-cols-1 max-[900px]:gap-10">
      <div className={`min-w-0 max-w-[31rem] ${service.reverse ? "min-[901px]:order-2 min-[901px]:justify-self-end" : ""}`}>
        <h3 className="m-0 text-heading-md">{copy.name}</h3>
        <p className="mt-4 max-w-[46ch] text-body-lg text-muted">{copy.summary}</p>
        <div className="relative mt-8">{copy.rows.map(([label, detail], row) => {
          const panelId = `service-${service.id}-${row}`;
          const buttonId = `${panelId}-button`;
          const expanded = open === row;
          return <div className={`relative before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:z-1 before:h-px before:bg-line before:content-[''] last:after:pointer-events-none last:after:absolute last:after:inset-x-0 last:after:bottom-0 last:after:z-1 last:after:h-px last:after:bg-line last:after:content-[''] ${expanded ? "[&_.faq-toggle_svg]:rotate-90" : ""}`} key={label}>
            <h4 className="m-0"><button id={buttonId} className="grid min-h-16 w-full cursor-pointer grid-cols-[minmax(0,1fr)_1.5rem] items-center gap-4 rounded-inset bg-transparent px-2 py-4 text-left transition-colors duration-150 hover:bg-interaction" type="button" aria-expanded={expanded} aria-controls={panelId} onClick={() => setOpen(expanded ? null : row)}><span className="text-body font-semibold">{label}</span><span className="faq-toggle grid size-6 place-items-center" aria-hidden="true"><ChevronRight className="size-4.5 transition-transform duration-200 ease-[var(--ease-out)] motion-reduce:transition-none" strokeWidth={1.7} /></span></button></h4>
            <CollapsePanel id={panelId} labelledBy={buttonId} expanded={expanded}><p className="m-0 max-w-[44ch] px-2 pb-5 text-body text-muted">{detail}</p></CollapsePanel>
          </div>;
        })}</div>
        <CtaButton href={service.href} className="mt-6">{copy.cta}</CtaButton>
      </div>
      <div data-offer-visual={service.animation.type} className={`relative grid min-w-0 aspect-[1.1/1] min-h-[24rem] overflow-hidden rounded-card p-10 shadow-surface [&>*]:relative ${service.theme} ${service.reverse ? "min-[901px]:order-1" : ""} max-[900px]:mx-auto max-[900px]:aspect-[4/3] max-[900px]:min-h-0 max-[900px]:w-full max-[900px]:max-w-[44rem] max-[600px]:h-[clamp(19rem,68vw,25rem)] max-[600px]:aspect-auto max-[600px]:p-4`} aria-hidden="true">
        <OfferAnimation animation={service.animation} locale={locale} />
      </div>
    </article>
  </div>;
}
