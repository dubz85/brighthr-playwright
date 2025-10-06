// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config(); // Load .env locally (GitHub uses secrets)

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: 'https://sandbox-app.brighthr.com/login',
    storageState: 'auth.json', // ✅ use saved auth state
    headless: process.env.CI === 'true',
    trace: 'on-first-retry',
  },

  timeout: 30 * 1000,
  expect: { timeout: 5000 },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // You can add Firefox, Webkit, Mobile devices here
  ],

  // Uncomment if you need a local web server
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
