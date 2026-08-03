"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { consumeRouteScrollTopRequest } from "@/lib/route-scroll";

export function ClientEffects() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    consumeRouteScrollTopRequest();
  }, [pathname]);

  useEffect(() => {
    document.documentElement.classList.add("reveal-ready");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = [...document.querySelectorAll<HTMLElement>("[data-reveal]")];
    if (reduced || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }
    const reveal = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
    const observer = new IntersectionObserver(reveal, { threshold: 0, rootMargin: "0px 0px -6%" });
    const halfViewportObserver = new IntersectionObserver(reveal, { threshold: 0.5 });
    elements.forEach((element) => element.classList.add("is-reveal-armed"));
    const viewportEdge = window.innerHeight * .94;
    const visibleElements = elements.filter((element) => {
      const bounds = element.getBoundingClientRect();
      if (element.dataset.revealThreshold === "half") {
        const visibleHeight = Math.max(0, Math.min(bounds.bottom, window.innerHeight) - Math.max(bounds.top, 0));
        return bounds.height > 0 && visibleHeight / bounds.height >= 0.5;
      }
      return bounds.top < viewportEdge && bounds.bottom > 0;
    });
    const visibleSet = new Set(visibleElements);
    elements.forEach((element) => {
      if (visibleSet.has(element)) return;
      (element.dataset.revealThreshold === "half" ? halfViewportObserver : observer).observe(element);
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
      halfViewportObserver.disconnect();
    };
  }, [pathname]);
  return null;
}
