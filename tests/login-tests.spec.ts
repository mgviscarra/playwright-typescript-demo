import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/login-page';
import { HomePage } from '../page-objects/home-page';

test('Login into Sauce Demo Page with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page); 
  await page.goto('https://www.saucedemo.com/v1/');
  await loginPage.setUserNameTextBox('standard_user');
  await loginPage.setPasswordTextBox('secret_sauce');
  await loginPage.clickOnLoginButton();
  await homePage.verifyHomePageIsDisplayed();
});

test('Login into Sauce Demo Page with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://www.saucedemo.com/v1/');
    await loginPage.setUserNameTextBox('invalid_user');
    await loginPage.setPasswordTextBox('invalid_password');
    await loginPage.clickOnLoginButton();
    await loginPage.verifyErrorMessageIsDisplayed('Username and password do not match any user in this service');

  });