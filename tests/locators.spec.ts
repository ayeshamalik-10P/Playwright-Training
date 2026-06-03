import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test('should allow users to login in with valid credentials', async ({ page }) => {
    await page.goto("https://practicetestautomation.com/practice-test-login/");
    await expect(page.getByRole("textbox", { name: "Username" })).toBeVisible();
    await expect(page.getByRole("textbox", { name: "Password" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Submit" })).toBeVisible();
    await page.getByRole("textbox", { name: "Username" }).fill("student");
    await page.getByRole("textbox", { name: "Password" }).fill("Password123");
    await page.getByRole("button", { name: "Submit" }).click();
  });
});