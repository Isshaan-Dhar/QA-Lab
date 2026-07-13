import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Authentication Flow', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test('Successful MFA Login', async () => {
    await loginPage.fillEmail(process.env.INSTASAFE_USER as string);
    await loginPage.fillPassword(process.env.INSTASAFE_PASSWORD as string);
    await loginPage.submitLogin();
    
    await expect(loginPage.otpInput).toBeVisible();
    
    await loginPage.enterOTP(process.env.INSTASAFE_TOTP_SECRET as string);
    
    await expect(loginPage.dashboardHeader).toBeVisible();
    await expect(loginPage.page).toHaveURL(/.*dashboard/);
  });
});