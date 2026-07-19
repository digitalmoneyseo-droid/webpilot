import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:4321";
const executablePath = process.env.CHROME_PATH;

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  expect: { timeout: 5_000, toHaveScreenshot: { maxDiffPixelRatio: 0.001, animations: "disabled" } },
  use: { baseURL, trace: "retain-on-failure" },
  webServer: process.env.PLAYWRIGHT_SKIP_WEBSERVER === "1" ? undefined : { command: "npm run dev -- --port 4321", url: baseURL, reuseExistingServer: true, timeout: 120_000 },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"], launchOptions: executablePath ? { executablePath } : undefined } }],
});
