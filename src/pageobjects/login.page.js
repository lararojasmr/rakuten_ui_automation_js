const Page = require('./page');

class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get loginContainer() { return $('div[class="identification"] div[class*="--login"]')}
    get inputUsername () { return this.loginContainer.$('input[name="email"]') }
    get inputPassword () { return this.loginContainer.$('input[name="password"]') }
    get btnSubmit () { return this.loginContainer.$('button[type="submit"]') }

    /**
     * a method to encapsulate automation code to interact with the page
     * e.g. to login using username and password
     */
    login (username, password) {
        this.loginContainer.waitForDisplayed({timeout: 20000});
        this.inputUsername.setValue(username);
        this.inputPassword.setValue(password);
        this.btnSubmit.click();
    }

    open() {
        super.open('sessions/sign_in')
    }
}

module.exports = new LoginPage();
