"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/content";

const filters = ["All", "Brand", "Website", "Product", "Growth", "SEO & GEO", "Content", "Social", "Paid Media", "AI", "Automation"];

export function PortfolioGrid() {
  const [active, setActive] = useState("All");
  const visible = active === "All" ? projects : projects.filter((project) => project.categories.includes(active));
  return <><div className="filter-row" role="group" aria-label="Filter projects">{filters.map(filter => <button key={filter} type="button" className={active === filter ? "is-active" : ""} onClick={() => setActive(filter)}>{filter}</button>)}</div><div className="work-grid">{visible.map((project, index) => <ProjectCard project={project} featured={index === 0 && active === "All"} key={project.slug} />)}</div></>;
}
