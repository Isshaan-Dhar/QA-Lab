import { Page, Locator } from '@playwright/test';

export class DevicePage {
  readonly page: Page;
  readonly enrollDeviceButton: Locator;
  readonly deviceNameInput: Locator;
  readonly confirmEnrolmentButton: Locator;
  readonly deviceListItem: Locator;
  readonly policyStatusText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.enrollDeviceButton = page.getByRole('button', { name: 'Enroll Device' });
    this.deviceNameInput = page.getByRole('textbox', { name: 'Device Name' });
    this.confirmEnrolmentButton = page.getByRole('button', { name: 'Confirm Enrolment' });
    this.deviceListItem = page.getByRole('link', { name: 'Device Details' });
    this.policyStatusText = page.locator('#policy-status');
  }

  async clickEnrollWizard() {
    await this.enrollDeviceButton.click();
  }

  async fillDeviceDetails(name: string) {
    await this.deviceNameInput.fill(name);
  }

  async submitEnrolment() {
    await this.confirmEnrolmentButton.click();
  }

  async viewDeviceDetails() {
    await this.deviceListItem.click();
  }
}