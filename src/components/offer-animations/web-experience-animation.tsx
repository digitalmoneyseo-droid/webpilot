"use client";

import { animate, cubicBezier, motion, useInView, useMotionValue, useTransform, type MotionValue } from "motion/react";
import { useEffect, useId, useRef } from "react";
import { OFFER_VIEWPORT } from "@/components/offer-animations/motion-tokens";
import { useHydratedReducedMotion } from "@/components/offer-animations/use-hydrated-reduced-motion";
import type { WebExperienceAnimationCopy } from "@/i18n/services";

const SEQUENCE_DURATION = 2.8;
const FRAME_BUILT = 0.13;
const MORPH_START = 0.39;
const REVEAL_DURATION = 0.12;
const ACCENT_REVEAL = 0.13;
const HEADLINE_REVEAL = 0.17;
const PRIMARY_LINE_REVEAL = 0.23;
const SECONDARY_LINE_REVEAL = 0.27;
const CTA_REVEAL = 0.3;
const MIDDLE_CARD_REVEAL = 0.19;
const FRONT_CARD_REVEAL = 0.25;
const LINEAR = "linear" as const;
const LINEAR_EASE = (value: number) => value;
const ENTER_EASE = cubicBezier(0.23, 1, 0.32, 1);
const MORPH_EASE = cubicBezier(0.25, 0.1, 0.25, 1);

const DEVICE_TIMES = [0, FRAME_BUILT, MORPH_START, 1];
const DEVICE_EASES = [ENTER_EASE, LINEAR_EASE, MORPH_EASE];

export function WebExperienceAnimation({ copy }: { copy: WebExperienceAnimationCopy }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { ...OFFER_VIEWPORT, amount: 0.15 });
  const noMotion = useHydratedReducedMotion();
  const timeline = useMotionValue(0);
  const clipId = `web-experience-${useId().replaceAll(":", "")}`;

  useEffect(() => {
    if (!noMotion && !isInView) {
      timeline.set(0);
      return;
    }

    if (noMotion) {
      timeline.set(1);
      return;
    }

    timeline.set(0);
    const playback = animate(timeline, 1, { duration: SEQUENCE_DURATION, ease: LINEAR });
    return () => playback.stop();
  }, [isInView, noMotion, timeline]);

  return (
    <div ref={containerRef} className="relative h-full min-h-0 w-full overflow-hidden">
      <svg
        aria-hidden="true"
        className="absolute inset-0 size-full overflow-visible"
        preserveAspectRatio="xMidYMid meet"
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
        viewBox="0 0 500 450"
      >
        <defs>
          <clipPath id={clipId}>
            <DeviceShape timeline={timeline} />
          </clipPath>
        </defs>

        <DeviceShape data-web-experience-device fill="white" stroke="var(--ds-gray-alpha-300)" timeline={timeline} />

        <g clipPath={`url(#${clipId})`}>
          <HeroScene copy={copy} timeline={timeline} />
        </g>

        <BrowserChrome timeline={timeline} />
      </svg>
    </div>
  );
}

function DeviceShape({ timeline, ...props }: { timeline: MotionValue<number> } & React.ComponentProps<typeof motion.rect>) {
  const x = useTransform(timeline, DEVICE_TIMES, [210, 20, 20, 170], { ease: DEVICE_EASES });
  const y = useTransform(timeline, DEVICE_TIMES, [202.5, 54, 54, 22.5], { ease: DEVICE_EASES });
  const width = useTransform(timeline, DEVICE_TIMES, [80, 460, 460, 160], { ease: DEVICE_EASES });
  const height = useTransform(timeline, DEVICE_TIMES, [45, 342, 342, 405], { ease: DEVICE_EASES });
  const rx = useTransform(timeline, DEVICE_TIMES, [8, 14, 14, 34], { ease: DEVICE_EASES });

  return <motion.rect {...props} height={height} rx={rx} vectorEffect="non-scaling-stroke" width={width} x={x} y={y} />;
}

