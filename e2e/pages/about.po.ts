import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.po';

export class AboutPage extends BasePage {
  readonly heading: Locator;
  readonly goToDestinationsBtn: Locator;
  readonly featureItems: Locator;
  readonly missionHeading: Locator;
  readonly visionHeading: Locator;
  readonly philosophyHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.locator('section.about-header h3');
    this.goToDestinationsBtn = page.locator('section.about-header a.btn');
    this.featureItems = page.locator('section.about-features .about-feature');
    this.missionHeading = page.locator('section.about-philosophy .effect_1 .heading');
    this.visionHeading = page.locator('section.about-philosophy .effect_2 .heading');
    this.philosophyHeading = page.locator('section.about-philosophy .effect_3 .heading');
  }

  async goto(): Promise<void> {
    await this.page.goto('/information/about');
  }

  async clickGoToDestinations(): Promise<void> {
    await this.goToDestinationsBtn.click();
  }
}
