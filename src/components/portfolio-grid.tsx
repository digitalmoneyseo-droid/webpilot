"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ProjectCard } from "@/components/project-card";
import type { ProjectEntry } from "@/lib/content";
import { t, type Locale } from "@/lib/i18n";
import { parseProjectFilter, projectFilterIds, projectMatchesFilter, type ProjectFilter } from "@/lib/portfolio-taxonomy.mjs";
import type { MessageKey } from "@/i18n/translations";

type FilterIndicator = { x: number; width: number };

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

const filterValues: Record<ProjectFilter, MessageKey> = {
  all: "portfolio.filterAll",
  build: "portfolio.filterBuild",
  grow: "portfolio.filterGrow",
  automate: "portfolio.filterAutomate",
};

export function PortfolioGrid({ projects, locale }: { projects: ProjectEntry[]; locale: Locale }) {
  const filters = projectFilterIds.map((value) => ({ value, id: filterValues[value] }));
  const [active, setActive] = useState<ProjectFilter>("all");
  const filterRailRef = useRef<HTMLDivElement>(null);
  const filterButtonRefs = useRef<Record<ProjectFilter, HTMLButtonElement | null>>({ all: null, build: null, grow: null, automate: null });
  const [indicator, setIndicator] = useState<FilterIndicator | null>(null);

  useEffect(() => {
    const syncFromUrl = () => setActive(parseProjectFilter(new URLSearchParams(window.location.search).get("filter")));
    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

  useIsomorphicLayoutEffect(() => {
    const rail = filterRailRef.current;
    const button = filterButtonRefs.current[active];
    if (!rail || !button) return;

    const measureIndicator = () => {
      const next = { x: button.offsetLeft, width: button.offsetWidth };
      setIndicator((current) => current && Math.abs(current.x - next.x) < 0.1 && Math.abs(current.width - next.width) < 0.1 ? current : next);
    };

    measureIndicator();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measureIndicator);
    observer.observe(rail);
    return () => observer.disconnect();
  }, [active, locale]);

  const selectFilter = (value: ProjectFilter) => {
    setActive(value);
    const url = new URL(window.location.href);
    url.searchParams.set("filter", value);
    window.history.pushState({ ...window.history.state, filter: value }, "", `${url.pathname}${url.search}${url.hash}`);
  };

  const visible = projects.filter(({ data }) => projectMatchesFilter(data.categories, active));
  return (
    <section className="portfolio-index px-page pt-0 pb-section">
      <div className="reveal -mx-page mb-8 overflow-x-auto px-page pt-px pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" data-reveal>
        <div ref={filterRailRef} data-portfolio-filters className="relative mx-auto flex h-11 w-max items-center justify-center gap-px rounded-[12px] bg-white p-1 shadow-surface max-[600px]:mx-0" role="group" aria-label={t(locale, "portfolio.filterLabel")}>
          {indicator && <span className="pointer-events-none absolute top-1 bottom-1 left-0 z-0 rounded-lg transition-[transform,width] duration-250 ease-[var(--ease-out)] motion-reduce:transition-none" style={{ width: indicator.width, transform: `translate3d(${indicator.x}px, 0, 0)` }} aria-hidden="true"><span className="filter-indicator-fill absolute inset-0 rounded-lg bg-[var(--ds-gray-alpha-100)]" /></span>}
          {filters.map((filter) => {
            const isActive = active === filter.value;
            return <button ref={(button) => { filterButtonRefs.current[filter.value] = button; }} type="button" key={filter.value} className={`relative z-1 inline-flex h-9 shrink-0 cursor-pointer items-center whitespace-nowrap rounded-lg bg-transparent px-3.5 text-navigation transition-[color,background-color,scale] duration-150 active:scale-[.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111] motion-reduce:transition-none motion-reduce:active:scale-100 ${isActive ? "text-ink" : "text-muted hover:text-ink"}`} aria-pressed={isActive} onClick={() => selectFilter(filter.value)}>{t(locale, filter.id)}</button>;
          })}
        </div>
      </div>
      <p className="sr-only" aria-live="polite">{visible.length} {t(locale, "portfolio.projectCount")}</p>
      <div className="reveal grid origin-top grid-cols-2 gap-4 max-[900px]:grid-cols-1 max-[600px]:[&_.project-card]:min-h-[430px] max-[600px]:[&_.project-visual]:min-h-[330px]" data-reveal style={{ "--reveal-delay": "70ms" } as React.CSSProperties}>
        {visible.map(({ data }, index) => <div key={`${active}-${data.slug}`} className="filter-card-enter" style={{ "--filter-card-delay": `${index * 35}ms` } as React.CSSProperties}><ProjectCard project={data} locale={locale} /></div>)}
      </div>
    </section>
  );
}
