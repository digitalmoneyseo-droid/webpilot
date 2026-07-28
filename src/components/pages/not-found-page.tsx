import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LocaleShell } from "@/components/locale-shell";
import { localizePath, type Locale } from "@/lib/i18n";

export function NotFoundPage({ locale, pathname }: { locale: Locale; pathname: string }) {
  return <LocaleShell locale={locale} pathname={pathname}><main id="main-content" className="not-found grid min-h-[70vh] place-items-center px-page py-section text-center"><div><p className="text-label uppercase text-muted">404</p><h1 className="mt-4 text-display-sm font-semibold">{locale === "de" ? "Dieses Signal ist verloren gegangen." : "That signal got lost."}</h1><p className="mx-auto mt-5 max-w-narrow text-body-lg text-muted">{locale === "de" ? "Die gesuchte Seite existiert nicht oder wurde verschoben." : "The page you’re looking for does not exist or has moved."}</p><Link className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-pill bg-dark px-5 text-white" href={localizePath("/", locale)}><ArrowLeft className="size-4" />{locale === "de" ? "Zurück zum Studio" : "Back to the studio"}</Link></div></main></LocaleShell>;
}
