import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages1/login1';

test.describe('Login', () => {
  test('should allow users to log in with valid credentials', async ({ page }) => {
    await page.goto('https://practicetestautomation.com/practice-test-login/');
    await page.getByRole('textbox', { name: 'Username' }).fill('student');
    await page.getByRole('textbox', { name: 'Password' }).fill('Password123');
    await page.getByRole('button', { name: 'Submit' });
    const loginPage = new LoginPage(page);
    await loginPage.login('student', 'Password123');
  });
});