import { Locator, Page } from '@playwright/test';

export abstract class BasePage {
  readonly navHomeLink: Locator;
  readonly navDestinationsLink: Locator;
  readonly navAboutLink: Locator;
  readonly navCartLink: Locator;

  constructor(protected readonly page: Page) {
    this.navHomeLink = page.locator('nav.navbar a.link', { hasText: 'Home' });
    this.navDestinationsLink = page.locator('nav.navbar a.link', { hasText: 'Destinations' });
    this.navAboutLink = page.locator('nav.navbar a.link', { hasText: 'About Us' });
    this.navCartLink = page.locator('nav.navbar .shopping-card a.link');
  }

  async navigateToHome(): Promise<void> {
    await this.navHomeLink.click();
  }

  async navigateToDestinations(): Promise<void> {
    await this.navDestinationsLink.click();
  }

  async navigateToAbout(): Promise<void> {
    await this.navAboutLink.click();
  }

  async navigateToCart(): Promise<void> {
    await this.navCartLink.click();
  }

  async clearLocalStorage(): Promise<void> {
    await this.page.evaluate(() => localStorage.clear());
  }
}
