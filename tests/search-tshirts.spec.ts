
import { test } from '@playwright/test';
import { HomePage, SearchResultsPage } from '../pages/automationPracticePages';

test('search for T-shirts and verify result', async ({ page }) => {
  const homePage = new HomePage(page);
  const searchResultsPage = new SearchResultsPage(page);

  // 1. Navigate to the website
  await homePage.goto();

  // 2. Search for "T-shirts"
  await homePage.searchFor('T-shirts');

  // 3. Verify "Faded Short Sleeve T-shirts" is in the search results
  await searchResultsPage.expectProductVisible('Faded Short Sleeve T-shirts');
});
