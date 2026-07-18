import type { APIRoute } from "astro";
import { siteMode, siteUrl } from "@/lib/site";

export const GET: APIRoute = () => {
  const body = siteMode === "live"
    ? `User-agent: *\nAllow: /\nSitemap: ${new URL("/sitemap.xml", siteUrl)}\n`
    : "User-agent: *\nDisallow: /\n";
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
