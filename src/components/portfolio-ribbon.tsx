"use client";

import { useEffect, useRef } from "react";
import { ProjectCard } from "@/components/project-card";
import type { ProjectEntry } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

const DRAG_THRESHOLD = 9;
const CLICK_SUPPRESSION_MS = 350;
const DRAG_RESUME_DELAY_MS = 900;

export function PortfolioRibbon({ projects, locale, label }: { projects: ProjectEntry[]; locale: Locale; label: string }) {
  const ribbonRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);

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
    let resumeTimeout: number | null = null;
    let resumeAfterDragPending = false;
    let allowPlaybackAfterDrag = false;
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

    const clearResumeTimeout = () => {
      if (resumeTimeout !== null) {
        window.clearTimeout(resumeTimeout);
        resumeTimeout = null;
      }
    };

    const shouldPause = () => reduced.matches || (hovering && !allowPlaybackAfterDrag) || (focusWithin && !allowPlaybackAfterDrag) || activePointerId !== null || dragging || resumeAfterDragPending || !inViewport;

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

    const scheduleResumeAfterDrag = () => {
      clearResumeTimeout();
      resumeAfterDragPending = true;
      allowPlaybackAfterDrag = true;
      stop();
      resumeTimeout = window.setTimeout(() => {
        resumeTimeout = null;
        resumeAfterDragPending = false;
        syncPlayback();
      }, DRAG_RESUME_DELAY_MS);
    };

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
      if (wasDragging) scheduleResumeAfterDrag();
      else syncPlayback();
    };

    const down = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      if (activePointerId !== null) return;
      clearResumeTimeout();
      resumeAfterDragPending = false;
      allowPlaybackAfterDrag = false;
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
      if (!(event.target instanceof Element) || !event.target.closest("a")) return;
      suppressClickUntil = 0;
      event.preventDefault();
      event.stopPropagation();
    };

    const onPointerEnter = () => {
      allowPlaybackAfterDrag = false;
      hovering = true;
      syncPlayback();
    };
    const onPointerLeave = () => {
      allowPlaybackAfterDrag = false;
      hovering = false;
      syncPlayback();
    };
    const onFocusIn = () => {
      allowPlaybackAfterDrag = false;
      focusWithin = true;
      syncPlayback();
    };
    const onFocusOut = (event: FocusEvent) => {
      focusWithin = event.relatedTarget instanceof Node && ribbon.contains(event.relatedTarget);
      if (!focusWithin) allowPlaybackAfterDrag = false;
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
      clearResumeTimeout();
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

  return (
    <section ref={ribbonRef} className="portfolio-ribbon cursor-grab touch-pan-y overflow-hidden px-6 py-2 select-none [&.is-dragging]:cursor-grabbing [&_.project-visual]:min-h-0 motion-reduce:overflow-x-auto" aria-label={label}>
      <div ref={trackRef} data-ribbon-track className="flex w-max gap-[27px] will-change-transform max-[900px]:gap-3.5 max-[600px]:gap-2.5">
        <div ref={groupRef} className="flex flex-none gap-[27px] max-[900px]:gap-3.5 max-[600px]:gap-2.5">{projects.map(({ data }) => <ProjectCard project={data} locale={locale} key={data.slug} />)}</div>
        <div className="flex flex-none gap-[27px] max-[900px]:gap-3.5 max-[600px]:gap-2.5" aria-hidden="true">{projects.map(({ data }) => <ProjectCard project={data} locale={locale} decorative key={data.slug} />)}</div>
      </div>
    </section>
  );
}
