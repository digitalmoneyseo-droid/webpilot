"use client";

import { Bot, BrainCircuit, Database, GitBranch, ListTodo, Search, UserRoundPlus, Webhook } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { OFFER_EASE_IN_OUT, OFFER_EASE_OUT, OFFER_VIEWPORT } from "@/components/offer-animations/motion-tokens";
import { useHydratedReducedMotion } from "@/components/offer-animations/use-hydrated-reduced-motion";
import type { AutomationAnimationCopy } from "@/i18n/services";

const flowPaths = [
  { d: "M24 19.5 H30", delay: 0.34, tool: false },
  { d: "M47.5 33 V42", delay: 1.28, tool: false },
  { d: "M65 9.5 H72", delay: 0.78, tool: true },
  { d: "M65 19.5 H72", delay: 0.86, tool: true },
  { d: "M65 29.5 H72", delay: 0.94, tool: true },
  { d: "M39 65 C39 71 24 71 24 78", delay: 1.72, tool: false },
  { d: "M56 65 C56 71 71 71 71 78", delay: 1.72, tool: false },
] as const;

const toolNodes = [
  { key: "model", Icon: BrainCircuit, top: "top-[4.5%]", delay: 1.02 },
  { key: "context", Icon: Database, top: "top-[14.5%]", delay: 1.1 },
  { key: "research", Icon: Search, top: "top-[24.5%]", delay: 1.18 },
] as const;

