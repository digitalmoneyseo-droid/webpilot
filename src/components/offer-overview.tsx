"use client";

import { ChevronRight, Search } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Confetti } from "@/components/confetti";
import { CtaButton } from "@/components/cta-button";
import { CollapsePanel } from "@/components/collapse-panel";
import { CampaignGrowthAnimation } from "@/components/offer-animations/campaign-growth-animation";
import { FoundationBlueprintAnimation } from "@/components/offer-animations/foundation-blueprint-animation";
import { PartnershipRoadmapAnimation } from "@/components/offer-animations/partnership-roadmap-animation";
import { offersContent } from "@/i18n/offers";
import { localizePath, type Locale } from "@/lib/i18n";

export function OfferOverview({ locale }: { locale: Locale }) {
  const offers = offersContent[locale].offers;
  const themes = ["bg-white text-ink", "bg-white text-ink", "bg-white text-ink", "bg-[var(--ds-gray-100)] text-ink"];
  return <div className="mx-auto max-w-[70rem]">{offers.map((offer, index) => {
    return <Offer key={offer.title} locale={locale} index={index} title={offer.title} intro={offer.intro} rows={offer.rows} cta={offer.cta} theme={themes[index]!} />;
  })}</div>;
}

function Offer({ locale, index, title, intro, rows, cta, theme }: { locale: Locale; index: number; title: string; intro: string; rows: readonly (readonly [string, string])[]; cta: string; theme: string }) {
  const [open, setOpen] = useState<number | null>(0);
  return <div className="reveal mb-[clamp(5rem,8vw,7rem)] last:mb-0" data-reveal style={{ "--reveal-delay": `${index * 50}ms` } as React.CSSProperties}><article className="grid grid-cols-2 items-center gap-x-8 max-[900px]:grid-cols-1 max-[900px]:gap-10">
    <div className={`min-w-0 max-w-[31rem] ${index % 2 ? "min-[901px]:order-2 min-[901px]:justify-self-end" : ""}`}><h3 className="m-0 text-heading-md">{title}</h3><p className="mt-4 max-w-[46ch] text-body-lg text-muted">{intro}</p>
      <div className="relative mt-8">{rows.map(([label, copy], row) => { const panelId = `offer-${index}-${row}`; const buttonId = `${panelId}-button`; const expanded = open === row; return <div className={`relative before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:z-1 before:h-px before:bg-[var(--ds-gray-alpha-200)] before:content-[''] last:after:pointer-events-none last:after:absolute last:after:inset-x-0 last:after:bottom-0 last:after:z-1 last:after:h-px last:after:bg-[var(--ds-gray-alpha-200)] last:after:content-[''] ${expanded ? "[&_.faq-toggle_svg]:rotate-90" : ""}`} key={label}><h4 className="m-0"><button id={buttonId} className="grid min-h-16 w-full cursor-pointer grid-cols-[minmax(0,1fr)_1.5rem] items-center gap-4 rounded-md bg-transparent px-2 py-4 text-left transition-colors duration-150" type="button" aria-expanded={expanded} aria-controls={panelId} onClick={() => setOpen(expanded ? null : row)}><span className="text-body font-semibold">{label}</span><span className="faq-toggle grid size-6 place-items-center" aria-hidden="true"><ChevronRight className="size-4.5 transition-transform duration-200 ease-[cubic-bezier(.4,0,.2,1)] motion-reduce:transition-none" strokeWidth={1.7} /></span></button></h4><CollapsePanel id={panelId} labelledBy={buttonId} expanded={expanded}><p className="m-0 max-w-[44ch] px-2 pb-5 text-body text-muted">{copy}</p></CollapsePanel></div>; })}</div>
      <CtaButton href={index === 3 ? `${localizePath("/solutions", locale)}#partnership` : localizePath("/solutions", locale)} className="mt-6">{cta}</CtaButton>
    </div>
    <div className={`relative grid aspect-[1.1/1] min-h-[24rem] overflow-hidden rounded-card p-10 shadow-[var(--ds-shadow-border)] [&>*]:relative ${theme} ${index % 2 ? "min-[901px]:order-1" : ""} max-[900px]:mx-auto max-[900px]:aspect-[4/3] max-[900px]:min-h-0 max-[900px]:w-full max-[900px]:max-w-[44rem] max-[600px]:h-[clamp(19rem,68vw,25rem)] max-[600px]:aspect-auto max-[600px]:p-4`} aria-hidden="true">
      {index === 0 ? <FoundationBlueprintAnimation locale={locale} /> : null}
      {index === 1 ? <OptimizationSearchAnimation locale={locale} /> : null}
      {index === 2 ? <CampaignGrowthAnimation locale={locale} /> : null}
      {index === 3 ? <PartnershipRoadmapAnimation locale={locale} /> : null}
    </div>
  </article></div>;
}

