# Webpilot operations

## Deployment modes

- `preview`: build with `PUBLIC_SITE_MODE=preview`, deploy to the Wrangler `preview` environment, and protect the hostname with Cloudflare Access. The contact endpoint uses preview-only Turnstile and Resend credentials. CSP is report-only and analytics is off.
- `concept`: public static site with `noindex, nofollow`, disclosures visible, contact collection disabled, and analytics off. This is the safe initial mode.
- `live`: requires every value checked by `scripts/validate-config.mjs`. It enables the contact form and allows indexable editorial pages. Concept entries keep `noindex, follow`.

## Cloudflare dashboard checklist

1. Create separate `webpilot-studio-preview` and `webpilot-studio-production` Workers environments and custom domains.
2. Protect the preview hostname and Workers preview URLs with Cloudflare Access. Require the approved team identity provider; do not use a shared password.
3. Store `TURNSTILE_SECRET_KEY` and `RESEND_API_KEY` with `wrangler secret put NAME --env preview|production`. Never add real values to repository files.
4. Create separate Turnstile widgets for preview and production. Restrict hostnames to their matching domains.
5. Add a zone rate-limiting rule for `http.request.uri.path eq "/api/contact"` in addition to the Worker binding.
6. Enable Cloudflare Web Analytics only for the live hostname. Set `PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN` only if using the manual beacon; otherwise use Cloudflare’s automatic dashboard injection.
7. Configure GitHub `preview` and `production` environments, secrets, required reviewers, and branch protection. Production is a manual workflow from `main` after CI.
8. Verify the Resend sending domain. Publish SPF and DKIM records and a DMARC policy before live mode.
9. Have counsel review the final Impressum and privacy notice with the real operator and retention details.

## Smoke test

After deployment, verify `/`, `/en`, one project, one service, one insight, `/robots.txt`, `/sitemap.xml`, a missing route, response security headers, and (outside concept mode) a German and English contact submission. Confirm Worker logs contain no submitted values.

## Rollback

1. Run `wrangler deployments list --env production` and identify the last known-good deployment ID.
2. Run `wrangler rollback DEPLOYMENT_ID --env production`.
3. Repeat the smoke test and record the incident. If contact delivery is involved, disable `CONTACT_FORM_ENABLED` while investigating.
