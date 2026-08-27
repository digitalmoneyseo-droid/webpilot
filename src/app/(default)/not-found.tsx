import { NotFoundPage } from "@/components/pages/not-found-page";
import { defaultLocale } from "@/i18n/config";
import { notFoundMessages } from "@/i18n/not-found";
import { localizePath } from "@/lib/locale-path";

export default function NotFound() {
  return <NotFoundPage copy={notFoundMessages[defaultLocale]} homeHref={localizePath("/", defaultLocale)} />;
}
