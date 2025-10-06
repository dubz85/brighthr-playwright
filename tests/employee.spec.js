import { test, expect } from "@playwright/test";
import { AddEmployeeButton } from "../page-objects/addEmployee.js";
import {
  EmployeeDetails,
  SecondEmployeeDetails,
} from "../Helpers/EmployeeInfo.js";

//click on add employee button
test.only("Add employee", async ({ page }) => {
  const addEmployeeButton = new AddEmployeeButton(page);
  await addEmployeeButton.visit();

  await addEmployeeButton.addFirstEmployee();

  await addEmployeeButton.addSecondEmployee();
});
