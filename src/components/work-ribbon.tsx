"use client";

import { useEffect, useRef } from "react";
import { ProjectCard } from "@/components/project-card";
import type { ProjectEntry } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

export function WorkRibbon({ projects, locale, label }: { projects: ProjectEntry[]; locale: Locale; label: string }) {
  const ribbonRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ribbon = ribbonRef.current, track = trackRef.current, group = groupRef.current;
    if (!ribbon || !track || !group) return;
    let pointer: number | null = null, lastX = 0, offset = 0, cycle = 0, frame = 0, previous = performance.now();
    let movedDistance = 0;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const measure = () => { cycle = group.offsetWidth + (Number.parseFloat(getComputedStyle(track).gap) || 0); };
    const render = () => { if (cycle) { offset = ((offset % cycle) - cycle) % cycle; track.style.transform = `translate3d(${offset}px,0,0)`; } };
    const animate = (time: number) => { offset -= cycle / 72000 * Math.min(time - previous, 50); previous = time; render(); frame = requestAnimationFrame(animate); };
    const stop = () => { if (frame) { cancelAnimationFrame(frame); frame = 0; } };
    const down = (event: PointerEvent) => { if (event.pointerType === "mouse" && event.button !== 0) return; pointer = event.pointerId; lastX = event.clientX; movedDistance = 0; };
    const move = (event: PointerEvent) => { if (event.pointerId !== pointer) return; ribbon.setPointerCapture(event.pointerId); ribbon.classList.add("is-dragging"); movedDistance += Math.abs(event.clientX - lastX); offset += event.clientX - lastX; lastX = event.clientX; render(); };
    const up = () => { pointer = null; ribbon.classList.remove("is-dragging"); if (movedDistance > 6) { movedDistance = 0; ribbon.addEventListener("click", (event) => { event.preventDefault(); event.stopPropagation(); }, { capture: true, once: true }); } };
    const observer = new ResizeObserver(() => { measure(); render(); }); observer.observe(group);
    ribbon.addEventListener("pointerdown", down); ribbon.addEventListener("pointermove", move); ribbon.addEventListener("pointerup", up); ribbon.addEventListener("pointercancel", up);
    const visibility = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !reduced.matches && !frame) { previous = performance.now(); frame = requestAnimationFrame(animate); }
      else if (!entry.isIntersecting && frame) stop();
    });
    measure(); visibility.observe(ribbon);
    return () => { stop(); observer.disconnect(); visibility.disconnect(); ribbon.removeEventListener("pointerdown", down); ribbon.removeEventListener("pointermove", move); ribbon.removeEventListener("pointerup", up); ribbon.removeEventListener("pointercancel", up); };
  }, []);
  return <section ref={ribbonRef} className="work-ribbon cursor-grab touch-pan-y overflow-hidden px-6 py-2 select-none [&.is-dragging]:cursor-grabbing [&_.project-visual]:min-h-0 motion-reduce:overflow-x-auto" aria-label={label}><div ref={trackRef} className="flex w-max gap-[27px] will-change-transform max-[900px]:gap-3.5 max-[600px]:gap-2.5"><div ref={groupRef} className="flex flex-none gap-[27px] max-[900px]:gap-3.5 max-[600px]:gap-2.5">{projects.map(({ data }) => <ProjectCard project={data} locale={locale} key={data.slug} />)}</div><div className="flex flex-none gap-[27px] max-[900px]:gap-3.5 max-[600px]:gap-2.5" aria-hidden="true">{projects.map(({ data }) => <ProjectCard project={data} locale={locale} decorative key={data.slug} />)}</div></div></section>;
}
