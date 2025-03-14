import { Locator, Page } from "@playwright/test";
import userData from "../data/userData.json";
import { faker } from "@faker-js/faker";

export class loginUser {
  page: Page;
  buttonLogin: Locator;
  inputUserLogin: Locator;
  inputPass: Locator;
  buttonSubmit: Locator;
  logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.buttonLogin = this.page.locator(".login");
    this.inputUserLogin = this.page.locator("#username");
    this.inputPass = this.page.locator("#password");
    this.buttonSubmit = this.page.locator("#login-submit");
    this.logoutButton = this.page.locator(".logout");
  }

  async clickOnLogin() {
    await this.buttonLogin.click();
    return this;
  }

  async clickOnLogout() {
    await this.logoutButton.click();
    return this;
  }

  async printValuesForCorrectLogin() {
    await this.inputUserLogin.fill(userData.existingUser.login);
    await this.inputPass.fill(userData.existingUser.password);
    await this.buttonSubmit.click();
    return this;
  }

  async printValuesForIncorrectLogin() {
    await this.inputUserLogin.fill(faker.internet.userName());
    await this.inputPass.fill(faker.internet.password());
    await this.buttonSubmit.click();
    return this;
  }
}
