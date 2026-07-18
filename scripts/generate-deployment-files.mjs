import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";

const mode = process.env.PUBLIC_SITE_MODE ?? "concept";
const robots = mode === "live" ? "index, follow" : "noindex, nofollow, noarchive";
const externalScripts = mode === "live" ? " https://challenges.cloudflare.com https://static.cloudflareinsights.com" : mode === "preview" ? " https://challenges.cloudflare.com" : "";
const connectSources = mode === "live" ? " https://challenges.cloudflare.com https://cloudflareinsights.com" : mode === "preview" ? " https://challenges.cloudflare.com" : "";
async function filesUnder(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => entry.isDirectory() ? filesUnder(path.join(directory, entry.name)) : path.join(directory, entry.name)))).flat();
}
const hashes = new Set();
for (const file of (await filesUnder(path.join(process.cwd(), "dist"))).filter((file) => file.endsWith(".html"))) {
  const html = await readFile(file, "utf8");
  for (const match of html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)) {
    if (!match[1]) continue;
    hashes.add(`'sha256-${createHash("sha256").update(match[1]).digest("base64")}'`);
  }
}
const hashSources = hashes.size ? ` ${[...hashes].join(" ")}` : "";
const csp = `default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; img-src 'self' data:; font-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self'${hashSources}${externalScripts}; connect-src 'self'${connectSources}; frame-src https://challenges.cloudflare.com; upgrade-insecure-requests`;
const cspHeader = mode === "preview" ? "Content-Security-Policy-Report-Only" : "Content-Security-Policy";
const headers = `/*\n  ${cspHeader}: ${csp}\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()\n  X-Frame-Options: DENY\n  X-Robots-Tag: ${robots}\n  Cross-Origin-Opener-Policy: same-origin\n\n/_astro/*\n  Cache-Control: public, max-age=31536000, immutable\n\n/*.html\n  Cache-Control: public, max-age=0, must-revalidate\n`;
await writeFile(path.join(process.cwd(), "dist", "_headers"), headers, "utf8");
console.log(`Generated ${mode}-mode security and cache headers.`);
