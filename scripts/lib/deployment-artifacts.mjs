import * as nodeFileSystem from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";

export function createDeploymentArtifactModule(root = process.cwd(), fileSystem = nodeFileSystem) {
  const dist = path.join(root, "dist");

  async function filesUnder(directory) {
    const entries = await fileSystem.readdir(directory, { withFileTypes: true });
    return (await Promise.all(entries.map((entry) => entry.isDirectory() ? filesUnder(path.join(directory, entry.name)) : path.join(directory, entry.name)))).flat();
  }

  async function exists(file) {
    try { await fileSystem.access(file); return true; }
    catch { return false; }
  }

  async function htmlFiles() {
    return (await filesUnder(dist)).filter((file) => file.endsWith(".html"));
  }

  async function generate() {
    const hashes = new Set();
    for (const file of await htmlFiles()) {
      const html = await fileSystem.readFile(file, "utf8");
      for (const match of html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)) {
        if (!match[1]) continue;
        hashes.add(`'sha256-${createHash("sha256").update(match[1]).digest("base64")}'`);
      }
    }

    const hashSources = hashes.size ? ` ${[...hashes].join(" ")}` : "";
    const csp = `default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; img-src 'self' data:; font-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self'${hashSources} https://challenges.cloudflare.com https://static.cloudflareinsights.com; connect-src 'self' https://challenges.cloudflare.com https://cloudflareinsights.com; frame-src https://challenges.cloudflare.com; upgrade-insecure-requests`;
    const headers = `/*\n  Content-Security-Policy: ${csp}\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()\n  X-Frame-Options: DENY\n  X-Robots-Tag: index, follow\n  Cross-Origin-Opener-Policy: same-origin\n\n/_astro/*\n  Cache-Control: public, max-age=31536000, immutable\n\n/*.html\n  Cache-Control: public, max-age=0, must-revalidate\n`;
    await fileSystem.writeFile(path.join(dist, "_headers"), headers, "utf8");
  }

  async function validate() {
    const pages = await htmlFiles();
    const broken = [];
    for (const file of pages) {
      const html = await fileSystem.readFile(file, "utf8");
      const isRedirect = html.includes('http-equiv="refresh"');
      if (isRedirect) {
        if (!html.includes('<link rel="canonical"') || !html.includes('<meta name="robots" content="noindex"')) throw new Error(`Redirect metadata is incomplete in ${file}`);
      } else if (!html.includes('<link rel="canonical"') || !html.includes('hreflang="de"') || !html.includes('hreflang="en"') || !html.includes('hreflang="x-default"')) {
        throw new Error(`Missing localized metadata in ${file}`);
      }
      if (/[ÃÂ]|â(?:€|™|œ|ž|†)/.test(html)) throw new Error(`Possible encoding corruption in ${file}`);
      for (const match of html.matchAll(/href="([^"]+)"/g)) {
        const href = match[1];
        if (!href?.startsWith("/") || href.startsWith("//")) continue;
        const pathname = decodeURIComponent(href.split(/[?#]/)[0] || "/");
        if (pathname.startsWith("/_astro/") || pathname.startsWith("/api/")) continue;
        const candidates = pathname === "/" ? [path.join(dist, "index.html")] : [path.join(dist, pathname, "index.html"), path.join(dist, pathname), path.join(dist, `${pathname}.html`)];
        if (!(await Promise.all(candidates.map(exists))).some(Boolean)) broken.push(`${path.relative(dist, file)} -> ${href}`);
      }
    }
    if (broken.length) throw new Error(`Broken internal links:\n${broken.join("\n")}`);

    const [robots, sitemap, headers] = await Promise.all([
      fileSystem.readFile(path.join(dist, "robots.txt"), "utf8"),
      fileSystem.readFile(path.join(dist, "sitemap.xml"), "utf8"),
      fileSystem.readFile(path.join(dist, "_headers"), "utf8"),
    ]);
    if (!robots.includes("Allow: /") || !sitemap.includes("<url>")) throw new Error("Search discovery files are incomplete");
    if (!headers.includes("X-Content-Type-Options: nosniff") || !headers.includes("X-Robots-Tag")) throw new Error("Security headers are incomplete");

    return { htmlFileCount: pages.length };
  }

  return { generate, validate };
}
