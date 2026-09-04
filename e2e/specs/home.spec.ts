import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.po';

test.describe('Home Page Flow', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('should display the home page with title, description, and diamond logo', async ({ page }) => {
    await expect(homePage.heading).toContainText('Pensycountries');
    await expect(homePage.description).toBeVisible();
    await expect(page.locator('.logo')).toBeVisible();
  });

  test('should navigate from Home to Destinations page via link', async ({ page }) => {
    await homePage.clickDestinations();
    await expect(page).toHaveURL(/.*\/information\/destinations/);
    await expect(page.locator('h3', { hasText: 'Places to be in Pensycountries' })).toBeVisible();
  });

  test('should navigate from Home to About Us page via link', async ({ page }) => {
    await homePage.clickAbout();
    await expect(page).toHaveURL(/.*\/information\/about/);
    await expect(page.locator('h3', { hasText: 'About Pensycountries' })).toBeVisible();
  });

  test('should navigate from Home to Shopping Cart page via link', async ({ page }) => {
    await homePage.clickCart();
    await expect(page).toHaveURL(/.*\/information\/shopping/);
  });
});
