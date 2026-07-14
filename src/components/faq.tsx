"use client";

import { useId, useState } from "react";
import { Plus } from "@/components/icons";

export function Faq({ items, compact = false }: { items: readonly (readonly [string, string])[]; compact?: boolean }) {
  const [open, setOpen] = useState(0);
  const id = useId();
  return <div className={`faq-list${compact ? " faq-list--compact" : ""}`}>{items.map(([question, answer], index) => { const itemId = `${id}-${index}`; return <div className={`faq-item${open === index ? " is-open" : ""}`} key={question}><button id={`${itemId}-button`} type="button" onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index} aria-controls={`${itemId}-answer`}><span className="faq-index">{String(index + 1).padStart(2, "0")}</span><span className="faq-question">{question}</span><span className="faq-toggle"><Plus /></span></button><div id={`${itemId}-answer`} className="faq-answer" role="region" aria-labelledby={`${itemId}-button`}><div><p>{answer}</p></div></div></div>; })}</div>;
}
