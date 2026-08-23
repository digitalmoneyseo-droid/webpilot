import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const chunkDirectory = join(process.cwd(), ".next", "static", "chunks");
const dictionaryMarkers = [
  "Belege vor Meinung",
  "Evidence before opinion",
  "Marketing websites",
];

const files = (await readdir(chunkDirectory)).filter((file) => file.endsWith(".js"));
const violations = [];

for (const file of files) {
  const source = await readFile(join(chunkDirectory, file), "utf8");
  const matches = dictionaryMarkers.filter((marker) => source.includes(marker));
  if (matches.length) violations.push(`${file}: ${matches.join(", ")}`);
}

if (violations.length) {
  throw new Error(`Server-owned localization copy was found in client chunks:\n${violations.join("\n")}`);
}

console.log(`Checked ${files.length} client chunks; server-owned dictionary markers were absent.`);
