"use client";

import Link from "next/link";
import { ArrowUpRight, Languages, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BrandMark } from "@/components/brand-mark";
import { alternatePath, localizePath, studioLocation, t, type Locale } from "@/lib/i18n";

function LanguageLink({ dark = false, locale, otherLocale, pathname }: { dark?: boolean; locale: Locale; otherLocale: Locale; pathname: string }) {
  return (
    <Link className={`header-language inline-flex h-11 cursor-pointer items-center justify-center gap-[7px] rounded-[12px] border-0 px-3 text-navigation ${dark ? "menu-language fixed top-[22px] right-[74px] z-2 bg-transparent text-white shadow-dark-surface max-[900px]:right-[67px]" : "bg-white text-[#73736f] shadow-surface max-[900px]:fixed max-[900px]:top-[22px] max-[900px]:right-[65px]"}`} href={alternatePath(pathname, otherLocale)} aria-label={t(otherLocale, "nav.switchLocale")}>
      <span className={`relative size-[19px] flex-none overflow-hidden ${dark ? "text-white" : "text-[#111]"}`} aria-hidden="true">
        <Languages className="header-language__icon header-language__icon--out absolute inset-0 size-[19px]" strokeWidth={1.7} />
        <Languages className="header-language__icon header-language__icon--in absolute inset-0 size-[19px] opacity-0 [transform:translate(-6px,6px)_scale(.8)]" strokeWidth={1.7} />
      </span>
      <span className="block h-[1.5em] overflow-hidden leading-navigation">
        <span className="header-language__label-track flex h-[200%] flex-col">
          {[false, true].map((hidden) => (
            <span key={String(hidden)} className="header-language__row flex h-[1.5em] shrink-0 items-center gap-[3px] whitespace-nowrap" aria-hidden={hidden || undefined}>
              <span className={locale === "de" ? "is-active" : ""}>DE</span>
              <i className={`not-italic ${dark ? "text-white/50" : "text-[#c3c3be]"}`}>/</i>
              <span className={locale === "en" ? "is-active" : ""}>EN</span>
            </span>
          ))}
        </span>
      </span>
    </Link>
  );
}

