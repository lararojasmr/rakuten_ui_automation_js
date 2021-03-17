const HomePage = require('../../../../../src/pageobjects/home.page');
const RegisterPage = require('../../../../../src/pageobjects/register.page');

describe('Register Submit Button', function () {

    it('should be disable when "terms" checkbox is not selected', function () {
        HomePage.open();
        HomePage.saveConsent();
        HomePage.Header.goToRegisterPage();
        RegisterPage.register({
            terms: false,
            newsletters: false
        });
        expect(RegisterPage.btnSubmit.isEnabled()).toBeFalsy();
    });

    it('should be enable when "terms" checkbox is selected', function () {
        HomePage.open();
        HomePage.saveConsent();
        HomePage.Header.goToRegisterPage();
        RegisterPage.register({
            terms: true,
            newsletters: false
        });
        expect(RegisterPage.btnSubmit.isEnabled()).toBeTruthy();
    });

    it('should keep the same status when "newsletter" checkbox is change', function () {
        HomePage.open();
        HomePage.saveConsent();
        HomePage.Header.goToRegisterPage();
        const initialStatus = RegisterPage.btnSubmit.isEnabled();
        RegisterPage.register({
            newsletters: false
        });
        expect(RegisterPage.btnSubmit.isEnabled()).toBe(initialStatus);
        RegisterPage.register({
            newsletters: true
        });
        expect(RegisterPage.btnSubmit.isEnabled()).toBe(initialStatus);
    });

});