import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { DevicePage } from '../pages/DevicePage';

test.describe('Device Enrolment Flow', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;
  let devicePage: DevicePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
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

  test('Complete Device Enrolment Wizard', async () => {
    await dashboardPage.navigateToDevices();
    await expect(devicePage.enrollDeviceButton).toBeVisible();
    
    await devicePage.clickEnrollWizard();
    await devicePage.fillDeviceDetails('Corporate-Laptop');
    await devicePage.submitEnrolment();
    
    await expect(devicePage.deviceListItem).toBeVisible();
    await expect(devicePage.deviceListItem).toHaveText('Corporate-Laptop');
  });
});