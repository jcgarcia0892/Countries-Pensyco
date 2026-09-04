import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.po';

export class HotelsPage extends BasePage {
  readonly arrivedInput: Locator;
  readonly departedInput: Locator;
  readonly addPersonBtn: Locator;
  readonly removePersonBtn: Locator;
  readonly guestCount: Locator;
  readonly searchButton: Locator;
  readonly errorMessage: Locator;
  readonly hotelCards: Locator;
  readonly destinationHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.arrivedInput = page.locator('input[formControlName="arrived"]');
    this.departedInput = page.locator('input[formControlName="departed"]');
    this.addPersonBtn = page.locator('button.btn-right');
    this.removePersonBtn = page.locator('button.btn-left');
    this.guestCount = page.locator('.package-value p');
    this.searchButton = page.locator('button.forma-button');
    this.errorMessage = page.locator('.forma-error small');
    this.hotelCards = page.locator('section.package app-card');
    this.destinationHeading = page.locator('div h3', { hasNotText: 'Choose a date' });
  }

  async goto(cityName: string): Promise<void> {
    await this.page.goto(`/information/hotels/${cityName}`);
  }

  async setDates(arrivedDateStr: string, departedDateStr: string): Promise<void> {
    await this.arrivedInput.fill(arrivedDateStr);
    await this.departedInput.fill(departedDateStr);
  }

  async setGuests(targetCount: number): Promise<void> {
    let current = parseInt((await this.guestCount.innerText()).trim(), 10) || 1;
    while (current < targetCount) {
      await this.addPersonBtn.click();
      current++;
    }
    while (current > targetCount && current > 1) {
      await this.removePersonBtn.click();
      current--;
    }
  }

  async search(): Promise<void> {
    await this.searchButton.click();
  }

  async addHotelToCart(hotelName: string): Promise<void> {
    const card = this.hotelCards.filter({
      has: this.page.locator('.card-heading', { hasText: hotelName })
    });
    await card.locator('a.actions__main', { hasText: 'Add to cart' }).click();
  }

  async getHotelNames(): Promise<string[]> {
    return this.hotelCards.locator('.card-heading').allInnerTexts();
  }
}
