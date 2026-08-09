export function BrandMark({
  inverse = false,
  size = "default",
}: {
  inverse?: boolean;
  size?: "default" | "large";
}) {
  const letters = [..."WEBPILOT"];
  return (
    <span className={`inline-flex whitespace-nowrap font-sans leading-none font-[650] tracking-[-.025em] ${size === "large" ? "text-heading-md" : "text-body"} ${inverse ? "text-white" : ""}`}>
      <span className="sr-only">Webpilot</span>
      <span className="flex gap-[.035em]" aria-hidden="true">
        {letters.map((letter, index) => (
          <span className="block h-[1em] overflow-hidden" style={{ "--letter-index": index, "--letter-reverse": letters.length - index - 1 } as React.CSSProperties} key={`${letter}-${index}`}>
            <span className="flex h-[2em] translate-y-0 flex-col transition-transform duration-[220ms] ease-[cubic-bezier(.16,1,.3,1)] [transition-delay:calc(var(--letter-reverse)*18ms)] group-hover/brand:-translate-y-1/2 group-hover/brand:[transition-delay:calc(var(--letter-index)*35ms)] motion-reduce:transform-none motion-reduce:transition-none">
              <span className="block h-[1em] flex-none leading-none">{letter}</span>
              <span className="block h-[1em] flex-none leading-none">{letter}</span>
            </span>
          </span>
        ))}
      </span>
    </span>
  );
}
