"use client";

import { Boxes, Check, MonitorSmartphone, Palette, Workflow } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import type { Locale } from "@/lib/i18n";
import { OFFER_EASE_OUT, OFFER_VIEWPORT } from "@/components/offer-animations/motion-tokens";

const connectorPaths = [
  "M 138 67 C 164 67 168 102 200 125",
  "M 262 67 C 236 67 232 102 200 125",
  "M 138 183 C 164 183 168 148 200 125",
  "M 262 183 C 236 183 232 148 200 125",
];

const moduleTransforms = [
  "translate3d(-14px, -10px, 0) scale(.97)",
  "translate3d(14px, -10px, 0) scale(.97)",
  "translate3d(-14px, 10px, 0) scale(.97)",
  "translate3d(14px, 10px, 0) scale(.97)",
];

export function FoundationBlueprintAnimation({ locale }: { locale: Locale }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, OFFER_VIEWPORT);
  const prefersReducedMotion = useReducedMotion();
  const noMotion = Boolean(prefersReducedMotion);
  const active = noMotion || isInView;
  const modules = locale === "de"
    ? [
        { label: "Marke", detail: "Identität & UX", Icon: Palette },
        { label: "Website", detail: "Web & Apps", Icon: MonitorSmartphone },
        { label: "Produkt", detail: "Digitale Systeme", Icon: Boxes },
        { label: "Automation", detail: "KI & Abläufe", Icon: Workflow },
      ]
    : [
        { label: "Brand", detail: "Identity & UX", Icon: Palette },
        { label: "Website", detail: "Web & apps", Icon: MonitorSmartphone },
        { label: "Product", detail: "Digital systems", Icon: Boxes },
        { label: "Automation", detail: "AI & workflows", Icon: Workflow },
      ];

  return (
    <motion.div
      ref={containerRef}
      className="grid h-full min-h-0 w-full grid-rows-[auto_1fr] gap-3"
      initial={false}
      animate={active ? "visible" : "hidden"}
    >
      <div className="flex min-w-0 items-center justify-between gap-3">
        <span className="truncate text-[clamp(.62rem,1vw,.72rem)] font-medium text-[var(--ds-gray-700)]">
          {locale === "de" ? "Systemplan" : "System blueprint"}
        </span>
        <span className="relative h-7 w-[7.7rem] shrink-0 overflow-hidden rounded-full bg-white shadow-[inset_0_0_0_1px_var(--ds-gray-alpha-200)]">
          {!noMotion ? (
            <motion.span
              className="absolute inset-0 flex items-center justify-center gap-1.5 text-[clamp(.54rem,.9vw,.64rem)] font-medium text-[var(--ds-gray-700)] opacity-0"
              variants={{
                hidden: { opacity: 1, filter: "blur(0px)", transform: "translate3d(0, 0, 0)" },
                visible: {
                  opacity: [1, 1, 0],
                  filter: ["blur(0px)", "blur(0px)", "blur(2px)"],
                  transform: ["translate3d(0, 0, 0)", "translate3d(0, 0, 0)", "translate3d(0, -4px, 0)"],
                },
              }}
              transition={{ duration: 1.5, times: [0, 0.84, 1], ease: OFFER_EASE_OUT }}
            >
              <span className="size-1.5 rounded-full bg-[var(--ds-blue-600)]" />
              {locale === "de" ? "Im Aufbau" : "Assembling"}
            </motion.span>
          ) : null}
          <motion.span
            className="absolute inset-0 flex items-center justify-center gap-1.5 text-[clamp(.54rem,.9vw,.64rem)] font-medium text-[var(--ds-blue-800)]"
            variants={{
              hidden: { opacity: 0, filter: "blur(2px)", transform: "translate3d(0, 4px, 0)" },
              visible: { opacity: 1, filter: "blur(0px)", transform: "translate3d(0, 0, 0)" },
            }}
            transition={{ delay: noMotion ? 0 : 1.25, duration: noMotion ? 0 : 0.25, ease: OFFER_EASE_OUT }}
          >
            <Check className="size-3.5" strokeWidth={2} />
            {locale === "de" ? "Startbereit" : "Launch ready"}
          </motion.span>
        </span>
      </div>

      <div className="relative min-h-0 overflow-hidden rounded-xl bg-[var(--ds-blue-100)] shadow-[inset_0_0_0_1px_var(--ds-blue-300)]">
        <motion.div
          className="absolute inset-0 opacity-60 [background-image:linear-gradient(to_right,var(--ds-blue-300)_1px,transparent_1px),linear-gradient(to_bottom,var(--ds-blue-300)_1px,transparent_1px)] [background-size:24px_24px]"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 0.6 } }}
          transition={{ duration: noMotion ? 0 : 0.22 }}
        />

        <svg
          className="pointer-events-none absolute inset-0 size-full"
          viewBox="0 0 400 250"
          preserveAspectRatio="xMidYMid meet"
          focusable="false"
          aria-hidden="true"
        >
          {connectorPaths.map((path, index) => (
            <motion.path
              key={path}
              d={path}
              fill="none"
              stroke="var(--ds-blue-600)"
              strokeLinecap="round"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
              variants={{ hidden: { opacity: 0.25, pathLength: 0 }, visible: { opacity: 1, pathLength: 1 } }}
              transition={{
                delay: noMotion ? 0 : 0.58 + index * 0.06,
                duration: noMotion ? 0 : 0.5,
                ease: OFFER_EASE_OUT,
              }}
            />
          ))}
        </svg>

        <div className="relative grid h-full min-h-0 grid-cols-2 grid-rows-2 gap-3 p-[clamp(.75rem,3vw,1.5rem)] max-[430px]:gap-2">
          {modules.map(({ label, detail, Icon }, index) => (
            <motion.div
              key={label}
              className="flex min-h-0 min-w-0 items-center gap-2.5 rounded-xl bg-white/95 p-3 shadow-[0_1px_2px_rgb(0_0_0/.04),0_8px_20px_rgb(35_104_232/.08)] max-[430px]:gap-2 max-[430px]:p-2.5"
              variants={{
                hidden: { opacity: 0, transform: moduleTransforms[index] },
                visible: { opacity: 1, transform: "translate3d(0, 0, 0) scale(1)" },
              }}
              transition={{
                delay: noMotion ? 0 : 0.18 + index * 0.07,
                duration: noMotion ? 0 : 0.32,
                ease: OFFER_EASE_OUT,
              }}
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[var(--ds-blue-100)] text-[var(--ds-blue-700)] max-[430px]:size-7">
                <Icon className="size-4 max-[430px]:size-3.5" strokeWidth={1.7} />
              </span>
              <span className="min-w-0">
                <strong className="block truncate text-[clamp(.62rem,1.1vw,.76rem)] font-semibold text-[var(--ds-gray-1000)]">
                  {label}
                </strong>
                <span className="mt-0.5 block truncate text-[clamp(.48rem,.8vw,.6rem)] text-[var(--ds-gray-700)]">
                  {detail}
                </span>
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="absolute top-1/2 left-1/2 grid size-10 -translate-1/2 place-items-center rounded-full bg-[var(--ds-gray-1000)] text-[.7rem] font-semibold text-white shadow-[0_8px_20px_rgb(0_0_0/.18)]"
          variants={{
            hidden: { opacity: 0, transform: "translate3d(-50%, -50%, 0) scale(.94)" },
            visible: { opacity: 1, transform: "translate3d(-50%, -50%, 0) scale(1)" },
          }}
          transition={{ delay: noMotion ? 0 : 0.72, duration: noMotion ? 0 : 0.28, ease: OFFER_EASE_OUT }}
        >
          W
        </motion.div>
      </div>
    </motion.div>
  );
}
