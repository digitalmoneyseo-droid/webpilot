export function Reveal({ as: Component = "div", className = "", delay = 0, children }: { as?: "div" | "li"; className?: string; delay?: number; children: React.ReactNode }) {
  return <Component className={`reveal ${className}`} data-reveal style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}>{children}</Component>;
}
