const HomePage = require('../../../../../src/pageobjects/home.page');
const RegisterPage = require('../../../../../src/pageobjects/register.page');

describe('Field Attribute', function () {

    it('type should be "password" to the password field', function () {
        RegisterPage.open();
        RegisterPage.saveConsent();
        const type = RegisterPage.passwordField.getAttribute('type');
        expect(type).toEqual('password');
    });

    it('type should be "email" in both email fields', function () {
        RegisterPage.open();
        RegisterPage.saveConsent();
        expect(RegisterPage.emailField.getAttribute('type')).toEqual('email');
        expect(RegisterPage.emailConfirmationField.getAttribute('type')).toEqual('email');
    });
});