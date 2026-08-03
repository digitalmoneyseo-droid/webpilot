"use client";

import { Globe2, Smartphone } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { OFFER_EASE_OUT, OFFER_VIEWPORT } from "@/components/offer-animations/motion-tokens";
import type { WebExperienceAnimationCopy } from "@/i18n/services";

export function WebExperienceAnimation({ copy }: { copy: WebExperienceAnimationCopy }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, OFFER_VIEWPORT);
  const prefersReducedMotion = useReducedMotion();
  const noMotion = Boolean(prefersReducedMotion);
  const active = noMotion || isInView;
  const duration = noMotion ? 0 : 0.5;

  return (
    <motion.div
      ref={containerRef}
      className="h-full min-h-0 w-full"
      initial={false}
      animate={active ? "visible" : "hidden"}
    >
      <div className="relative h-full min-h-0 overflow-hidden rounded-xl bg-[var(--ds-blue-100)] p-[clamp(.75rem,2.4vw,1.25rem)] shadow-[inset_0_0_0_1px_var(--ds-blue-300)]">
        <div className="absolute inset-0 opacity-45 [background-image:linear-gradient(to_right,var(--ds-blue-300)_1px,transparent_1px),linear-gradient(to_bottom,var(--ds-blue-300)_1px,transparent_1px)] [background-size:28px_28px]" />

        <div className="relative grid h-full min-h-0 grid-cols-[minmax(0,1fr)_minmax(4.5rem,.3fr)] items-end gap-[clamp(.55rem,2vw,1rem)]">
          <motion.div
            className="flex h-[88%] min-h-0 min-w-0 flex-col overflow-hidden rounded-[clamp(.6rem,1.4vw,.9rem)] bg-white shadow-[0_10px_30px_rgb(35_104_232/.14),inset_0_0_0_1px_var(--ds-gray-alpha-200)]"
            variants={{
              hidden: { opacity: 0, transform: "translate3d(-16px, 10px, 0) scale(.98)" },
              visible: { opacity: 1, transform: "translate3d(0, 0, 0) scale(1)" },
            }}
            transition={{ duration, ease: OFFER_EASE_OUT }}
          >
            <div className="flex h-9 shrink-0 items-center gap-2 border-b border-[var(--ds-gray-alpha-200)] px-3 text-[var(--ds-gray-700)]">
              <Globe2 className="size-3.5 shrink-0" strokeWidth={1.8} aria-hidden="true" />
              <span className="truncate text-[clamp(.5rem,.8vw,.62rem)]">webpilot.studio</span>
            </div>
            <div className="grid min-h-0 flex-1 grid-cols-[1.1fr_.9fr] gap-3 p-[clamp(.65rem,1.8vw,1rem)] max-[430px]:grid-cols-1">
              <div className="flex min-w-0 flex-col justify-center">
                <motion.span
                  className="mb-2 h-1.5 w-12 rounded-full bg-[var(--ds-blue-600)]"
                  variants={{ hidden: { opacity: 0, scaleX: 0 }, visible: { opacity: 1, scaleX: 1 } }}
                  style={{ transformOrigin: "left" }}
                  transition={{ delay: noMotion ? 0 : 0.3, duration, ease: OFFER_EASE_OUT }}
                />
                <motion.strong
                  className="block max-w-[11ch] text-[clamp(.72rem,1.55vw,1.05rem)] leading-[1.08] font-semibold tracking-[-.035em] text-[var(--ds-gray-1000)]"
                  variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ delay: noMotion ? 0 : 0.38, duration, ease: OFFER_EASE_OUT }}
                >
                  {copy.headline}
                </motion.strong>
                <motion.span
                  className="mt-3 inline-flex w-fit rounded-full bg-[var(--ds-gray-1000)] px-3 py-1.5 text-[clamp(.48rem,.75vw,.58rem)] font-medium text-white"
                  variants={{ hidden: { opacity: 0, y: 6 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ delay: noMotion ? 0 : 0.52, duration, ease: OFFER_EASE_OUT }}
                >
                  {copy.cta}
                </motion.span>
              </div>
              <motion.div
                className="relative min-h-0 overflow-hidden rounded-lg bg-[var(--ds-gray-100)]"
                variants={{ hidden: { opacity: 0, scale: 0.96 }, visible: { opacity: 1, scale: 1 } }}
                transition={{ delay: noMotion ? 0 : 0.25, duration: noMotion ? 0 : 0.62, ease: OFFER_EASE_OUT }}
              >
                <div className="absolute inset-x-[14%] top-[14%] h-[46%] rounded-md bg-[var(--ds-blue-600)] opacity-88" />
                <div className="absolute inset-x-[22%] bottom-[16%] grid grid-cols-3 gap-1.5">
                  {[0, 1, 2].map((item) => (
                    <motion.span
                      className="aspect-square rounded-sm bg-white shadow-[0_2px_6px_rgb(0_0_0/.08)]"
                      key={item}
                      variants={{ hidden: { opacity: 0, y: 6 }, visible: { opacity: 1, y: 0 } }}
                      transition={{ delay: noMotion ? 0 : 0.62 + item * 0.08, duration: noMotion ? 0 : 0.3, ease: OFFER_EASE_OUT }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
            <span className="border-t border-[var(--ds-gray-alpha-200)] px-3 py-1.5 text-[clamp(.46rem,.72vw,.56rem)] text-[var(--ds-gray-700)]">
              {copy.desktopLabel}
            </span>
          </motion.div>

          <motion.div
            className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden rounded-[clamp(.8rem,2vw,1.2rem)] border-[3px] border-[var(--ds-gray-1000)] bg-white shadow-[0_10px_28px_rgb(0_0_0/.16)]"
            variants={{
              hidden: { opacity: 0, transform: "translate3d(14px, 12px, 0) scale(.96)" },
              visible: { opacity: 1, transform: "translate3d(0, 0, 0) scale(1)" },
            }}
            transition={{ delay: noMotion ? 0 : 0.18, duration: noMotion ? 0 : 0.58, ease: OFFER_EASE_OUT }}
          >
            <div className="flex h-8 shrink-0 items-center justify-center border-b border-[var(--ds-gray-alpha-200)]">
              <Smartphone className="size-3.5 text-[var(--ds-gray-700)]" strokeWidth={1.8} aria-hidden="true" />
            </div>
            <div className="flex min-h-0 flex-1 flex-col gap-2 p-2.5">
              <span className="h-[38%] rounded-md bg-[var(--ds-blue-600)]" />
              <span className="h-2 w-[78%] rounded-full bg-[var(--ds-gray-300)]" />
              <span className="h-2 w-[58%] rounded-full bg-[var(--ds-gray-200)]" />
              <span className="mt-auto h-7 rounded-full bg-[var(--ds-gray-1000)]" />
            </div>
            <span className="border-t border-[var(--ds-gray-alpha-200)] px-2 py-1.5 text-center text-[clamp(.44rem,.7vw,.54rem)] text-[var(--ds-gray-700)]">
              {copy.mobileLabel}
            </span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
