"use client";

import { useEffect } from "react";

export function ClientEffects() {
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
    elements.forEach((element) => {
      element.classList.add("is-reveal-armed");
      observer.observe(element);
    });
    return () => observer.disconnect();
  });
  return null;
}
