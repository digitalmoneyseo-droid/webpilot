"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ProjectCard } from "@/components/project-card";
import type { ProjectEntry } from "@/lib/content";
import { t, type Locale } from "@/lib/i18n";

const DRAG_THRESHOLD = 9;
const CLICK_SUPPRESSION_MS = 350;

export function WorkRibbon({ projects, locale, label }: { projects: ProjectEntry[]; locale: Locale; label: string }) {
  const ribbonRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const [manualPaused, setManualPaused] = useState(false);
  const manualPausedRef = useRef(manualPaused);
  const syncPlaybackRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    manualPausedRef.current = manualPaused;
    syncPlaybackRef.current?.();
  }, [manualPaused]);

  useEffect(() => {
    const ribbon = ribbonRef.current;
    const track = trackRef.current;
    const group = groupRef.current;
    if (!ribbon || !track || !group) return;

    let activePointerId: number | null = null;
    let captureTarget: Element | null = null;
    let startX = 0;
    let lastX = 0;
    let dragging = false;
    let hovering = false;
    let focusWithin = false;
    let inViewport = false;
    let offset = 0;
    let cycle = 0;
    let frame = 0;
    let previous = performance.now();
    let suppressClickUntil = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const measure = () => {
      cycle = group.offsetWidth + (Number.parseFloat(getComputedStyle(track).gap) || 0);
    };

    const render = () => {
      if (!cycle) return;
      offset = ((offset % cycle) - cycle) % cycle;
      track.style.transform = `translate3d(${offset}px,0,0)`;
    };

    const stop = () => {
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    const shouldPause = () => reduced.matches || manualPausedRef.current || hovering || focusWithin || activePointerId !== null || dragging || !inViewport;

    const animate = (time: number) => {
      if (shouldPause()) {
        frame = 0;
        return;
      }
      offset -= cycle / 72000 * Math.min(time - previous, 50);
      previous = time;
      render();
      frame = requestAnimationFrame(animate);
    };

    const start = () => {
      if (frame || shouldPause() || !cycle) return;
      previous = performance.now();
      frame = requestAnimationFrame(animate);
    };

    const syncPlayback = () => {
      if (shouldPause()) stop();
      else start();
    };
    syncPlaybackRef.current = syncPlayback;

    const releasePointer = (pointerId: number) => {
      const target = captureTarget ?? ribbon;
      try {
        if (target.hasPointerCapture(pointerId)) target.releasePointerCapture(pointerId);
      } catch {
        // The browser can release capture before this cleanup runs.
      }
      captureTarget = null;
    };

    const finishPointer = (event: PointerEvent, canceled: boolean) => {
      if (event.pointerId !== activePointerId) return;
      const wasDragging = dragging;
      activePointerId = null;
      dragging = false;
      ribbon.classList.remove("is-dragging");
      if (!canceled && wasDragging) suppressClickUntil = performance.now() + CLICK_SUPPRESSION_MS;
      releasePointer(event.pointerId);
      syncPlayback();
    };

    const down = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      if (event.target instanceof Element && event.target.closest("[data-ribbon-toggle]")) return;
      if (activePointerId !== null) return;
      activePointerId = event.pointerId;
      captureTarget = event.target instanceof Element ? event.target : ribbon;
      startX = event.clientX;
      lastX = event.clientX;
      dragging = false;
      try {
        captureTarget.setPointerCapture(event.pointerId);
      } catch {
        // Pointer capture is an enhancement. Dragging still works without it.
      }
      syncPlayback();
    };

    const move = (event: PointerEvent) => {
      if (event.pointerId !== activePointerId) return;
      if (!dragging && Math.abs(event.clientX - startX) < DRAG_THRESHOLD) return;
      if (!dragging) {
        dragging = true;
        lastX = event.clientX;
        ribbon.classList.add("is-dragging");
        stop();
        return;
      }
      offset += event.clientX - lastX;
      lastX = event.clientX;
      render();
    };

    const up = (event: PointerEvent) => finishPointer(event, false);
    const cancel = (event: PointerEvent) => finishPointer(event, true);
    const lostCapture = (event: PointerEvent) => finishPointer(event, true);

    const click = (event: MouseEvent) => {
      if (suppressClickUntil <= performance.now()) return;
      if (!(event.target instanceof Element) || event.target.closest("[data-ribbon-toggle]") || !event.target.closest("a")) return;
      suppressClickUntil = 0;
      event.preventDefault();
      event.stopPropagation();
    };

    const onPointerEnter = () => {
      hovering = true;
      syncPlayback();
    };
    const onPointerLeave = () => {
      hovering = false;
      syncPlayback();
    };
    const onFocusIn = () => {
      focusWithin = true;
      syncPlayback();
    };
    const onFocusOut = (event: FocusEvent) => {
      focusWithin = event.relatedTarget instanceof Node && ribbon.contains(event.relatedTarget);
      syncPlayback();
    };
    const onReducedMotionChange = () => syncPlayback();
    const observer = new ResizeObserver(() => {
      measure();
      render();
      syncPlayback();
    });
    const visibility = new IntersectionObserver(([entry]) => {
      inViewport = Boolean(entry?.isIntersecting);
      syncPlayback();
    });

    ribbon.addEventListener("pointerdown", down);
    ribbon.addEventListener("pointermove", move);
    ribbon.addEventListener("pointerup", up);
    ribbon.addEventListener("pointercancel", cancel);
    ribbon.addEventListener("lostpointercapture", lostCapture);
    ribbon.addEventListener("click", click, true);
    ribbon.addEventListener("pointerenter", onPointerEnter);
    ribbon.addEventListener("pointerleave", onPointerLeave);
    ribbon.addEventListener("focusin", onFocusIn);
    ribbon.addEventListener("focusout", onFocusOut);
    reduced.addEventListener("change", onReducedMotionChange);
    observer.observe(group);
    visibility.observe(ribbon);
    measure();
    render();

    return () => {
      stop();
      syncPlaybackRef.current = null;
      observer.disconnect();
      visibility.disconnect();
      ribbon.classList.remove("is-dragging");
      if (activePointerId !== null) releasePointer(activePointerId);
      ribbon.removeEventListener("pointerdown", down);
      ribbon.removeEventListener("pointermove", move);
      ribbon.removeEventListener("pointerup", up);
      ribbon.removeEventListener("pointercancel", cancel);
      ribbon.removeEventListener("lostpointercapture", lostCapture);
      ribbon.removeEventListener("click", click, true);
      ribbon.removeEventListener("pointerenter", onPointerEnter);
      ribbon.removeEventListener("pointerleave", onPointerLeave);
      ribbon.removeEventListener("focusin", onFocusIn);
      ribbon.removeEventListener("focusout", onFocusOut);
      reduced.removeEventListener("change", onReducedMotionChange);
    };
  }, []);

  const toggleManualPause = () => {
    setManualPaused((current) => !current);
  };

  return (
    <section ref={ribbonRef} className="work-ribbon cursor-grab touch-pan-y overflow-hidden px-6 py-2 select-none [&.is-dragging]:cursor-grabbing [&_.project-visual]:min-h-0 motion-reduce:overflow-x-auto" aria-label={label}>
      <div className="mb-2 flex justify-end">
        <button
          type="button"
          data-ribbon-toggle
          className="inline-flex min-h-11 items-center gap-2 rounded-pill border border-line bg-white px-3.5 text-small text-muted shadow-surface transition-[background-color,color,scale] duration-150 hover:bg-[var(--ds-gray-100)] hover:text-ink active:scale-[.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink motion-reduce:transition-none motion-reduce:active:scale-100"
          aria-label={t(locale, manualPaused ? "home.resumeWork" : "home.pauseWork")}
          aria-pressed={manualPaused}
          onClick={toggleManualPause}
        >
          {manualPaused ? <Play className="size-3.5" aria-hidden="true" /> : <Pause className="size-3.5" aria-hidden="true" />}
          {t(locale, manualPaused ? "home.resumeWork" : "home.pauseWork")}
        </button>
      </div>
      <div ref={trackRef} className="flex w-max gap-[27px] will-change-transform max-[900px]:gap-3.5 max-[600px]:gap-2.5">
        <div ref={groupRef} className="flex flex-none gap-[27px] max-[900px]:gap-3.5 max-[600px]:gap-2.5">{projects.map(({ data }) => <ProjectCard project={data} locale={locale} key={data.slug} />)}</div>
        <div className="flex flex-none gap-[27px] max-[900px]:gap-3.5 max-[600px]:gap-2.5" aria-hidden="true">{projects.map(({ data }) => <ProjectCard project={data} locale={locale} decorative key={data.slug} />)}</div>
      </div>
    </section>
  );
}
