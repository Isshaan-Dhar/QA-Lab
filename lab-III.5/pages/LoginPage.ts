import { Page, Locator } from '@playwright/test';
import { generate } from 'otplib';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly otpInput: Locator;
  readonly verifyOtpButton: Locator;
  readonly dashboardHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Sign in' });
    this.otpInput = page.getByRole('textbox', { name: 'OTP' });
    this.verifyOtpButton = page.getByRole('button', { name: 'Verify' });
    this.dashboardHeader = page.getByRole('heading', { name: 'Dashboard' });
  }

  async goto() {
    await this.page.goto('/');
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async submitLogin() {
    await this.loginButton.click();
  }

  async enterOTP(secret: string) {
    const token = await generate({ secret });
    await this.otpInput.fill(token);
    await this.verifyOtpButton.click();
  }
}