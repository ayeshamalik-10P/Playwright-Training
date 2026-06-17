import { test, expect, Page } from '@playwright/test';
import { USERNAME, PASSWORD } from '../Fixtures/constant';
import { BASE_URL } from '../Fixtures/urlConstant';  

export class LoginPage {
  readonly url = BASE_URL;
  constructor(private readonly page: Page) {}
  async goto() {
    await this.page.goto(this.url);
  }
  async fillUsername(username: string) {
    await this.page.getByRole('textbox', { name: 'Username' }).fill(username);
  }
  async fillPassword(password: string) {
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
  }
  async clickSubmit() {
    await this.page.getByRole('button', { name: 'Submit' }).click();
  }
  async login(username: string, password: string) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickSubmit();
  }
  async assertFormVisible() {
    await expect(this.page.getByRole('textbox', { name: 'Username' })).toBeVisible();
    await expect(this.page.getByRole('textbox', { name: 'Password' })).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Submit' })).toBeVisible();
  }
  async assertLoginSuccess() {
    await expect(this.page).toHaveURL(/practicetestautomation\.com\/logged-in-successfully/);
    await expect(this.page.getByText(/Congratulations|successfully logged in/i)).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'Log out' })).toBeVisible();
  }
  async assertErrorMessage(expectedText: string) {
    const error = this.page.locator('#error');
    await expect(error).toBeVisible();
    await expect(error).toHaveText(expectedText);
  }
}