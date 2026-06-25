import { Page, expect } from '@playwright/test';
import { USERNAME, PASSWORD } from '../Fixtures/assignment4env';
import urls from '../Fixtures/assignment4urls.json';

export class LoginPage {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto(urls.loginPage);
  }
  async fillUsername(username: string = USERNAME) {
    await this.page.getByRole('textbox', { name: 'Username' }).fill(username);
  }
  async fillPassword(password: string = PASSWORD) {
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
  }
  async clickSubmit() {
    await this.page.getByRole('button', { name: 'Submit' }).click();
  }
  async login(username: string = USERNAME, password: string = PASSWORD) {
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
    await expect(this.page).toHaveURL(urls.loggedInPage);
    await expect(this.page.getByText(/Congratulations|successfully logged in/i)).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'Log out' })).toBeVisible();
  }
  async assertErrorMessage(expectedText: string) {
    const error = this.page.locator('#error');
    await expect(error).toBeVisible();
    await expect(error).toHaveText(expectedText);
  }
}