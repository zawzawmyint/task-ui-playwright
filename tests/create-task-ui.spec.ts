import { test, expect } from "@playwright/test";

test.describe("Create Task UI Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to your application
    await page.goto("http://localhost:5173/");

    // Ensure we're logged in (using the default credentials from login test)
    // This is needed because task creation requires authentication
    await page.click('button:has-text("Login")');
    await page.locator('input[placeholder="Email..."]').fill("zack@gmail.com");
    await page.locator('input[placeholder="Password..."]').fill("12345678");
    await page.click('button:has-text("Submit")');

    // Wait for login to complete and task list to be visible
    await expect(page.locator('h2:has-text("Task list")')).toBeVisible();
  });

  test("should display create task dialog when create task button is clicked", async ({
    page,
  }) => {
    // Click the create task button
    await page.click('button:has-text("Create Task")');

    // Verify the dialog is displayed with correct title
    await expect(page.locator('div[role="dialog"]')).toBeVisible();
    await expect(page.locator('div[role="dialog"] h2')).toHaveText(
      "Create Task"
    );
  });

  test("should display form fields correctly in create task dialog", async ({
    page,
  }) => {
    // Open create task dialog
    await page.click('button:has-text("Create Task")');

    // Check if title field is visible and has correct placeholder
    const titleField = page.locator('input[placeholder="Task Title"]');
    await expect(titleField).toBeVisible();

    // Check if description field is visible and has correct placeholder
    const descriptionField = page.locator('input[placeholder="Description"]');
    await expect(descriptionField).toBeVisible();

    // Check if submit button is visible
    const submitButton = page.locator('button:has-text("Submit")');
    await expect(submitButton).toBeVisible();

    // Check if cancel button is visible
    const cancelButton = page.locator('button:has-text("Cancel")');
    await expect(cancelButton).toBeVisible();
  });

  test("should show validation errors for empty inputs", async ({ page }) => {
    // Open create task dialog
    await page.click('button:has-text("Create Task")');

    // Leave fields empty and click submit
    await page.click('button:has-text("Submit")');

    // Check for validation error messages
    // Note: Adjust these based on your actual validation messages
    await expect(
      page.locator(
        'form p:has-text("Title must be at least 2 characters long")'
      )
    ).toBeVisible();

    await expect(
      page.locator(
        'form p:has-text("Description must be at least 2 characters long")'
      )
    ).toBeVisible();
  });

  test("should close dialog when cancel button is clicked", async ({
    page,
  }) => {
    // Open create task dialog
    await page.click('button:has-text("Create Task")');

    // Verify dialog is open
    await expect(page.locator('div[role="dialog"]')).toBeVisible();

    // Click cancel button
    await page.click('button:has-text("Cancel")');

    // Verify dialog is closed
    await expect(page.locator('div[role="dialog"]')).not.toBeVisible();
  });

  test("should have empty default values in form fields", async ({ page }) => {
    // Open create task dialog
    await page.click('button:has-text("Create Task")');

    // Check default value for title field
    const titleField = page.locator('input[placeholder="Task Title"]');
    await expect(titleField).toHaveValue("");

    // Check default value for description field
    const descriptionField = page.locator('input[placeholder="Description"]');
    await expect(descriptionField).toHaveValue("");
  });

  test("should have successfull when submit valid data", async ({ page }) => {
    // Open create task dialog
    await page.click('button:has-text("Create Task")');

    // Fill in valid data
    await page.locator('input[placeholder="Task Title"]').fill("Valid Title");
    await page
      .locator('input[placeholder="Description"]')
      .fill("Valid Description");

    // Check if submit button is enabled
    const submitButton = page.locator('button:has-text("Submit")');
    await expect(submitButton).toBeEnabled();

    // Click submit button
    await submitButton.click();

    // Check if dialog is closed
    await expect(page.locator('div[role="dialog"]')).not.toBeVisible();

    // Check if task is added to the list
    await expect(page.locator('h2:has-text("Task list")')).toBeVisible();
  });
});
