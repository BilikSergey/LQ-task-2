import { test, expect } from "@playwright/test";
import { mainPage } from "../page/mainPage";
import { signUp } from "../page/registrationPage";

test.describe("Sign up page testing", () => {
  let signup;
  let mainpage;

  test.beforeEach(async ({ page }) => {
    signup = new signUp(page);
    mainpage = new mainPage(page);
    await mainpage.toNavigate();
    await signup.clickOnRegistration();
  });

  test("verify valid registration", async () => {
    await signup.printValuesForCorrectSignUp();
    await expect(signup.page).toHaveURL("https://www.redmine.org/login");
    await expect(signup.page.locator("#flash_notice")).toBeVisible();
  });

  test("verify registration (invalid password)", async () => {
    await signup.printValuesForIncorrectSignUpPassword();
    await expect(signup.page.locator('label[for="user_password"]')).toHaveClass(
      "error"
    );
    await expect(signup.page.locator("#errorExplanation")).toBeVisible();
    await expect(signup.page.locator("#errorExplanation")).toHaveText(
      "Password doesn't match confirmation"
    );
  });

  test("verify registration (invalid mail)", async () => {
    await signup.printValuesForIncorrectSignUpMail();
    await expect(signup.inputPass).toHaveText("");
    await expect(signup.inputPassConfirm).toHaveText("");
    await expect(signup.page.locator("#errorExplanation")).toBeVisible();
    await expect(signup.page.locator("#errorExplanation")).toHaveText(
      "Email is invalid"
    );
  });
});
