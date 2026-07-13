export function BrandMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <span className={`brand-mark${inverse ? " brand-mark--inverse" : ""}`} aria-label="Fifth Signal">
      <span>F</span><i aria-hidden="true" />
    </span>
  );
}

