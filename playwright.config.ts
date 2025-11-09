import { defineConfig, devices } from "@playwright/test"

const port = process.env.PORT ? Number(process.env.PORT) : 3000
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? `http://127.0.0.1:${port}`

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"]],
  use: {
    baseURL,
    trace: "on-first-retry",
    viewport: { width: 1280, height: 720 },
    video: "retain-on-failure",
  },
  webServer: process.env.PLAYWRIGHT_SKIP_WEB_SERVER
    ? undefined
    : {
        command: `pnpm dev --port ${port}`,
        reuseExistingServer: !process.env.CI,
        stdout: "pipe",
        stderr: "pipe",
        env: {
          ...process.env,
          PORT: String(port),
        },
        timeout: 120_000,
      },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
})

