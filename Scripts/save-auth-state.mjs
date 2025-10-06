// scripts/save-auth-state.mjs
import "dotenv/config";
import { chromium } from "playwright";

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://sandbox-app.brighthr.com/login");
  await page.fill("#username", process.env.BRIGHTHR_USERNAME);
  await page.fill("#password", process.env.BRIGHTHR_PASSWORD);
  await page.click("button[type='submit']");

  // Wait for dashboard page
  await page.waitForURL(/sandbox-app\.brighthr\.com\/dashboard/);

  await context.storageState({ path: "auth.json" });
  await browser.close();
  console.log("✅ Logged in and saved auth.json");
})();
