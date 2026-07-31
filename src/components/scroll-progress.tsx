"use client";

import { motion, useScroll } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[1100] h-1 origin-left bg-[var(--ds-blue-700)]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
