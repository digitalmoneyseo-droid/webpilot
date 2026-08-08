import { NotFoundPage } from "@/components/pages/not-found-page";
import { localizePath } from "@/lib/i18n";
import { getRouteLocale } from "@/lib/locale-route";

type Props = { params: Promise<{ lang: string; notFound: string[] }> };

export default async function Page({ params }: Props) {
  const [locale, { notFound }] = await Promise.all([getRouteLocale(params), params]);
  return <NotFoundPage locale={locale} pathname={localizePath(`/${notFound.join("/")}`, locale)} />;
}
