import { test, expect, Page } from '@playwright/test';
const URL = 'https://practicetestautomation.com/practice-test-login/';
async function goToLoginPage(page: Page) {
  await page.goto(URL);
}
async function fillUsername(page: Page, username: string) {
  await page.getByRole('textbox', { name: 'Username' }).fill(username);
}
async function fillPassword(page: Page, password: string) {
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
}
async function clickSubmit(page: Page) {
  await page.getByRole('button', { name: 'Submit' }).click();
}
async function login(page: Page, username: string, password: string) {
  await fillUsername(page, username);
  await fillPassword(page, password);
  await clickSubmit(page);
}
async function assertFormVisible(page: Page) {
  await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
}
async function assertLoginSuccess(page: Page) {
  await expect(page).toHaveURL(/practicetestautomation\.com\/logged-in-successfully/);
  await expect(page.getByText(/Congratulations|successfully logged in/i)).toBeVisible();
  await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
}
async function assertErrorMessage(page: Page, expectedText: string) {
  const error = page.locator('#error');
  await expect(error).toBeVisible();
  await expect(error).toHaveText(expectedText);
}
test.describe('Login Page', () => {

  test('Positive case with valid credentials', async ({ page }) => {
    await goToLoginPage(page);
    await assertFormVisible(page);
    await login(page, 'student', 'Password123');
    await assertLoginSuccess(page);
  });
  test('Negative case with invalid username', async ({ page }) => {
    await goToLoginPage(page);
    await assertFormVisible(page);
    await login(page, 'incorrectUser', 'Password123');
    await assertErrorMessage(page, 'Your username is invalid!');
  });
  test('Negative case with invalid password', async ({ page }) => {
    await goToLoginPage(page);
    await assertFormVisible(page);
    await login(page, 'student', 'incorrectPassword');
    await assertErrorMessage(page, 'Your password is invalid!');
  });
});