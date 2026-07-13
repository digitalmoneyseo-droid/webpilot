"use client";

import { useState } from "react";
import { Plus } from "@/components/icons";

export function Faq({ items, compact = false }: { items: readonly (readonly [string, string])[]; compact?: boolean }) {
  const [open, setOpen] = useState(0);
  return <div className={`faq-list${compact ? " faq-list--compact" : ""}`}>{items.map(([question, answer], index) => <div className={`faq-item${open === index ? " is-open" : ""}`} key={question}><button type="button" onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index}><span>{question}</span><Plus /></button><div className="faq-answer"><div><p>{answer}</p></div></div></div>)}</div>;
}