function BrowserChrome({ timeline }: { timeline: MotionValue<number> }) {
  const dividerX = useTransform(timeline, DEVICE_TIMES, [210, 20, 20, 170], { ease: DEVICE_EASES });
  const dividerY = useTransform(timeline, DEVICE_TIMES, [207, 88.2, 88.2, 63], { ease: DEVICE_EASES });
  const dividerWidth = useTransform(timeline, DEVICE_TIMES, [80, 460, 460, 160], { ease: DEVICE_EASES });
  const desktopOpacity = useTransform(timeline, [0, 0.1, MORPH_START - 0.04, MORPH_START], [0, 1, 1, 0], { ease: [ENTER_EASE, LINEAR_EASE, MORPH_EASE] });
  const urlOpacity = useTransform(timeline, [0, FRAME_BUILT, 1], [0, 1, 1], { ease: [ENTER_EASE, LINEAR_EASE] });
  const urlCenterY = useTransform(timeline, DEVICE_TIMES, [207, 71.1, 71.1, 42.75], { ease: DEVICE_EASES });
  const urlBoxY = useTransform(urlCenterY, (value) => value - 5);
  const urlBaselineY = useTransform(urlCenterY, (value) => value + 2.45);
  const phoneOpacity = useTransform(timeline, [0, 0.72, 1], [0, 0, 1], { ease: [LINEAR_EASE, MORPH_EASE] });

  return (
    <g>
      <motion.rect
        data-web-experience-divider
        fill="var(--ds-gray-alpha-200)"
        height="1"
        width={dividerWidth}
        x={dividerX}
        y={dividerY}
      />

      <motion.g opacity={desktopOpacity}>
        {[40, 48, 56].map((cx) => <circle cx={cx} cy="71.1" fill="var(--ds-gray-300)" key={cx} r="3" />)}
      </motion.g>

      <motion.g data-web-experience-url opacity={urlOpacity}>
        <motion.rect fill="transparent" height="10" width="76" x="212" y={urlBoxY} />
        <motion.text
          fill="var(--ds-gray-700)"
          fontFamily="inherit"
          fontSize="8"
          textAnchor="middle"
          x="220"
          y={urlBaselineY}
        >
          ◎
        </motion.text>
        <motion.text
          fill="var(--ds-gray-700)"
          fontFamily="inherit"
          fontSize="7.5"
          x="228"
          y={urlBaselineY}
        >
          webpilot.studio
        </motion.text>
      </motion.g>

      <motion.rect
        data-web-experience-notch
        fill="var(--ds-gray-1000)"
        height="4"
        opacity={phoneOpacity}
        rx="2"
        width="22.5"
        x="238.75"
        y="28.6"
      />
      <motion.rect
        data-web-experience-home-indicator
        fill="var(--ds-gray-1000)"
        height="2"
        opacity={phoneOpacity}
        rx="1"
        width="32.5"
        x="233.75"
        y="420.5"
      />
    </g>
  );
}

function HeroScene({ copy, timeline }: { copy: WebExperienceAnimationCopy; timeline: MotionValue<number> }) {
  return (
    <g>
      <Accent timeline={timeline} />
      <Headline copy={copy} timeline={timeline} />
      <IllustrationLine part="primary-line" revealAt={PRIMARY_LINE_REVEAL} timeline={timeline} values={{ desktop: [52.5, 247.5, 142.5], mobile: [190, 162, 120], entranceWidth: 21 }} />
      <IllustrationLine part="secondary-line" revealAt={SECONDARY_LINE_REVEAL} timeline={timeline} values={{ desktop: [52.5, 263.25, 105], mobile: [190, 180, 100], entranceWidth: 76 }} />
      <InquiryCta copy={copy} timeline={timeline} />
      <CardStack timeline={timeline} />
    </g>
  );
}

function Accent({ timeline }: { timeline: MotionValue<number> }) {
  const opacity = useRevealOpacity(timeline, ACCENT_REVEAL);
  const x = useTransform(timeline, [0, MORPH_START, 1], [52.5, 52.5, 190], { ease: [LINEAR_EASE, MORPH_EASE] });
  const y = useTransform(timeline, [0, MORPH_START, 1], [162, 162, 94.5], { ease: [LINEAR_EASE, MORPH_EASE] });
  const width = useTransform(timeline, [0, ACCENT_REVEAL, ACCENT_REVEAL + REVEAL_DURATION, MORPH_START, 1], [9.25, 9.25, 37, 37, 37], { ease: [LINEAR_EASE, ENTER_EASE, LINEAR_EASE, MORPH_EASE] });

  return <motion.rect data-web-experience-part="accent" fill="var(--ds-blue-600)" height="6" opacity={opacity} rx="3" width={width} x={x} y={y} />;
}

function Headline({ copy, timeline }: { copy: WebExperienceAnimationCopy; timeline: MotionValue<number> }) {
  const words = copy.headline.trim().split(/\s+/);
  const secondLine = words.pop() ?? "";
  const firstLine = words.join(" ");
  const opacity = useRevealOpacity(timeline, HEADLINE_REVEAL);
  const x = useTransform(timeline, [0, MORPH_START, 1], [52.5, 52.5, 190], { ease: [LINEAR_EASE, MORPH_EASE] });
  const y = useTransform(timeline, [0, HEADLINE_REVEAL, HEADLINE_REVEAL + REVEAL_DURATION, MORPH_START, 1], [218, 218, 204, 204, 128], { ease: [LINEAR_EASE, ENTER_EASE, LINEAR_EASE, MORPH_EASE] });

  return (
    <motion.text
      data-web-experience-part="headline"
      fill="var(--ds-gray-1000)"
      fontFamily="inherit"
      fontSize="18.4"
      fontWeight="600"
      opacity={opacity}
      x={x}
      y={y}
    >
      <motion.tspan x={x}>{firstLine}</motion.tspan>
      <motion.tspan dy="1.03em" x={x}>{secondLine}</motion.tspan>
    </motion.text>
  );
}

