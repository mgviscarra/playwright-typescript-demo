import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly userNameTextBox: Locator;
    readonly passwordTextBox: Locator;
    readonly loginButton: Locator;
    readonly errorMessageLabel: Locator;

    constructor(page: Page){
        this.page = page;
        this.userNameTextBox = page.getByPlaceholder('Username');
        this.passwordTextBox = page.getByPlaceholder('Password');
        this.loginButton = page.locator('#login-button');
        this.errorMessageLabel = page.locator('h3[data-test="error"]');
    }

    async setUserNameTextBox(userName: string){
        await this.userNameTextBox.fill(userName);
    }

    async setPasswordTextBox(password: string){
        await this.passwordTextBox.fill(password);
    }

    async clickOnLoginButton(){
        await this.loginButton.click();
    }

    async verifyErrorMessageIsDisplayed(errorMessage: string){
        expect(this.errorMessageLabel).toContainText(errorMessage);
    }

}