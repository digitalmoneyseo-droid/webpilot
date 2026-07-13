import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@/components/icons";

export function CtaButton({ href, children, light = false, external = false }: { href: string; children: React.ReactNode; light?: boolean; external?: boolean }) {
  const className = `pill-button${light ? " pill-button--light" : ""}`;
  if (external) return <a className={className} href={href} target="_blank" rel="noreferrer">{children}<ArrowUpRight /></a>;
  return <Link className={className} href={href}>{children}<ArrowRight /></Link>;
}

export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link className="text-link" href={href}>{children}<ArrowUpRight /></Link>;
}