function IllustrationLine({ part, revealAt, timeline, values }: { part: string; revealAt: number; timeline: MotionValue<number>; values: { desktop: [number, number, number]; mobile: [number, number, number]; entranceWidth: number } }) {
  const opacity = useRevealOpacity(timeline, revealAt);
  const x = useTransform(timeline, [0, MORPH_START, 1], [values.desktop[0], values.desktop[0], values.mobile[0]], { ease: [LINEAR_EASE, MORPH_EASE] });
  const y = useTransform(timeline, [0, MORPH_START, 1], [values.desktop[1], values.desktop[1], values.mobile[1]], { ease: [LINEAR_EASE, MORPH_EASE] });
  const width = useTransform(timeline, [0, revealAt, revealAt + REVEAL_DURATION, MORPH_START, 1], [values.entranceWidth, values.entranceWidth, values.desktop[2], values.desktop[2], values.mobile[2]], { ease: [LINEAR_EASE, ENTER_EASE, LINEAR_EASE, MORPH_EASE] });

  return <motion.rect data-web-experience-part={part} fill="var(--ds-gray-200)" height="6" opacity={opacity} rx="3" width={width} x={x} y={y} />;
}

function InquiryCta({ copy, timeline }: { copy: WebExperienceAnimationCopy; timeline: MotionValue<number> }) {
  const opacity = useRevealOpacity(timeline, CTA_REVEAL, MORPH_START);
  const x = useTransform(timeline, [0, MORPH_START, 1], [52.5, 52.5, 190], { ease: [LINEAR_EASE, MORPH_EASE] });
  const y = useTransform(timeline, [0, CTA_REVEAL, MORPH_START, 1], [301, 301, 290, 208], { ease: [LINEAR_EASE, ENTER_EASE, MORPH_EASE] });
  const width = 92;
  const height = 24;
  const centerX = useTransform(x, (left) => left + width / 2);
  const centerY = useTransform(y, (top) => top + height / 2);

  return (
    <motion.g data-web-experience-part="cta" opacity={opacity}>
      <motion.rect data-web-experience-cta-bg fill="var(--ds-gray-1000)" height={height} rx="12" width={width} x={x} y={y} />
      <motion.text
        data-web-experience-cta-label
        dominantBaseline="middle"
        fill="white"
        fontFamily="inherit"
        fontSize="10"
        fontWeight="600"
        textAnchor="middle"
        textRendering="optimizeLegibility"
        x={centerX}
        y={centerY}
      >
        {copy.cta}
      </motion.text>
    </motion.g>
  );
}

type CardGeometry = { x: number; y: number; width: number; height: number };

function CardStack({ timeline }: { timeline: MotionValue<number> }) {
  const groupX = useTransform(timeline, [0, MORPH_START, 1], [277.5, 277.5, 190], { ease: [LINEAR_EASE, MORPH_EASE] });
  const groupY = useTransform(timeline, [0, MORPH_START, 1], [148.5, 148.5, 261], { ease: [LINEAR_EASE, MORPH_EASE] });
  const groupWidth = useTransform(timeline, [0, MORPH_START, 1], [157.5, 157.5, 120], { ease: [LINEAR_EASE, MORPH_EASE] });
  const groupHeight = useTransform(timeline, [0, MORPH_START, 1], [162, 162, 123.3], { ease: [LINEAR_EASE, MORPH_EASE] });

  const back = useCardGeometry(timeline, ACCENT_REVEAL, { x: 327.9, y: 158.22, width: 100.8, height: 110.16 }, { x: 228.4, y: 268.4, width: 76.8, height: 83.84 }, { x: 18, y: 4 });
  const middle = useCardGeometry(timeline, MIDDLE_CARD_REVEAL, { x: 283.8, y: 193.86, width: 100.8, height: 110.16 }, { x: 194.8, y: 295.52, width: 76.8, height: 83.84 }, { x: -18, y: 8 });
  const front = useCardGeometry(timeline, FRONT_CARD_REVEAL, { x: 312.15, y: 171.18, width: 100.8, height: 116.64 }, { x: 216.4, y: 278.26, width: 76.8, height: 88.78 }, { x: 0, y: 12 });

  return (
    <motion.g data-web-experience-part="image">
      <motion.rect fill="transparent" height={groupHeight} width={groupWidth} x={groupX} y={groupY} />
      <SvgCard data-web-experience-card="back" fill="var(--ds-gray-100)" geometry={back} stroke="var(--ds-gray-500)" />
      <SvgCard data-web-experience-card="middle" fill="white" geometry={middle} stroke="var(--ds-gray-alpha-300)" />
      <FrontCard geometry={front} timeline={timeline} />
    </motion.g>
  );
}

