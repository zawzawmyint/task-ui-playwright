import { test, expect } from "@playwright/test";

test.describe("Delete Task UI Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to your application
    await page.goto("http://localhost:5173/");

    // Ensure we're logged in (using the default credentials from login test)
    // This is needed because task deletion requires authentication
    await page.click('button:has-text("Login")');
    await page.locator('input[placeholder="Email..."]').fill("zack@gmail.com");
    await page.locator('input[placeholder="Password..."]').fill("12345678");
    await page.click('button:has-text("Submit")');

    // First, wait for the task list header
    await expect(page.locator('h2:has-text("Task list")')).toBeVisible({
      timeout: 10000,
    });
    // Make sure we have at least one task to delete
    // If your test environment doesn't have tasks by default, you may need to create one first
    await expect(page.locator(".grid > div").first()).toBeVisible();
    // Then wait for network to settle
  });

  test("should open dropdown menu when clicking the more actions button", async ({
    page,
  }) => {
    // Click the more actions button (three dots) in the first task card
    await page.click("button:has(.h-4.w-4)");

    // Verify the dropdown menu is displayed
    await expect(page.locator('div[role="menu"]')).toBeVisible();
    await expect(page.locator('div[role="menuitem"]')).toBeVisible();
  });

  test("should open delete confirmation dialog when clicking delete option", async ({
    page,
  }) => {
    // Open the dropdown menu
    await page.click("button:has(.h-4.w-4)");

    // Click the delete option
    await page.click('button:has-text("Delete Task")');

    // Verify the confirmation dialog is displayed
    await expect(page.locator('div[role="alertdialog"]')).toBeVisible();
    await expect(page.locator('div[role="alertdialog"] h2')).toContainText(
      "Delete Task"
    );
    await expect(page.locator('div[role="alertdialog"] p')).toContainText(
      "Are you sure"
    );
  });

  test("should close confirmation dialog when clicking cancel", async ({
    page,
  }) => {
    // Open the dropdown menu
    await page.click("button:has(.h-4.w-4)");

    // Click the delete option
    await page.click('button:has-text("Delete Task")');

    // Verify dialog is open
    await expect(page.locator('div[role="alertdialog"]')).toBeVisible();

    // Click cancel button
    await page.click('button:has-text("Cancel")');

    // Verify dialog is closed
    await expect(page.locator('div[role="alertdialog"]')).not.toBeVisible();
  });

  test("should delete task when confirming deletion", async ({ page }) => {
    // Count the number of tasks before deletion
    const initialTaskCount = await page.locator(".grid > div").count();

    // Open the dropdown menu for the first task
    await page.click("button:has(.h-4.w-4)");

    // Click the delete option
    await page.click('button:has-text("Delete Task")');

    // Confirm deletion
    await page.click('button:has-text("Delete")');

    // Wait for the task to be removed
    // Either check that the count has decreased or wait for a success message
    if (initialTaskCount > 1) {
      // If there were multiple tasks, check that the count decreased
      await expect(async () => {
        const newCount = await page.locator(".grid > div").count();
        expect(newCount).toBe(initialTaskCount - 1);
      }).toPass();
    } else {
      // If there was only one task, check that the grid is empty or shows a "no tasks" message
      // This depends on how your app handles an empty task list
      await expect(page.locator(".grid > div")).toHaveCount(0);
    }
  });
});
