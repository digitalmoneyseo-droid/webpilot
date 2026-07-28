export function Reveal({ className = "", delay = 0, children }: { className?: string; delay?: number; children: React.ReactNode }) {
  return <div className={`reveal ${className}`} data-reveal style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}>{children}</div>;
}