function SvgCard({ geometry, ...props }: { geometry: ReturnType<typeof useCardGeometry> } & React.ComponentProps<typeof motion.rect>) {
  return (
    <motion.rect
      {...props}
      height={geometry.height}
      opacity={geometry.opacity}
      rx="8"
      vectorEffect="non-scaling-stroke"
      width={geometry.width}
      x={geometry.x}
      y={geometry.y}
    />
  );
}

function FrontCard({ geometry, timeline }: { geometry: ReturnType<typeof useCardGeometry>; timeline: MotionValue<number> }) {
  const innerX = useTransform(timeline, [0, MORPH_START, 1], [322.15, 322.15, 224.4], { ease: [LINEAR_EASE, MORPH_EASE] });
  const innerY = useTransform(timeline, [0, MORPH_START, 1], [183.18, 183.18, 287.26], { ease: [LINEAR_EASE, MORPH_EASE] });
  const innerWidth = useTransform(timeline, [0, MORPH_START, 1], [80.8, 80.8, 60.8], { ease: [LINEAR_EASE, MORPH_EASE] });
  const blueHeight = useTransform(timeline, [0, MORPH_START, 1], [36, 36, 27], { ease: [LINEAR_EASE, MORPH_EASE] });
  const firstLineY = useTransform(timeline, [0, MORPH_START, 1], [225, 225, 319], { ease: [LINEAR_EASE, MORPH_EASE] });
  const secondLineY = useTransform(timeline, [0, MORPH_START, 1], [235, 235, 327], { ease: [LINEAR_EASE, MORPH_EASE] });
  const firstLineWidth = useTransform(timeline, [0, MORPH_START, 1], [63, 63, 47], { ease: [LINEAR_EASE, MORPH_EASE] });
  const secondLineWidth = useTransform(timeline, [0, MORPH_START, 1], [45, 45, 34], { ease: [LINEAR_EASE, MORPH_EASE] });

  return (
    <motion.g data-web-experience-card="front" opacity={geometry.opacity}>
      <motion.rect fill="white" height={geometry.height} rx="8" stroke="var(--ds-blue-600)" vectorEffect="non-scaling-stroke" width={geometry.width} x={geometry.x} y={geometry.y} />
      <motion.rect fill="var(--ds-blue-600)" height={blueHeight} rx="6" width={innerWidth} x={innerX} y={innerY} />
      <motion.rect fill="var(--ds-gray-300)" height="5" rx="2.5" width={firstLineWidth} x={innerX} y={firstLineY} />
      <motion.rect fill="var(--ds-gray-200)" height="5" rx="2.5" width={secondLineWidth} x={innerX} y={secondLineY} />
    </motion.g>
  );
}

function useCardGeometry(timeline: MotionValue<number>, revealAt: number, desktop: CardGeometry, mobile: CardGeometry, entrance: { x: number; y: number }) {
  const times = [0, revealAt, revealAt + REVEAL_DURATION, MORPH_START, 1];
  const ease = [LINEAR_EASE, ENTER_EASE, LINEAR_EASE, MORPH_EASE];
  const x = useTransform(timeline, times, [desktop.x + entrance.x, desktop.x + entrance.x, desktop.x, desktop.x, mobile.x], { ease });
  const y = useTransform(timeline, times, [desktop.y + entrance.y, desktop.y + entrance.y, desktop.y, desktop.y, mobile.y], { ease });
  const width = useTransform(timeline, [0, MORPH_START, 1], [desktop.width, desktop.width, mobile.width], { ease: [LINEAR_EASE, MORPH_EASE] });
  const height = useTransform(timeline, [0, MORPH_START, 1], [desktop.height, desktop.height, mobile.height], { ease: [LINEAR_EASE, MORPH_EASE] });
  const opacity = useRevealOpacity(timeline, revealAt);
  return { x, y, width, height, opacity };
}

function useRevealOpacity(timeline: MotionValue<number>, revealAt: number, settledAt = revealAt + REVEAL_DURATION) {
  return useTransform(timeline, [0, revealAt, settledAt, 1], [0, 0, 1, 1], { ease: [LINEAR_EASE, ENTER_EASE, LINEAR_EASE] });
}
