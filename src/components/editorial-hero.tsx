export function EditorialHero({ title, copy, children }: { title: string; copy?: string; children?: React.ReactNode }) {
  return (
    <section className="editorial-hero grid min-h-0 [place-content:start_center] [place-items:start_center] px-page pt-[var(--page-title-top)] pb-16 max-[600px]:pt-26 max-[600px]:pb-12">
      <div className="editorial-hero-grid reveal flex w-full flex-col items-center gap-4 text-center max-[900px]:gap-6" data-reveal>
        <h1 className="m-0 mx-auto w-full text-display-sm text-balance">{title}</h1>
        {copy && <p className="mx-auto max-w-[48rem] text-lead text-muted text-balance">{copy}</p>}
        {children}
      </div>
    </section>
  );
}
