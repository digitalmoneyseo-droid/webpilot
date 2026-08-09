"use client";

import { useEffect, useId, useRef } from "react";
import styles from "@/components/offer-animations/web-experience-animation.module.css";
import type { WebExperienceAnimationCopy } from "@/i18n/services";

type SceneVariant = "desktop" | "phone";
type RectGeometry = { x: number; y: number; width: number; height: number };
type SceneGeometry = {
  device: RectGeometry & { rx: number };
  divider: RectGeometry;
  urlCenterY: number;
  accent: RectGeometry;
  headline: { x: number; y: number };
  primaryLine: RectGeometry;
  secondaryLine: RectGeometry;
  cta: { x: number; y: number };
  imageBounds: RectGeometry;
  cards: {
    back: RectGeometry;
    middle: RectGeometry;
    front: RectGeometry;
  };
  frontCard: {
    innerX: number;
    innerY: number;
    innerWidth: number;
    blueHeight: number;
    firstLineY: number;
    secondLineY: number;
    firstLineWidth: number;
    secondLineWidth: number;
  };
};

const SCENES: Record<SceneVariant, SceneGeometry> = {
  desktop: {
    device: { x: 20, y: 54, width: 460, height: 342, rx: 14 },
    divider: { x: 20, y: 88.2, width: 460, height: 1 },
    urlCenterY: 71.1,
    accent: { x: 52.5, y: 162, width: 37, height: 6 },
    headline: { x: 52.5, y: 204 },
    primaryLine: { x: 52.5, y: 247.5, width: 142.5, height: 6 },
    secondaryLine: { x: 52.5, y: 263.25, width: 105, height: 6 },
    cta: { x: 52.5, y: 290 },
    imageBounds: { x: 277.5, y: 148.5, width: 157.5, height: 162 },
    cards: {
      back: { x: 327.9, y: 158.22, width: 100.8, height: 110.16 },
      middle: { x: 283.8, y: 193.86, width: 100.8, height: 110.16 },
      front: { x: 312.15, y: 171.18, width: 100.8, height: 116.64 },
    },
    frontCard: {
      innerX: 322.15,
      innerY: 183.18,
      innerWidth: 80.8,
      blueHeight: 36,
      firstLineY: 225,
      secondLineY: 235,
      firstLineWidth: 63,
      secondLineWidth: 45,
    },
  },
  phone: {
    device: { x: 170, y: 22.5, width: 160, height: 405, rx: 34 },
    divider: { x: 170, y: 63, width: 160, height: 1 },
    urlCenterY: 42.75,
    accent: { x: 190, y: 94.5, width: 37, height: 6 },
    headline: { x: 190, y: 128 },
    primaryLine: { x: 190, y: 162, width: 120, height: 6 },
    secondaryLine: { x: 190, y: 180, width: 100, height: 6 },
    cta: { x: 190, y: 208 },
    imageBounds: { x: 190, y: 261, width: 120, height: 123.3 },
    cards: {
      back: { x: 228.4, y: 268.4, width: 76.8, height: 83.84 },
      middle: { x: 194.8, y: 295.52, width: 76.8, height: 83.84 },
      front: { x: 216.4, y: 278.26, width: 76.8, height: 88.78 },
    },
    frontCard: {
      innerX: 224.4,
      innerY: 287.26,
      innerWidth: 60.8,
      blueHeight: 27,
      firstLineY: 319,
      secondLineY: 327,
      firstLineWidth: 47,
      secondLineWidth: 34,
    },
  },
};

