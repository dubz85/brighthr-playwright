import { expect } from "@playwright/test";
import {
  EmployeeDetails,
  SecondEmployeeDetails,
} from "../Helpers/EmployeeInfo.js";

export class AddEmployeeButton {
  constructor(page) {
    this.page = page;

    this.employeeButton = page.locator('[data-e2e="employees"]').first();
    this.heading = this.page.getByRole("heading", { name: "Employee hub" });
    this.employeeAddButton = page.locator('button:has-text("Add employee")');

    this.employeeFirstNameInput = page.locator("#firstName");
    this.employeeLastNameInput = page.locator("#lastName");
    this.employeeEmailInput = page.locator("#email");
    this.sendRegistrationEmail = page.locator("#registrationEmail, true");
    this.sendRegistrationEmailCheckbox = page.getByLabel(
      "Send registration email"
    );
    this.employeePhoneNumberInput = page.locator("#phoneNumber");
    this.startDateInput = page.locator("#startDate");
    this.employeeJobTitleInput = page.locator("#jobTitle");
    this.saveNewEmployeeButton = page.locator(
      'button:has-text("Save new employee")'
    );
    this.closeModalButton = page.getByRole("button", { name: "Close modal" });

    //this.secondNewEmployeeButton =  page.getByRole('button', { name: 'Add another employee' })
  }

  async visit() {
    await this.page.goto("/dashboard");
    await expect(this.employeeButton).toBeVisible({ timeout: 10000 });
    await this.employeeButton.click();
    await expect(this.heading).toHaveText("Employee hub");

    await expect(this.employeeAddButton).toBeVisible({ timeout: 10000 });
    await this.employeeAddButton.click();
  }

  async addFirstEmployee() {
    {
      expect(this.saveNewEmployeeButton).toBeDisabled;

      await this.employeeFirstNameInput.waitFor();
      await this.employeeFirstNameInput.fill(EmployeeDetails.firstName);

      await this.employeeLastNameInput.waitFor();
      await this.employeeLastNameInput.fill(EmployeeDetails.lastName);

      await this.employeeEmailInput.waitFor();
      await this.employeeEmailInput.fill(EmployeeDetails.email);

      await expect(this.sendRegistrationEmailCheckbox).toBeChecked();

      await this.employeePhoneNumberInput.waitFor();
      await this.employeePhoneNumberInput.fill(EmployeeDetails.phoneNumber);

      await this.startDateInput.click();

      await this.page.getByRole("button", { name: "October" }).click();
      await this.page.getByRole("button", { name: "Jan" }).click();
      await this.page
        .getByRole("gridcell", { name: "Mon Jan 06" })
        .locator("div")
        .nth(1)
        .click();
      await expect(this.startDateInput).toHaveText("Mon 06 Jan 2025");

      await this.employeeJobTitleInput.waitFor();
      await this.employeeJobTitleInput.fill(EmployeeDetails.jobTitle);

      expect(this.saveNewEmployeeButton).toBeEnabled;
      await this.saveNewEmployeeButton.waitFor();
      await this.saveNewEmployeeButton.click();

      // Locate by class or role (whichever is more stable)
      const successBanner = await this.page.locator(".bg-primary-700 h1");

      // Assert the full text
      await expect(successBanner).toHaveText("Success! New employee added");

      await expect(this.closeModalButton).toBeVisible();
      await this.closeModalButton.click();

      const employeeNameLocator = this.page
        .locator(".flex.flex-col h1.text-base.font-bold", {
          hasText: EmployeeDetails.firstName,
        })
        .first();
      await expect(employeeNameLocator).toBeVisible({ timeout: 30000 });
    }
  }

  async addSecondEmployee() {
    await this.page.waitForLoadState("networkidle");

    await this.page.goto("/employee-hub");
    // await expect(this.employeeButton).toBeVisible({ timeout: 10000 });
    // await this.employeeButton.click();
    // await expect(this.heading).toHaveText('Employee hub');

    await expect(this.employeeAddButton).toBeVisible({ timeout: 10000 });
    await this.employeeAddButton.click();

    // await expect(this.addAnotherEmployeeButton).toBeVisible();
    // await this.addAnotherEmployeeButton.click()

    await expect(this.saveNewEmployeeButton).toBeDisabled();

    await this.employeeFirstNameInput.waitFor();
    await this.employeeFirstNameInput.fill(SecondEmployeeDetails.firstName);

    await this.employeeLastNameInput.waitFor();
    await this.employeeLastNameInput.fill(SecondEmployeeDetails.lastName);

    await this.employeeEmailInput.waitFor();
    await this.employeeEmailInput.fill(SecondEmployeeDetails.email);

    await expect(this.sendRegistrationEmailCheckbox).toBeChecked();

    await this.employeePhoneNumberInput.waitFor();
    await this.employeePhoneNumberInput.fill(SecondEmployeeDetails.phoneNumber);

    await this.startDateInput.click();

    await this.page.getByRole("button", { name: "October" }).click();
    await this.page.getByRole("button", { name: "Feb" }).click();
    await this.page
      .getByRole("gridcell", { name: "Mon Feb 03" })
      .locator("div")
      .nth(1)
      .click();
    await expect(this.startDateInput).toHaveText("Mon 03 Feb 2025");

    await this.employeeJobTitleInput.waitFor();
    await this.employeeJobTitleInput.fill(SecondEmployeeDetails.jobTitle);

    await expect(this.saveNewEmployeeButton).toBeEnabled();
    await this.saveNewEmployeeButton.click();

    const successText = await this.page.locator(".bg-primary-700 h1");

    await expect(successText).toHaveText("Success! New employee added");

    await expect(this.closeModalButton).toBeVisible();
    await this.closeModalButton.click();

    const employeeNameLocator = this.page
      .locator(".flex.flex-col h1.text-base.font-bold", {
        hasText: SecondEmployeeDetails.firstName,
      })
      .first();
    await expect(employeeNameLocator).toBeVisible({ timeout: 30000 });

  }
}
