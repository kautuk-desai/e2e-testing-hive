var DriverBuilder = require('./DriverBuilder')
var config = require("./Config");
var {
	until
} = require("selenium-webdriver")

function Utilities() {
	this.driver = new DriverBuilder().chrome_driver;
}

async function loadHomePage(driver) {
	console.log("loading hive page...");
	await driver.get(config.hive_url);
}

Utilities.prototype.loadPage = async function () {
	try {
		await loadHomePage(this.driver);
		console.log("hive signin page loaded...");
	} catch (error) {
		console.log("unable to load page...");
	}
}

async function locateElement(driver, locator) {
	try {
		// const element = await driver.findElement(locator);
		console.log("inside asynsc")
		const element = await driver.wait(until.elementLocated(locator), config.timeout);
		await waitUntilVisible(driver, element);
		return element;
	} catch (error) {
		console.log(error)
	}
}

async function waitUntilVisible(driver, element) {
	try {
		console.log("waiting for element to become visible...");
		return await driver.wait(until.elementIsVisible(element), config.timeout);
	} catch (error) {
		throw new Error("element still not visible: " + error.message.toString());
	}
}

Utilities.prototype.clickElement = async function (locator) {
	var _self = this;
	try {
		const element = await locateElement(_self.driver, locator);
		console.log("element found...");
		await element.click();
	} catch (error) {
		console.log(error)
	}
}


async function setInputText(element, text) {
	try {
		console.log("inserting text in the input field...");
		return await element.sendKeys(text);
	} catch (error) {
		throw new Error("unable to insert text in input field: " + error.message.toString());
	}
}

Utilities.prototype.insertText = async function (locator, text) {
	var _self = this;
	try {
		const element = await locateElement(_self.driver, locator);
		// const elementvisible = await waitUntilVisible(_self.driver, element);
		_self.driver.sleep(250);
		return await setInputText(element, text);
	} catch (error) {
		console.log(error);
	}
}

async function getElementText(driver, locator) {
	try {
		const element = await locateElement(driver, locator);
		return await element.getText();
	} catch (error) {
		throw new Error("unable to retieve text of the element: " + error.message.toString());
	}
}

Utilities.prototype.getText = async function(locator){
	var _self = this;
	try{
		return await getElementText(_self.driver, locator);
	} catch (error){
		console.log(error);
	}
}

module.exports = Utilities;