"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, MenuIcon, Plus } from "@/components/icons";
import { BrandMark } from "@/components/brand-mark";

const links = [
  ["Work", "/work"], ["Services", "/services"], ["About", "/about"],
  ["Insights", "/insights"], ["Contact", "/contact"],
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    if (open) window.addEventListener("keydown", closeOnEscape);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", closeOnEscape); };
  }, [open]);

  return (
    <>
      <header className="site-header">
        <Link href="/" className="header-mark" aria-label="Fifth Signal home"><BrandMark /></Link>
        <Link href="/work" className="header-pill">Recent work</Link>
        <button className="header-menu" type="button" onClick={() => setOpen(true)} aria-label="Open navigation" aria-expanded={open}>
          <MenuIcon /> <span>Menu</span>
        </button>
      </header>

      <div className={`menu-overlay${open ? " is-open" : ""}`} aria-hidden={!open} role="dialog" aria-modal="true" aria-label="Site navigation">
        <div className="menu-top">
          <Link href="/" onClick={() => setOpen(false)} className="menu-brand"><BrandMark inverse /><span>Fifth Signal</span></Link>
          <button type="button" className="menu-close" onClick={() => setOpen(false)} aria-label="Close navigation"><Plus /></button>
        </div>
        <nav className="menu-links" aria-label="Main navigation">
          {links.map(([label, href], index) => (
            <Link href={href} key={href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
              <span>{String(index + 1).padStart(2, "0")}</span>{label}<ArrowUpRight />
            </Link>
          ))}
        </nav>
        <div className="menu-bottom"><span>Berlin · Working worldwide</span><a href="mailto:hello@fifthsignal.studio">hello@fifthsignal.studio</a></div>
      </div>
    </>
  );
}
