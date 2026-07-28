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
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const measure = () => { cycle = group.offsetWidth + (Number.parseFloat(getComputedStyle(track).gap) || 0); };
    const render = () => { if (cycle) { offset = ((offset % cycle) - cycle) % cycle; track.style.transform = `translate3d(${offset}px,0,0)`; } };
    const animate = (time: number) => { offset -= cycle / 72000 * Math.min(time - previous, 50); previous = time; render(); frame = requestAnimationFrame(animate); };
    const down = (event: PointerEvent) => { if (event.pointerType === "mouse" && event.button !== 0) return; pointer = event.pointerId; lastX = event.clientX; };
    const move = (event: PointerEvent) => { if (event.pointerId !== pointer) return; ribbon.setPointerCapture(event.pointerId); ribbon.classList.add("is-dragging"); offset += event.clientX - lastX; lastX = event.clientX; render(); };
    const up = () => { pointer = null; ribbon.classList.remove("is-dragging"); };
    const observer = new ResizeObserver(() => { measure(); render(); }); observer.observe(group);
    ribbon.addEventListener("pointerdown", down); ribbon.addEventListener("pointermove", move); ribbon.addEventListener("pointerup", up); ribbon.addEventListener("pointercancel", up);
    measure(); if (!reduced.matches) frame = requestAnimationFrame(animate);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); ribbon.removeEventListener("pointerdown", down); ribbon.removeEventListener("pointermove", move); ribbon.removeEventListener("pointerup", up); ribbon.removeEventListener("pointercancel", up); };
  }, []);
  return <section ref={ribbonRef} className="work-ribbon overflow-hidden px-6 py-2" aria-label={label}><div ref={trackRef} className="work-ribbon-track flex w-max will-change-transform"><div ref={groupRef} className="work-ribbon-group flex flex-none">{projects.map(({ data }) => <ProjectCard project={data} locale={locale} key={data.slug} />)}</div><div className="work-ribbon-group flex flex-none" aria-hidden="true">{projects.map(({ data }) => <ProjectCard project={data} locale={locale} decorative key={data.slug} />)}</div></div></section>;
}
