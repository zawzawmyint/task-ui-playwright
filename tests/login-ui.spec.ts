import { test, expect } from "@playwright/test";

test.describe("Login Form UI Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to your application
    await page.goto("http://localhost:5173/"); // Adjust URL based on your Vite dev server port
  });

  test("should display login form when login button is clicked", async ({
    page,
  }) => {
    // Click the login button to open the dialog
    await page.click('button:has-text("Login")');

    // Verify the dialog is displayed
    await expect(page.locator('div[role="dialog"]')).toBeVisible();
    await expect(page.locator('div[role="dialog"] h2')).toHaveText("Login");
  });

  test("should display form fields correctly", async ({ page }) => {
    // Open login dialog
    await page.click('button:has-text("Login")');

    // Check if email field is visible and has correct placeholder
    const emailField = page.locator('input[placeholder="Email..."]');
    await expect(emailField).toBeVisible();

    // Check if password field is visible and has correct placeholder
    const passwordField = page.locator('input[placeholder="Password..."]');
    await expect(passwordField).toBeVisible();

    // Check if submit button is visible
    const submitButton = page.locator('button:has-text("Submit")');
    await expect(submitButton).toBeVisible();

    // Check if cancel button is visible
    const cancelButton = page.locator('button:has-text("Cancel")');
    await expect(cancelButton).toBeVisible();
  });

  test("should show validation errors for invalid inputs", async ({ page }) => {
    // Open login dialog
    await page.click('button:has-text("Login")');

    // Clear the default email and password
    await page.locator('input[placeholder="Email..."]').clear();
    await page.locator('input[placeholder="Password..."]').clear();

    // Enter invalid email
    await page.locator('input[placeholder="Email..."]').fill("invalid");

    // Click somewhere else to trigger validation
    await page.locator('input[placeholder="Password..."]').click();

    // Check for validation error message
    await expect(
      page.locator('form p:has-text("Invalid email address")')
    ).toBeVisible();

    // Enter short password
    await page.locator('input[placeholder="Password..."]').fill("1");
    await page.locator('input[placeholder="Email..."]').click();

    // Check for password validation error
    await expect(
      page.locator(
        'form p:has-text("Password must be at least 2 characters long")'
      )
    ).toBeVisible();
  });

  test("should close dialog when cancel button is clicked", async ({
    page,
  }) => {
    // Open login dialog
    await page.click('button:has-text("Login")');

    // Verify dialog is open
    await expect(page.locator('div[role="dialog"]')).toBeVisible();

    // Click cancel button
    await page.click('button:has-text("Cancel")');

    // Verify dialog is closed
    await expect(page.locator('div[role="dialog"]')).not.toBeVisible();
  });

  test("should have default values in form fields", async ({ page }) => {
    // Open login dialog
    await page.click('button:has-text("Login")');

    // Check default value for email field
    const emailField = page.locator('input[placeholder="Email..."]');
    await expect(emailField).toHaveValue("zack@gmail.com");

    // Check default value for password field
    const passwordField = page.locator('input[placeholder="Password..."]');
    await expect(passwordField).toHaveValue("12345678");
  });

  test("should have submit button with correct state", async ({ page }) => {
    // Open login dialog
    await page.click('button:has-text("Login")');

    // Check submit button is enabled by default
    const submitButton = page.locator('button:has-text("Submit")');
    await expect(submitButton).toBeEnabled();

    // Verify button text
    await expect(submitButton).toHaveText("Submit");
  });
});
