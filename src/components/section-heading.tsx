export function SectionHeading({ title, copy, align = "left" }: { title: string; copy?: string; align?: "left" | "center" }) {
  return (
    <div className={`reveal mb-heading-gap max-w-[45rem] ${align === "center" ? "mx-auto text-center" : ""}`} data-reveal>
      <h2 className="m-0 text-heading-lg">{title}</h2>
      {copy && <p className={`mt-4 max-w-narrow text-lg/7 text-muted ${align === "center" ? "mx-auto" : ""}`}>{copy}</p>}
    </div>
  );
}
