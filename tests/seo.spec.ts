import { expect, test } from "bun:test";
import robots from "../src/app/robots";
import sitemap from "../src/app/sitemap";
import { locales } from "../src/i18n/config";
import { absoluteUrl, noIndexPageMetadata, pageMetadata, siteOrigin } from "../src/lib/site";

const indexablePaths = [
  "/",
  "/about",
  "/contact",
  "/services/ads",
  "/services/automation",
  "/services/seo",
  "/services/websites",
] as const;

function localizedPath(path: string, locale: string): string {
  if (locale === "de") return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

test("keeps every indexation signal on the production domain", () => {
  expect(siteOrigin).toBe("https://suchio.net");
  expect(absoluteUrl("/")).toBe("https://suchio.net/");
  expect(robots().sitemap).toBe("https://suchio.net/sitemap.xml");

  const entries = sitemap();
  expect(entries).toHaveLength(indexablePaths.length * locales.length);

  for (const { url } of entries) {
    expect(url.startsWith("https://suchio.net/")).toBeTrue();
  }

  const metadata = pageMetadata({
    locale: "de",
    pathname: "/",
    description: "Test description",
  });

  expect(metadata.alternates?.canonical).toBe("https://suchio.net/");
  expect(metadata.openGraph?.url).toBe("https://suchio.net/");
  expect(metadata.robots).toEqual({
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  });
});

test("publishes reciprocal locale alternates for every indexable sitemap URL", () => {
  const entries = sitemap();

  for (const path of indexablePaths) {
    const languages = {
      de: absoluteUrl(localizedPath(path, "de")),
      en: absoluteUrl(localizedPath(path, "en")),
      fr: absoluteUrl(localizedPath(path, "fr")),
      "x-default": absoluteUrl(localizedPath(path, "de")),
    };

    for (const locale of locales) {
      const url = absoluteUrl(localizedPath(path, locale));
      expect(entries.find((entry) => entry.url === url)?.alternates?.languages).toEqual(languages);
    }
  }
});

test("keeps legal pages crawlable but out of the search index", () => {
  const metadata = noIndexPageMetadata({
    locale: "de",
    pathname: "/privacy",
    title: "Datenschutz",
    description: "Test description",
  });

  expect(metadata.robots).toEqual({
    index: false,
    follow: true,
    googleBot: { index: false, follow: true },
  });
  expect(sitemap().some(({ url }) => url.endsWith("/privacy") || url.endsWith("/imprint"))).toBeFalse();
});

test("exposes only the canonical production host", async () => {
  const config = await Bun.file("wrangler.jsonc").text();

  expect(config).toContain('"workers_dev": false');
  expect(config).not.toContain("suchio.info");
  expect(config).not.toContain("digitalmoneyseo.workers.dev");
});
