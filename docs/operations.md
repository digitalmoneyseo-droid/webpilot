# Webpilot operations

## Cloudflare setup

1. Configure `webpilot.studio` as Worker custom domain.
2. Store `TURNSTILE_SECRET_KEY` and `RESEND_API_KEY` with `wrangler secret put NAME`.
3. Replace Turnstile placeholder site key and restrict widget to production hostname.
4. Add zone rate limiting for `http.request.uri.path eq "/api/contact"` alongside Worker binding.
5. Set `PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN` only when manual Cloudflare Web Analytics beacon is wanted.
6. Verify Resend sending domain. Publish SPF and DKIM records plus DMARC policy.
7. Configure real legal operator data and obtain legal review for imprint and privacy notice.

## Smoke test

After deployment, verify `/`, `/en`, one project, one service, `/robots.txt`, `/sitemap.xml`, missing route, security headers, and German plus English contact submissions. Confirm Worker logs contain no submitted values.

## Rollback

1. Run `wrangler deployments list` and identify last known-good deployment ID.
2. Run `wrangler rollback DEPLOYMENT_ID`.
3. Repeat smoke test and record incident.
