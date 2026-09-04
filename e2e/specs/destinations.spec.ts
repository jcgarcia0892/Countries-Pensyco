import { test, expect } from '@playwright/test';
import { DestinationsPage } from '../pages/destinations.po';

test.describe('Destinations Discovery and Search Flow', () => {
  let destinationsPage: DestinationsPage;

  test.beforeEach(async ({ page }) => {
    destinationsPage = new DestinationsPage(page);
    await destinationsPage.goto();
  });

  test('should display all 6 destinations on initial load', async () => {
    await expect(destinationsPage.destinationCards).toHaveCount(6);
    const names = await destinationsPage.getDestinationNames();
    expect(names).toEqual(['Miami', 'Cancun', 'Buenos Aires', 'Orlando', 'Madrid', 'Paris']);
  });

  test('should reactively filter destinations when searching', async () => {
    await destinationsPage.search('Miami');
    await expect(destinationsPage.destinationCards).toHaveCount(1);
    await expect(destinationsPage.destinationCards.first()).toContainText('Miami');

    // Case-insensitive check
    await destinationsPage.search('cancun');
    await expect(destinationsPage.destinationCards).toHaveCount(1);
    await expect(destinationsPage.destinationCards.first()).toContainText('Cancun');
  });

  test('should display error message when destination is not found', async () => {
    await destinationsPage.search('Tokyo');
    await expect(destinationsPage.destinationCards).toHaveCount(0);
    await expect(destinationsPage.errorText).toBeVisible();
    await expect(destinationsPage.errorText).toContainText("We haven't found the destination: Tokyo");
  });

  test('should restore full list when search input is cleared', async () => {
    await destinationsPage.search('Paris');
    await expect(destinationsPage.destinationCards).toHaveCount(1);

    await destinationsPage.search('');
    await expect(destinationsPage.destinationCards).toHaveCount(6);
    await expect(destinationsPage.errorText).not.toBeVisible();
  });

  test('should navigate to hotels page when clicking Go to Hotels', async ({ page }) => {
    await destinationsPage.clickGoToHotels('Cancun');
    await expect(page).toHaveURL(/.*\/information\/hotels\/Cancun/);
  });
});
