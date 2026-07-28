export function SectionHeading({ title, copy, align = "left" }: { title: string; copy?: string; align?: "left" | "center" }) {
  return (
    <div className={`section-heading mb-heading-gap max-w-[45rem] ${align === "center" ? "mx-auto text-center" : ""}`}>
      <h2 className="m-0 mt-[var(--space-3)] text-heading-lg font-semibold">{title}</h2>
      {copy && <p className={`mt-[var(--space-4)] max-w-narrow text-body text-muted ${align === "center" ? "mx-auto" : ""}`}>{copy}</p>}
    </div>
  );
}
