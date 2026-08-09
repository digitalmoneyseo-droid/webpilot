"use client";

import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { CollapsePanel } from "@/components/collapse-panel";

export function Faq({ items, id = "faq" }: { items: { data: { question: string; answer: string } }[]; id?: string }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="reveal" data-reveal>
      <div className="relative m-0 w-full">
        {items.map((item, index) => {
          const expanded = open === index;
          const itemId = `${id}-${index}`;
          return <div className={`relative before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:z-1 before:h-px before:bg-line before:content-[''] last:after:pointer-events-none last:after:absolute last:after:inset-x-0 last:after:bottom-0 last:after:z-1 last:after:h-px last:after:bg-line last:after:content-[''] ${expanded ? "[&_.faq-toggle_svg]:rotate-90" : ""}`} key={itemId}>
            <h3 className="m-0">
              <button className="grid min-h-21 w-full cursor-pointer grid-cols-[1fr_24px] items-center gap-4 rounded-inset bg-transparent px-2 py-5 text-left transition-colors duration-150 max-[600px]:min-h-18" id={`${itemId}-button`} type="button" aria-expanded={expanded} aria-controls={`${itemId}-answer`} onClick={() => setOpen(expanded ? null : index)}>
                <span className="faq-question text-heading-sm">{item.data.question}</span>
                <span className="faq-toggle grid size-6 place-items-center justify-self-end" aria-hidden="true"><ChevronRight className="size-5 transition-transform duration-200 ease-[var(--ease-out)] motion-reduce:transition-none" strokeWidth={1.7} /></span>
              </button>
            </h3>
            <CollapsePanel id={`${itemId}-answer`} labelledBy={`${itemId}-button`} expanded={expanded}>
              <p className="m-0 max-w-reading px-2 pb-6 text-body text-muted">{item.data.answer}</p>
            </CollapsePanel>
          </div>;
        })}
      </div>
    </div>
  );
}
