import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { ProjectVisual } from "@/components/project-visual";
import type { Project } from "@/lib/content";

export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <Link href={`/work/${project.slug}`} className={`project-card${featured ? " project-card--featured" : ""}`}>
      <div className="project-card-top"><span>{project.categories[0]}</span><span>{project.year}</span></div>
      <ProjectVisual project={project} compact={!featured} />
      <div className="project-card-copy"><div><h3>{project.title}</h3><p>{project.categories.join(" · ")}</p></div><span className="round-arrow"><ArrowUpRight /></span></div>
    </Link>
  );
}

