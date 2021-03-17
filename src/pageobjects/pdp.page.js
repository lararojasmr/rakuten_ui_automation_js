const Page = require("./page");

class PdpPage extends Page {

    get wishlistBtn() { return $('span[class*="--wishlist"]') }

    addToWishList(){
        this.waitForAjax();
        this.wishlistBtn.waitForClickable({timeout: 5000});
        this.wishlistBtn.click();
        this.waitForAjax();
    }

}

module.exports = new PdpPage();