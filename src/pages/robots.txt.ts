import type { APIRoute } from "astro";
import { siteUrl } from "@/lib/site";

export const GET: APIRoute = () => {
  const body = `User-agent: *\nAllow: /\nSitemap: ${new URL("/sitemap.xml", siteUrl)}\n`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
