// page-objects/login-test.js
import { expect } from "@playwright/test";

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator("#username");
    this.passwordInput = page.locator("#password");
    this.loginButton = page.locator("button[type='submit']");
  }

  async goto() {
    await this.page.goto("https://sandbox-app.brighthr.com/login");
  }

  async assertLoginPageVisible() {
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
    await expect(this.loginButton).toBeEnabled();
  }

  async fillCredentials(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async clickLogin() {
    await this.loginButton.waitFor({ state: "visible" });
    await this.loginButton.click();
    await expect(this.page).toHaveURL(
      "https://sandbox-app.brighthr.com/dashboard"
    );

    // Corrected version
    const successMessage = this.page.locator(".mb-0.text-2xl.font-bold");
    await expect(successMessage).toContainText("Hi, QA");
  }
}
