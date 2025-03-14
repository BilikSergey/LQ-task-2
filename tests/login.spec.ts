import { test, expect } from "@playwright/test";
import { mainPage } from "../page/mainPage";
import { loginUser } from "../page/loginPage";

test.describe("Login page testing", () => {
  let login;
  let mainpage;

  test.beforeEach(async ({ page }) => {
    login = new loginUser(page);
    mainpage = new mainPage(page);
    await mainpage.toNavigate();
    await login.clickOnLogin();
  });

  test("verify valid login", async () => {
    await login.printValuesForCorrectLogin();
    await expect(login.logoutButton).toBeVisible();
    await expect(login.buttonLogin).not.toBeVisible();
    await expect(login.page.locator("#loggedas")).toHaveText(
      "Увійшов як BSTUserLogin"
    );
    await expect(login.page.locator(".my-account")).toBeVisible();
    await login.clickOnLogout();
    await expect(login.page).toHaveURL("https://www.redmine.org/");
    await expect(login.logoutButton).not.toBeVisible();
    await expect(login.buttonLogin).toBeVisible();
  });

  test("verify login (invalid password)", async () => {
    await login.printValuesForIncorrectLogin();
    await expect(login.page.locator("#flash_error")).toBeVisible();
    await expect(login.page.locator("#flash_error")).toHaveText(
      "Invalid user or password"
    );
    await expect(login.inputPass).toHaveText("");
  });
});
