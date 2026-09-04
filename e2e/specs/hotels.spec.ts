import { test, expect } from '@playwright/test';
import { HotelsPage } from '../pages/hotels.po';

test.describe('Hotels and Booking Flow', () => {
  let hotelsPage: HotelsPage;

  test.beforeEach(async ({ page }) => {
    hotelsPage = new HotelsPage(page);
    await hotelsPage.goto('Miami');
  });

  test('should validate date fields and guest increment/decrement controls', async () => {
    // Check initial guest count is 1
    await expect(hotelsPage.guestCount).toHaveText('1');

    // Increment guest count
    await hotelsPage.addPersonBtn.click();
    await expect(hotelsPage.guestCount).toHaveText('2');

    // Decrement guest count
    await hotelsPage.removePersonBtn.click();
    await expect(hotelsPage.guestCount).toHaveText('1');

    // Cannot decrement below 1
    await hotelsPage.removePersonBtn.click();
    await expect(hotelsPage.guestCount).toHaveText('1');
  });

  test('should show error when dates are empty upon search', async () => {
    await hotelsPage.search();
    await expect(hotelsPage.errorMessage).toBeVisible();
    await expect(hotelsPage.errorMessage).toContainText('Please choose the date of your journey');
    await expect(hotelsPage.hotelCards).toHaveCount(0);
  });

  test('should search and display hotels when valid dates are selected', async () => {
    // Fill arrived and departed dates (e.g. 10/10/2026 to 10/15/2026)
    await hotelsPage.setDates('10/10/2026', '10/15/2026');
    await hotelsPage.setGuests(2);
    await hotelsPage.search();

    // Hotel cards should now be displayed
    await expect(hotelsPage.hotelCards).toHaveCount(6);
    const hotelNames = await hotelsPage.getHotelNames();
    expect(hotelNames).toContain('Novotel Miami Brickel');
    expect(hotelNames).toContain('Hyatt Regency Miami');
  });

  test('should add a hotel package to the shopping cart and navigate to cart', async ({ page }) => {
    await hotelsPage.setDates('11/01/2026', '11/05/2026');
    await hotelsPage.setGuests(2);
    await hotelsPage.search();

    await expect(hotelsPage.hotelCards).toHaveCount(6);

    // Click "Add to cart" on the first hotel
    await hotelsPage.addHotelToCart('Novotel Miami Brickel');

    // Should redirect to shopping cart page
    await expect(page).toHaveURL(/.*\/information\/shopping/);
    await expect(page.locator('table.shopping-table')).toBeVisible();
    await expect(page.locator('table.shopping-table tbody tr.shopping-table-row')).toHaveCount(1);
  });
});
