import { test, expect } from '@playwright/test';
import { AboutPage } from '../pages/about.po';

test.describe('About Us Page Flow', () => {
  let aboutPage: AboutPage;

  test.beforeEach(async ({ page }) => {
    aboutPage = new AboutPage(page);
    await aboutPage.goto();
  });

  test('should display About Us heading and company pillars', async () => {
    await expect(aboutPage.heading).toContainText('About Pensycountries');
    await expect(aboutPage.featureItems).toHaveCount(3);
    await expect(aboutPage.missionHeading).toHaveText('Mission');
    await expect(aboutPage.visionHeading).toHaveText('Vision');
    await expect(aboutPage.philosophyHeading).toHaveText('Philosophy');
  });

  test('should navigate to Destinations page when clicking Go to Destinations', async ({ page }) => {
    await aboutPage.clickGoToDestinations();
    await expect(page).toHaveURL(/.*\/information\/destinations/);
    await expect(page.locator('h3', { hasText: 'Places to be in Pensycountries' })).toBeVisible();
  });
});