export function SiteHeader({ locale, pathname }: { locale: Locale; pathname: string }) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef<HTMLButtonElement>(null);
  const otherLocale: Locale = locale === "de" ? "en" : "de";
  const isActive = (href: string) => {
    const localized = localizePath(href, locale);
    return pathname === localized || pathname.startsWith(`${localized}/`);
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const focusTimer = open ? window.setTimeout(() => closeRef.current?.focus(), 50) : undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        openRef.current?.focus();
        return;
      }
      if (open && event.key === "Tab") {
        const dialog = document.getElementById("site-menu");
        if (!dialog) return;
        const focusables = dialog.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
        if (!focusables.length) return;
        const first = focusables[0]!;
        const last = focusables[focusables.length - 1]!;
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      if (focusTimer !== undefined) window.clearTimeout(focusTimer);
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const navItems = [
    { href: "/work", label: t(locale, "nav.work") },
    { href: "/solutions", label: t(locale, "nav.solutions") },
    { href: "/about", label: t(locale, "nav.about") },
    { href: "/contact", label: t(locale, "nav.contact") },
  ];
  return (
    <>
      <header className="fixed top-[22px] left-1/2 z-50 flex w-max -translate-x-1/2 items-center gap-2 max-[900px]:left-[15px] max-[900px]:[translate:none]">
        <Link href={localizePath("/", locale)} className="group/brand inline-flex h-11 items-center justify-center rounded-[12px] bg-white px-[17px] shadow-surface transition-transform duration-150 active:scale-[.96] motion-reduce:transition-none motion-reduce:active:scale-100" aria-label={t(locale, "nav.brandHome")}><BrandMark /></Link>
        <nav className="relative inline-flex h-11 items-center justify-center gap-px rounded-[12px] bg-white p-1 shadow-surface max-[900px]:hidden" aria-label={t(locale, "nav.mainMenu")}>
          {navItems.map((item) => <Link key={item.href} href={localizePath(item.href, locale)} className={`relative z-1 inline-flex h-9 items-center rounded-lg px-3.5 text-navigation transition-[color,background-color,scale] duration-150 active:scale-[.96] motion-reduce:transition-none motion-reduce:active:scale-100 ${isActive(item.href) ? "bg-[var(--ds-gray-alpha-100)] text-ink" : "text-muted hover:bg-[var(--ds-gray-alpha-100)] hover:text-ink"}`} aria-current={isActive(item.href) ? "page" : undefined}>{item.label}</Link>)}
        </nav>
        <LanguageLink locale={locale} otherLocale={otherLocale} pathname={pathname} />
        <button ref={openRef} className="fixed top-[22px] right-[15px] inline-flex size-11 items-center justify-center rounded-[12px] bg-white shadow-surface transition-transform duration-150 active:scale-[.96] motion-reduce:transition-none motion-reduce:active:scale-100 min-[901px]:hidden" type="button" onClick={() => setOpen(true)} aria-label={t(locale, "nav.openMenu")} aria-expanded={open} aria-controls="site-menu"><Menu className="w-[17px]" strokeWidth={1.7} /></button>
      </header>
      <div id="site-menu" className={`fixed inset-0 z-100 flex flex-col overscroll-contain bg-[#101010] px-[clamp(24px,5vw,76px)] pt-6 pb-[34px] text-white transition-[opacity,transform,visibility] duration-300 ease-[var(--ease-out)] min-[901px]:hidden max-[900px]:overflow-y-auto max-[600px]:px-[18px] motion-reduce:transition-none ${open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-3 opacity-0"}`} aria-hidden={!open} inert={!open} role="dialog" aria-modal="true" aria-label={t(locale, "nav.siteMenu")}>
        <div className="menu-top flex items-center justify-between">
          <Link href={localizePath("/", locale)} onClick={() => setOpen(false)} className="group/brand fixed top-[22px] left-[15px] z-2 inline-flex h-11 items-center rounded-[12px] bg-[#101010] px-[17px] shadow-dark-surface transition-[background-color,scale] duration-150 hover:bg-white/8 active:scale-[.96] motion-reduce:transition-none motion-reduce:active:scale-100"><BrandMark inverse /></Link>
          <LanguageLink dark locale={locale} otherLocale={otherLocale} pathname={pathname} />
          <button ref={closeRef} type="button" className="fixed top-[22px] right-[15px] z-2 grid size-11 place-items-center rounded-[12px] bg-transparent text-white shadow-dark-surface transition-[background-color,scale] duration-150 hover:bg-white/8 active:scale-[.96] motion-reduce:transition-none motion-reduce:active:scale-100" onClick={() => { setOpen(false); openRef.current?.focus(); }} aria-label={t(locale, "nav.closeMenu")}><X className="w-[19px]" strokeWidth={1.7} /></button>
        </div>
        <nav className="menu-links my-auto flex flex-col self-stretch max-[900px]:w-full max-[900px]:max-w-[44rem]" aria-label={t(locale, "nav.mainMenu")}>
          {navItems.map((item, index) => <Link key={item.href} className="group/menu-link grid grid-cols-[3rem_minmax(0,1fr)_2rem] items-center border-b border-white/13 py-2.5 text-heading-md max-[900px]:min-h-18 max-[600px]:grid-cols-[2rem_minmax(0,1fr)_1.5rem]" href={localizePath(item.href, locale)} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}><span className="text-caption tabular-nums text-[#929292]">{String(index + 1).padStart(2, "0")}</span><span>{item.label}</span><ArrowUpRight className="w-6 justify-self-end transition-transform duration-[250ms] ease-[var(--ease-out)] group-hover/menu-link:translate-x-[5px] group-hover/menu-link:-translate-y-[5px] motion-reduce:transform-none motion-reduce:transition-none" strokeWidth={1.7} /></Link>)}
        </nav>
        <div className="menu-bottom flex items-center justify-between text-meta text-[#9a9a9a] max-[600px]:flex-col max-[600px]:items-start max-[600px]:gap-5"><span>{studioLocation(locale)}</span><a href="mailto:hello@webpilot.studio">hello@webpilot.studio</a></div>
      </div>
    </>
  );
}
