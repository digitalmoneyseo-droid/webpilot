import { FinalCta } from "@/components/final-cta";
import { ProjectCard } from "@/components/project-card";
import { ProjectVisual } from "@/components/project-visual";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import type { ProjectEntry } from "@/lib/content";
import { t, type Locale } from "@/lib/i18n";
import { projectCategoryLabel } from "@/lib/portfolio-taxonomy.mjs";

export function PortfolioDetailPage({ locale, project, related }: { locale: Locale; project: ProjectEntry; related: ProjectEntry[] }) {
  const p = project.data;
  const narratives = [
    [t(locale, "portfolio.challenge"), p.challenge],
    [t(locale, "portfolio.strategy"), p.strategy],
    [t(locale, "portfolio.execution"), p.execution],
  ] as const;

  return (
    <main id="main-content">
      <article className="case-study">
        <header className="case-hero reveal px-page pt-[5.75rem] text-center" data-reveal>
          <h1 className="mx-auto mt-16 mb-6 max-w-hero text-display-sm">{p.title}</h1>
          <p className="mx-auto max-w-narrow text-lead text-muted">{p.summary}</p>
          <p className="mx-auto mt-6 max-w-4xl rounded-control bg-[var(--ds-blue-100)] px-4 py-3 text-left text-small text-[var(--ds-gray-900)] shadow-[inset_0_0_0_1px_var(--ds-blue-300)]">
            {t(locale, "portfolio.fictionNote")}
          </p>
          <div className="case-visual-wrap mt-12 h-[760px] overflow-hidden rounded-card max-[900px]:h-[560px] max-[600px]:h-[430px] [&_.project-visual]:h-full">
            <ProjectVisual project={p} />
          </div>
        </header>

        <dl className="case-summary reveal grid grid-cols-[1.5fr_1fr_1fr] gap-3 px-page pt-6 pb-section-compact max-[900px]:grid-cols-2 max-[600px]:grid-cols-1" data-reveal>
          <div className="flex min-h-[210px] flex-col rounded-card bg-surface p-6 shadow-surface max-[900px]:col-span-full">
            <dt className="text-caption text-[#888]">{t(locale, "portfolio.result")}</dt>
            <dd className="mt-auto">
              <strong className="block text-display-sm tabular-nums">{p.metric}</strong>
              <p className="mt-2 text-body text-[#555]">{p.metricLabel}</p>
            </dd>
          </div>
          <div className="flex min-h-[210px] flex-col rounded-card bg-surface p-6 shadow-surface">
            <dt className="text-caption text-[#888]">{t(locale, "portfolio.timeline")}</dt>
            <dd className="mt-auto text-heading-md">{p.timeline}</dd>
          </div>
          <div className="flex min-h-[210px] flex-col rounded-card bg-surface p-6 shadow-surface">
            <dt className="text-caption text-[#888]">{t(locale, "portfolio.services")}</dt>
            <dd className="mt-auto text-body text-[#555]">{p.categories.map((category) => projectCategoryLabel(locale, category)).join(", ")}</dd>
          </div>
        </dl>

        <section className="case-narrative px-page py-section-compact">
          {narratives.map(([label, copy], index) => (
            <div className="reveal grid grid-cols-[180px_1fr] gap-12 border-t border-line py-12 max-[600px]:grid-cols-1 max-[600px]:gap-4" data-reveal style={{ "--reveal-delay": `${index * 50}ms` } as React.CSSProperties} key={label}>
              <h2 className="m-0 text-heading-sm">
                <span className="mr-2 text-caption tabular-nums text-[#777]">0{index + 1} ·</span>
                {label}
              </h2>
              <p className="m-0 max-w-reading text-body-lg text-[#555]">{copy}</p>
            </div>
          ))}
        </section>

        <section className="case-tools reveal mx-auto grid max-w-layout grid-cols-[200px_1fr] border-b border-line py-section-compact max-[600px]:grid-cols-1 max-[600px]:gap-6" data-reveal>
          <span className="font-mono text-label uppercase">{t(locale, "portfolio.technology")}</span>
          <div className="flex flex-wrap gap-2">{p.tools.map((tool) => <i className="rounded-xl border border-[#ccc] px-[13px] py-[9px] text-caption not-italic" key={tool}>{tool}</i>)}</div>
        </section>
      </article>

      <section className="related-portfolio px-page py-section">
        <SectionHeading title={t(locale, "portfolio.next")} align="center" />
        <div className="related-grid grid grid-cols-3 gap-4 max-[900px]:grid-cols-1">{related.map(({ data }, index) => <Reveal className="h-full" delay={index * 55} key={data.slug}><ProjectCard project={data} locale={locale} /></Reveal>)}</div>
      </section>
      <FinalCta locale={locale} />
    </main>
  );
}
