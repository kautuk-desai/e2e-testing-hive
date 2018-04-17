var webdriver = require("selenium-webdriver")

function DriverBuilder() {
    this.chrome_driver = new webdriver.Builder()
        .forBrowser('chrome')
        .setChromeOptions( /* … */ )
        .build()
}

DriverBuilder.prototype.quit = function() {
    return this.chrome_driver.quit()
}


module.exports = DriverBuilder;