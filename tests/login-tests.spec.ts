import { test } from '@playwright/test';
import { LoginPage } from '../page-objects/login-page';
import { HomePage } from '../page-objects/home-page';

var loginPage: LoginPage;
var homePage: HomePage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  homePage = new HomePage(page);
  await page.goto('/');
});


test('Login into Sauce Demo Page with valid credentials', async ({ page }) => {
  await loginPage.setUserNameTextBox('standard_user');
  await loginPage.setPasswordTextBox('secret_sauce');
  await loginPage.clickOnLoginButton();
  await homePage.verifyHomePageIsDisplayed();
});

test('Login into Sauce Demo Page with invalid credentials', async ({ page }) => {
    await loginPage.setUserNameTextBox('invalid_user');
    await loginPage.setPasswordTextBox('invalid_password');
    await loginPage.clickOnLoginButton();
    await loginPage.verifyErrorMessageIsDisplayed('Username and password do not match any user in this service');
  });
