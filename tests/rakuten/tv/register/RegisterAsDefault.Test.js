const RegisterPage = require('../../../../src/pageobjects/register.page');
const HomePage = require('../../../../src/pageobjects/home.page');

describe('Register a new customer', function () {

    it('should create a new customer with right values', function () {
        RegisterPage.open();
        RegisterPage.saveConsent();
        const email = `el_email_${Date.now()}@fake.com`;
        RegisterPage.register({
            password: '12345678',
            email: email,
            emailConfirmation: email,
            terms: true,
            newsletters: false
        });
        const notification = RegisterPage.getNotification();
        expect(notification.message.toLowerCase()).toContain('tu usuario se ha registrado con éxito');
        expect(notification.type).toEqual('info');
    });

    it('should create a new customer using a previous registered values', function () {
        RegisterPage.open();
        RegisterPage.saveConsent();
        const email = `el_email_${Date.now()}@fake.com`;
        const registerData = {
            password: '12345678',
            email: email,
            emailConfirmation: email,
            terms: true,
            newsletters: false
        };
        RegisterPage.register(registerData);
        RegisterPage.Header.logout();
        HomePage.notificationMessage.click();
        HomePage.Header.goToRegisterPage();
        RegisterPage.register(registerData);
        const notification = RegisterPage.getNotification();
        expect(notification.message.toLowerCase()).toContain('tu usuario ya existe en rakuten');
        expect(notification.type).toEqual('warning');
    });

});