export function AutomationFlowAnimation({ copy }: { copy: AutomationAnimationCopy }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, OFFER_VIEWPORT);
  const noMotion = useHydratedReducedMotion();
  const active = noMotion || isInView;

  return (
    <motion.div
      ref={containerRef}
      className="relative h-full min-h-0 w-full"
      initial={false}
      animate={active ? "visible" : "hidden"}
      variants={{ hidden: { opacity: 0, scale: 0.99 }, visible: { opacity: 1, scale: 1 } }}
      transition={{ duration: noMotion ? 0 : 0.35, ease: OFFER_EASE_OUT }}
    >
      <svg className="pointer-events-none absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <pattern id="automation-grid" width="3" height="3" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.16" fill="var(--ds-gray-400)" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#automation-grid)" opacity="0.52" />
        {flowPaths.map(({ d, delay, tool }) => (
          <motion.path
            key={d}
            d={d}
            fill="none"
            stroke={tool ? "#8b83bd" : "var(--ds-blue-700)"}
            strokeWidth={tool ? 1.2 : 2}
            strokeDasharray={tool ? "5 5" : undefined}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            pathLength={1}
            variants={{ hidden: { opacity: 0, pathLength: 0 }, visible: { opacity: 1, pathLength: 1 } }}
            transition={{ delay: noMotion ? 0 : delay, duration: noMotion ? 0 : 0.42, ease: OFFER_EASE_IN_OUT }}
          />
        ))}
      </svg>

      <motion.div
        className="absolute left-[5%] top-[7%] z-2 grid h-[25%] w-[19%] place-items-center rounded-lg bg-white p-3 text-center shadow-[0_7px_20px_rgb(0_0_0/.08),inset_0_0_0_2px_var(--ds-gray-alpha-300)]"
        variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
        transition={{ delay: noMotion ? 0 : 0.1, duration: noMotion ? 0 : 0.34, ease: OFFER_EASE_OUT }}
      >
        <span>
          <Webhook className="mx-auto size-6 text-[var(--ds-gray-900)]" strokeWidth={1.7} aria-hidden="true" />
          <span className="mt-2 block text-xs font-semibold text-pretty [overflow-wrap:normal] hyphens-none">{copy.trigger}</span>
        </span>
        <span className="absolute top-1/2 -right-1.5 size-3 -translate-y-1/2 rounded-full bg-[var(--ds-gray-600)]" />
      </motion.div>

      <motion.div
        className="absolute left-[30%] top-[6%] z-2 flex h-[27%] w-[35%] items-center gap-3 rounded-lg bg-white p-4 shadow-[0_8px_24px_rgb(0_0_0/.09),inset_0_0_0_2px_var(--ds-blue-300)] max-[600px]:gap-2 max-[600px]:p-3"
        variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
        transition={{ delay: noMotion ? 0 : 0.54, duration: noMotion ? 0 : 0.38, ease: OFFER_EASE_OUT }}
      >
        <span className="absolute top-1/2 -left-1.5 size-3 -translate-y-1/2 rounded-sm bg-[var(--ds-gray-600)]" />
        <span className="absolute left-1/2 -bottom-1.5 size-3 -translate-x-1/2 rotate-45 bg-[var(--ds-gray-600)]" />
        {["top-[13%]", "top-1/2", "top-[87%]"].map((position) => (
          <span key={position} className={`absolute -right-1.5 size-3 -translate-y-1/2 rotate-45 bg-violet-500 ${position}`} />
        ))}
        <span className="grid size-10 shrink-0 place-items-center rounded-md bg-[var(--ds-gray-1000)] text-white max-[600px]:size-8">
          <Bot className="size-5 max-[600px]:size-4" strokeWidth={1.8} aria-hidden="true" />
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-semibold text-pretty [overflow-wrap:normal] hyphens-none">{copy.agent}</span>
          <span className="mt-1 block text-xs text-pretty text-[var(--ds-gray-700)] [overflow-wrap:normal] hyphens-none">{copy.extract}</span>
        </span>
      </motion.div>

      {toolNodes.map(({ key, Icon, top, delay }) => (
        <motion.div
          key={key}
          className={`absolute left-[72%] z-2 flex h-[10%] w-[23%] items-center gap-2 ${top}`}
          variants={{ hidden: { opacity: 0, x: -8 }, visible: { opacity: 1, x: 0 } }}
          transition={{ delay: noMotion ? 0 : delay, duration: noMotion ? 0 : 0.32, ease: OFFER_EASE_OUT }}
        >
          <span className="grid aspect-square h-full shrink-0 place-items-center rounded-full bg-white text-[var(--ds-gray-800)] shadow-[0_5px_16px_rgb(0_0_0/.07),inset_0_0_0_2px_var(--ds-gray-alpha-300)]">
            <Icon className="size-5 max-[600px]:size-4" strokeWidth={1.7} aria-hidden="true" />
          </span>
          <span className="min-w-0 text-xs font-medium text-[var(--ds-gray-800)] [overflow-wrap:normal] hyphens-none">{copy[key]}</span>
        </motion.div>
      ))}

      <motion.div
        className="absolute left-[32%] top-[42%] z-2 grid h-[23%] w-[31%] place-items-center rounded-lg bg-white p-3 text-center shadow-[0_7px_20px_rgb(0_0_0/.08),inset_0_0_0_2px_var(--ds-gray-alpha-300)]"
        variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
        transition={{ delay: noMotion ? 0 : 1.45, duration: noMotion ? 0 : 0.34, ease: OFFER_EASE_OUT }}
      >
        <span className="absolute top-0 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[var(--ds-gray-600)]" />
        <span>
          <GitBranch className="mx-auto size-6 text-emerald-600" strokeWidth={2} aria-hidden="true" />
          <span className="mt-2 block text-xs font-semibold text-pretty [overflow-wrap:normal] hyphens-none">{copy.condition}</span>
        </span>
        <span className="absolute left-[22.58%] -bottom-1.5 size-3 -translate-x-1/2 rotate-45 bg-[var(--ds-gray-600)]" />
        <span className="absolute left-[77.42%] -bottom-1.5 size-3 -translate-x-1/2 rotate-45 bg-[var(--ds-gray-600)]" />
      </motion.div>

      <motion.span
        className="absolute left-[31.5%] top-[69%] z-3 -translate-x-1/2 rounded bg-white px-1 text-xs font-semibold text-emerald-700"
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        transition={{ delay: noMotion ? 0 : 1.82, duration: noMotion ? 0 : 0.24 }}
      >
        {copy.yes}
      </motion.span>
      <motion.span
        className="absolute left-[63.5%] top-[69%] z-3 -translate-x-1/2 rounded bg-white px-1 text-xs font-semibold text-amber-700"
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        transition={{ delay: noMotion ? 0 : 1.82, duration: noMotion ? 0 : 0.24 }}
      >
        {copy.review}
      </motion.span>

      {[
        { label: copy.success, Icon: UserRoundPlus, className: "left-[10%]", color: "text-emerald-600" },
        { label: copy.fallback, Icon: ListTodo, className: "left-[57%]", color: "text-amber-700" },
      ].map(({ label, Icon, className, color }) => (
        <motion.div
          key={label}
          className={`absolute top-[78%] z-2 grid h-[19%] w-[28%] place-items-center rounded-lg bg-white p-3 text-center shadow-[0_7px_20px_rgb(0_0_0/.08),inset_0_0_0_2px_var(--ds-gray-alpha-300)] ${className}`}
          variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
          transition={{ delay: noMotion ? 0 : 2, duration: noMotion ? 0 : 0.34, ease: OFFER_EASE_OUT }}
        >
          <span className="absolute top-0 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[var(--ds-gray-600)]" />
          <span>
            <Icon className={`mx-auto size-6 ${color}`} strokeWidth={1.8} aria-hidden="true" />
            <span className="mt-2 block text-xs font-semibold text-pretty [overflow-wrap:normal] hyphens-none">{label}</span>
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}
