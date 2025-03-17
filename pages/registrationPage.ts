import { Locator, Page } from "@playwright/test";
import { faker } from "@faker-js/faker";

export class signUp {
  page: Page;
  buttonRegister: Locator;
  inputUserLogin: Locator;
  inputFirstName: Locator;
  inputLastName: Locator;
  inputEmail: Locator;
  inputPass: Locator;
  inputPassConfirm: Locator;
  buttonSubmit: Locator;

  constructor(page: Page) {
    this.page = page;
    this.buttonRegister = this.page.locator(".register");
    this.inputUserLogin = this.page.locator("#user_login");
    this.inputFirstName = this.page.locator("#user_firstname");
    this.inputLastName = this.page.locator("#user_lastname");
    this.inputEmail = this.page.locator("#user_mail");
    this.inputPass = this.page.locator("#user_password");
    this.inputPassConfirm = this.page.locator("#user_password_confirmation");
    this.buttonSubmit = this.page.locator('input[type="submit"]');
  }

  async clickOnRegistration() {
    await this.buttonRegister.click();
    return this;
  }

  async printValuesForCorrectSignUp() {
    const randomPassword = faker.internet.password();
    await this.inputUserLogin.fill(faker.internet.userName());
    await this.inputPass.fill(randomPassword);
    await this.inputPassConfirm.fill(randomPassword);
    await this.inputFirstName.fill(faker.internet.username());
    await this.inputLastName.fill(faker.internet.username());
    await this.inputEmail.fill(faker.internet.email());
    await this.buttonSubmit.click();
    return this;
  }

  async printValuesForIncorrectSignUpPassword() {
    await this.inputUserLogin.fill(faker.internet.userName());
    await this.inputPass.fill(faker.internet.password());
    await this.inputPassConfirm.fill(faker.internet.password());
    await this.inputFirstName.fill(faker.internet.username());
    await this.inputLastName.fill(faker.internet.username());
    await this.inputEmail.fill(faker.internet.email());
    await this.buttonSubmit.click();
    return this;
  }

  async printValuesForIncorrectSignUpMail() {
    const randomPassword = faker.internet.password();
    await this.inputUserLogin.fill(faker.internet.userName());
    await this.inputPass.fill(randomPassword);
    await this.inputPassConfirm.fill(randomPassword);
    await this.inputFirstName.fill(faker.internet.username());
    await this.inputLastName.fill(faker.internet.username());
    await this.inputEmail.fill(faker.internet.username());
    await this.buttonSubmit.click();
    return this;
  }
}
