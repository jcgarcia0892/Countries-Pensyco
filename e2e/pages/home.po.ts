import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.po';

export class HomePage extends BasePage {
  readonly heading: Locator;
  readonly description: Locator;
  readonly destinationsLink: Locator;
  readonly aboutLink: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.locator('.menu .inner h1');
    this.description = page.locator('.menu .inner p');
    this.destinationsLink = page.locator('.menu nav.nav a', { hasText: 'Destinations' });
    this.aboutLink = page.locator('.menu nav.nav a', { hasText: 'About us' });
    this.cartLink = page.locator('.menu nav.nav a', { hasText: 'Shopping Cart' });
  }

  async goto(): Promise<void> {
    await this.page.goto('/main/home');
  }

  async clickDestinations(): Promise<void> {
    await this.destinationsLink.click();
  }

  async clickAbout(): Promise<void> {
    await this.aboutLink.click();
  }

  async clickCart(): Promise<void> {
    await this.cartLink.click();
  }
}