const TIMELINE_DURATION = 2_800;
const DESKTOP_INITIAL_TRANSFORM = "translate3d(0, 0, 0) scale(0.173913, 0.131579)";
const DESKTOP_FINAL_TRANSFORM = "translate3d(0, 0, 0) scale(0.347826, 1.184211)";
const PHONE_INITIAL_TRANSFORM = "translate3d(0, 0, 0) scale(2.875, 0.844444)";
const FULL_SCALE_TRANSFORM = "translate3d(0, 0, 0) scale(1, 1)";
const REVEALS = [
  { className: styles.chrome, delay: 364, duration: 180 },
  { className: styles.accent, delay: 364, duration: 336 },
  { className: styles.backCard, delay: 364, duration: 336 },
  { className: styles.headline, delay: 476, duration: 336 },
  { className: styles.middleCard, delay: 532, duration: 336 },
  { className: styles.primaryLine, delay: 644, duration: 336 },
  { className: styles.frontCard, delay: 700, duration: 336 },
  { className: styles.secondaryLine, delay: 756, duration: 336 },
  { className: styles.cta, delay: 840, duration: 252 },
] as const;

export function WebExperienceAnimation({ copy }: { copy: WebExperienceAnimationCopy }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationsRef = useRef<Animation[] | null>(null);
  const clipId = `web-experience-${useId().replaceAll(":", "")}`;

  useEffect(() => {
    const container = containerRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!container) return;

    if (!reducedMotion.matches && !animationsRef.current) {
      animationsRef.current = startTimeline(container);
    }

    const finishForReducedMotion = ({ matches }: MediaQueryListEvent) => {
      if (matches) animationsRef.current?.forEach((animation) => animation.finish());
    };

    reducedMotion.addEventListener("change", finishForReducedMotion);
    return () => reducedMotion.removeEventListener("change", finishForReducedMotion);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${styles.root} relative h-full min-h-0 w-full overflow-hidden`}
    >
      <SceneLayer clipId={`${clipId}-desktop`} copy={copy} variant="desktop" />
      <SceneLayer clipId={`${clipId}-phone`} copy={copy} variant="phone" />
    </div>
  );
}

function startTimeline(container: HTMLDivElement) {
  const desktop = container.querySelector<HTMLElement>('[data-web-experience-layer="desktop"]')!;
  const phone = container.querySelector<HTMLElement>('[data-web-experience-layer="phone"]')!;
  const commonTiming: KeyframeAnimationOptions = { duration: TIMELINE_DURATION, fill: "forwards" };

  desktop.style.willChange = "transform, opacity";
  phone.style.willChange = "transform, opacity";

  const desktopAnimation = desktop.animate([
    { offset: 0, opacity: 1, transform: DESKTOP_INITIAL_TRANSFORM, easing: "cubic-bezier(0.23, 1, 0.32, 1)" },
    { offset: 0.13, opacity: 1, transform: FULL_SCALE_TRANSFORM, easing: "linear" },
    { offset: 0.39, opacity: 1, transform: FULL_SCALE_TRANSFORM, easing: "cubic-bezier(0.25, 0.1, 0.25, 1)" },
    { offset: 1, opacity: 0, transform: DESKTOP_FINAL_TRANSFORM },
  ], commonTiming);
  const phoneAnimation = phone.animate([
    { offset: 0, opacity: 0, transform: PHONE_INITIAL_TRANSFORM, easing: "linear" },
    { offset: 0.39, opacity: 0, transform: PHONE_INITIAL_TRANSFORM, easing: "cubic-bezier(0.25, 0.1, 0.25, 1)" },
    { offset: 1, opacity: 1, transform: FULL_SCALE_TRANSFORM },
  ], commonTiming);
  const animations = [desktopAnimation, phoneAnimation];

  for (const { className, delay, duration } of REVEALS) {
    const element = container.getElementsByClassName(className)[0];
    if (!element) continue;
    animations.push(element.animate(
      [{ opacity: 0 }, { opacity: 1 }],
      { delay, duration, easing: "cubic-bezier(0.23, 1, 0.32, 1)", fill: "both" },
    ));
  }

  const startTime = document.timeline.currentTime;
  if (typeof startTime === "number") animations.forEach((animation) => { animation.startTime = startTime; });
  void Promise.allSettled([desktopAnimation.finished, phoneAnimation.finished]).then(() => {
    desktop.style.willChange = "auto";
    phone.style.willChange = "auto";
  });

  return animations;
}

function SceneLayer({ clipId, copy, variant }: { clipId: string; copy: WebExperienceAnimationCopy; variant: SceneVariant }) {
  const scene = SCENES[variant];
  const isDesktop = variant === "desktop";
  const layerClass = isDesktop ? styles.desktopLayer : styles.phoneLayer;
  const { device } = scene;

  return (
    <div
      className={`${styles.layer} ${layerClass}`}
      data-web-experience-layer={variant}
      style={{
        left: `${device.x / 5}%`,
        opacity: isDesktop ? 1 : 0,
        position: "absolute",
        top: `${device.y / 4.5}%`,
        transform: isDesktop ? DESKTOP_INITIAL_TRANSFORM : PHONE_INITIAL_TRANSFORM,
        transformOrigin: "center",
        width: `${device.width / 5}%`,
        height: `${device.height / 4.5}%`,
      }}
    >
      <svg
        aria-hidden="true"
        className="size-full overflow-visible"
        preserveAspectRatio="none"
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
        viewBox={`${device.x} ${device.y} ${device.width} ${device.height}`}
      >
        <defs>
          <clipPath id={clipId}>
            <rect {...device} />
          </clipPath>
        </defs>

        <rect
          data-web-experience-device
          fill="white"
          stroke="var(--ds-gray-alpha-300)"
          vectorEffect="non-scaling-stroke"
          {...device}
        />

        <g clipPath={`url(#${clipId})`}>
          <HeroScene copy={copy} scene={scene} variant={variant} />
        </g>

        <BrowserChrome scene={scene} variant={variant} />
      </svg>
    </div>
  );
}

function BrowserChrome({ scene, variant }: { scene: SceneGeometry; variant: SceneVariant }) {
  const isDesktop = variant === "desktop";
  const urlBoxY = scene.urlCenterY - 5;
  const urlBaselineY = scene.urlCenterY + 2.45;

  return (
    <g className={isDesktop ? styles.chrome : undefined} style={isDesktop ? { opacity: 0 } : undefined}>
      <rect data-web-experience-divider fill="var(--ds-gray-alpha-200)" {...scene.divider} />

      {isDesktop ? [40, 48, 56].map((cx) => <circle cx={cx} cy="71.1" fill="var(--ds-gray-300)" key={cx} r="3" />) : null}

      <g data-web-experience-url>
        <rect fill="transparent" height="10" width="76" x="212" y={urlBoxY} />
        <text fill="var(--ds-gray-700)" fontFamily="inherit" fontSize="8" textAnchor="middle" x="220" y={urlBaselineY}>◎</text>
        <text fill="var(--ds-gray-700)" fontFamily="inherit" fontSize="7.5" x="228" y={urlBaselineY}>webpilot.studio</text>
      </g>

      {!isDesktop ? (
        <>
          <rect data-web-experience-notch fill="var(--ds-gray-1000)" height="4" rx="2" width="22.5" x="238.75" y="28.6" />
          <rect data-web-experience-home-indicator fill="var(--ds-gray-1000)" height="2" rx="1" width="32.5" x="233.75" y="420.5" />
        </>
      ) : null}
    </g>
  );
}

function HeroScene({ copy, scene, variant }: { copy: WebExperienceAnimationCopy; scene: SceneGeometry; variant: SceneVariant }) {
  const isDesktop = variant === "desktop";
  const words = copy.headline.trim().split(/\s+/);
  const secondLine = words.pop() ?? "";
  const firstLine = words.join(" ");

  return (
    <g>
      <g className={isDesktop ? styles.accent : undefined} data-web-experience-part="accent" style={isDesktop ? { opacity: 0 } : undefined}>
        <rect fill="var(--ds-blue-600)" rx="3" {...scene.accent} />
      </g>

      <g className={isDesktop ? styles.headline : undefined} data-web-experience-part="headline" style={isDesktop ? { opacity: 0 } : undefined}>
        <text fill="var(--ds-gray-1000)" fontFamily="inherit" fontSize="18.4" fontWeight="600" x={scene.headline.x} y={scene.headline.y}>
          <tspan x={scene.headline.x}>{firstLine}</tspan>
          <tspan dy="1.03em" x={scene.headline.x}>{secondLine}</tspan>
        </text>
      </g>

      <IllustrationLine className={isDesktop ? styles.primaryLine : undefined} geometry={scene.primaryLine} part="primary-line" />
      <IllustrationLine className={isDesktop ? styles.secondaryLine : undefined} geometry={scene.secondaryLine} part="secondary-line" />
      <InquiryCta className={isDesktop ? styles.cta : undefined} copy={copy} geometry={scene.cta} />
      <CardStack scene={scene} variant={variant} />
    </g>
  );
}

function IllustrationLine({ className, geometry, part }: { className?: string; geometry: RectGeometry; part: string }) {
  return (
    <g className={className} data-web-experience-part={part} style={className ? { opacity: 0 } : undefined}>
      <rect fill="var(--ds-gray-200)" rx="3" {...geometry} />
    </g>
  );
}

function InquiryCta({ className, copy, geometry }: { className?: string; copy: WebExperienceAnimationCopy; geometry: { x: number; y: number } }) {
  const width = 92;
  const height = 24;

  return (
    <g className={className} data-web-experience-part="cta" style={className ? { opacity: 0 } : undefined}>
      <rect data-web-experience-cta-bg fill="var(--ds-gray-1000)" height={height} rx="12" width={width} x={geometry.x} y={geometry.y} />
      <text
        data-web-experience-cta-label
        dominantBaseline="middle"
        fill="white"
        fontFamily="inherit"
        fontSize="10"
        fontWeight="600"
        textAnchor="middle"
        textRendering="optimizeLegibility"
        x={geometry.x + width / 2}
        y={geometry.y + height / 2}
      >
        {copy.cta}
      </text>
    </g>
  );
}

function CardStack({ scene, variant }: { scene: SceneGeometry; variant: SceneVariant }) {
  const isDesktop = variant === "desktop";

  return (
    <g data-web-experience-part="image">
      <rect fill="transparent" {...scene.imageBounds} />
      <g className={isDesktop ? styles.backCard : undefined} data-web-experience-card="back" style={isDesktop ? { opacity: 0 } : undefined}>
        <SvgCard fill="var(--ds-gray-100)" geometry={scene.cards.back} stroke="var(--ds-gray-500)" />
      </g>
      <g className={isDesktop ? styles.middleCard : undefined} data-web-experience-card="middle" style={isDesktop ? { opacity: 0 } : undefined}>
        <SvgCard fill="white" geometry={scene.cards.middle} stroke="var(--ds-gray-alpha-300)" />
      </g>
      <g className={isDesktop ? styles.frontCard : undefined} data-web-experience-card="front" style={isDesktop ? { opacity: 0 } : undefined}>
        <FrontCard geometry={scene.cards.front} values={scene.frontCard} />
      </g>
    </g>
  );
}

function SvgCard({ fill, geometry, stroke }: { fill: string; geometry: RectGeometry; stroke: string }) {
  return <rect fill={fill} rx="8" stroke={stroke} vectorEffect="non-scaling-stroke" {...geometry} />;
}

function FrontCard({ geometry, values }: { geometry: RectGeometry; values: SceneGeometry["frontCard"] }) {
  return (
    <>
      <rect fill="white" rx="8" stroke="var(--ds-blue-600)" vectorEffect="non-scaling-stroke" {...geometry} />
      <rect fill="var(--ds-blue-600)" height={values.blueHeight} rx="6" width={values.innerWidth} x={values.innerX} y={values.innerY} />
      <rect fill="var(--ds-gray-300)" height="5" rx="2.5" width={values.firstLineWidth} x={values.innerX} y={values.firstLineY} />
      <rect fill="var(--ds-gray-200)" height="5" rx="2.5" width={values.secondLineWidth} x={values.innerX} y={values.secondLineY} />
    </>
  );
}
