"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/project-card";
import type { ProjectEntry } from "@/lib/content";
import { t, type Locale } from "@/lib/i18n";

const aliases: Record<string, string> = { Marke: "Brand", Wachstum: "Growth", Automatisierung: "Automation", Produkt: "Product" };
const normalize = (categories: string[]) => categories.map((category) => aliases[category] ?? category);

export function WorkGrid({ projects, locale }: { projects: ProjectEntry[]; locale: Locale }) {
  const filters = [
    { id: "All", categories: [...new Set(projects.flatMap(({ data }) => normalize(data.categories)))] },
    { id: "Build", categories: ["Brand", "Website", "Product"] },
    { id: "Grow", categories: ["Growth", "SEO & GEO", "Content", "Social", "Paid Media"] },
    { id: "Automate", categories: ["AI", "Automation"] },
  ];
  const [active, setActive] = useState("All");
  const selected = filters.find((filter) => filter.id === active) ?? filters[0]!;
  const visible = projects.filter(({ data }) => normalize(data.categories).some((category) => selected.categories.includes(category)));
  return (
    <section className="work-index px-page py-section">
      <div className="filter-row relative mx-auto mb-8 flex h-11 w-fit gap-px rounded-xl bg-surface p-1 shadow-surface" role="group" aria-label={locale === "de" ? "Projekte nach Leistung filtern" : "Filter projects by service"}>
        {filters.map((filter) => <button type="button" key={filter.id} className={`relative z-1 h-9 min-h-9 cursor-pointer rounded-lg px-3.5 text-control font-medium text-[#696965] ${active === filter.id ? "is-active bg-[#f1f1ee]" : "bg-transparent"}`} aria-pressed={active === filter.id} onClick={() => setActive(filter.id)}>{t(locale, filter.id)}</button>)}
      </div>
      <p className="sr-only" aria-live="polite">{visible.length} {locale === "de" ? "Projekte" : "projects"}</p>
      <div className="work-grid grid grid-cols-2 gap-4 max-[900px]:grid-cols-1 max-[600px]:[&_.project-card]:min-h-[430px] max-[600px]:[&_.project-visual]:min-h-[330px]">
        {visible.map(({ data }) => <ProjectCard project={data} locale={locale} key={data.slug} />)}
      </div>
    </section>
  );
}
