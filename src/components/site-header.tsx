"use client";

import Link from "next/link";
import { ArrowUpRight, Languages, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BrandMark } from "@/components/brand-mark";
import { alternatePath, localizePath, studioLocation, t, type Locale } from "@/lib/i18n";

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
    if (open) closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const navItems = [
    { href: "/work", label: "Portfolio" },
    { href: "/solutions", label: t(locale, "Solutions") },
    { href: "/about", label: t(locale, "About us") },
    { href: "/contact", label: t(locale, "Contact") },
  ];

  const LanguageLink = ({ dark = false }: { dark?: boolean }) => (
    <Link className={`header-language inline-flex h-11 cursor-pointer items-center justify-center gap-[7px] rounded-[12px] border-0 px-3 text-navigation font-medium shadow-surface ${dark ? "menu-language fixed top-[22px] right-[74px] z-2 bg-transparent text-white shadow-dark-surface max-[900px]:right-[67px]" : "bg-white text-[#73736f] max-[900px]:fixed max-[900px]:top-[22px] max-[900px]:right-[65px]"}`} href={alternatePath(pathname, otherLocale)} aria-label={locale === "de" ? "Switch to English" : "Auf Deutsch wechseln"}>
      <span className="header-language__icon-box relative h-[19px] w-[19px] flex-none overflow-hidden" aria-hidden="true"><Languages className="header-language__icon header-language__icon--out absolute inset-0 size-[19px]" strokeWidth={1.7} /><Languages className="header-language__icon header-language__icon--in absolute inset-0 size-[19px] opacity-0 [transform:translate(-6px,6px)_scale(.8)]" strokeWidth={1.7} /></span>
      <span className="header-language__label block h-[1.2em] overflow-hidden leading-control"><span className="header-language__label-track flex h-[200%] flex-col">{[false, true].map((hidden) => <span key={String(hidden)} className="header-language__row flex flex-[0_0_50%] items-center gap-[3px] whitespace-nowrap" aria-hidden={hidden || undefined}><span className={locale === "de" ? "is-active" : ""}>DE</span><i className={`not-italic ${dark ? "text-white/50" : "text-[#c3c3be]"}`}>/</i><span className={locale === "en" ? "is-active" : ""}>EN</span></span>)}</span></span>
    </Link>
  );

  return (
    <>
      <header className="site-header fixed top-[22px] left-1/2 z-50 flex w-max items-center gap-2 [transform:translateX(-50%)] max-[900px]:left-[15px] max-[900px]:[transform:none]">
        <Link href={localizePath("/", locale)} className="header-mark inline-flex h-11 items-center justify-center rounded-[12px] bg-white px-[17px] shadow-surface" aria-label={t(locale, "Webpilot home")}><BrandMark /></Link>
        <nav className="desktop-nav relative inline-flex h-11 items-center justify-center gap-px rounded-[12px] bg-white p-1 shadow-surface max-[900px]:hidden" aria-label={t(locale, "Main navigation")}>
          {navItems.map((item) => <Link key={item.href} href={localizePath(item.href, locale)} className={`relative z-1 inline-flex h-9 items-center rounded-lg px-3.5 text-navigation font-medium text-[#696965] ${isActive(item.href) ? "is-active" : ""}`} aria-current={isActive(item.href) ? "page" : undefined}>{item.label}</Link>)}
        </nav>
        <LanguageLink />
        <button ref={openRef} className="header-menu fixed top-[22px] right-[22px] inline-flex h-11 w-11 items-center justify-center rounded-[12px] bg-white shadow-surface min-[901px]:hidden max-[900px]:right-[15px]" type="button" onClick={() => setOpen(true)} aria-label={t(locale, "Open navigation")} aria-expanded={open} aria-controls="site-menu"><Menu className="w-[17px]" strokeWidth={1.7} /></button>
      </header>
      <div id="site-menu" className={`menu-overlay fixed inset-0 z-100 flex flex-col bg-[#101010] px-[clamp(24px,5vw,76px)] pt-6 pb-[34px] text-white min-[901px]:hidden max-[900px]:overflow-y-auto max-[600px]:px-[18px] ${open ? "is-open" : "invisible opacity-0 [transform:translateY(-12px)]"}`} aria-hidden={!open} inert={!open} role="dialog" aria-modal="true" aria-label={t(locale, "Site navigation")}>
        <div className="menu-top flex items-center justify-between">
          <Link href={localizePath("/", locale)} onClick={() => setOpen(false)} className="menu-brand fixed top-[22px] left-[15px] z-2 inline-flex h-11 items-center rounded-[12px] bg-[#101010] px-[17px] shadow-dark-surface"><BrandMark inverse /></Link>
          <LanguageLink dark />
          <button ref={closeRef} type="button" className="menu-close fixed top-[22px] right-[15px] z-2 grid h-11 w-11 place-items-center rounded-[12px] bg-transparent text-white shadow-dark-surface" onClick={() => { setOpen(false); openRef.current?.focus(); }} aria-label={t(locale, "Close navigation")}><X className="w-[19px]" strokeWidth={1.7} /></button>
        </div>
        <nav className="menu-links my-auto flex flex-col self-stretch max-[900px]:w-full max-[900px]:max-w-[44rem]" aria-label={t(locale, "Main navigation")}>
          {navItems.map((item, index) => <Link key={item.href} className="grid grid-cols-[3rem_minmax(0,1fr)_2rem] items-center border-b border-white/13 py-2.5 text-heading-md font-medium max-[900px]:min-h-18 max-[600px]:grid-cols-[2rem_minmax(0,1fr)_1.5rem]" href={localizePath(item.href, locale)} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}><span className="text-caption tabular-nums text-[#929292]">{String(index + 1).padStart(2, "0")}</span><b className="font-medium">{item.label}</b><ArrowUpRight className="w-6 justify-self-end" strokeWidth={1.7} /></Link>)}
        </nav>
        <div className="menu-bottom flex items-center justify-between text-caption text-[#9a9a9a] max-[600px]:flex-col max-[600px]:items-start max-[600px]:gap-5"><span>{studioLocation(locale)}</span><a href="mailto:hello@webpilot.studio">hello@webpilot.studio</a></div>
      </div>
    </>
  );
}
