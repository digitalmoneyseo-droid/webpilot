import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { localizePath, t, type Locale } from "@/lib/i18n";
import { getServiceCatalog } from "@/lib/service-catalog";

export function SiteFooter({ locale }: { locale: Locale }) {
  const services = getServiceCatalog(locale);
  return (
    <footer className="mt-auto bg-black px-page pt-16 pb-8 text-inverse">
      <div className="footer-main flex min-h-40 justify-between gap-12 max-[600px]:block">
        <Link href={localizePath("/", locale)} className="group/brand inline-flex min-h-11 self-start items-center"><BrandMark size="large" /></Link>
        <div className="footer-links flex gap-20 max-[600px]:mt-16 max-[600px]:grid max-[600px]:grid-cols-2 max-[600px]:gap-x-6">
          <div className="flex min-w-25 flex-col gap-2"><span className="mb-3 text-meta text-[#929292]">{t(locale, "nav.services")}</span>{services.map((service) => <Link className="text-meta hover:text-white" href={service.href} key={service.id}>{service.copy.name}</Link>)}</div>
          <div className="flex min-w-25 flex-col gap-2"><span className="mb-3 text-meta text-[#929292]">{t(locale, "footer.explore")}</span><Link className="text-meta hover:text-white" href={localizePath("/about", locale)}>{t(locale, "nav.about")}</Link></div>
          <div className="flex min-w-25 flex-col gap-2"><span className="mb-3 text-meta text-[#929292]">{t(locale, "footer.connect")}</span><Link className="text-meta hover:text-white" href={localizePath("/contact", locale)}>{t(locale, "nav.contact")}</Link><a className="text-meta hover:text-white" href="mailto:digitalmoneyseo@gmail.com">{t(locale, "footer.email")}</a></div>
        </div>
      </div>
      <div className="footer-legal flex justify-between border-t border-[#292929] pt-6 text-meta text-[#929292] max-[600px]:mt-12 max-[600px]:flex-col max-[600px]:gap-2"><span>© 2026 Webpilot Studio</span><a href="mailto:digitalmoneyseo@gmail.com">digitalmoneyseo@gmail.com</a></div>
    </footer>
  );
}
