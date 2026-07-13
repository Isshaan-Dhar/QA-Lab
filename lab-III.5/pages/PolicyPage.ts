import { Page, Locator } from '@playwright/test';

export class PolicyPage {
  readonly page: Page;
  readonly deviceSelect: Locator;
  readonly policySelect: Locator;
  readonly assignPolicyButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.deviceSelect = page.getByRole('combobox', { name: 'Select Device' });
    this.policySelect = page.getByRole('combobox', { name: 'Select Policy' });
    this.assignPolicyButton = page.getByRole('button', { name: 'Assign Policy' });
  }

  async selectDevice(value: string) {
    await this.deviceSelect.selectOption(value);
  }

  async selectPolicy(value: string) {
    await this.policySelect.selectOption(value);
  }

  async submitAssignment() {
    await this.assignPolicyButton.click();
  }
}