import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";

const dist = path.join(process.cwd(), "dist");
const mode = process.env.PUBLIC_SITE_MODE ?? "concept";

async function filesUnder(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => entry.isDirectory() ? filesUnder(path.join(directory, entry.name)) : path.join(directory, entry.name)))).flat();
}

async function exists(file) { try { await access(file); return true; } catch { return false; } }

const htmlFiles = (await filesUnder(dist)).filter((file) => file.endsWith(".html"));
const broken = [];
for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  if (!html.includes('<link rel="canonical"') || !html.includes('hreflang="de"') || !html.includes('hreflang="en"') || !html.includes('hreflang="x-default"')) throw new Error(`Missing localized metadata in ${file}`);
  if (/[ÃÂ]|â(?:€|™|œ|ž|†)/.test(html)) throw new Error(`Possible encoding corruption in ${file}`);
  if (mode !== "live" && !html.includes('content="noindex, nofollow, noarchive"')) throw new Error(`Non-live page lacks noindex in ${file}`);
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

const robots = await readFile(path.join(dist, "robots.txt"), "utf8");
const sitemap = await readFile(path.join(dist, "sitemap.xml"), "utf8");
const headers = await readFile(path.join(dist, "_headers"), "utf8");
if (mode === "live" && !robots.includes("Allow: /") || mode !== "live" && !robots.includes("Disallow: /")) throw new Error("robots.txt does not match site mode");
if (mode !== "live" && sitemap.includes("<url>")) throw new Error("Non-live sitemap must not expose indexable URLs");
if (!headers.includes("X-Content-Type-Options: nosniff") || !headers.includes("X-Robots-Tag")) throw new Error("Security headers are incomplete");

console.log(`Validated ${htmlFiles.length} HTML files with no broken internal links.`);
