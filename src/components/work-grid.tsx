"use client";

import { useEffect, useState } from "react";
import { ProjectCard } from "@/components/project-card";
import type { ProjectEntry } from "@/lib/content";
import { t, type Locale } from "@/lib/i18n";
import type { MessageKey } from "@/i18n/translations";

type FilterId = "all" | "build" | "grow" | "automate";

const aliases: Record<string, string> = { Marke: "Brand", Wachstum: "Growth", Automatisierung: "Automation", Produkt: "Product" };
const normalize = (categories: string[]) => categories.map((category) => aliases[category] ?? category);
const filterValues: Record<FilterId, MessageKey> = {
  all: "work.filterAll",
  build: "work.filterBuild",
  grow: "work.filterGrow",
  automate: "work.filterAutomate",
};

function readFilter(value: string | null): FilterId {
  return value === "build" || value === "grow" || value === "automate" ? value : "all";
}

export function WorkGrid({ projects, locale }: { projects: ProjectEntry[]; locale: Locale }) {
  const filters: { value: FilterId; id: MessageKey; categories: string[] }[] = [
    { value: "all", id: filterValues.all, categories: [...new Set(projects.flatMap(({ data }) => normalize(data.categories)))] },
    { value: "build", id: filterValues.build, categories: ["Brand", "Website", "Product"] },
    { value: "grow", id: filterValues.grow, categories: ["Growth", "SEO & GEO", "Content", "Social", "Paid Media"] },
    { value: "automate", id: filterValues.automate, categories: ["AI", "Automation"] },
  ];
  const [active, setActive] = useState<FilterId>("all");

  useEffect(() => {
    const syncFromUrl = () => setActive(readFilter(new URLSearchParams(window.location.search).get("filter")));
    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

  const selectFilter = (value: FilterId) => {
    setActive(value);
    const url = new URL(window.location.href);
    url.searchParams.set("filter", value);
    window.history.pushState({ ...window.history.state, filter: value }, "", `${url.pathname}${url.search}${url.hash}`);
  };

  const selected = filters.find((filter) => filter.value === active) ?? filters[0]!;
  const visible = projects.filter(({ data }) => normalize(data.categories).some((category) => selected.categories.includes(category)));
  return (
    <section className="work-index px-page pt-0 pb-section">
      <div className="-mx-page mb-8 overflow-x-auto px-page pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div data-work-filters className="reveal relative mx-auto flex min-h-12 w-max min-w-full items-center justify-center gap-px rounded-lg bg-white p-1 shadow-[var(--ds-shadow-border-small)] max-[600px]:justify-start" data-reveal role="group" aria-label={t(locale, "work.filterLabel")}>
          {filters.map((filter) => <button type="button" key={filter.value} className={`relative z-1 min-h-11 shrink-0 cursor-pointer whitespace-nowrap rounded-md px-3.5 text-control transition-[color,scale] duration-[220ms] ease-[var(--ease-out)] hover:text-[#111] active:scale-[.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111] motion-reduce:transition-none motion-reduce:active:scale-100 ${active === filter.value ? "bg-[var(--ds-gray-alpha-100)] text-ink" : "bg-transparent text-muted"}`} aria-pressed={active === filter.value} onClick={() => selectFilter(filter.value)}>{t(locale, filter.id)}</button>)}
        </div>
      </div>
      <p className="sr-only" aria-live="polite">{visible.length} {t(locale, "work.projectCount")}</p>
      <div className="reveal grid origin-top grid-cols-2 gap-4 max-[900px]:grid-cols-1 max-[600px]:[&_.project-card]:min-h-[430px] max-[600px]:[&_.project-visual]:min-h-[330px]" data-reveal style={{ "--reveal-delay": "70ms" } as React.CSSProperties}>
        {visible.map(({ data }) => <ProjectCard project={data} locale={locale} key={data.slug} />)}
      </div>
    </section>
  );
}
