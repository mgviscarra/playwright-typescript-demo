import { expect, type Locator, type Page } from '@playwright/test';

export class HomePage{
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly itemNameLabel: Locator;
    readonly productContainer: Locator;
    readonly cartButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.pageTitle = page.locator('.app_logo');
        this.itemNameLabel = page.locator('div.inventory_item_name');
        this.productContainer = page.locator('div.inventory_item');
        this.cartButton = page.locator('div#shopping_cart_container');

    }

    async verifyHomePageIsDisplayed(){
        await expect(this.pageTitle).toBeVisible();
    }

    async verifyProductIsDisplayed(productName: string){
        await expect(this.itemNameLabel.getByText(productName)).toBeVisible();
    }

    async addProductToTheCart(productName: string){
        await this.productContainer.filter({has: this.page.getByText(productName)})
        .getByRole('button', {name:'ADD TO CART'}).click();
    }

    async verifyCartNumber(amount: string){
        await expect(this.cartButton).toContainText(amount);
    }

}