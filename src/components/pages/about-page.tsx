import type { Locale } from "@/lib/i18n";

export function AboutPage({ locale: _locale }: { locale: Locale }) {
  // The current Astro reference intentionally renders an empty main region on this route.
  return <main id="main-content" />;
}
