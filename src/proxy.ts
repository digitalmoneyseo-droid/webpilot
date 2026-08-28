import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale, localeCookie, type Locale } from "./i18n/config";
import { securityHeaders } from "./lib/security-headers";

function withSecurityHeaders(response: NextResponse) {
  for (const { key, value } of securityHeaders) {
    response.headers.set(key, value);
  }

  return response;
}

function preferredLocale(request: NextRequest): Locale {
  const saved = request.cookies.get(localeCookie)?.value;
  if (saved && hasLocale(saved)) return saved;

  const accepted = request.headers.get("accept-language")?.split(",")
    .map((entry) => {
      const [tag, quality] = entry.trim().split(";q=");
      return { locale: tag.toLowerCase().split("-")[0], quality: quality === undefined ? 1 : Number(quality) };
    })
    .filter(({ quality }) => quality > 0)
    .sort((a, b) => b.quality - a.quality);

  return accepted?.find(({ locale }) => hasLocale(locale))?.locale as Locale | undefined ?? defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    const locale = preferredLocale(request);
    if (locale !== defaultLocale) {
      const url = request.nextUrl.clone();
      url.pathname = `/${locale}`;
      return withSecurityHeaders(NextResponse.redirect(url, 307));
    }
    return withSecurityHeaders(NextResponse.next());
  }

  const url = request.nextUrl.clone();
  url.pathname = pathname.slice(defaultLocale.length + 1) || "/";
  const response = NextResponse.redirect(url, 307);
  response.cookies.set(localeCookie, defaultLocale, {
    httpOnly: false,
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
    sameSite: "lax",
    secure: request.nextUrl.protocol === "https:",
  });
  return withSecurityHeaders(response);
}

export const config = {
  matcher: ["/", "/de", "/de/:path*"],
};
