import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { NotFoundCopy } from "@/i18n/not-found";

export function NotFoundPage({ copy, homeHref }: { copy: NotFoundCopy; homeHref: string }) {
  return <main id="main-content" className="grid min-h-[70vh] place-items-center px-page py-section text-center"><div><p className="font-mono text-label uppercase text-muted">404</p><h1 className="mt-4 text-display-sm">{copy.title}</h1><p className="mx-auto mt-5 max-w-narrow text-body-lg text-muted">{copy.copy}</p><Link className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-pill bg-dark px-5 text-control text-white shadow-dark-surface transition-[background-color,scale,box-shadow] duration-150 hover:bg-inverse-surface hover:shadow-dark-surface-hover active:scale-[.96] motion-reduce:transition-none motion-reduce:active:scale-100" href={homeHref}><ArrowLeft className="size-4" aria-hidden="true" />{copy.back}</Link></div></main>;
}
