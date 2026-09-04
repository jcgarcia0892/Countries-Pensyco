import { test, expect } from '@playwright/test';
import { CartPage } from '../pages/cart.po';
import { HotelsPage } from '../pages/hotels.po';

test.describe('Checkout and Payment Processing Flow', () => {
  let cartPage: CartPage;
  let hotelsPage: HotelsPage;

  test.beforeEach(async ({ page }) => {
    cartPage = new CartPage(page);
    hotelsPage = new HotelsPage(page);

    await cartPage.goto();
    await cartPage.clearLocalStorage();

    // Add a package to cart to unlock checkout form
    await hotelsPage.goto('Madrid');
    await hotelsPage.setDates('11/10/2026', '11/15/2026');
    await hotelsPage.setGuests(2);
    await hotelsPage.search();
    await hotelsPage.addHotelToCart('Bless Hotel Madrid');

    await expect(cartPage.tableRows).toHaveCount(1);
  });

  test('should validate personal info and show email mismatch error', async ({ page }) => {
    await cartPage.fillPersonalInfo('John', 'Doe', 'john@example.com', 'mismatch@example.com');
    await cartPage.submitOrder();

    // Check error message is displayed
    await expect(page.locator('.shopping-input-error', { hasText: 'The emails has to be the same' })).toBeVisible();
  });

  test('should complete checkout successfully using Debit Card', async ({ page }) => {
    await cartPage.fillPersonalInfo('John', 'Doe', 'john@example.com', 'john@example.com');
    await cartPage.payWithDebit('America', '1234');
    await cartPage.submitOrder();

    // Verify confirmation screen
    await expect(cartPage.thanksSection).toBeVisible();
    await expect(cartPage.thanksHeading).toContainText('Thank you for buying with us!');

    // Click Go to Home
    await cartPage.thanksGoToHomeBtn.click();
    await expect(page).toHaveURL(/.*\/main\/home/);

    // Verify cart was emptied
    await cartPage.goto();
    await expect(cartPage.emptyCartSection).toBeVisible();
  });

  test('should complete checkout successfully using Credit Card', async ({ page }) => {
    await cartPage.fillPersonalInfo('Jane', 'Smith', 'jane@example.com', 'jane@example.com');
    await cartPage.payWithCredit('1234567812345678', '12', '28', '123');
    await cartPage.submitOrder();

    // Verify confirmation screen
    await expect(cartPage.thanksSection).toBeVisible();
    await expect(cartPage.thanksHeading).toContainText('Thank you for buying with us!');
  });
});
