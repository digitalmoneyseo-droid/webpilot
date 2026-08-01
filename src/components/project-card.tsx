import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ProjectVisual } from "@/components/project-visual";
import type { Project } from "@/lib/content";
import { localizePath, t, type Locale } from "@/lib/i18n";
import { projectCategoryLabel } from "@/lib/portfolio-taxonomy.mjs";

export function ProjectCard({ project, locale, decorative = false, className = "" }: { project: Project; locale: Locale; decorative?: boolean; className?: string }) {
  const primaryCategory = projectCategoryLabel(locale, project.categories[0]);
  const accessibleLabel = `${project.title}, ${primaryCategory}, ${project.year} — ${t(locale, "portfolio.viewProject")}`;
  return (
    <Link href={localizePath(`/portfolio/${project.slug}`, locale)} className={`project-card group relative isolate flex min-h-[520px] flex-col overflow-hidden rounded-card bg-surface shadow-[var(--ds-shadow-border)] [-webkit-user-drag:none] [.portfolio-ribbon_&]:h-auto [.portfolio-ribbon_&]:min-h-0 [.portfolio-ribbon_&]:w-[530px] [.portfolio-ribbon_&]:flex-none [.portfolio-ribbon_&]:aspect-[530/425] max-[900px]:[.portfolio-ribbon_&]:w-[min(82vw,440px)] max-[600px]:[.portfolio-ribbon_&]:w-[min(calc(100vw-32px),360px)] max-[600px]:[.portfolio-ribbon_&]:aspect-4/3 ${className}`} aria-label={decorative ? undefined : accessibleLabel} aria-hidden={decorative || undefined} tabIndex={decorative ? -1 : undefined}>
      <div className="project-card-top absolute inset-x-3.5 top-3.5 z-5 flex justify-between text-caption"><span className="rounded-control bg-white/84 px-2.25 py-1.5 backdrop-blur-[10px]">{primaryCategory}</span><span className="rounded-control bg-white/84 px-2.25 py-1.5 font-mono tracking-normal tabular-nums backdrop-blur-[10px]">{project.year}</span></div>
      <ProjectVisual project={project} />
      <div className="flex min-h-30 items-center justify-between gap-4 bg-surface p-5 [.portfolio-ribbon_&]:hidden"><div><h3 className="m-0 mb-2 text-heading-sm">{project.title}</h3><p className="m-0 text-card-body text-muted">{project.summary}</p></div><span className="relative grid size-10 flex-none place-items-center overflow-hidden rounded-pill shadow-surface transition-[background-color,color] duration-[250ms] ease-[var(--ease-out)] group-hover:bg-dark group-hover:text-white" aria-hidden="true"><ArrowRight className="project-card__arrow project-card__arrow--right absolute inset-[11px] size-[18px]" /><ArrowUpRight className="project-card__arrow project-card__arrow--up-right absolute inset-[11px] size-[18px]" /></span></div>
    </Link>
  );
}
