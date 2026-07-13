import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { PolicyPage } from '../pages/PolicyPage';
import { DevicePage } from '../pages/DevicePage';

test.describe('Policy Assignment Flow', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;
  let policyPage: PolicyPage;
  let devicePage: DevicePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    policyPage = new PolicyPage(page);
    devicePage = new DevicePage(page);

    await loginPage.goto();
    await loginPage.fillEmail(process.env.INSTASAFE_USER as string);
    await loginPage.fillPassword(process.env.INSTASAFE_PASSWORD as string);
    await loginPage.submitLogin();
    await loginPage.enterOTP(process.env.INSTASAFE_TOTP_SECRET as string);
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test('Assign Zero Trust Policy to Enrolled Device', async () => {
    await dashboardPage.navigateToPolicies();
    await policyPage.selectDevice('corporate-laptop');
    await policyPage.selectPolicy('Zero-Trust-Policy');
    await policyPage.submitAssignment();

    await expect(devicePage.page).toHaveURL(/.*details.*/);
    await expect(devicePage.policyStatusText).toBeVisible();
    await expect(devicePage.policyStatusText).toHaveText('Zero-Trust-Policy');
  });
});