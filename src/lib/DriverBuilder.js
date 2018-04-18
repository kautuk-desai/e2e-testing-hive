var webdriver = require("selenium-webdriver")

function DriverBuilder() {
    // this will not require the chrome driver be added to path variable.
    let chrome = require('selenium-webdriver/chrome');
    let chrome_driver_path = require('chromedriver').path;
    let service = new chrome.ServiceBuilder(this.chrome_driver_path).build();
    chrome.setDefaultService(this.service);

    this.chrome_driver = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .build();
}

DriverBuilder.prototype.quit = function () {
    return this.chrome_driver.quit()
}

module.exports = DriverBuilder;