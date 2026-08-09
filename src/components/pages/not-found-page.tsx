import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LocaleShell } from "@/components/locale-shell";
import { localizePath, t, type Locale } from "@/lib/i18n";

export function NotFoundPage({ locale, pathname }: { locale: Locale; pathname: string }) {
  return <LocaleShell locale={locale} pathname={pathname}><main id="main-content" className="grid min-h-[70vh] place-items-center px-page py-section text-center"><div><p className="font-mono text-label uppercase text-muted">404</p><h1 className="mt-4 text-display-sm">{t(locale, "notFound.title")}</h1><p className="mx-auto mt-5 max-w-narrow text-body-lg text-muted">{t(locale, "notFound.copy")}</p><Link className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-pill bg-dark px-5 text-control text-white shadow-dark-surface transition-[background-color,scale,box-shadow] duration-150 hover:bg-inverse-surface hover:shadow-dark-surface-hover active:scale-[.96] motion-reduce:transition-none motion-reduce:active:scale-100" href={localizePath("/", locale)}><ArrowLeft className="size-4" aria-hidden="true" />{t(locale, "notFound.back")}</Link></div></main></LocaleShell>;
}
