import { Page, Locator } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly devicesLink: Locator;
  readonly policiesLink: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.devicesLink = page.getByRole('link', { name: 'Devices' });
    this.policiesLink = page.getByRole('link', { name: 'Policies' });
    this.logoutButton = page.getByRole('button', { name: 'Logout' });
  }

  async navigateToDevices() {
    await this.devicesLink.click();
  }

  async navigateToPolicies() {
    await this.policiesLink.click();
  }

  async logout() {
    await this.logoutButton.click();
  }
}