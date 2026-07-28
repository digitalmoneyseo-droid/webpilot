import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ProjectVisual } from "@/components/project-visual";
import type { Project } from "@/lib/content";
import { localizePath, type Locale } from "@/lib/i18n";

export function ProjectCard({ project, locale, decorative = false, className = "" }: { project: Project; locale: Locale; decorative?: boolean; className?: string }) {
  return (
    <Link href={localizePath(`/work/${project.slug}`, locale)} className={`project-card group relative isolate flex min-h-[520px] flex-col overflow-hidden rounded-card bg-surface shadow-surface hover:shadow-surface-hover [.work-ribbon_&]:h-auto [.work-ribbon_&]:min-h-0 [.work-ribbon_&]:w-[530px] [.work-ribbon_&]:flex-none [.work-ribbon_&]:aspect-[530/425] max-[900px]:[.work-ribbon_&]:w-[min(82vw,440px)] max-[600px]:[.work-ribbon_&]:w-[min(calc(100vw-32px),360px)] max-[600px]:[.work-ribbon_&]:aspect-4/3 ${className}`} aria-hidden={decorative || undefined} tabIndex={decorative ? -1 : undefined}>
      <div className="project-card-top absolute inset-x-3.5 top-3.5 z-5 flex justify-between text-caption"><span className="rounded-control bg-white/84 px-2.25 py-1.5 backdrop-blur-[10px]">{project.categories[0]}</span><span className="rounded-control bg-white/84 px-2.25 py-1.5 backdrop-blur-[10px]">{project.year}</span></div>
      <ProjectVisual project={project} />
      <div className="project-card-copy flex min-h-30 items-center justify-between gap-4 bg-surface p-5 [.work-ribbon_&]:hidden"><div><h3 className="m-0 mb-2 text-heading-sm font-semibold">{project.title}</h3><p className="m-0 text-card-body text-muted">{project.summary}</p></div><span className="round-arrow relative grid size-10 flex-none place-items-center overflow-hidden rounded-pill shadow-surface group-hover:bg-dark group-hover:text-white" aria-hidden="true"><ArrowRight className="round-arrow__icon round-arrow__icon--right absolute inset-[11px] size-[18px]" /><ArrowUpRight className="round-arrow__icon round-arrow__icon--up-right absolute inset-[11px] size-[18px]" /></span></div>
    </Link>
  );
}
