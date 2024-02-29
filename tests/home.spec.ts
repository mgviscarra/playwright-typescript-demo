import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/login-page';
import { HomePage } from '../page-objects/home-page';

const products = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt', 'Sauce Labs Fleece Jacket'];

for(const productName of products){
    test(`Product ${productName} is displayed`, async ({ page }) => {
        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page); 
        await page.goto('/');
        await loginPage.setUserNameTextBox('standard_user');
        await loginPage.setPasswordTextBox('secret_sauce');
        await loginPage.clickOnLoginButton();
        await homePage.verifyHomePageIsDisplayed();
        await homePage.verifyProductIsDisplayed(productName);
    });
}

test('Products can be added to he cart', async({page}) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page); 
    await page.goto('/')
    await loginPage.setUserNameTextBox('standard_user');
    await loginPage.setPasswordTextBox('secret_sauce');
    await loginPage.clickOnLoginButton();
    await homePage.verifyHomePageIsDisplayed();
    await homePage.addProductToTheCart('Sauce Labs Backpack')
    await homePage.verifyCartNumber('1');

});

