"use client";

import { Bot, Check, FileInput, Inbox, Send, Sparkles, UserCheck } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { OFFER_EASE_IN_OUT, OFFER_EASE_OUT, OFFER_VIEWPORT } from "@/components/offer-animations/motion-tokens";
import type { AutomationAnimationCopy } from "@/i18n/services";

const inputIcons = [FileInput, Inbox, Bot] as const;
const outputIcons = [UserCheck, Check, Send] as const;

export function AutomationFlowAnimation({ copy }: { copy: AutomationAnimationCopy }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, OFFER_VIEWPORT);
  const prefersReducedMotion = useReducedMotion();
  const noMotion = Boolean(prefersReducedMotion);
  const active = noMotion || isInView;

  return (
    <motion.div
      ref={containerRef}
      className="grid h-full min-h-0 w-full grid-rows-[auto_1fr] gap-3"
      initial={false}
      animate={active ? "visible" : "hidden"}
    >
      <div className="flex min-w-0 items-center justify-between gap-3">
        <span className="truncate text-[clamp(.62rem,1vw,.72rem)] font-medium text-[var(--ds-gray-700)]">
          {copy.title}
        </span>
        <motion.span
          className="flex shrink-0 items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[clamp(.54rem,.9vw,.64rem)] font-medium text-[var(--ds-blue-800)] shadow-[inset_0_0_0_1px_var(--ds-gray-alpha-200)]"
          variants={{ hidden: { opacity: 0, y: 4 }, visible: { opacity: 1, y: 0 } }}
          transition={{ delay: noMotion ? 0 : 1.35, duration: noMotion ? 0 : 0.25, ease: OFFER_EASE_OUT }}
        >
          <Check className="size-3.5" strokeWidth={2} aria-hidden="true" />
          {copy.status}
        </motion.span>
      </div>

      <motion.div
        className="relative grid min-h-0 grid-cols-[minmax(4.8rem,1fr)_minmax(5.5rem,.82fr)_minmax(4.8rem,1fr)] items-center gap-[clamp(.45rem,2vw,1rem)] overflow-hidden rounded-xl bg-white p-[clamp(.75rem,2.8vw,1.35rem)] shadow-[inset_0_0_0_1px_var(--ds-gray-alpha-200)]"
        variants={{ hidden: { opacity: 0, scale: 0.99 }, visible: { opacity: 1, scale: 1 } }}
        transition={{ duration: noMotion ? 0 : 0.35, ease: OFFER_EASE_OUT }}
      >
        <div className="pointer-events-none absolute inset-x-[19%] top-1/2 h-px -translate-y-1/2 bg-[var(--ds-gray-300)]" />
        <motion.div
          className="pointer-events-none absolute top-1/2 left-[19%] h-0.5 w-[18%] origin-left -translate-y-1/2 bg-[var(--ds-blue-700)]"
          variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
          transition={{ delay: noMotion ? 0 : 0.35, duration: noMotion ? 0 : 0.52, ease: OFFER_EASE_IN_OUT }}
        />
        <motion.div
          className="pointer-events-none absolute top-1/2 right-[19%] h-0.5 w-[18%] origin-left -translate-y-1/2 bg-[var(--ds-blue-700)]"
          variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
          transition={{ delay: noMotion ? 0 : 0.82, duration: noMotion ? 0 : 0.52, ease: OFFER_EASE_IN_OUT }}
        />

        <div className="relative z-1 grid min-h-0 gap-2.5">
          {copy.inputs.map((label, index) => {
            const Icon = inputIcons[index]!;
            return (
              <motion.div
                className="flex min-w-0 items-center gap-2 rounded-lg bg-[var(--ds-gray-100)] p-2.5 shadow-[inset_0_0_0_1px_var(--ds-gray-alpha-200)] max-[430px]:justify-center max-[430px]:p-2"
                key={label}
                variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}
                transition={{ delay: noMotion ? 0 : 0.12 + index * 0.08, duration: noMotion ? 0 : 0.34, ease: OFFER_EASE_OUT }}
              >
                <Icon className="size-4 shrink-0 text-[var(--ds-gray-800)]" strokeWidth={1.8} aria-hidden="true" />
                <span className="min-w-0 truncate text-[clamp(.5rem,.9vw,.66rem)] font-medium text-[var(--ds-gray-900)] max-[430px]:hidden">{label}</span>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="relative z-2 grid aspect-square min-w-0 place-items-center self-center rounded-[28%] bg-[var(--ds-gray-1000)] p-2 text-center text-white shadow-[0_12px_30px_rgb(0_0_0/.2)]"
          variants={{ hidden: { opacity: 0, scale: 0.88, rotate: -3 }, visible: { opacity: 1, scale: 1, rotate: 0 } }}
          transition={{ delay: noMotion ? 0 : 0.56, duration: noMotion ? 0 : 0.42, ease: OFFER_EASE_OUT }}
        >
          <span>
            <Sparkles className="mx-auto size-[clamp(1.1rem,3vw,1.8rem)] text-[var(--ds-blue-300)]" strokeWidth={1.7} aria-hidden="true" />
            <span className="mt-2 block text-[clamp(.5rem,.9vw,.66rem)] font-semibold leading-tight">{copy.intelligence}</span>
          </span>
        </motion.div>

        <div className="relative z-1 grid min-h-0 gap-2.5">
          {copy.outputs.map((label, index) => {
            const Icon = outputIcons[index]!;
            return (
              <motion.div
                className="flex min-w-0 items-center gap-2 rounded-lg bg-[var(--ds-blue-100)] p-2.5 shadow-[inset_0_0_0_1px_var(--ds-blue-300)] max-[430px]:justify-center max-[430px]:p-2"
                key={label}
                variants={{ hidden: { opacity: 0, x: 10 }, visible: { opacity: 1, x: 0 } }}
                transition={{ delay: noMotion ? 0 : 0.92 + index * 0.08, duration: noMotion ? 0 : 0.34, ease: OFFER_EASE_OUT }}
              >
                <Icon className="size-4 shrink-0 text-[var(--ds-blue-800)]" strokeWidth={1.8} aria-hidden="true" />
                <span className="min-w-0 truncate text-[clamp(.5rem,.9vw,.66rem)] font-medium text-[var(--ds-blue-800)] max-[430px]:hidden">{label}</span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
