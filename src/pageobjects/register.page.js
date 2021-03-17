const Page = require("./page");

class RegisterPage extends Page {

    get registerContainer() {
        return $('div[class="identification"] div[class*="--register"]')
    }

    get emailField() {
        return this.registerContainer.$('input[name="email"]')
    };

    get emailConfirmationField() {
        return this.registerContainer.$('input[name="emailConfirmation"]')
    };

    get passwordField() {
        return this.registerContainer.$('input[name="password"]')
    };

    get newsletterCheckbox() {
        return this.registerContainer.$('#opt_in_register + label')
    };

    get termsCheckbox() {
        return this.registerContainer.$('#terms_check_register + label')
    };

    get btnSubmit() {
        return this.registerContainer.$('button[type="submit"]')
    }

    /**
     *
     * @param {{email, emailConfirmation, password, newsletters, terms}} form
     */
    register(form) {
        this.waitForAjax();
        this.emailField.waitForDisplayed({timeout: 5000});
        this.emailField.setValue(form.email || '');
        this.emailConfirmationField.setValue(form.emailConfirmation || '');
        this.passwordField.setValue(form.password || '');
        if (this.newsletterCheckbox.isSelected() !== form.newsletters && form.newsletters) {
            this.newsletterCheckbox.click();
        }

        if (this.termsCheckbox.isSelected() !== form.terms && form.terms) {
            this.termsCheckbox.click();
        }
        if (this.btnSubmit.isClickable()) {
            this.btnSubmit.click();
            this.waitForAjax();
        }
    }


    open() {
        super.open('registrations/new');
    }

}

module.exports = new RegisterPage();