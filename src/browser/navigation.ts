import { navigate } from "astro:transitions/client";

export function initNavigation(document: Document = window.document): void {
  const root = document.documentElement;
  document.addEventListener("keydown", () => root.classList.add("using-keyboard"), true);
  document.addEventListener("pointerdown", () => root.classList.remove("using-keyboard"), true);

  const openButton = document.querySelector<HTMLButtonElement>(".header-menu");
  const overlay = document.querySelector<HTMLElement>("#site-menu");
  if (!openButton || !overlay) return;

  const closeButton = overlay.querySelector<HTMLButtonElement>(".menu-close");
  const menuLinksContainer = overlay.querySelector<HTMLElement>(".menu-links");
  const menuLinks = [...overlay.querySelectorAll<HTMLAnchorElement>("a")];
  const primaryMenuLinks = [...overlay.querySelectorAll<HTMLAnchorElement>(".menu-links > a")];
  const serviceTrigger = overlay.querySelector<HTMLButtonElement>(".menu-services-trigger");
  const serviceList = overlay.querySelector<HTMLElement>(".menu-service-list");
  const serviceLinks = [...(serviceList?.querySelectorAll<HTMLAnchorElement>("a") ?? [])];
  const desktopServices = document.querySelector<HTMLElement>(".desktop-services");
  const desktopServiceTrigger = document.querySelector<HTMLButtonElement>(".desktop-services-trigger");
  const desktopServiceMenu = document.querySelector<HTMLElement>(".desktop-megamenu");
  const desktopServiceLinks = [...(desktopServiceMenu?.querySelectorAll<HTMLAnchorElement>("a") ?? [])];
  const desktopNav = document.querySelector<HTMLElement>(".desktop-nav");
  const desktopNavIndicator = desktopNav?.querySelector<HTMLElement>(".desktop-nav-indicator");
  const desktopNavItems = [...(desktopNav?.querySelectorAll<HTMLElement>(":scope > a, .desktop-services-trigger") ?? [])];
  const background = [...document.querySelectorAll<HTMLElement>("body > main, body > footer")];
  const mobileMenu = window.matchMedia("(max-width: 900px)");
  let returnFocus: HTMLElement | null = null;
  let closeTimer: number | undefined;
  let servicesTimer: number | undefined;
  let desktopServicesPinned = false;

  const positionDesktopNavIndicator = (item: HTMLElement, animate = true) => {
    if (!desktopNavIndicator) return;
    desktopNavIndicator.style.setProperty("--nav-x", `${item.offsetLeft}px`);
    desktopNavIndicator.style.setProperty("--nav-width", `${item.offsetWidth}px`);
    if (animate) desktopNavIndicator.classList.add("is-ready");
  };
  const activeDesktopNavItem = desktopNavItems.find((item) => item.classList.contains("is-active"));
  if (activeDesktopNavItem) {
    requestAnimationFrame(() => {
      positionDesktopNavIndicator(activeDesktopNavItem, false);
      requestAnimationFrame(() => desktopNavIndicator?.classList.add("is-ready"));
    });
  }

  overlay.setAttribute("aria-modal", String(mobileMenu.matches));

  const focusable = () => [...overlay.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')];
  const applyServicesExpanded = (expanded: boolean) => {
    serviceTrigger?.setAttribute("aria-expanded", String(expanded));
    serviceList?.setAttribute("aria-hidden", String(!expanded));
    serviceTrigger?.closest(".menu-services")?.classList.toggle("is-open", expanded);
    menuLinksContainer?.classList.toggle("is-services-open", expanded);
    const menuOpen = overlay.classList.contains("is-open");
    primaryMenuLinks.forEach((link) => link.tabIndex = menuOpen && !expanded ? 0 : -1);
    serviceLinks.forEach((link) => link.tabIndex = menuOpen && expanded ? 0 : -1);
  };
  const setServicesExpanded = (expanded: boolean, animate = false) => {
    window.clearTimeout(servicesTimer);
    if (!animate || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      menuLinksContainer?.classList.remove("is-services-switching");
      applyServicesExpanded(expanded);
      return;
    }
    menuLinksContainer?.classList.add("is-services-switching");
    servicesTimer = window.setTimeout(() => {
      applyServicesExpanded(expanded);
      requestAnimationFrame(() => menuLinksContainer?.classList.remove("is-services-switching"));
    }, 140);
  };
  const setDesktopServicesExpanded = (expanded: boolean, pinned = desktopServicesPinned) => {
    desktopServicesPinned = expanded && pinned;
    desktopServices?.classList.toggle("is-open", expanded);
    desktopServiceTrigger?.setAttribute("aria-expanded", String(expanded));
    desktopServiceMenu?.setAttribute("aria-hidden", String(!expanded));
  };
  const setOpen = (open: boolean) => {
    window.clearTimeout(closeTimer);
    overlay.classList.remove("is-closing");
    if (open) {
      overlay.classList.add("is-open");
    } else {
      overlay.classList.remove("is-open");
      overlay.classList.add("is-closing");
      const closeMs = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--menu-close-dur")) || 300;
      closeTimer = window.setTimeout(() => overlay.classList.remove("is-closing"), closeMs);
    }
    overlay.setAttribute("aria-hidden", String(!open));
    overlay.setAttribute("aria-modal", String(mobileMenu.matches));
    overlay.inert = !open;
    openButton.setAttribute("aria-expanded", String(open));
    menuLinks.forEach((link) => link.tabIndex = open ? 0 : -1);
    if (!open) setServicesExpanded(false);
    else setServicesExpanded(serviceTrigger?.getAttribute("aria-expanded") === "true");
    if (serviceTrigger) serviceTrigger.tabIndex = open ? 0 : -1;
    background.forEach((element) => element.inert = open && mobileMenu.matches);
    document.body.style.overflow = open && mobileMenu.matches ? "hidden" : "";
    if (open) {
      returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : openButton;
      closeButton?.focus();
    } else {
      returnFocus?.focus();
    }
  };

  openButton.addEventListener("click", () => setOpen(true));
  closeButton?.addEventListener("click", () => setOpen(false));
  serviceTrigger?.addEventListener("click", () => setServicesExpanded(serviceTrigger.getAttribute("aria-expanded") !== "true", true));
  desktopServices?.addEventListener("pointerenter", () => setDesktopServicesExpanded(true));
  desktopServices?.addEventListener("pointerleave", () => {
    if (!desktopServicesPinned && !desktopServices.contains(document.activeElement)) setDesktopServicesExpanded(false, false);
  });
  desktopServices?.addEventListener("focusin", () => setDesktopServicesExpanded(true));
  desktopServices?.addEventListener("focusout", (event) => {
    const next = event.relatedTarget;
    if (!desktopServicesPinned && (!(next instanceof Node) || !desktopServices.contains(next))) setDesktopServicesExpanded(false, false);
  });
  desktopServiceTrigger?.addEventListener("click", () => {
    if (desktopServicesPinned) setDesktopServicesExpanded(false, false);
    else setDesktopServicesExpanded(true, true);
  });
  desktopNav?.querySelectorAll<HTMLAnchorElement>(":scope > a").forEach((link) => {
    link.addEventListener("pointerdown", (event) => {
      if (event.button !== 0) return;
      desktopNavItems.forEach((item) => item.classList.toggle("is-active", item === link));
      positionDesktopNavIndicator(link);
    });
    link.addEventListener("click", (event) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target) return;
      const destination = new URL(link.href, window.location.href);
      if (destination.href === window.location.href) return;
      event.preventDefault();
      const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 280;
      window.setTimeout(() => void navigate(destination.href), delay);
    });
  });
  desktopServiceTrigger?.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowDown") return;
    event.preventDefault();
    setDesktopServicesExpanded(true, true);
    desktopServiceLinks[0]?.focus();
  });
  menuLinks.forEach((link) => link.addEventListener("click", () => setOpen(false)));
  document.addEventListener("pointerdown", (event) => {
    if (event.target instanceof Node && !desktopServices?.contains(event.target)) setDesktopServicesExpanded(false, false);
    if (!overlay.classList.contains("is-open") || mobileMenu.matches) return;
    if (event.target instanceof Node && !overlay.contains(event.target) && !openButton.contains(event.target)) setOpen(false);
  });
  mobileMenu.addEventListener("change", () => {
    if (overlay.classList.contains("is-open")) setOpen(false);
    else overlay.setAttribute("aria-modal", String(mobileMenu.matches));
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && desktopServiceTrigger?.getAttribute("aria-expanded") === "true") {
      desktopServiceTrigger.focus();
      setDesktopServicesExpanded(false, false);
      return;
    }
    if (!overlay.classList.contains("is-open")) return;
    if (event.key === "Escape") setOpen(false);
    if (event.key !== "Tab" || !mobileMenu.matches) return;
    const items = focusable();
    const first = items[0];
    const last = items.at(-1);
    if (!first || !last) return;
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
}
