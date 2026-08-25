import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export function CtaButton({ href, light = false, className = "", children }: { href: string; light?: boolean; className?: string; children: React.ReactNode }) {
  return (
    <Link className={`pill-button inline-flex min-h-[52px] items-center gap-3.5 rounded-pill py-0 pr-2.5 pl-4 text-ui font-semibold shadow-dark-surface max-narrow:justify-between ${light ? "pill-button--light bg-white text-ink" : "pill-button--dark bg-inverse-surface text-white"} ${className}`} href={href}>
      <span className="block h-[1.5em] overflow-hidden leading-control">
        <span className="pill-button__label-track flex h-[200%] flex-col">
          <span className="flex h-[1.5em] shrink-0 items-center whitespace-nowrap">{children}</span>
          <span className="flex h-[1.5em] shrink-0 items-center whitespace-nowrap" aria-hidden="true">{children}</span>
        </span>
      </span>
      <span className="pill-button__icon relative size-8 flex-none overflow-hidden rounded-pill bg-white text-ink" aria-hidden="true">
        <ArrowRight className="pill-button__arrow pill-button__arrow--right absolute inset-[7px] size-[18px]" strokeWidth={1.7} />
        <ArrowUpRight className="pill-button__arrow pill-button__arrow--up-right absolute inset-[7px] size-[18px] opacity-0 [transform:translate(-6px,6px)_scale(.8)]" strokeWidth={1.7} />
      </span>
    </Link>
  );
}
