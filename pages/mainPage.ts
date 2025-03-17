import { Page } from "@playwright/test";

export class mainPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async toNavigate() {
    await this.page.goto("https://www.redmine.org/");
    return this;
  }
}
