"use client";

import { useEffect } from "react";
import { localeCookie, type Locale } from "@/i18n/config";

const oneYearInSeconds = 60 * 60 * 24 * 365;

export function LocalePreference({ locale }: { locale: Locale }) {
  useEffect(() => {
    const currentLocale = document.cookie
      .split(";")
      .map((entry) => entry.trim())
      .find((entry) => entry.startsWith(`${localeCookie}=`))
      ?.slice(localeCookie.length + 1);

    if (currentLocale === locale) return;
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${localeCookie}=${locale}; Path=/; Max-Age=${oneYearInSeconds}; SameSite=Lax${secure}`;
  }, [locale]);

  return null;
}
