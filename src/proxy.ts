import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale, localeCookie, type Locale } from "./i18n/config";
import { securityHeaders } from "./lib/security-headers";
import { getLegacyServiceRedirectPath } from "./lib/service-routes";

function withSecurityHeaders(response: NextResponse) {
  for (const { key, value } of securityHeaders) {
    response.headers.set(key, value);
  }

  return response;
}

function preferredLocale(request: NextRequest): Locale {
  const saved = request.cookies.get(localeCookie)?.value;
  return saved && hasLocale(saved) ? saved : defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const legacyServiceRedirect = getLegacyServiceRedirectPath(pathname);
  if (legacyServiceRedirect) {
    const url = request.nextUrl.clone();
    url.pathname = legacyServiceRedirect;
    const response = NextResponse.redirect(url, 308);
    if (pathname.startsWith(`/${defaultLocale}/`)) {
      response.cookies.set(localeCookie, defaultLocale, {
        httpOnly: false,
        maxAge: 60 * 60 * 24 * 365,
        path: "/",
        sameSite: "lax",
        secure: request.nextUrl.protocol === "https:",
      });
    }
    return withSecurityHeaders(response);
  }

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
  matcher: [
    "/",
    "/de",
    "/de/:path*",
    "/services/websites-apps",
    "/services/seo-ai-visibility",
    "/services/paid-campaigns",
    "/services/ai-automation",
    "/en/services/websites-apps",
    "/en/services/seo-ai-visibility",
    "/en/services/paid-campaigns",
    "/en/services/ai-automation",
    "/fr/services/websites-apps",
    "/fr/services/seo-ai-visibility",
    "/fr/services/paid-campaigns",
    "/fr/services/ai-automation",
  ],
};
