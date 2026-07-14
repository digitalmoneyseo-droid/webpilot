import Link from "next/link";
import { CtaButton } from "@/components/buttons";
import { FinalCta } from "@/components/final-cta";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { projects } from "@/lib/content";

export function EditorialHero({ eyebrow, title, copy, index }: { eyebrow: string; title: string; copy?: string; index?: string }) {
  return <section className="editorial-hero"><div className="editorial-kicker"><span>{index ?? "Webpilot"}</span><span>{eyebrow}</span></div><h1>{title}</h1>{copy && <p>{copy}</p>}</section>;
}

export function RelatedWork({ title = "Related work", slugs }: { title?: string; slugs?: string[] }) {
  const selected = slugs ? slugs.map(slug => projects.find(project => project.slug === slug)).filter(Boolean) : projects.slice(0, 3);
  return <section className="related-work section-pad"><SectionHeading title={title} /><div className="related-grid">{selected.map(project => project && <ProjectCard project={project} key={project.slug} />)}</div></section>;
}

export function PageFrame({ children, cta = true }: { children: React.ReactNode; cta?: boolean }) {
  return <><main>{children}{cta && <FinalCta />}</main><SiteFooter /></>;
}

export function NumberedList({ items }: { items: { title: string; copy: string }[] }) {
  return <div className="numbered-list">{items.map((item, index) => <div key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.copy}</p></div>)}</div>;
}

export function ServiceLinkGrid({ services }: { services: { slug: string; title: string; eyebrow: string; summary: string }[] }) {
  return <div className="service-link-grid">{services.map((service, index) => <Link href={`/services/${service.slug}`} key={service.slug}><span>{String(index + 1).padStart(2, "0")} · {service.eyebrow}</span><h2>{service.title}</h2><p>{service.summary}</p><b>Explore ↗</b></Link>)}</div>;
}

export function SplitCta({ title, copy, href, label }: { title: string; copy: string; href: string; label: string }) {
  return <section className="split-cta"><h2>{title}</h2><div><p>{copy}</p><CtaButton href={href}>{label}</CtaButton></div></section>;
}
