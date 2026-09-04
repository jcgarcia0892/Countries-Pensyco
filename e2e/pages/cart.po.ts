import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.po';

export class CartPage extends BasePage {
  readonly emptyCartSection: Locator;
  readonly emptyCartMessage: Locator;
  readonly emptyCartGoToDestinationsBtn: Locator;

  readonly tableRows: Locator;
  readonly totalDisplay: Locator;

  // Personal Info Form
  readonly nameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly confirmEmailInput: Locator;
  readonly debitPaymentRadio: Locator;
  readonly creditPaymentRadio: Locator;

  // Debit Form
  readonly debitBankAmericaRadio: Locator;
  readonly debitBankFargoRadio: Locator;
  readonly debitBankJPMorganRadio: Locator;
  readonly debitPasswordInput: Locator;
  readonly debitVerifyBtn: Locator;

  // Credit Form
  readonly creditNumberInput: Locator;
  readonly creditMonthInput: Locator;
  readonly creditYearInput: Locator;
  readonly creditCodeInput: Locator;
  readonly creditVerifyBtn: Locator;

  // Submit & Confirmation
  readonly buyButton: Locator;
  readonly thanksSection: Locator;
  readonly thanksHeading: Locator;
  readonly thanksGoToHomeBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.emptyCartSection = page.locator('section.error');
    this.emptyCartMessage = page.locator('p.error-text');
    this.emptyCartGoToDestinationsBtn = page.locator('section.error a.btn-responsive');

    this.tableRows = page.locator('table.shopping-table tbody tr.shopping-table-row');
    this.totalDisplay = page.locator('tr.total-display th:nth-child(6)');

    this.nameInput = page.locator('input[formControlName="name"]');
    this.lastNameInput = page.locator('input[formControlName="lastName"]');
    this.emailInput = page.locator('input[formControlName="email"]');
    this.confirmEmailInput = page.locator('input[formControlName="confirmEmail"]');
    this.debitPaymentRadio = page.locator('input[type="radio"][value="debit"]');
    this.creditPaymentRadio = page.locator('input[type="radio"][value="credit"]');

    this.debitBankAmericaRadio = page.locator('input[formControlName="bank"][value="America"]');
    this.debitBankFargoRadio = page.locator('input[formControlName="bank"][value="Fargo"]');
    this.debitBankJPMorganRadio = page.locator('input[formControlName="bank"][value="JPMorgan"]');
    this.debitPasswordInput = page.locator('form.shopping-payment-debit input[formControlName="password"]');
    this.debitVerifyBtn = page.locator('form.shopping-payment-debit button[type="submit"]');

    this.creditNumberInput = page.locator('input[formControlName="creditCardNumber"]');
    this.creditMonthInput = page.locator('input[formControlName="creditCardMonth"]');
    this.creditYearInput = page.locator('input[formControlName="creditCardYear"]');
    this.creditCodeInput = page.locator('input[formControlName="creditCardCode"]');
    this.creditVerifyBtn = page.locator('form.shopping-payment-credit button[type="submit"]');

    this.buyButton = page.locator('.shopping-form-button button');
    this.thanksSection = page.locator('section.thanks');
    this.thanksHeading = page.locator('section.thanks h5');
    this.thanksGoToHomeBtn = page.locator('section.thanks a');
  }

  async goto(): Promise<void> {
    await this.page.goto('/information/shopping');
  }

  async getCartItemCount(): Promise<number> {
    return this.tableRows.count();
  }

  async removeItem(index: number): Promise<void> {
    const row = this.tableRows.nth(index);
    await row.locator('button.shopping-table-remove').click();
  }

  async fillPersonalInfo(name: string, lastName: string, email: string, confirmEmail: string): Promise<void> {
    await this.nameInput.fill(name);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.confirmEmailInput.fill(confirmEmail);
  }

  async payWithDebit(bank: 'America' | 'Fargo' | 'JPMorgan', pin: string): Promise<void> {
    await this.debitPaymentRadio.check();
    if (bank === 'America') await this.debitBankAmericaRadio.check();
    else if (bank === 'Fargo') await this.debitBankFargoRadio.check();
    else if (bank === 'JPMorgan') await this.debitBankJPMorganRadio.check();

    await this.debitPasswordInput.fill(pin);
    await this.debitVerifyBtn.click();
  }

  async payWithCredit(number: string, month: string, year: string, cvv: string): Promise<void> {
    await this.creditPaymentRadio.check();
    await this.creditNumberInput.fill(number);
    await this.creditMonthInput.fill(month);
    await this.creditYearInput.fill(year);
    await this.creditCodeInput.fill(cvv);
    await this.creditVerifyBtn.click();
  }

  async submitOrder(): Promise<void> {
    await this.buyButton.click();
  }
}
