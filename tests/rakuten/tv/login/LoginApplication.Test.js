const HomePage = require('../../../../src/pageobjects/home.page');
const LoginPage = require('../../../../src/pageobjects/login.page');

describe('Login Application', function(){

    const correctMessage = 'Te has identificado correctamente en Rakuten TV. Nos alegra tenerte de vuelta.';

    it('should log in when it uses right credentials', function () {
        HomePage.open();
        HomePage.saveConsent()
        HomePage.Header.goToLoginPage();
        LoginPage.login('caballo@simon.diaz', '12345678')
        const notification = LoginPage.getNotification();
        expect(notification.message).toBe(correctMessage);
        expect(notification.type).toBe('info');
    });

    it('should log in when it uses right credentials direct from login page', function () {
        LoginPage.open()
        LoginPage.saveConsent()
        HomePage.Header.goToLoginPage();
        LoginPage.login('caballo@simon.diaz', '12345678')
        const notification = LoginPage.getNotification();
        expect(notification.message).toBe(correctMessage);
        expect(notification.type).toBe('info');
    });

    it('should log in when it uses right credentials but username with whitespaces', function () {
        HomePage.open();
        HomePage.saveConsent()
        HomePage.Header.goToLoginPage();
        LoginPage.login(' caballo@simon.diaz  ', '12345678')
        const notification = LoginPage.getNotification();
        expect(notification.message).toBe(correctMessage);
        expect(notification.type).toBe('info');
    });

    it('should log in when it uses right credentials with username no matter uppercase or lowercase', function () {
        HomePage.open();
        HomePage.saveConsent()
        HomePage.Header.goToLoginPage();
        LoginPage.login('cAbAlLo@SimOn.diAz', '12345678')
        const notification = LoginPage.getNotification();
        expect(notification.message).toBe(correctMessage);
        expect(notification.type).toBe('info');
    });

});