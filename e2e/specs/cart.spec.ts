import { test, expect } from '@playwright/test';
import { CartPage } from '../pages/cart.po';
import { HotelsPage } from '../pages/hotels.po';

test.describe('Shopping Cart Flow', () => {
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    cartPage = new CartPage(page);
    await cartPage.goto();
    await cartPage.clearLocalStorage();
    await cartPage.goto();
  });

  test('should display empty cart message when no packages are selected', async () => {
    await expect(cartPage.emptyCartSection).toBeVisible();
    await expect(cartPage.emptyCartMessage).toContainText("You haven't choosed any package yet");
    await expect(cartPage.emptyCartGoToDestinationsBtn).toBeVisible();
  });

  test('should add items, calculate totals, and remove items dynamically', async ({ page }) => {
    const hotelsPage = new HotelsPage(page);

    // Add first hotel
    await hotelsPage.goto('Cancun');
    await hotelsPage.setDates('12/01/2026', '12/05/2026');
    await hotelsPage.setGuests(2);
    await hotelsPage.search();
    await hotelsPage.addHotelToCart('Emporio Cancun');

    await expect(cartPage.tableRows).toHaveCount(1);
    await expect(cartPage.totalDisplay).toBeVisible();

    // Remove the item
    await cartPage.removeItem(0);
    await expect(cartPage.emptyCartSection).toBeVisible();
  });

  test('should persist cart items across page reloads', async ({ page }) => {
    const hotelsPage = new HotelsPage(page);

    await hotelsPage.goto('Paris');
    await hotelsPage.setDates('10/01/2026', '10/05/2026');
    await hotelsPage.setGuests(1);
    await hotelsPage.search();
    await hotelsPage.addHotelToCart('Le Royal Monceau - Raffles Paris');

    await expect(cartPage.tableRows).toHaveCount(1);

    // Reload the page
    await page.reload();
    await expect(cartPage.tableRows).toHaveCount(1);
    await expect(cartPage.tableRows.first()).toContainText('Le Royal Monceau - Raffles Paris');
  });
});
