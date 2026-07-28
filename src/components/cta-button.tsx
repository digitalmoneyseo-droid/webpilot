import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export function CtaButton({ href, light = false, className = "", children }: { href: string; light?: boolean; className?: string; children: React.ReactNode }) {
  return (
    <Link className={`pill-button inline-flex min-h-[var(--control-height-lg)] items-center gap-3.5 rounded-pill py-0 pr-2.5 pl-[var(--control-padding-x)] text-control font-medium shadow-dark-surface max-[600px]:justify-between ${light ? "pill-button--light bg-white text-ink" : "bg-dark text-white"} ${className}`} href={href}>
      <span className="pill-button__label block h-[1.2em] overflow-hidden leading-control">
        <span className="pill-button__label-track flex h-[200%] flex-col">
          <span className="pill-button__label-copy flex flex-[0_0_50%] items-center whitespace-nowrap">{children}</span>
          <span className="pill-button__label-copy flex flex-[0_0_50%] items-center whitespace-nowrap" aria-hidden="true">{children}</span>
        </span>
      </span>
      <span className="pill-button__icon relative size-[var(--control-icon-size)] flex-none overflow-hidden rounded-pill bg-white text-ink" aria-hidden="true">
        <ArrowRight className="pill-button__arrow pill-button__arrow--right absolute inset-[7px] size-[18px]" strokeWidth={1.7} />
        <ArrowUpRight className="pill-button__arrow pill-button__arrow--up-right absolute inset-[7px] size-[18px] opacity-0 [transform:translate(-6px,6px)_scale(.8)]" strokeWidth={1.7} />
      </span>
    </Link>
  );
}
