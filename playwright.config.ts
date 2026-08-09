import { defineConfig, devices } from "@playwright/test";

const baseURL = `http://127.0.0.1:${process.env.PORT ?? 3000}`;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "line" : "list",
  use: {
    baseURL,
    locale: "de-DE",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "pnpm start",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
});
