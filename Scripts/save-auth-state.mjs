// // scripts/save-auth-state.mjs
// import "dotenv/config";
//  import { chromium } from "playwright";

// (async () => {
//   const browser = await chromium.launch({ headless: true });
//   const context = await browser.newContext();
//   const page = await context.newPage();

//   await page.goto("https://sandbox-app.brighthr.com/login");
//   await page.fill("#username", process.env.BRIGHTHR_USERNAME);
//   await page.fill("#password", process.env.BRIGHTHR_PASSWORD);
//   await page.click("button[type='submit']");

//   await page.waitForURL(/sandbox-app\.brighthr\.com\/login/);

//   //(/sandbox-app\.brighthr\.com\/dashboard/);

//   await context.storageState({ path: "auth.json" });
//   await browser.close();
//   console.log("✅ Logged in and saved auth.json");
// })();


// import { chromium } from "playwright";
// import "dotenv/config";

// (async () => {
//   // Read credentials from environment variables
//   const username = process.env.BRIGHTHR_USERNAME;
//   const password = process.env.BRIGHTHR_PASSWORD;

//   if (!username || !password) {
//     throw new Error("❌ Missing BRIGHTHR_USERNAME or BRIGHTHR_PASSWORD");
//   }

//   // Launch browser
//   const browser = await chromium.launch({
//     headless: process.env.CI === "true", // Headless on CI, headed locally
//     slowMo: process.env.CI ? 0 : 50,     // Slow motion for debugging locally
//   });

import { chromium } from "playwright";
import "dotenv/config";

(async () => {
  const username = process.env.BRIGHTHR_USERNAME;
  const password = process.env.BRIGHTHR_PASSWORD;

  if (!username || !password) {
    throw new Error("❌ Missing BRIGHTHR_USERNAME or BRIGHTHR_PASSWORD");
  }

  // Launch the browser
  const browser = await chromium.launch({
    headless: process.env.CI === "true", // headless in CI
    slowMo: process.env.CI ? 0 : 50      // optional slow motion locally
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log("🌐 Navigating to login page...");
    await page.goto("https://sandbox-app.brighthr.com/login", { waitUntil: "load", timeout: 60000 });

    console.log("✍ Filling username...");
    await page.fill("#username", username);

    console.log("✍ Filling password...");
    await page.fill("#password", password);

    console.log("🔑 Submitting login form...");
    await page.click("button[type='submit']");

    console.log("⏳ Waiting for dashboard to load...");
    // Wait for a reliable element that indicates login success
    await page.waitForSelector('text=Hi, QA', { timeout: 60000 });

    console.log("✅ Logged in successfully. Saving auth.json...");
    await context.storageState({ path: "auth.json" });

  } catch (error) {
    console.error("❌ Login or page load failed:", error);
    process.exit(1); // Fail the workflow
  } finally {
    await browser.close();
  }

  console.log("🎉 Auth state saved successfully!");
})();
