"use strict"
const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

const { suite } = require('selenium-webdriver/testing');

const chrome = require('selenium-webdriver/chrome');
const path = require('chromedriver').path;

const service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

const config = require("./config.js");

suite(function(env) {
    var chrome_driver;

    describe("sign-up workflow test ", function() {
        beforeEach(function() {
            chrome_driver = new webdriver.Builder()
                .withCapabilities(webdriver.Capabilities.chrome())
                .build();
        });

        afterEach(function() {
            chrome_driver.quit();
        });




        it("opening signin page", function() {
            chrome_driver.get('https://staging.hive.com/signin');
            console.log('working');
        });
    })
})




// chrome_driver.findElement(By.name('q')).sendKeys('webdriver');
// // chrome_driver.findElement(By.name('btnK')).click();
// chrome_driver.wait(until.titleIs('Hive: Home for busy teams'), 50000);
// chrome_driver.quit();