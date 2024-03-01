import { test} from '@playwright/test';
import { LoginPage } from '../page-objects/login-page';
import { HomePage } from '../page-objects/home-page';

const products = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt', 'Sauce Labs Fleece Jacket'];
var loginPage: LoginPage;
var homePage: HomePage;
test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    await page.goto('/');
    await loginPage.setUserNameTextBox('standard_user');
    await loginPage.setPasswordTextBox('secret_sauce');
    await loginPage.clickOnLoginButton();
  });

for(const productName of products){
    test(`Product ${productName} is displayed`, async () => {
        await homePage.verifyHomePageIsDisplayed();
        await homePage.verifyProductIsDisplayed(productName);
    });
}

test('Products can be added to he cart', async() => {
    await homePage.verifyHomePageIsDisplayed();
    await homePage.addProductToTheCart('Sauce Labs Backpack')
    await homePage.verifyCartNumber('1');
});

test.afterEach(async () => {
   await homePage.clickOnSidebarButton();
   await homePage.clickOnResetAppStateLink();
   await homePage.clickOnLogoutLink();
});

