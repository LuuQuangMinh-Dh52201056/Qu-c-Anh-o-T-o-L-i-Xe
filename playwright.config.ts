import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  outputDir: './test-results',
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:4186',
    browserName: 'chromium',
    launchOptions: process.platform === 'win32' ? { channel: 'msedge' } : {},
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'node server.mjs',
    url: 'http://127.0.0.1:4186/api/health',
    env: { PORT: '4186' },
    reuseExistingServer: false,
    timeout: 30_000,
  },
})
