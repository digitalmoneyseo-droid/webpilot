"use client";

import { Check } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import type { Locale } from "@/lib/i18n";
import { OFFER_EASE_IN_OUT, OFFER_EASE_OUT, OFFER_VIEWPORT } from "@/components/offer-animations/motion-tokens";

const workstreamColors = ["var(--ds-blue-700)", "#6b7280", "var(--ds-gray-1000)"];
const labelTransforms = [
  "translate3d(-14px, 0, 0)",
  "translate3d(12px, 0, 0)",
  "translate3d(-8px, 0, 0)",
];

export function PartnershipRoadmapAnimation({ locale }: { locale: Locale }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, OFFER_VIEWPORT);
  const prefersReducedMotion = useReducedMotion();
  const noMotion = Boolean(prefersReducedMotion);
  const active = noMotion || isInView;
  const workstreams = locale === "de" ? ["Fundament", "Optimierung", "Kampagne"] : ["Foundation", "Optimization", "Campaign"];
  const stages = locale === "de" ? ["Strategie", "Umsetzung", "Lernen"] : ["Strategy", "Delivery", "Learning"];

  return (
    <motion.div
      ref={containerRef}
      className="grid h-full min-h-0 w-full grid-rows-[auto_1fr] gap-3"
      initial={false}
      animate={active ? "visible" : "hidden"}
    >
      <div className="flex min-w-0 items-center justify-between gap-3">
        <span className="truncate text-[clamp(.62rem,1vw,.72rem)] font-medium text-[var(--ds-gray-700)]">
          {locale === "de" ? "Gemeinsame Roadmap" : "Shared roadmap"}
        </span>
        <motion.span
          className="flex shrink-0 items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[clamp(.54rem,.9vw,.64rem)] font-medium text-[var(--ds-gray-800)] shadow-[inset_0_0_0_1px_var(--ds-gray-alpha-200)]"
          variants={{
            hidden: { opacity: 0, transform: "translate3d(0, 4px, 0)" },
            visible: { opacity: 1, transform: "translate3d(0, 0, 0)" },
          }}
          transition={{ delay: noMotion ? 0 : 1.72, duration: noMotion ? 0 : 0.24, ease: OFFER_EASE_OUT }}
        >
          <Check className="size-3.5 text-[var(--ds-blue-700)]" strokeWidth={2} />
          {locale === "de" ? "Im Takt" : "In sync"}
        </motion.span>
      </div>

      <motion.div
        className="grid min-h-0 grid-cols-[minmax(4.8rem,.72fr)_2fr] grid-rows-[auto_1fr] gap-x-3 overflow-hidden rounded-xl bg-white p-4 shadow-[inset_0_0_0_1px_var(--ds-gray-alpha-200)] max-[430px]:grid-cols-[4.6rem_2fr] max-[430px]:gap-x-2 max-[430px]:p-3"
        variants={{
          hidden: { opacity: 0, transform: "translate3d(0, 6px, 0) scale(.99)" },
          visible: { opacity: 1, transform: "translate3d(0, 0, 0) scale(1)" },
        }}
        transition={{ duration: noMotion ? 0 : 0.32, ease: OFFER_EASE_OUT }}
      >
        <span />
        <div className="grid grid-cols-3 text-center text-[clamp(.48rem,.85vw,.62rem)] font-medium text-[var(--ds-gray-700)]">
          {stages.map((stage) => <span className="truncate px-1" key={stage}>{stage}</span>)}
        </div>

        <div className="grid min-h-0 grid-rows-3 gap-2 py-2 max-[430px]:gap-1.5">
          {workstreams.map((workstream, index) => (
            <motion.div
              key={workstream}
              className="flex min-h-0 items-center gap-2 rounded-lg bg-[var(--ds-gray-100)] px-2.5 text-[clamp(.5rem,.9vw,.66rem)] font-medium text-[var(--ds-gray-900)] max-[430px]:px-2"
              variants={{
                hidden: { opacity: 0, transform: labelTransforms[index] },
                visible: { opacity: 1, transform: "translate3d(0, 0, 0)" },
              }}
              transition={{ delay: noMotion ? 0 : 0.2 + index * 0.07, duration: noMotion ? 0 : 0.36, ease: OFFER_EASE_OUT }}
            >
              <span className="size-1.5 shrink-0 rounded-full" style={{ background: workstreamColors[index] }} />
              <span className="min-w-0 truncate">{workstream}</span>
            </motion.div>
          ))}
        </div>

        <div className="relative grid min-h-0 grid-rows-3 gap-2 py-2 max-[430px]:gap-1.5">
          {workstreams.map((workstream, index) => (
            <div className="relative grid min-h-0 grid-cols-3 items-center" key={workstream}>
              <div className="absolute right-[16.666%] left-[16.666%] top-1/2 h-px -translate-y-1/2 bg-[var(--ds-gray-300)]" />
              <motion.div
                className="absolute right-[16.666%] left-[16.666%] top-1/2 h-0.5 origin-left"
                style={{ background: workstreamColors[index] }}
                variants={{
                  hidden: { transform: "translate3d(0, -50%, 0) scaleX(0)" },
                  visible: { transform: "translate3d(0, -50%, 0) scaleX(1)" },
                }}
                transition={{ delay: noMotion ? 0 : 0.72, duration: noMotion ? 0 : 1.05, ease: OFFER_EASE_IN_OUT }}
              />
              {[0, 1, 2].map((node) => (
                <span
                  className="relative z-1 mx-auto size-2 rounded-full bg-white shadow-[0_0_0_1px_var(--ds-gray-300)]"
                  key={node}
                />
              ))}
            </div>
          ))}

          <motion.div
            className="pointer-events-none absolute inset-y-2 left-0 z-2 grid w-1/3 grid-rows-3 gap-2 max-[430px]:gap-1.5"
            initial={false}
            animate={{
              transform: active
                ? noMotion
                  ? "translate3d(200%, 0, 0)"
                  : ["translate3d(0%, 0, 0)", "translate3d(100%, 0, 0)", "translate3d(100%, 0, 0)", "translate3d(200%, 0, 0)"]
                : "translate3d(0%, 0, 0)",
            }}
            transition={{
              delay: noMotion ? 0 : 0.68,
              duration: noMotion ? 0 : 1.08,
              times: [0, 0.43, 0.56, 1],
              ease: OFFER_EASE_IN_OUT,
            }}
          >
            {workstreams.map((workstream, index) => (
              <span
                className="m-auto size-3.5 rounded-full border-2 border-white shadow-[0_1px_4px_rgb(0_0_0/.2)]"
                style={{ background: workstreamColors[index] }}
                key={workstream}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
