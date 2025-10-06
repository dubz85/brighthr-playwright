// scripts/save-auth-state.mjs
// Purpose: sign-in interactively and save Playwright storageState to auth.json
// so tests can reuse the authenticated state and avoid repeated SSO login flows.

import "dotenv/config"; // automatically loads .env
import { chromium } from "playwright";

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://sandbox-app.brighthr.com/login");
  await page.fill("#username", process.env.BRIGHTHR_USERNAME);
  await page.fill("#password", process.env.BRIGHTHR_PASSWORD);
  await page.click("button[type='submit']");

  // Wait for dashboard or home page
  await page.waitForURL(/sandbox-app\.brighthr\.com/);
  console.log("✅ Logged in successfully, saving session...");

  await context.storageState({ path: "auth.json" });
  await browser.close();
  console.log("✅ Saved auth.json");
})();
