import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocaleShell } from "@/components/locale-shell";
import { WorkDetailPage } from "@/components/pages/work-detail-page";
import { getProjects } from "@/lib/content";
import { pageMetadata } from "@/lib/site";

type Props = { params: Promise<{ project: string }> };
export function generateStaticParams() { return getProjects("en").map(({ data }) => ({ project: data.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { project: slug } = await params; const project = getProjects("en").find(({ data }) => data.slug === slug); return project ? pageMetadata({ locale: "en", pathname: `/en/work/${slug}`, title: project.data.title, description: project.data.summary, indexable: false, article: true }) : {}; }
export default async function Page({ params }: Props) { const { project: slug } = await params; const projects = getProjects("en"); const project = projects.find(({ data }) => data.slug === slug); if (!project) notFound(); return <LocaleShell locale="en" pathname={`/en/work/${slug}`}><WorkDetailPage locale="en" project={project} related={projects.filter((entry) => entry.id !== project.id).slice(0, 3)} /></LocaleShell>; }
