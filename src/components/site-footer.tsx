import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";

export function SiteFooter() {
  return <footer className="site-footer"><div className="footer-main"><Link href="/" className="footer-brand"><BrandMark /><span>Fifth Signal</span></Link><div className="footer-links"><div><span>Explore</span><Link href="/work">Work</Link><Link href="/services">Services</Link><Link href="/about">About</Link></div><div><span>Connect</span><Link href="/insights">Insights</Link><Link href="/contact">Contact</Link><a href="mailto:hello@fifthsignal.studio">Email</a></div></div></div><div className="footer-legal"><span>© 2026 Fifth Signal Studio</span><span>Private preview · noindex</span><span>Berlin · Worldwide</span></div></footer>;
}

