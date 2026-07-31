import { Info } from "lucide-react";
import { EditorialHero } from "@/components/editorial-hero";
import { FinalCta } from "@/components/final-cta";
import { WorkGrid } from "@/components/work-grid";
import { getProjects } from "@/lib/content";
import { t, type Locale } from "@/lib/i18n";

export function WorkIndexPage({ locale }: { locale: Locale }) {
  const projects = getProjects(locale);
  return <main id="main-content"><EditorialHero title={t(locale, "work.title")} copy={t(locale, "work.copy")}><p className="mx-auto mt-2 flex w-fit max-w-4xl items-start gap-3 rounded-control border-0 bg-[var(--ds-blue-100)] px-4 py-3 text-left text-small font-normal text-muted shadow-[inset_0_0_0_1px_var(--ds-blue-300)]"><Info className="mt-0.5 size-4 shrink-0 text-[var(--wave-blue)]" strokeWidth={1.8} aria-hidden="true" /><span>{t(locale, "home.fictionNote")}</span></p></EditorialHero><WorkGrid projects={projects} locale={locale} /><FinalCta locale={locale} /></main>;
}
