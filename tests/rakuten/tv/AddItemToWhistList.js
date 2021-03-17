const RegisterPage = require('../../../src/pageobjects/register.page');
const HomePage = require('../../../src/pageobjects/home.page');
const LoginPage = require('../../../src/pageobjects/login.page');
const PdpPage = require('../../../src/pageobjects/pdp.page');

describe('Add Item to Wishlist', function () {

    it('should add one item to wishlist', () => {
        const email = `el_email_${Date.now()}@fake.com`;
        const registerData = {
            password: '12345678',
            email: email,
            emailConfirmation: email,
            terms: true,
            newsletters: false
        };

        //Flow:
        HomePage.open();
        HomePage.saveConsent();
        // Register
        HomePage.Header.goToRegisterPage();
        RegisterPage.register(registerData);
        RegisterPage.Header.logout();
        // Wait for the notification was close
        HomePage.dismissNotification();
        // Login
        HomePage.Header.goToLoginPage();
        const currentUrl = browser.getUrl();
        LoginPage.login(registerData.email, registerData.password);
        //its could be a command called: waitForRedirect
        waitForRedirect(currentUrl);
        //end of helper
        LoginPage.dismissNotification();
        HomePage.Header.loggedContainer.waitForDisplayed({timeout: 10000});
        // Search One Movie
        /// Write into the search field
        HomePage.Header.search('2012');
        /// Do click in the first result to go to PDP
        HomePage.Header.selectFirstResult();
        /// Wait to load PDP
        waitForRedirect();
        /// Add this movie to Wishlist
        PdpPage.addToWishList();
        /// Save the PDP URL
        const pdpUrl = browser.getUrl();
        /// Check the confirmation message
        const notification = PdpPage.getNotification();
        expect(notification.message.toLowerCase()).toEqual('Añadido a Quiero Ver'.toLowerCase());
        expect(notification.type).toEqual('info');
        // Go to the WishList of Customer to see if the movie is there.
        PdpPage.Header.goToWishListPage();
        expect(checkIfTheTheMovieAreTheSame(pdpUrl)).toBeTruthy();
    });

});

// This could be a custom expect
function checkIfTheTheMovieAreTheSame(originalPath){
    browser.$('div[class*="--wishlist"] a[class="artwork"]').waitForDisplayed({timeout:5000});
    browser.$('div[class*="--wishlist"] a[class="artwork"]').click();
    return originalPath === browser.getUrl();
}

// Could be a custom command.
function waitForRedirect(currentUrl){
    browser.waitUntil(() => {
        return currentUrl !== browser.getUrl();
    }, {timeout: 40000});
}