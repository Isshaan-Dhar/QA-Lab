import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

test.describe('Logout Flow', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);

    await loginPage.goto();
    await loginPage.fillEmail(process.env.INSTASAFE_USER as string);
    await loginPage.fillPassword(process.env.INSTASAFE_PASSWORD as string);
    await loginPage.submitLogin();
    await loginPage.enterOTP(process.env.INSTASAFE_TOTP_SECRET as string);
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test('Perform Secure Logout and Block Re-entry', async () => {
    await expect(dashboardPage.logoutButton).toBeVisible();
    await dashboardPage.logout();

    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.page).toHaveURL('http://localhost:3000/');
  });
});