import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { localizePath, studioLocation, t, type Locale } from "@/lib/i18n";

export function SiteFooter({ locale }: { locale: Locale }) {
  return (
    <footer className="site-footer mt-auto bg-dark px-page pt-section pb-8 text-inverse">
      <div className="footer-main flex min-h-40 justify-between gap-12 max-[600px]:block">
        <Link href={localizePath("/", locale)} className="footer-brand inline-flex min-h-11 self-start items-center [&_.brand-wordmark]:text-heading-md"><BrandMark /></Link>
        <div className="footer-links flex gap-20 max-[600px]:mt-16 max-[600px]:grid max-[600px]:grid-cols-2 max-[600px]:gap-x-6">
          <div className="flex min-w-25 flex-col gap-2"><span className="mb-3 text-caption text-[#929292]">{t(locale, "Explore")}</span><Link className="text-small" href={localizePath("/solutions", locale)}>{t(locale, "Solutions")}</Link><Link className="text-small" href={localizePath("/work", locale)}>{t(locale, "Our work")}</Link><Link className="text-small" href={localizePath("/about", locale)}>{t(locale, "About us")}</Link></div>
          <div className="flex min-w-25 flex-col gap-2"><span className="mb-3 text-caption text-[#929292]">{t(locale, "Connect")}</span><Link className="text-small" href={localizePath("/contact", locale)}>{t(locale, "Contact")}</Link><a className="text-small" href="mailto:hello@webpilot.studio">{t(locale, "Email")}</a></div>
        </div>
      </div>
      <div className="footer-legal flex justify-between border-t border-[#292929] pt-6 text-caption text-[#929292] max-[600px]:mt-12 max-[600px]:flex-col max-[600px]:gap-2"><span>© 2026 Webpilot Studio</span><a href="mailto:hello@webpilot.studio">hello@webpilot.studio</a><span>{studioLocation(locale)}</span></div>
    </footer>
  );
}
