"use client";

import { useParams } from "next/navigation";
import { NotFoundPage } from "@/components/pages/not-found-page";
import { defaultLocale, hasLocale } from "@/i18n/config";
import { notFoundMessages } from "@/i18n/not-found";
import { localizePath } from "@/lib/locale-path";

export default function NotFound() {
  const { lang } = useParams<{ lang?: string }>();
  const locale = lang && hasLocale(lang) ? lang : defaultLocale;

  return <NotFoundPage copy={notFoundMessages[locale]} homeHref={localizePath("/", locale)} />;
}
