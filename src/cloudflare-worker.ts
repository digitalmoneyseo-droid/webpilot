import vinextHandler from "vinext/server/fetch-handler";
import { defaultLocale, hasLocale, localeCookie, type Locale } from "./i18n/config";
import { handleContactRequest } from "./lib/contact-handler";
import { securityHeaders } from "./lib/security-headers";

interface CloudflareEnv {
  ASSETS: {
    fetch(request: Request): Promise<Response>;
  };
  CONTACT_EMAIL_FROM?: string;
  CONTACT_EMAIL_TO?: string;
  RESEND_API_KEY?: string;
}

interface CloudflareContext {
  passThroughOnException(): void;
  waitUntil(promise: Promise<unknown>): void;
}

function cookieLocale(request: Request) {
  const cookie = request.headers.get("cookie");
  if (!cookie) return undefined;

  const prefix = `${localeCookie}=`;
  const value = cookie.split(";").map((entry) => entry.trim()).find((entry) => entry.startsWith(prefix))?.slice(prefix.length);
  return value && hasLocale(value) ? value : undefined;
}

function preferredLocale(request: Request): Locale {
  const saved = cookieLocale(request);
  if (saved) return saved;

  const accepted = request.headers.get("accept-language")?.split(",")
    .map((entry) => {
      const [tag, quality] = entry.trim().split(";q=");
      return { locale: tag.toLowerCase().split("-")[0], quality: quality === undefined ? 1 : Number(quality) };
    })
    .filter(({ quality }) => quality > 0)
    .sort((a, b) => b.quality - a.quality);

  return accepted?.find(({ locale }) => hasLocale(locale))?.locale as Locale | undefined ?? defaultLocale;
}

function redirect(location: string, locale?: Locale) {
  const headers = new Headers({ location });
  if (locale) {
    headers.set("set-cookie", `${localeCookie}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax; Secure`);
  }
  for (const { key, value } of securityHeaders) headers.set(key, value);
  return new Response(null, { headers, status: 307 });
}

function withSecurityHeaders(response: Response) {
  const headers = new Headers(response.headers);
  for (const { key, value } of securityHeaders) headers.set(key, value);
  return new Response(response.body, { headers, status: response.status, statusText: response.statusText });
}

async function handleContactRoute(request: Request, env: CloudflareEnv) {
  if (request.method !== "POST") {
    return withSecurityHeaders(new Response(null, { headers: { allow: "POST" }, status: 405 }));
  }

  const response = await handleContactRequest(request, {
    apiKey: env.RESEND_API_KEY,
    to: env.CONTACT_EMAIL_TO,
    from: env.CONTACT_EMAIL_FROM,
  });
  return withSecurityHeaders(response);
}

function isRscRequest(request: Request, url: URL) {
  return request.headers.get("rsc") === "1"
    || request.headers.get("accept")?.includes("text/x-component")
    || url.searchParams.has("_rsc");
}

async function serveGermanHome(request: Request, env: CloudflareEnv, url: URL) {
  if (!isRscRequest(request, url)) return env.ASSETS.fetch(request);

  const assetUrl = new URL("/index.rsc", url);
  return env.ASSETS.fetch(new Request(assetUrl, request));
}

const worker = {
  async fetch(request: Request, env: CloudflareEnv | undefined, context: CloudflareContext) {
    if (!env?.ASSETS) return vinextHandler.fetch(request, env, context);

    const url = new URL(request.url);

    if (url.pathname === "/" && (request.method === "GET" || request.method === "HEAD")) {
      const locale = preferredLocale(request);
      if (locale !== defaultLocale) return redirect(`/${locale}${url.search}`);
      return serveGermanHome(request, env, url);
    }

    if (url.pathname === "/de" || url.pathname.startsWith("/de/")) {
      return redirect(`${url.pathname.slice(defaultLocale.length + 1) || "/"}${url.search}`, defaultLocale);
    }

    if (url.pathname === "/api/contact") return handleContactRoute(request, env);

    return vinextHandler.fetch(request, env, context);
  },
};

export default worker;