const OPTIMIZATION_FLIGHT_DURATION = 2.2;
const WINNER_CONFETTI_OPTIONS = {
  particleCount: 58,
  angle: 90,
  spread: 82,
  startVelocity: 28,
  decay: 0.92,
  gravity: 0.85,
  scalar: 0.72,
  ticks: 105,
  origin: { x: 0.5, y: 0.58 },
  colors: ["#e6b85c", "#e9c7a0", "#afc3d5", "#d47a4a", "#95b59a"],
};

function OptimizationSearchAnimation({ locale }: { locale: Locale }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const resultsViewportRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.55 });
  const prefersReducedMotion = useReducedMotion();
  const copy = offersContent[locale].optimizationAnimation;
  const query = copy.query;
  const [typedLength, setTypedLength] = useState(prefersReducedMotion ? query.length : 0);
  const [resultsVisible, setResultsVisible] = useState(prefersReducedMotion);
  const [flightStarted, setFlightStarted] = useState(Boolean(prefersReducedMotion));
  const [currentRank, setCurrentRank] = useState(prefersReducedMotion ? 1 : 20);
  const [resultsHeight, setResultsHeight] = useState(0);

  useEffect(() => {
    const viewport = resultsViewportRef.current;
    if (!viewport) return;

    const measure = () => setResultsHeight(viewport.getBoundingClientRect().height);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;
    if (prefersReducedMotion) {
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    const typingDelay = 26;

    for (let character = 1; character <= query.length; character += 1) {
      timers.push(setTimeout(() => setTypedLength(character), character * typingDelay));
    }

    const resultsStart = query.length * typingDelay + 280;
    timers.push(setTimeout(() => setResultsVisible(true), resultsStart));
    const flightStart = resultsStart + 440;
    timers.push(setTimeout(() => setFlightStarted(true), flightStart));
    for (let rank = 19; rank >= 1; rank -= 1) {
      const rankStep = 20 - rank;
      const rankProgress = rankStep / 19;
      const easedDelay = rankProgress < 0.5
        ? Math.pow(rankProgress / 8, 0.25)
        : 1 - Math.pow((1 - rankProgress) / 8, 0.25);
      timers.push(setTimeout(() => setCurrentRank(rank), flightStart + easedDelay * OPTIMIZATION_FLIGHT_DURATION * 1000));
    }

    return () => timers.forEach(clearTimeout);
  }, [isInView, prefersReducedMotion, query]);

  const resultNames = [
    "Nova Growth", "Brightline Digital", "Ascend Lab", "Northstar Digital", "Signal House",
    "Orbit Studio", "Growthline", "Peak & Co.", "Kindred Digital", "Verve Labs",
    "Momentum", "Scale Works", "Foundry Digital", "Launchpad", "Metric Studio",
    "Horizon Growth", "Pathway", "Good Signal", "Elevate",
  ];
  const resultSites = [
    "novagrowth.co", "brightline.digital", "ascendlab.co", "northstar.digital", "signalhouse.co",
    "orbit.studio", "growthline.co", "peakandco.com", "kindred.digital", "vervelabs.co",
    "momentum.studio", "scaleworks.co", "foundry.digital", "launchpad.agency", "metric.studio",
    "horizongrowth.co", "pathway.digital", "goodsignal.co", "elevate.agency",
  ];
  const resultDescriptions = copy.descriptions;
  const reducedMotion = Boolean(prefersReducedMotion);
  const visibleTypedLength = reducedMotion ? query.length : typedLength;
  const visibleResults = reducedMotion || resultsVisible;
  const visibleFlightStarted = reducedMotion || flightStarted;
  const visibleRank = reducedMotion ? 1 : currentRank;
  const resultsReady = visibleResults && resultsHeight > 0;
  const winnerLanded = visibleRank === 1;
  const resultGap = 6;
  const baseResultHeight = Math.min(70, Math.max(0, (resultsHeight - resultGap * 3) / 4));
  const resultStride = baseResultHeight + resultGap;
  const resultStackOffset = resultStride * 16;
  const winnerStartOffset = resultStride * 3;

  return <div ref={containerRef} className="grid h-full min-h-0 w-full grid-rows-[auto_1fr]">
    <div>
      <div className="flex min-h-11 items-center gap-3 rounded-full border border-[var(--ds-gray-alpha-200)] bg-white px-4 shadow-[0_2px_8px_rgb(0_0_0/.06)] max-[430px]:min-h-9 max-[430px]:gap-2 max-[430px]:px-3">
        <Search className="size-4 shrink-0 text-[var(--ds-gray-700)]" strokeWidth={1.8} />
        <span className="min-w-0 truncate text-[clamp(.72rem,1.25vw,.875rem)] text-[var(--ds-gray-1000)]">
          {query.slice(0, visibleTypedLength)}
          {visibleTypedLength < query.length ? <motion.span className="ml-px inline-block h-[1em] w-px translate-y-[.12em] bg-[var(--ds-blue-700)]" animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.7, repeat: Infinity }} /> : null}
        </span>
      </div>
      <motion.div className="mt-3 flex items-center justify-between px-1 text-[clamp(.58rem,1vw,.7rem)] text-[var(--ds-gray-700)] max-[430px]:mt-2" initial={false} animate={{ opacity: visibleResults ? 1 : 0 }} transition={{ duration: 0.24 }}>
        <span>{copy.resultLabel}</span>
        <span>{copy.rankLabel}</span>
      </motion.div>
    </div>

    <motion.div ref={resultsViewportRef} className="relative mt-4 min-h-0 [container-type:size] max-[430px]:mt-2" initial={false} animate={{ opacity: resultsReady ? 1 : 0, y: resultsReady ? 0 : 6 }} transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}>
      <div className="absolute inset-0 overflow-hidden">
      <motion.ol
        className="absolute inset-x-0 top-0 m-0 grid list-none gap-1.5 p-0 transform-gpu will-change-transform [backface-visibility:hidden]"
        initial={false}
        animate={{ y: visibleFlightStarted ? 0 : -resultStackOffset }}
        transition={{ y: { duration: reducedMotion || !visibleFlightStarted ? 0 : OPTIMIZATION_FLIGHT_DURATION, ease: [0.9, 0, 0.1, 1] } }}
      >
        {Array.from({ length: 20 }, (_, index) => {
          const placement = visibleRank === 1 && index === 1 ? "bg-[#f3f6fb] shadow-[inset_0_0_0_1px_#cbd4e1]" : visibleRank === 1 && index === 2 ? "bg-[#fff5ef] shadow-[inset_0_0_0_1px_#efb993]" : "bg-white shadow-[inset_0_0_0_1px_var(--ds-gray-alpha-200)]";
          const badge = visibleRank === 1 && index === 1 ? "bg-[#dce4ef] text-[#18345f] shadow-[inset_0_0_0_1px_#bcc8d8]" : visibleRank === 1 && index === 2 ? "bg-[#f5dfd2] text-[#8f3e1c] shadow-[inset_0_0_0_1px_#e8b99f]" : "bg-[var(--ds-gray-100)] text-[var(--ds-gray-700)]";
          const primaryText = visibleRank === 1 && index === 1 ? "text-[#18345f]" : visibleRank === 1 && index === 2 ? "text-[#49372e]" : "text-[var(--ds-gray-900)]";
          const secondaryText = visibleRank === 1 && index === 1 ? "text-[#53667f]" : visibleRank === 1 && index === 2 ? "text-[#76594b]" : "text-[var(--ds-gray-800)]";
          return <li
            className={`grid grid-cols-[minmax(0,1fr)_2.25rem] items-center gap-3 rounded-lg px-3 py-2 transition-[height,background,box-shadow,opacity] duration-500 ease-[cubic-bezier(.16,1,.3,1)] max-[430px]:py-1 ${placement} ${index === 19 || (winnerLanded && index === 0) ? "opacity-0" : ""}`}
            style={{ height: baseResultHeight }}
            key={index}
          >
          <span className="min-w-0">
            <span className="flex min-w-0 items-baseline gap-2 max-[430px]:gap-1.5">
              <span className={`min-w-0 truncate text-[clamp(.76rem,1.3vw,.92rem)] leading-tight font-semibold max-[430px]:text-[.68rem] ${primaryText}`}>{resultNames[index] ?? "Webpilot"}</span>
              <span className={`max-w-[45%] shrink-0 truncate text-[clamp(.55rem,.85vw,.64rem)] leading-tight font-normal max-[430px]:max-w-[42%] max-[430px]:text-[.5rem] ${secondaryText}`}>{resultSites[index] ?? "webpilot.studio"}</span>
            </span>
            <span className={`mt-1 block truncate text-[clamp(.62rem,1vw,.72rem)] leading-tight max-[430px]:hidden ${secondaryText}`}>{resultDescriptions[index % resultDescriptions.length]}</span>
          </span>
          <span className={`grid size-9 place-items-center rounded-full font-mono text-[clamp(.62rem,1vw,.72rem)] tabular-nums transition-colors duration-300 max-[430px]:size-8 ${badge}`}>{index + 1}</span>
        </li>;
        })}
      </motion.ol>
      </div>

      <motion.div
        className="absolute inset-x-0 top-0 z-10 transform-gpu will-change-transform [backface-visibility:hidden]"
        initial={false}
        animate={{ y: visibleFlightStarted ? 0 : winnerStartOffset }}
        style={{ height: baseResultHeight }}
        transition={{
          y: { duration: reducedMotion || !visibleFlightStarted ? 0 : OPTIMIZATION_FLIGHT_DURATION, ease: [0.9, 0, 0.1, 1] },
        }}
      >
        <div className={`absolute inset-0 z-10 rounded-lg border transition-[background,border-color] duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${winnerLanded ? "border-[#e3cfaa] bg-[#fdf7eb]" : "border-[var(--ds-gray-alpha-300)] bg-white"}`} />
        {winnerLanded && !prefersReducedMotion ? <Confetti
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-12 -inset-y-14 z-40 h-[calc(100%+7rem)] w-[calc(100%+6rem)]"
          options={WINNER_CONFETTI_OPTIONS}
        /> : null}
        <div className="absolute inset-0 z-30 grid grid-cols-[minmax(0,1fr)_2.25rem] items-center gap-3 px-3 py-2 transition-[padding] duration-500 ease-[cubic-bezier(.16,1,.3,1)] max-[430px]:py-1">
          <div className="min-w-0">
            <div className="flex min-w-0 items-baseline gap-2">
              <span className={`truncate font-semibold transition-[color,font-size] duration-300 max-[430px]:text-[.7rem] ${winnerLanded ? "text-[clamp(.9rem,1.6vw,1.08rem)] text-[#342a1f]" : "text-[clamp(.76rem,1.3vw,.92rem)] text-[var(--ds-gray-1000)]"}`}>Webpilot</span>
              <span className={`truncate transition-[color,font-size] duration-300 max-[430px]:text-[.55rem] ${winnerLanded ? "text-[clamp(.64rem,1vw,.74rem)] text-[#796b58]" : "text-[clamp(.62rem,1vw,.72rem)] text-[var(--ds-gray-800)]"}`}>webpilot.studio</span>
            </div>
            <p className={`mt-1 mb-0 truncate leading-tight transition-[color,font-size] duration-300 max-[430px]:hidden ${winnerLanded ? "text-[clamp(.64rem,1vw,.74rem)] text-[#796b58]" : "text-[clamp(.62rem,1vw,.72rem)] text-[var(--ds-gray-800)]"}`}>{copy.winnerDescription}</p>
          </div>
          <span className={`grid size-9 place-items-center rounded-full font-mono text-[clamp(.68rem,1.1vw,.78rem)] font-medium tabular-nums transition-[color,background,box-shadow] duration-300 max-[430px]:size-8 ${winnerLanded ? "bg-[#f0dfbf] text-[#5f4727] shadow-[inset_0_0_0_1px_#d4b984]" : "bg-[var(--ds-gray-100)] text-[var(--ds-gray-800)]"}`}>
            {visibleRank}
          </span>
        </div>
      </motion.div>
    </motion.div>
  </div>;
}
