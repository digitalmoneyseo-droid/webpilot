import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { localizePath, t, type Locale } from "@/lib/i18n";
import { getServiceCatalog } from "@/lib/service-catalog";

export function SiteFooter({ locale }: { locale: Locale }) {
  const services = getServiceCatalog(locale);
  return (
    <footer className="mt-auto bg-black px-page pt-16 text-inverse" style={{ paddingBottom: "max(2rem, env(safe-area-inset-bottom))" }}>
      <div className="footer-main flex min-h-40 justify-between gap-12 max-[600px]:block">
        <Link href={localizePath("/", locale)} className="group/brand inline-flex min-h-11 self-start items-center"><BrandMark size="large" /></Link>
        <div className="footer-links grid grid-cols-3 gap-x-20 gap-y-12 max-[760px]:gap-x-10 max-[600px]:mt-16 max-[600px]:grid-cols-2 max-[600px]:gap-x-6">
          <div className="flex min-w-25 flex-col gap-2"><span className="mb-3 text-meta text-inverse-muted">{t(locale, "nav.services")}</span>{services.map((service) => <Link className="text-meta transition-colors duration-150 hover:text-white" href={service.href} key={service.id}>{service.copy.name}</Link>)}</div>
          <div className="flex min-w-25 flex-col gap-2"><span className="mb-3 text-meta text-inverse-muted">{t(locale, "footer.studio")}</span><Link className="text-meta transition-colors duration-150 hover:text-white" href={localizePath("/about", locale)}>{t(locale, "nav.about")}</Link><Link className="text-meta transition-colors duration-150 hover:text-white" href={localizePath("/contact", locale)}>{t(locale, "nav.contact")}</Link></div>
          <div className="flex min-w-25 flex-col gap-2"><span className="mb-3 text-meta text-inverse-muted">{t(locale, "footer.legal")}</span><Link className="text-meta transition-colors duration-150 hover:text-white" href={localizePath("/imprint", locale)}>{t(locale, "footer.imprint")}</Link><Link className="text-meta transition-colors duration-150 hover:text-white" href={localizePath("/privacy", locale)}>{t(locale, "footer.privacy")}</Link></div>
        </div>
      </div>
      <div className="footer-legal flex justify-between border-t border-inverse-line pt-6 text-meta text-inverse-muted max-[600px]:mt-12 max-[600px]:flex-col max-[600px]:gap-2"><span>© 2026 Webpilot Studio</span><a className="transition-colors duration-150 hover:text-white" href="mailto:digitalmoneyseo@gmail.com">digitalmoneyseo@gmail.com</a></div>
    </footer>
  );
}
