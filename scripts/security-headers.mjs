import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const dist = path.resolve("dist");

async function filesUnder(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? filesUnder(target) : target;
  }))).flat();
}

const hashes = new Set();
for (const file of (await filesUnder(dist)).filter((candidate) => candidate.endsWith(".html"))) {
  const html = await readFile(file, "utf8");
  for (const match of html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)) {
    if (match[1]) hashes.add(`'sha256-${createHash("sha256").update(match[1]).digest("base64")}'`);
  }
}

const scriptSources = [...hashes].sort().join(" ");
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "img-src 'self' data:",
  "font-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  `script-src 'self' ${scriptSources} https://challenges.cloudflare.com https://static.cloudflareinsights.com`.trim(),
  "connect-src 'self' https://challenges.cloudflare.com https://cloudflareinsights.com",
  "frame-src https://challenges.cloudflare.com",
  "upgrade-insecure-requests",
].join("; ");

await writeFile(path.join(dist, "_headers"), `/*
  Content-Security-Policy: ${csp}
  Cache-Control: public, max-age=0, must-revalidate
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
  X-Frame-Options: DENY
  Cross-Origin-Opener-Policy: same-origin
  Strict-Transport-Security: max-age=31536000

/_astro/*
  Cache-Control: public, max-age=31536000, immutable
`, "utf8");
