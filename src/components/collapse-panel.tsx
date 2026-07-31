"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

type CollapsePanelProps = {
  children: ReactNode;
  expanded: boolean;
  id: string;
  labelledBy: string;
};

export function CollapsePanel({
  children,
  expanded,
  id,
  labelledBy,
}: CollapsePanelProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useLayoutEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const measure = () => setContentHeight(content.scrollHeight);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(content);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-labelledby={labelledBy}
      className="overflow-y-hidden transition-[height] duration-200 ease-[cubic-bezier(.4,0,.2,1)] motion-reduce:transition-none"
      id={id}
      inert={!expanded}
      role="region"
      style={{ height: expanded ? contentHeight : 0 }}
    >
      <div ref={contentRef} className="max-h-[60vh] overflow-y-auto">{children}</div>
    </div>
  );
}
