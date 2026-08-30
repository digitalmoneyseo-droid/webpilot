import { basename, join } from "node:path";

const outputDirectory = join(process.cwd(), "dist", "client");
const homepagePath = join(outputDirectory, "index.html");
const homepage = await Bun.file(homepagePath).text();

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/\s([:\w-]+)=(?:"([^"]*)"|'([^']*)')/g)].map((match) => [
    match[1].toLowerCase(),
    match[2] ?? match[3] ?? "",
  ]));
}

const links = [...homepage.matchAll(/<link\b[^>]*>/gi)].map((match) => attributes(match[0]));
const scripts = [...homepage.matchAll(/<script\b[^>]*>/gi)].map((match) => attributes(match[0]));

assert(!links.some(({ rel }) => rel === "stylesheet"), "The production homepage contains a render-blocking stylesheet link.");
assert(/<style\b[^>]*data-vinext-inline-css[^>]*data-href=/i.test(homepage), "The production homepage does not contain Vinext-compatible inlined application CSS.");
assert(!homepage.includes("url(./files/"), "Inlined CSS contains a document-relative font URL.");
assert(!homepage.includes("data-optimization-animation"), "The offscreen optimization animation was server-rendered eagerly.");
assert(!homepage.includes("data-campaign-metric"), "The offscreen campaign animation was server-rendered eagerly.");
assert(!homepage.includes("data-automation-flow"), "The offscreen automation animation was server-rendered eagerly.");

const initialModuleUrls = new Set([
  ...links.filter(({ rel, href }) => rel === "modulepreload" && href).map(({ href }) => href),
  ...scripts.filter(({ type, src }) => type === "module" && src).map(({ src }) => src),
]);
const initialModules = [];

for (const url of initialModuleUrls) {
  const relativePath = url.split("?")[0].replace(/^\//, "");
  const file = Bun.file(join(outputDirectory, relativePath));
  assert(file.size > 0, `Could not resolve initial module ${url}.`);
  initialModules.push({ name: basename(relativePath), size: file.size });
}

const initialModuleBytes = initialModules.reduce((sum, { size }) => sum + size, 0);
const maximumInitialModuleBytes = 525_000;
assert(initialModuleBytes <= maximumInitialModuleBytes, `Initial JavaScript grew to ${initialModuleBytes} bytes, above the ${maximumInitialModuleBytes}-byte budget.`);

const forbiddenInitialChunks = ["automation-flow-animation", "campaign-growth-animation", "optimization-search-animation", "use-hydrated-reduced-motion"];
for (const marker of forbiddenInitialChunks) {
  assert(!initialModules.some(({ name }) => name.includes(marker)), `${marker} is loaded before its offscreen visual approaches the viewport.`);
}

console.log(`Performance validation passed: ${initialModules.length} initial modules, ${initialModuleBytes} raw bytes, inlined CSS, and deferred offscreen animations.`);
