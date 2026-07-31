"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/project-card";
import type { ProjectEntry } from "@/lib/content";
import { t, type Locale } from "@/lib/i18n";
import type { MessageKey } from "@/i18n/translations";

const aliases: Record<string, string> = { Marke: "Brand", Wachstum: "Growth", Automatisierung: "Automation", Produkt: "Product" };
const normalize = (categories: string[]) => categories.map((category) => aliases[category] ?? category);

export function WorkGrid({ projects, locale }: { projects: ProjectEntry[]; locale: Locale }) {
  const filters: { id: MessageKey; categories: string[] }[] = [
    { id: "work.filterAll", categories: [...new Set(projects.flatMap(({ data }) => normalize(data.categories)))] },
    { id: "work.filterBuild", categories: ["Brand", "Website", "Product"] },
    { id: "work.filterGrow", categories: ["Growth", "SEO & GEO", "Content", "Social", "Paid Media"] },
    { id: "work.filterAutomate", categories: ["AI", "Automation"] },
  ];
  const [active, setActive] = useState<MessageKey>("work.filterAll");
  const selected = filters.find((filter) => filter.id === active) ?? filters[0]!;
  const visible = projects.filter(({ data }) => normalize(data.categories).some((category) => selected.categories.includes(category)));
  return (
    <section className="work-index px-page pt-0 pb-section">
      <div className="reveal relative mx-auto mb-8 flex h-11 w-fit gap-px rounded-lg bg-white p-1 shadow-[var(--ds-shadow-border-small)]" data-reveal role="group" aria-label={t(locale, "work.filterLabel")}>
        {filters.map((filter) => <button type="button" key={filter.id} className={`relative z-1 h-9 min-h-9 cursor-pointer rounded-md px-3.5 text-control transition-[color,scale] duration-[220ms] ease-[var(--ease-out)] hover:text-[#111] active:scale-[.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111] motion-reduce:transition-none motion-reduce:active:scale-100 ${active === filter.id ? "bg-[var(--ds-gray-alpha-100)] text-ink" : "bg-transparent text-muted"}`} aria-pressed={active === filter.id} onClick={() => setActive(filter.id)}>{t(locale, filter.id)}</button>)}
      </div>
      <p className="sr-only" aria-live="polite">{visible.length} {t(locale, "work.projectCount")}</p>
      <div className="reveal grid origin-top grid-cols-2 gap-4 max-[900px]:grid-cols-1 max-[600px]:[&_.project-card]:min-h-[430px] max-[600px]:[&_.project-visual]:min-h-[330px]" data-reveal style={{ "--reveal-delay": "70ms" } as React.CSSProperties}>
        {visible.map(({ data }) => <ProjectCard project={data} locale={locale} key={data.slug} />)}
      </div>
    </section>
  );
}
