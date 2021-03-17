class HeaderSection {
    /**
     * define selectors using getter methods
     */
    get loginLink() {
        return $('[data-test-id="menu-desktop-login-link"]')
    }

    get registerLink() {
        return $('[data-test-id="menu-desktop-register-link"]')
    }

    get searchField() {
        return $('div[class*="search"] input[name="search"]')
    }

    get searchResultsContainer() {
        return $('ul.search__results')
    }

    get searchResultsList() {
        return this.searchResultsContainer.$$('li[class*="result--movies"]');
    }

    get loggedContainer() {
        return $('div[class*="user--logged"]')
    }

    get loggedSummary() {
        return this.loggedContainer.$('div[class*="--unique"]')
    }

    get loggedSummaryName() {
        return this.loggedContainer.$('div[class*="--unique"] span')
    }

    get loggedMenu() {
        return this.loggedContainer.$('.navmenu__parent--with-childs')
    }

    get loggedMenuOptions() {
        return this.loggedMenu.$('.navmenu__parent__child')
    }

    get logoutBtn() {
        return this.loggedMenuOptions.$("=SALIR")
    }

    get wishlistBtn() {
        return this.loggedMenuOptions.$("=QUIERO VER")
    }

    goToLoginPage() {
        this.loginLink.waitForClickable({timeout: 10000});
        this.loginLink.click();
    }

    goToRegisterPage() {
        this.registerLink.waitForClickable({timeout: 10000});
        this.registerLink.click();
    }

    logout() {
        this.loggedContainer.waitForDisplayed({timeout: 5000});
        this.loggedMenu.moveTo();
        this.logoutBtn.waitForClickable({timeout: 5000});
        this.logoutBtn.click();
    }

    goToWishListPage() {
        this.loggedContainer.waitForDisplayed({timeout: 5000});
        this.loggedMenu.moveTo();
        this.wishlistBtn.waitForClickable({timeout: 5000});
        this.wishlistBtn.click();
    }

    search(criteria) {
        this.searchField.waitForClickable({timeout: 5000});
        this.searchField.moveTo();
        this.searchField.setValue(criteria);
    }

    selectFirstResult() {
        browser.waitUntil(() => {
            if (this.searchResultsContainer.isDisplayed()) {
                this.searchResultsContainer.moveTo();
                const elem = this.searchResultsContainer.$$('[class*="result--movies"]');
                elem[0].waitForClickable({timeout: 10000});
                elem[0].click();
                return true;
            } else {
                return false;
            }
        }, {timeout: 20000, timeoutMsg: 'The search results container wasn\'t found'});
    }

    selectResultByName(query) {
        browser.waitUntil(() => {
            if (this.searchResultsContainer.isDisplayed()) {
                const elem = this.searchResultsContainer.$(`=${query}`);
                browser.debug();
                elem.parentElement().waitForClickable({timeout: 10000});
                elem.parentElement().click();
                return true;
            } else {
                return false;
            }

        }, {timeout: 20000, timeoutMsg: 'The search results container wasn\'t found'});
    }
}

module.exports = new HeaderSection();