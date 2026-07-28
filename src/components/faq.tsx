"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

export function Faq({ items, id = "faq" }: { items: { data: { question: string; answer: string } }[]; id?: string }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="reveal is-reveal-armed is-visible" data-reveal>
      <div className="faq-list m-0 grid w-full gap-3">
        {items.map((item, index) => {
          const expanded = open === index;
          const itemId = `${id}-${index}`;
          return <div className={`faq-item overflow-hidden rounded-card bg-surface shadow-surface ${expanded ? "is-open" : ""}`} key={itemId}>
            <button className="grid min-h-14 w-full cursor-pointer grid-cols-[1fr_24px] items-center gap-3 rounded-card bg-transparent px-5 py-4 text-left" id={`${itemId}-button`} type="button" aria-expanded={expanded} aria-controls={`${itemId}-answer`} onClick={() => setOpen(expanded ? null : index)}><span className="faq-question text-body-lg font-semibold">{item.data.question}</span><span className="faq-toggle grid size-6 place-items-center justify-self-end"><Plus className="w-4.5" strokeWidth={1.7} /></span></button>
            <div id={`${itemId}-answer`} className="faq-answer" role="region" aria-labelledby={`${itemId}-button`} aria-hidden={!expanded}><div><p className="m-0 max-w-reading px-5 pb-5 text-[16px] text-muted">{item.data.answer}</p></div></div>
          </div>;
        })}
      </div>
    </div>
  );
}
