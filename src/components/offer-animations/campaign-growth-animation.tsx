"use client";

import { ArrowUpRight } from "lucide-react";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { useEffect, useMemo, useRef } from "react";
import type { Locale } from "@/lib/i18n";
import { OFFER_EASE_OUT, OFFER_VIEWPORT } from "@/components/offer-animations/motion-tokens";

const FINAL_INQUIRIES = 286;
const GRAPH_LINE = "M 12 207 C 31 194 44 181 64 188 C 82 194 97 164 116 153 C 135 142 149 161 169 140 C 189 118 202 126 221 111 C 241 95 252 107 272 83 C 292 59 306 76 326 52 C 346 29 361 44 380 27 C 393 16 402 19 408 12";
const GRAPH_AREA = `${GRAPH_LINE} L 408 224 L 12 224 Z`;

export function CampaignGrowthAnimation({ locale }: { locale: Locale }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, OFFER_VIEWPORT);
  const prefersReducedMotion = useReducedMotion();
  const noMotion = Boolean(prefersReducedMotion);
  const active = noMotion || isInView;
  const count = useMotionValue(FINAL_INQUIRIES);
  const formatter = useMemo(
    () => new Intl.NumberFormat(locale === "de" ? "de-DE" : "en-US"),
    [locale],
  );
  const displayCount = useTransform(count, (latest) => formatter.format(Math.round(latest)));

  useEffect(() => {
    if (noMotion) {
      count.set(FINAL_INQUIRIES);
      return;
    }
    if (!isInView) {
      count.set(0);
      return;
    }

    count.set(0);
    const controls = animate(count, FINAL_INQUIRIES, {
      delay: 0.18,
      duration: 1.15,
      ease: OFFER_EASE_OUT,
    });
    return () => controls.stop();
  }, [count, isInView, noMotion]);

  return (
    <div ref={containerRef} className="grid h-full min-h-0 w-full grid-rows-[auto_1fr] gap-3">
      <div className="flex min-w-0 items-start justify-between gap-4">
        <div className="min-w-0">
          <strong className="flex min-w-[3.4ch] items-baseline font-mono text-[clamp(1.8rem,4vw,2.7rem)] leading-none font-medium tracking-[-.06em] tabular-nums text-[var(--ds-gray-1000)]">
            <motion.span>{displayCount}</motion.span>
          </strong>
          <span className="mt-1.5 block text-[clamp(.58rem,1vw,.72rem)] font-medium text-[var(--ds-gray-700)]">
            {locale === "de" ? "neue qualifizierte Anfragen" : "new qualified inquiries"}
          </span>
        </div>
        <motion.span
          className="flex shrink-0 items-center gap-1 rounded-full bg-[var(--ds-blue-100)] px-2.5 py-1 text-[clamp(.52rem,.85vw,.62rem)] font-medium text-[var(--ds-blue-800)]"
          initial={false}
          animate={{ opacity: active ? 1 : 0, transform: active ? "translate3d(0, 0, 0)" : "translate3d(0, 4px, 0)" }}
          transition={{ delay: noMotion ? 0 : 1.1, duration: noMotion ? 0 : 0.24, ease: OFFER_EASE_OUT }}
        >
          <ArrowUpRight className="size-3.5" strokeWidth={1.8} />
          {locale === "de" ? "Aufwärtstrend" : "Upward trend"}
        </motion.span>
      </div>

      <div className="relative min-h-0 overflow-hidden rounded-xl bg-[var(--ds-gray-100)] p-3 shadow-[inset_0_0_0_1px_var(--ds-gray-alpha-200)] max-[430px]:p-2">
        <svg
          className="size-full overflow-visible"
          viewBox="0 0 420 230"
          preserveAspectRatio="xMidYMid meet"
          focusable="false"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="campaign-growth-area" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--ds-blue-700)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="var(--ds-blue-700)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[36, 82, 128, 174, 220].map((y) => (
            <line
              key={y}
              x1="12"
              x2="408"
              y1={y}
              y2={y}
              stroke="var(--ds-gray-alpha-200)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          ))}

          <motion.path
            d={GRAPH_AREA}
            fill="url(#campaign-growth-area)"
            initial={false}
            animate={{ opacity: active ? 1 : 0 }}
            transition={{ delay: noMotion ? 0 : 0.82, duration: noMotion ? 0 : 0.38 }}
          />
          <motion.path
            d={GRAPH_LINE}
            fill="none"
            stroke="var(--ds-blue-700)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            vectorEffect="non-scaling-stroke"
            initial={false}
            animate={{ opacity: active ? 1 : 0.35, pathLength: active ? 1 : 0 }}
            transition={{ delay: noMotion ? 0 : 0.12, duration: noMotion ? 0 : 1.5, ease: OFFER_EASE_OUT }}
          />
          <motion.circle
            cx="408"
            cy="12"
            r="5"
            fill="var(--ds-background-100)"
            stroke="var(--ds-blue-700)"
            strokeWidth="3"
            vectorEffect="non-scaling-stroke"
            initial={false}
            animate={{ opacity: active ? 1 : 0 }}
            transition={{ delay: noMotion ? 0 : 1.35, duration: noMotion ? 0 : 0.2 }}
          />
        </svg>
        <div className="pointer-events-none absolute inset-x-4 bottom-2 flex justify-between font-mono text-[.48rem] text-[var(--ds-gray-700)] max-[430px]:inset-x-3">
          <span>01</span>
          <span>04</span>
          <span>08</span>
          <span>12</span>
        </div>
      </div>
    </div>
  );
}
