const HomePage = require('../../../../src/pageobjects/home.page');
const LoginPage = require('../../../../src/pageobjects/login.page');

describe('Login Application', function () {

    const incorrectMessage = 'Puede ser que tu email o tu nombre de usuario y tu contraseña sean incorrectos';

    it('should show an error when with wrong credentials', function () {
        HomePage.open();
        HomePage.saveConsent()
        HomePage.Header.goToLoginPage();
        LoginPage.login('mlara', 'wrongPassword')
        const notification = LoginPage.getNotification();
        expect(notification.message.toLowerCase()).toBe(incorrectMessage.toLowerCase());
        expect(notification.type).toBe('error');
    });


    it('should show an error when without username', function () {
        HomePage.open();
        HomePage.saveConsent()
        HomePage.Header.goToLoginPage();
        LoginPage.login('', 'wrongPassword')
        const notification = LoginPage.getNotification();
        expect(notification.message.toLowerCase()).toBe(incorrectMessage.toLowerCase());
        expect(notification.type).toBe('error');
    });

    it('should show an error when without password', function () {
        HomePage.open();
        HomePage.saveConsent()
        HomePage.Header.goToLoginPage();
        LoginPage.login('mlara', '')
        const notification = LoginPage.getNotification();
        expect(notification.message.toLowerCase()).toBe(incorrectMessage.toLowerCase());
        expect(notification.type).toBe('error');
    });

});