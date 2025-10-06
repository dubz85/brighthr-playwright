import { test, expect } from "@playwright/test";
import { Credentials } from "../Helpers/LoginDetails.js";
import { LoginPage } from "../page-objects/login-test";

test("Verify login page and SSO redirection", async ({ page }) => {
  const loginPage = new LoginPage(page); // ✅ must pass the page object

  await loginPage.goto(); // ✅ should work now
  await loginPage.assertLoginPageVisible();

  await loginPage.fillCredentials(Credentials.username, Credentials.password);
  await loginPage.clickLogin();
});
