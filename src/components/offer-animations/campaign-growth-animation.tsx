"use client";

import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { useEffect, useMemo, useRef } from "react";
import type { Locale } from "@/lib/i18n";
import { OFFER_EASE_OUT, OFFER_VIEWPORT } from "@/components/offer-animations/motion-tokens";
import { offersContent } from "@/i18n/offers";

const FINAL_INQUIRIES = 286;
const GRAPH_LINE = "M 12 207 C 31 194 44 181 64 188 C 82 194 97 164 116 153 C 135 142 149 161 169 140 C 189 118 202 126 221 111 C 241 95 252 107 272 83 C 292 59 306 76 326 52 C 346 29 361 44 380 27 C 393 16 402 19 408 12";
const GRAPH_AREA = `${GRAPH_LINE} L 408 224 L 12 224 Z`;

export function CampaignGrowthAnimation({ locale }: { locale: Locale }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, OFFER_VIEWPORT);
  const prefersReducedMotion = useReducedMotion();
  const noMotion = Boolean(prefersReducedMotion);
  const active = noMotion || isInView;
  const copy = offersContent[locale].campaignAnimation;
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
          <div className="font-mono font-medium tracking-[-.06em] tabular-nums text-[var(--ds-gray-1000)] leading-none">
            <motion.span className="text-[clamp(1.8rem,4vw,2.7rem)]" style={{ verticalAlign: "bottom" }}>{displayCount}</motion.span>
            <motion.span
              className="ml-2 text-[clamp(.95rem,1.9vw,1.3rem)] tracking-[-.01em] text-[#19a55d]"
              style={{ verticalAlign: "bottom" }}
              initial={false}
              animate={{ opacity: active ? 1 : 0, transform: active ? "translate3d(0, 0, 0)" : "translate3d(0, 4px, 0)" }}
              transition={{ delay: noMotion ? 0 : 1.1, duration: noMotion ? 0 : 0.3, ease: OFFER_EASE_OUT }}
            >
              +67%
            </motion.span>
          </div>
          <span className="mt-2 block text-[clamp(.8rem,1.3vw,1rem)] font-medium text-[var(--ds-gray-700)]">
            {copy.metricLabel}
          </span>
        </div>
      </div>

      <div className="relative min-h-0">
        <svg
          className="size-full overflow-visible"
          viewBox="0 0 410 226"
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
            initial={false}
            animate={{ opacity: active ? 1 : 0 }}
            transition={{ delay: noMotion ? 0 : 1.35, duration: noMotion ? 0 : 0.2 }}
          />
        </svg>
      </div>
    </div>
  );
}
