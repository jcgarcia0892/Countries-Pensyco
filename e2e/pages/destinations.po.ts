import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.po';

export class DestinationsPage extends BasePage {
  readonly searchInput: Locator;
  readonly filterButton: Locator;
  readonly errorText: Locator;
  readonly destinationCards: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.locator('input.searcher-input');
    this.filterButton = page.locator('button.searcher-button');
    this.errorText = page.locator('.searcher-error-text');
    this.destinationCards = page.locator('section.destinations app-card');
  }

  async goto(): Promise<void> {
    await this.page.goto('/information/destinations');
  }

  async search(term: string): Promise<void> {
    await this.searchInput.fill(term);
  }

  async clickFilter(): Promise<void> {
    await this.filterButton.click();
  }

  async getDestinationNames(): Promise<string[]> {
    return this.destinationCards.locator('h5.destinations__heading').allInnerTexts();
  }

  async clickGoToHotels(destinationCity: string): Promise<void> {
    const card = this.destinationCards.filter({
      has: this.page.locator('h5.destinations__heading', { hasText: destinationCity })
    });
    await card.locator('a.actions__main', { hasText: 'Go to Hotels' }).click();
  }
}
