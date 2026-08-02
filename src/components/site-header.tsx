"use client";

import Link from "next/link";
import { ArrowUpRight, ChevronDown, ChevronRight, Languages, Menu, MonitorSmartphone, RadioTower, Search, Workflow, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BrandMark } from "@/components/brand-mark";
import { CollapsePanel } from "@/components/collapse-panel";
import { alternatePath, localizePath, t, type Locale } from "@/lib/i18n";
import { getServiceCatalog } from "@/lib/service-catalog";

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
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef<HTMLButtonElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const servicesButtonRef = useRef<HTMLButtonElement>(null);
  const mobileServicesButtonRef = useRef<HTMLButtonElement>(null);
  const closeServicesTimer = useRef<number | undefined>(undefined);
  const otherLocale: Locale = locale === "de" ? "en" : "de";
  const services = getServiceCatalog(locale);
  const serviceIcons = [MonitorSmartphone, Search, RadioTower, Workflow] as const;
  const isActive = (href: string) => {
    const localized = localizePath(href, locale);
    return pathname === localized || pathname.startsWith(`${localized}/`);
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const focusTimer = open ? window.setTimeout(() => closeRef.current?.focus(), 50) : undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (open && mobileServicesOpen) {
          setMobileServicesOpen(false);
          mobileServicesButtonRef.current?.focus();
          return;
        }
        if (servicesOpen) {
          setServicesOpen(false);
          servicesButtonRef.current?.focus();
          return;
        }
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
    const onPointerDown = (event: PointerEvent) => {
      if (servicesOpen && !servicesRef.current?.contains(event.target as Node)) setServicesOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      if (focusTimer !== undefined) window.clearTimeout(focusTimer);
      if (closeServicesTimer.current !== undefined) window.clearTimeout(closeServicesTimer.current);
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [mobileServicesOpen, open, servicesOpen]);

  const openServices = () => {
    if (closeServicesTimer.current !== undefined) window.clearTimeout(closeServicesTimer.current);
    setServicesOpen(true);
  };
  const scheduleServicesClose = () => {
    closeServicesTimer.current = window.setTimeout(() => setServicesOpen(false), 120);
  };

  const navItems = [
    { href: "/about", label: t(locale, "nav.about") },
    { href: "/contact", label: t(locale, "nav.contact") },
  ];
  const servicesActive = pathname.startsWith(localizePath("/services/", locale));
  return (
    <>
      <header className="fixed top-[22px] left-1/2 z-50 flex w-max -translate-x-1/2 items-center gap-2 max-[900px]:left-[15px] max-[900px]:[translate:none]">
        <Link href={localizePath("/", locale)} className="group/brand inline-flex h-11 items-center justify-center rounded-[12px] bg-white px-[17px] shadow-surface transition-transform duration-150 active:scale-[.96] motion-reduce:transition-none motion-reduce:active:scale-100" aria-label={t(locale, "nav.brandHome")}><BrandMark /></Link>
        <nav className="relative inline-flex h-11 items-center justify-center gap-px rounded-[12px] bg-white p-1 shadow-surface max-[900px]:hidden" aria-label={t(locale, "nav.mainMenu")}>
          <div
            ref={servicesRef}
            className="relative"
            onPointerEnter={openServices}
            onPointerLeave={scheduleServicesClose}
            onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setServicesOpen(false); }}
          >
            <button
              ref={servicesButtonRef}
              className={`relative z-1 inline-flex h-9 cursor-pointer items-center gap-1 rounded-lg px-3.5 text-navigation transition-[color,background-color,scale] duration-150 active:scale-[.96] motion-reduce:transition-none motion-reduce:active:scale-100 ${servicesActive || servicesOpen ? "bg-[var(--ds-gray-alpha-100)] text-ink" : "text-muted hover:bg-[var(--ds-gray-alpha-100)] hover:text-ink"}`}
              type="button"
              aria-expanded={servicesOpen}
              aria-controls="services-menu"
              onClick={() => setServicesOpen((current) => !current)}
              onKeyDown={(event) => {
                if (event.key === "ArrowDown") {
                  event.preventDefault();
                  setServicesOpen(true);
                  window.setTimeout(() => servicesRef.current?.querySelector<HTMLAnchorElement>("a[href]")?.focus(), 0);
                }
              }}
            >
              {t(locale, "nav.services")}
              <ChevronDown className={`size-3.5 transition-transform duration-200 motion-reduce:transition-none ${servicesOpen ? "rotate-180" : ""}`} strokeWidth={1.8} aria-hidden="true" />
            </button>
            <div
              id="services-menu"
              className={`absolute top-full left-0 w-[35rem] pt-2 transition-[opacity,transform] duration-200 ease-[var(--ease-out)] motion-reduce:transition-none ${servicesOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"}`}
              aria-hidden={!servicesOpen}
              inert={!servicesOpen}
            >
              <div className="grid grid-cols-2 gap-1.5 rounded-[16px] bg-white p-2 shadow-[0_18px_50px_rgb(0_0_0/.14),inset_0_0_0_1px_var(--ds-gray-alpha-200)]">
                {services.map((service, index) => {
                  const Icon = serviceIcons[index]!;
                  const active = pathname === service.href;
                  return <Link className={`group/service flex min-w-0 gap-3 rounded-[11px] p-3.5 transition-colors duration-150 ${active ? "bg-[var(--ds-blue-100)]" : "hover:bg-[var(--ds-gray-100)]"}`} href={service.href} aria-current={active ? "page" : undefined} onClick={() => setServicesOpen(false)} key={service.id}><span className={`grid size-9 shrink-0 place-items-center rounded-[9px] ${active ? "bg-white text-[var(--ds-blue-800)]" : "bg-[var(--ds-gray-100)] text-[var(--ds-gray-800)] group-hover/service:bg-white"}`}><Icon className="size-4.5" strokeWidth={1.7} aria-hidden="true" /></span><span className="min-w-0"><strong className="block text-small font-semibold text-ink">{service.copy.name}</strong><span className="mt-1 block text-caption leading-snug text-muted">{service.copy.navDescription}</span></span></Link>;
                })}
              </div>
            </div>
          </div>
          {navItems.map((item) => <Link key={item.href} href={localizePath(item.href, locale)} className={`relative z-1 inline-flex h-9 items-center rounded-lg px-3.5 text-navigation transition-[color,background-color,scale] duration-150 active:scale-[.96] motion-reduce:transition-none motion-reduce:active:scale-100 ${isActive(item.href) ? "bg-[var(--ds-gray-alpha-100)] text-ink" : "text-muted hover:bg-[var(--ds-gray-alpha-100)] hover:text-ink"}`} aria-current={isActive(item.href) ? "page" : undefined}>{item.label}</Link>)}
        </nav>
        <LanguageLink locale={locale} otherLocale={otherLocale} pathname={pathname} />
        <button ref={openRef} className="fixed top-[22px] right-[15px] inline-flex size-11 items-center justify-center rounded-[12px] bg-white shadow-surface transition-transform duration-150 active:scale-[.96] motion-reduce:transition-none motion-reduce:active:scale-100 min-[901px]:hidden" type="button" onClick={() => { setMobileServicesOpen(false); setOpen(true); }} aria-label={t(locale, "nav.openMenu")} aria-expanded={open} aria-controls="site-menu"><Menu className="w-[17px]" strokeWidth={1.7} /></button>
      </header>
      <div id="site-menu" className={`fixed inset-0 z-100 flex flex-col overscroll-contain bg-[#101010] px-[clamp(24px,5vw,76px)] pt-6 pb-[34px] text-white transition-[opacity,translate] duration-300 ease-[var(--ease-out)] will-change-[opacity,translate] min-[901px]:hidden max-[900px]:overflow-y-auto max-[600px]:px-[18px] motion-reduce:transition-none ${open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0"}`} aria-hidden={!open} inert={!open} role="dialog" aria-modal="true" aria-label={t(locale, "nav.siteMenu")}>
        <div className="menu-top flex items-center justify-between">
          <Link href={localizePath("/", locale)} onClick={() => setOpen(false)} className="group/brand fixed top-[22px] left-[15px] z-2 inline-flex h-11 items-center rounded-[12px] bg-[#101010] px-[17px] shadow-dark-surface transition-[background-color,scale] duration-150 hover:bg-white/8 active:scale-[.96] motion-reduce:transition-none motion-reduce:active:scale-100"><BrandMark inverse /></Link>
          <LanguageLink dark locale={locale} otherLocale={otherLocale} pathname={pathname} />
          <button ref={closeRef} type="button" className="fixed top-[22px] right-[15px] z-2 grid size-11 place-items-center rounded-[12px] bg-transparent text-white shadow-dark-surface transition-[background-color,scale] duration-150 hover:bg-white/8 active:scale-[.96] motion-reduce:transition-none motion-reduce:active:scale-100" onClick={() => { setMobileServicesOpen(false); setOpen(false); openRef.current?.focus(); }} aria-label={t(locale, "nav.closeMenu")}><X className="w-[19px]" strokeWidth={1.7} /></button>
        </div>
        <nav className="menu-links my-auto flex flex-col self-stretch py-24 max-[900px]:w-full max-[900px]:max-w-[44rem]" aria-label={t(locale, "nav.mainMenu")}>
          <div>
            <button
              ref={mobileServicesButtonRef}
              id="mobile-services-button"
              className="grid min-h-16 w-full cursor-pointer grid-cols-[2rem_minmax(0,1fr)_1.5rem] items-center border-b border-white/13 bg-transparent px-0 py-2.5 text-left text-heading-md"
              type="button"
              aria-expanded={mobileServicesOpen}
              aria-controls="mobile-services-menu"
              onClick={() => setMobileServicesOpen((current) => !current)}
              tabIndex={open ? 0 : -1}
            >
              <span className="text-caption tabular-nums text-[#929292]" aria-hidden="true">01</span>
              <span>{t(locale, "nav.services")}</span>
              <span className="grid size-6 place-items-center justify-self-end" aria-hidden="true">
                <ChevronRight className={`size-5 transition-transform duration-200 ease-[cubic-bezier(.4,0,.2,1)] motion-reduce:transition-none ${mobileServicesOpen ? "rotate-90" : ""}`} strokeWidth={1.7} />
              </span>
            </button>
            <CollapsePanel id="mobile-services-menu" labelledBy="mobile-services-button" expanded={mobileServicesOpen}>
              {services.map((service) => {
                const active = pathname === service.href;
                return <Link key={service.id} className="group/menu-link grid min-h-14 grid-cols-[minmax(0,1fr)_1.5rem] items-center border-b border-white/13 py-2 pl-8 text-heading-sm" href={service.href} aria-current={active ? "page" : undefined} onClick={() => { setMobileServicesOpen(false); setOpen(false); }} tabIndex={open && mobileServicesOpen ? 0 : -1}><span>{service.copy.name}</span><ArrowUpRight className="w-5 justify-self-end transition-transform duration-[250ms] ease-[var(--ease-out)] group-hover/menu-link:translate-x-[5px] group-hover/menu-link:-translate-y-[5px] motion-reduce:transform-none motion-reduce:transition-none" strokeWidth={1.7} /></Link>;
              })}
            </CollapsePanel>
          </div>
          {navItems.map((item, index) => <Link key={item.href} className="group/menu-link grid min-h-16 grid-cols-[2rem_minmax(0,1fr)_1.5rem] items-center border-b border-white/13 py-2.5 text-heading-md" href={localizePath(item.href, locale)} onClick={() => { setMobileServicesOpen(false); setOpen(false); }} tabIndex={open ? 0 : -1}><span className="text-caption tabular-nums text-[#929292]">{String(index + 2).padStart(2, "0")}</span><span>{item.label}</span><ArrowUpRight className="w-6 justify-self-end transition-transform duration-[250ms] ease-[var(--ease-out)] group-hover/menu-link:translate-x-[5px] group-hover/menu-link:-translate-y-[5px] motion-reduce:transform-none motion-reduce:transition-none" strokeWidth={1.7} /></Link>)}
        </nav>
        <div className="menu-bottom flex items-center justify-end text-meta text-[#9a9a9a] max-[600px]:flex-col max-[600px]:items-start max-[600px]:gap-5"><a href="mailto:hello@webpilot.studio">hello@webpilot.studio</a></div>
      </div>
    </>
  );
}
