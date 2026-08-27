import "./globals.css";
import type { Metadata } from "next";
import { LocaleDocument } from "@/components/locale-document";
import { NotFoundPage } from "@/components/pages/not-found-page";
import { defaultLocale } from "@/i18n/config";
import { notFoundMessages } from "@/i18n/not-found";
import { localizePath } from "@/lib/locale-path";

export const metadata: Metadata = { title: notFoundMessages[defaultLocale].title };

export default function GlobalNotFound() {
  return (
    <LocaleDocument locale={defaultLocale}>
      <NotFoundPage copy={notFoundMessages[defaultLocale]} homeHref={localizePath("/", defaultLocale)} />
    </LocaleDocument>
  );
}
