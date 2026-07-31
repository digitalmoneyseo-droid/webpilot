"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ClientEffects() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.add("reveal-ready");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = [...document.querySelectorAll<HTMLElement>("[data-reveal]")];
    if (reduced || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }), { threshold: 0, rootMargin: "0px 0px -6%" });
    elements.forEach((element) => element.classList.add("is-reveal-armed"));
    const viewportEdge = window.innerHeight * .94;
    const visibleElements = elements.filter((element) => {
      const bounds = element.getBoundingClientRect();
      return bounds.top < viewportEdge && bounds.bottom > 0;
    });
    const visibleSet = new Set(visibleElements);
    elements.forEach((element) => {
      if (!visibleSet.has(element)) observer.observe(element);
    });
    const showVisibleElements = () => {
      visibleElements.forEach((element) => element.classList.add("is-visible"));
    };
    const frame = window.requestAnimationFrame(showVisibleElements);
    const fallback = window.setTimeout(showVisibleElements, 100);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(fallback);
      observer.disconnect();
    };
  }, [pathname]);
  return null;
}
