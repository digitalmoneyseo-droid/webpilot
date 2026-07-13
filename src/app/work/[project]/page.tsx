import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageFrame, RelatedWork } from "@/components/editorial";
import { ProjectVisual } from "@/components/project-visual";
import { getProject, projects } from "@/lib/content";

export function generateStaticParams() { return projects.map(project => ({ project: project.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ project: string }> }): Promise<Metadata> {
  const { project: slug } = await params; const project = getProject(slug);
  return project ? { title: project.title, description: project.summary } : {};
}

export default async function ProjectPage({ params }: { params: Promise<{ project: string }> }) {
  const { project: slug } = await params; const project = getProject(slug); if (!project) notFound();
  return <PageFrame><article className="case-study"><header className="case-hero"><div className="case-meta"><span>{project.categories.join(" · ")}</span><span>{project.year}</span></div><h1>{project.title}</h1><p>{project.summary}</p><div className="case-visual-wrap"><ProjectVisual project={project} /></div></header><section className="case-summary"><div><span>Placeholder result</span><strong>{project.metric}</strong><p>{project.metricLabel}</p></div><div><span>Timeline</span><h2>{project.timeline}</h2></div><div><span>Services</span><p>{project.categories.join(", ")}</p></div></section><section className="case-narrative"><div><span>01 · Challenge</span><h2>{project.challenge}</h2></div><div><span>02 · Strategy</span><p>{project.strategy}</p></div><div><span>03 · Execution</span><p>{project.execution}</p></div></section><section className="case-quote"><span>Placeholder testimonial</span><blockquote>“The work gave our whole team a clearer story, a stronger system, and much better evidence for the decisions we make.”</blockquote><p>Fictional client · Private concept</p></section><section className="case-tools"><span>Technology used</span><div>{project.tools.map(tool => <i key={tool}>{tool}</i>)}</div></section></article><RelatedWork title="Next case studies" slugs={projects.filter(item => item.slug !== project.slug).slice(0, 3).map(item => item.slug)} /></PageFrame>;
}

