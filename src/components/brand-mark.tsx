export function BrandMark({ inverse = false }: { inverse?: boolean }) {
  const letters = [..."WEBPILOT"];
  return (
    <span className={`brand-wordmark inline-flex whitespace-nowrap font-sans text-heading-sm leading-none font-semibold ${inverse ? "brand-wordmark--inverse text-white" : ""}`}>
      <span className="sr-only">Webpilot</span>
      <span className="brand-wordmark__letters flex gap-[.035em]" aria-hidden="true">
        {letters.map((letter, index) => (
          <span className="brand-wordmark__letter block h-[1em] overflow-hidden" style={{ "--letter-index": index, "--letter-reverse": letters.length - index - 1 } as React.CSSProperties} key={`${letter}-${index}`}>
            <span className="brand-wordmark__track flex h-[2em] translate-y-0 flex-col">
              <span className="block h-[1em] flex-none leading-none">{letter}</span>
              <span className="block h-[1em] flex-none leading-none">{letter}</span>
            </span>
          </span>
        ))}
      </span>
    </span>
  );
}
