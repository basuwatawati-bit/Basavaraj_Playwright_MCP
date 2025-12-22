import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('#search_query_top');
    this.searchButton = page.locator('button[name="submit_search"]');
  }

  async goto() {
    await this.page.goto('http://www.automationpractice.pl/index.php');
  }

  async searchFor(query: string) {
    await this.searchInput.fill(query);
    await this.searchButton.click();
  }
}

export class SearchResultsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async expectProductVisible(productName: string) {
    const product = this.page.locator('#center_column .product-name', { hasText: productName });
    await expect(product).toBeVisible();
  }
}
