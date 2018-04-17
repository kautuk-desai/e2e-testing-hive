var DriverBuilder = require('./DriverBuilder')
var config = require("./Config");
var {
	until
} = require("selenium-webdriver")

function Utilities() {
	this.driver = new DriverBuilder().chrome_driver;
}

async function loadPage(driver) {
	try {
		await driver.get(config.hive_url);
	} catch (error) {
		throw new Error("unable to load: " + error.message.toString());
	}

}

Utilities.prototype.loadHomePage = async function () {
	try {
		return await loadPage(this.driver);
	} catch (error) {
		throw error;
	}
}

async function locateElement(driver, locator) {
	try {
		const element = await driver.wait(until.elementLocated(locator), config.timeout);
		await waitUntilVisible(driver, element);
		return element;
	} catch (error) {
		throw error;
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
		return await element.click();
	} catch (error) {
		throw error;
	}
}


async function setInputText(element, text) {
	try {
		await element.clear();
		return await element.sendKeys(text);
	} catch (error) {
		throw new Error("unable to insert text in input field: " + error.message.toString());
	}
}

Utilities.prototype.insertText = async function (locator, text) {
	var _self = this;
	try {
		const element = await locateElement(_self.driver, locator);
		_self.driver.sleep(250);
		return await setInputText(element, text);
	} catch (error) {
		throw error;
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

Utilities.prototype.getText = async function (locator) {
	var _self = this;
	try {
		return await getElementText(_self.driver, locator);
	} catch (error) {
		throw new Error(error.message.toString());
	}
}

Utilities.prototype.getAttributeValue = async function (locator, attr) {
	var _self = this;
	try {
		const element = await locateElement(_self.driver, locator);
		return await element.getAttribute(attr);
	} catch (error) {
		throw new Error(error.message.toString());
	}
}

module.exports = Utilities;