# BrightHR Playwright Test Automation

## Overview
This repository contains **end-to-end automated tests** for the BrightHR sandbox application, implemented using **Playwright** and the **Page Object Model (POM)**.  
The solution is **CI/CD-ready** via GitHub Actions, including authentication state management, headless browser. 

The tests cover:

- Saved Auth State using provided username and password.
- Employee hub workflows (adding employees, validating they have been added to the employee hub)
- Form validations and success messages

---

## Project Structure
Helpers/ # Reusable helpers (employee data, login credentials)
├── Scripts/ # Utility scripts (save authentication state)
├── page-objects/ # Page Object Models (AddEmployeeButton)
├── tests/ # Test specifications
├── .env # Local environment variables (not committed)
├── playwright.config.js # Playwright configuration
├── package.json # Dependencies and scripts
├── package-lock.json
└── .gitignore



---

## Page Object Model (POM) Hierarchy



### **AddEmployeeButton**
- Handles employee hub workflows.
- Methods:
  - `visit()` – Navigate to employee hub and open “Add Employee” modal
  - `addFirstEmployee()` – Fill details and save the first employee
  - `addSecondEmployee()` – Fill details and save the second employee

### **Helpers**
- `EmployeeInfo.js` – Stores reusable employee test data
- `LoginDetails.js` – Loads credentials from environment variables or secrets

---

## Authentication
- **Local:** `.env` file containing:
- BRIGHTHR_USERNAME=your_username
BRIGHTHR_PASSWORD=your_password


CI/CD (GitHub Actions)

Headless browser execution

Secrets used for authentication

Generates auth.json automatically


Production-Ready Automation Ideas


Parallelization – Run tests across multiple browsers and mobile viewport

-- Further Assertions such as update employee details or delete employee details then verify accordingly. 

Flake Handling – Automatic retries with trace and screenshot capture for intermittent failures.

Environment Management – Support multiple environments (dev, staging, production) with separate configs.




