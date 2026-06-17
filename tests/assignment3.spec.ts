import { test, expect, Page } from '@playwright/test';
import { USERNAME, PASSWORD } from '../Fixtures/constant';
import { LoginPage } from '../functionsassignment2/functionsassignment2';
import { BASE_URL } from '../Fixtures/urlConstant';
test.describe('Login Page', () => {
  test('Positive case with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.assertFormVisible();
    await loginPage.login(USERNAME, PASSWORD);
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