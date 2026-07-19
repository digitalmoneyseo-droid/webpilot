import { createCloudflareContactPorts } from "./contact/cloudflare-adapters";
import { contactResponseHeaders, handleContactRequest } from "./contact/intake";

const LEGACY_SERVICE_REDIRECTS: Readonly<Record<string, string>> = {
  "/services/brand-web-product": "/services/website-design-development",
  "/services/brand-web-product/": "/services/website-design-development",
  "/en/services/brand-web-product": "/en/services/website-design-development",
  "/en/services/brand-web-product/": "/en/services/website-design-development",
};

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);
    const legacyDestination = LEGACY_SERVICE_REDIRECTS[url.pathname];
    if (legacyDestination) {
      const destination = new URL(legacyDestination, url.origin);
      return new Response(null, { status: 301, headers: { Location: destination.toString(), "Cache-Control": "public, max-age=86400" } });
    }
    if (url.pathname === "/api/contact") return handleContactRequest(request, createCloudflareContactPorts(env));
    return Response.json({ ok: false, category: "not_found" }, { status: 404, headers: contactResponseHeaders });
  },
} satisfies ExportedHandler<Env>;
