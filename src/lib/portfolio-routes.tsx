import "server-only";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocaleShell } from "@/components/locale-shell";
import { PortfolioDetailPage } from "@/components/pages/portfolio-detail-page";
import { PortfolioIndexPage } from "@/components/pages/portfolio-index-page";
import { getProjects } from "@/lib/content";
import { localizePath, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/site";

export type PortfolioDetailRouteProps = { params: Promise<{ project: string }> };

const indexCopy: Record<Locale, { title: string; description: string }> = {
  de: { title: "Portfolio", description: "Ausgewählte fiktive Portfolioprojekte für Marken, Digital, Wachstum und KI." },
  en: { title: "Portfolio", description: "Selected fictional portfolio projects across brand, digital, growth, and AI." },
};

function createPortfolioRoutes(locale: Locale) {
  const indexPath = localizePath("/portfolio", locale);
  const indexMetadata: Metadata = pageMetadata({ locale, pathname: indexPath, ...indexCopy[locale] });

  function generateStaticParams() {
    return getProjects(locale).map(({ data }) => ({ project: data.slug }));
  }

  async function generateMetadata({ params }: PortfolioDetailRouteProps): Promise<Metadata> {
    const { project: slug } = await params;
    const project = getProjects(locale).find(({ data }) => data.slug === slug);
    return project ? pageMetadata({ locale, pathname: localizePath(`/portfolio/${slug}`, locale), title: project.data.title, description: project.data.summary, indexable: false, article: true }) : {};
  }

  function IndexPage() {
    return <LocaleShell locale={locale} pathname={indexPath}><PortfolioIndexPage locale={locale} /></LocaleShell>;
  }

  async function DetailPage({ params }: PortfolioDetailRouteProps) {
    const { project: slug } = await params;
    const projects = getProjects(locale);
    const project = projects.find(({ data }) => data.slug === slug);
    if (!project) notFound();
    const pathname = localizePath(`/portfolio/${slug}`, locale);
    const related = projects.filter((entry) => entry.id !== project.id).slice(0, 3);
    return <LocaleShell locale={locale} pathname={pathname}><PortfolioDetailPage locale={locale} project={project} related={related} /></LocaleShell>;
  }

  return { indexPath, indexMetadata, generateStaticParams, generateMetadata, IndexPage, DetailPage };
}

export const portfolioRoutes = {
  de: createPortfolioRoutes("de"),
  en: createPortfolioRoutes("en"),
};
