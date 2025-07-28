import { test, expect } from "@playwright/test";

test.describe("Edit Task UI Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to your application with longer timeout
    await page.goto("http://localhost:5173/", { timeout: 10000 });

    // Login with more robust checks
    await page.click('button:has-text("Login")');
    await page.locator('input[placeholder="Email..."]').fill("zack@gmail.com");
    await page.locator('input[placeholder="Password..."]').fill("12345678");
    // await page.click('button:has-text("Submit")');

    const [response] = await Promise.all([
      page.waitForResponse(
        (response) =>
          response.url().includes("/api/") && response.status() === 200,
        { timeout: 15000 }
      ),
      page.click('button:has-text("Submit")'),
    ]);

    // First, wait for the task list header
    await expect(page.locator('h2:has-text("Task list")')).toBeVisible({
      timeout: 10000,
    });

    // Then wait for network to settle
    await page.waitForLoadState("networkidle", { timeout: 10000 });

    // Finally, ensure at least one task card is present
    await expect(page.locator('[data-slot="card"]').first()).toBeVisible({
      timeout: 10000,
    });
  });

  test("should display edit task dialog when edit button is clicked", async ({
    page,
  }) => {
    // More reliable way to find the first task's edit button
    const firstTaskCard = page.locator('[data-slot="card"]').first();
    await expect(firstTaskCard).toBeVisible({ timeout: 10000 });

    // Use a more specific selector for the edit button
    await firstTaskCard.locator('[data-slot="card-action"] button').click();

    // Verify dialog
    await expect(page.locator('div[role="dialog"]')).toBeVisible();
    await expect(page.locator('div[role="dialog"] h2')).toHaveText("Edit Task");
  });

  test("should display form fields with existing task data", async ({
    page,
  }) => {
    // Click the edit button on the first task
    // await page.click('[data-slot="card-action"] button');
    await page.click('button:has-text("Edit Task")');

    // Check if title field is visible and has a value (not empty)
    const titleField = page.locator('input[placeholder="Task Title"]');
    await expect(titleField).toBeVisible();
    await expect(titleField).not.toHaveValue("");

    // Check if description field is visible and has a value
    const descriptionField = page.locator('input[placeholder="Description"]');
    await expect(descriptionField).toBeVisible();
    await expect(descriptionField).not.toHaveValue("");

    // Check if submit button is visible
    const submitButton = page.locator('button:has-text("Submit")');
    await expect(submitButton).toBeVisible();

    // Check if cancel button is visible
    const cancelButton = page.locator('button:has-text("Cancel")');
    await expect(cancelButton).toBeVisible();
  });

  test("should close dialog when cancel button is clicked", async ({
    page,
  }) => {
    // Open edit dialog
    //   await page.click('[data-slot="card-action"] button');
    await page.click('button:has-text("Edit Task")');
    // Verify dialog is open
    await expect(page.locator('div[role="dialog"]')).toBeVisible();

    // Click cancel button
    await page.click('button:has-text("Cancel")');

    // Verify dialog is closed
    await expect(page.locator('div[role="dialog"]')).not.toBeVisible();
  });

  test("should update task when valid data is submitted", async ({ page }) => {
    // Open edit dialog
    //   await page.click('[data-slot="card-action"] button');
    await page.click('button:has-text("Edit Task")');

    // Get current title for comparison
    const currentTitle = await page
      .locator('input[placeholder="Task Title"]')
      .inputValue();

    // Update the title with a new value
    const newTitle = `Updated Title ${Date.now()}`;
    await page.locator('input[placeholder="Task Title"]').fill(newTitle);

    // Submit the form
    await page.click('button:has-text("Submit")');

    // Verify dialog is closed
    await expect(page.locator('div[role="dialog"]')).not.toBeVisible();

    // Verify success toast appears
    await expect(
      page.locator('div:has-text("Task updated successfully")')
    ).toBeVisible();
  });
});
