import { test } from '@playwright/test';
import { LoginPage } from '../pages1/assignment4';
import { USERNAME, PASSWORD } from '../Fixtures/assignment4env';

test.describe('Login Page', () => {

  test('Positive case with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.assertFormVisible();
    await loginPage.login();
    await loginPage.assertLoginSuccess();
  });

  test('Negative case with invalid username', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.assertFormVisible();
    await loginPage.login('incorrectUser', PASSWORD);
    await loginPage.assertErrorMessage('Your username is invalid!');
  });

  test('Negative case with invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.assertFormVisible();
    await loginPage.login(USERNAME, 'incorrectPassword');
    await loginPage.assertErrorMessage('Your password is invalid!');
  });

});