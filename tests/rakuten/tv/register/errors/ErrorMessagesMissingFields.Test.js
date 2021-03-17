const RegisterPage = require('../../../../../src/pageobjects/register.page');

describe('Error when required field', function () {

    it('should appear when all fields are empty', function (){
        RegisterPage.open();
        RegisterPage.saveConsent();
        RegisterPage.register({
            terms: true,
            newsletters: false
        });
        const notification = RegisterPage.getNotification();
        expect(notification.message.toLowerCase()).toEqual('credenciales no válidas');
        expect(notification.type).toEqual('error');
    });

    it('should appear when email and email confirmation are empty', function (){
        RegisterPage.open();
        RegisterPage.saveConsent();
        RegisterPage.register({
            password: '12345678',
            terms: true,
            newsletters: false
        });
        const notification = RegisterPage.getNotification();
        expect(notification.message.toLowerCase()).toEqual('credenciales no válidas');
        expect(notification.type).toEqual('error');
    });

    it('should appear when email and email confirmation are different', function (){
        RegisterPage.open();
        RegisterPage.saveConsent();
        RegisterPage.register({
            password: '12345678',
            email:'el_email@fake.com',
            emailConfirmation:'el_mail_diff@fake.com',
            terms: true,
            newsletters: false
        });
        const notification = RegisterPage.getNotification();
        expect(notification.message.toLowerCase()).toContain('la dirección de email y su repetición no coinciden.');
        expect(notification.type).toEqual('error');
    });

    it('should appear when email with a wrong format', function (){
        RegisterPage.open();
        RegisterPage.saveConsent();
        RegisterPage.register({
            password: '12345678',
            email:'el_email@fake',
            emailConfirmation:'el_email@fake',
            terms: true,
            newsletters: false
        });
        const notification = RegisterPage.getNotification();
        expect(notification.message.toLowerCase()).toContain('la dirección de email tiene un formato incorrecto.');
        expect(notification.type).toEqual('error');
    });

    it('should appear when password has less than 7 characters', function (){
        RegisterPage.open();
        RegisterPage.saveConsent();
        RegisterPage.register({
            password: '1234567',
            email:'el_email@fake.com',
            emailConfirmation:'el_email@fake.com',
            terms: true,
            newsletters: false
        });
        const notification = RegisterPage.getNotification();
        expect(notification.message.toLowerCase()).toContain('contraseña: es demasiado corta (8 caracteres mínimo)');
        expect(notification.type).toEqual('warning');
    });

});