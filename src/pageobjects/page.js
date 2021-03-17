const HeaderSection = require('./header.section')
/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */
class Page {

    get consentIframe() {
        return $('iframe[id="gdpr-consent-notice"]')
    }
    get consentSaveButton() {
        return $('button[id="save"]')
    }
    // Error Notifications
    get notificationContainer() { return $('div[class="notifications"]')}
    get notificationMessage() {return this.notificationContainer.$('span[class*="notifications__item__message"]')}
    get notificationType() {return this.notificationContainer.$('span[class*="notifications__item__message__type"] span')}

    get Header () { return HeaderSection; }

    dismissNotification(){
        browser.waitUntil(() => {
            if(this.notificationMessage.isClickable()) {
                this.notificationMessage.click();
                return true;
            }
            return false;
        }, {timeout: 30000, timeoutMsg: 'The notification never show up'})
    }

    getNotification(){
        this.notificationMessage.waitForDisplayed({timeout:10000})
        return {
            message: this.notificationMessage.getHTML(false).replace(/^<.*>/,'').trim(),
            type: this.notificationType.getAttribute('class').replace('icon__', '')
        }
    }

    saveConsent() {
        $('#gdpr-consent-tool-wrapper').waitForDisplayed({timeout: 40000});
        browser.waitUntil(()=>{
            browser.switchToFrame(this.consentIframe);
            // wait for iframe will be loaded
            this.waitForAjax();
            if(this.consentSaveButton.isClickable()){
                this.consentSaveButton.click();
            }
            browser.switchToFrame(null);
            return !$('#gdpr-consent-tool-wrapper').isExisting()
        }, {timeout: 30000})
    }

    waitForAjax() {
        // Wait until the web page is completed loaded.
        browser.waitUntil(() => {
            return browser.execute(() => {
                const isAllImagesLoaded = function () {
                    for (let i = 0; i < document.images.length; i++) {
                        if (!document.images[i].complete) {
                            return false;
                        }
                    }
                    return true;
                }

                return document.readyState === "complete" && isAllImagesLoaded();
            })
        }, {timeout: 20000});

    }

    open(path) {
        browser.url(`${browser.config.baseUrl}/${path || ''}`);
        this.waitForAjax();
    }
}

module.exports = Page;