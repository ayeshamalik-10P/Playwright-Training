import { test, expect } from '@playwright/test';

const URL = "https://practicetestautomation.com/practice-test-login/";

test.describe('Login Page', () => {

  test('Positive case with valid credentials', async ({ page }) => {
    await page.goto(URL);

    await expect(page.getByRole("textbox", { name: "Username" })).toBeVisible();
    await expect(page.getByRole("textbox", { name: "Password" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Submit" })).toBeVisible();

    await page.getByRole("textbox", { name: "Username" }).fill("student");
    await page.getByRole("textbox", { name: "Passworgit initd" }).fill("Password123");
    await page.getByRole("button", { name: "Submit" }).click();

    await expect(page).toHaveURL(/practicetestautomation\.com\/logged-in-successfully/);
    await expect(page.getByText(/Congratulations|successfully logged in/i)).toBeVisible();
    await expect(page.getByRole("link", { name: "Log out" })).toBeVisible();
  });

  test('Negative case with invalid username', async ({ page }) => {
    await page.goto(URL);

    await expect(page.getByRole("textbox", { name: "Username" })).toBeVisible();
    await expect(page.getByRole("textbox", { name: "Password" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Submit" })).toBeVisible();

    await page.getByRole("textbox", { name: "Username" }).fill("incorrectUser");
    await page.getByRole("textbox", { name: "Password" }).fill("Password123");
    await page.getByRole("button", { name: "Submit" }).click();

    await expect(page.locator("#error")).toBeVisible();
    await expect(page.locator("#error")).toHaveText("Your username is invalid!");
  });

  test('Negative case with invalid password', async ({ page }) => {
    await page.goto(URL);

    await expect(page.getByRole("textbox", { name: "Username" })).toBeVisible();
    await expect(page.getByRole("textbox", { name: "Password" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Submit" })).toBeVisible();

    await page.getByRole("textbox", { name: "Username" }).fill("student");
    await page.getByRole("textbox", { name: "Password" }).fill("incorrectPassword");
    await page.getByRole("button", { name: "Submit" }).click();

    await expect(page.locator("#error")).toBeVisible();
    await expect(page.locator("#error")).toHaveText("Your password is invalid!");
  });

});