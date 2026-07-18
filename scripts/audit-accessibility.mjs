import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();
await page.goto(process.argv[2] ?? "http://127.0.0.1:4321/en");
const results = await new AxeBuilder({ page }).exclude(".project-visual").analyze();
for (const violation of results.violations.filter((item) => ["serious", "critical"].includes(item.impact ?? ""))) {
  console.log(`${violation.id}: ${violation.nodes.length}`);
  for (const node of violation.nodes) console.log(`  ${node.target.join(" ")} — ${node.any[0]?.data?.fgColor ?? node.failureSummary?.split("\n")[0]}`);
}
await browser.close();
