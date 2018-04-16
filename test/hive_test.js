"use strict"
const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

const max_wait_period = 50000;

const { suite } = require('selenium-webdriver/testing');

// getting chrome from local installation
const chrome = require('selenium-webdriver/chrome');
const path = require('chromedriver').path;
const service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

const config = require("../config.js");

suite(function(env) {
    var chrome_driver;

    describe("sign-up workflow test ", function() {
        this.timeout(50000);
        beforeEach(function() {
            chrome_driver = new webdriver.Builder()
                .withCapabilities(webdriver.Capabilities.chrome())
                .build();
            chrome_driver.get('https://staging.hive.com/signin');
        });

        afterEach(function() {
            chrome_driver.quit();
        });

        it("testing: opening signin page", function() {
            console.log('signin page opened successfully...');
        });

        it("testing: signing up with new account", function() {
            // chrome_driver.get('https://staging.hive.com/signin');
            chrome_driver.wait(until.elementLocated(By.id("join-hive")), max_wait_period).then(function() {
                debugger;
                console.log("located element...");
            }).catch(function(error){
                console.log(error);
            });
        })

    })
})




// chrome_driver.findElement(By.name('q')).sendKeys('webdriver');
// // chrome_driver.findElement(By.name('btnK')).click();
// chrome_driver.wait(until.titleIs('Hive: Home for busy teams'), 50000);
// chrome_driver.quit();