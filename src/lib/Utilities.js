var DriverBuilder = require('./src/lib/DriverBuilder')
var config = require("./src/lib/Config");
var {until} = require("selenium-webdriver")

function Utilities(){
	this.driver = new DriverBuilder().chrome_driver;
}

async function loadHomePage (driver){
	console.log("loading hive page...");
	await driver.get(config.hive_url);
}

Utilities.prototype.loadPage = async function(){
	try{
		await loadHomePage(this.driver);
		console.log("hive signin page loaded...");
	} catch(error){
		console.log("unable to load page...");
	}
}

async function locateElement(driver, locator){
	try{
		// const element = await driver.findElement(locator);
		console.log("inside asynsc")
		return await driver.wait(until.elementLocated(locator), config.timeout);
	}
	catch(error){
		console.log(error)
	}	
}

Utilities.prototype.clickElement = async function(locator){
	var _self = this;
	try{
		const element = await locateElement(_self.driver, locator);
		console.log("element found...");
		element.click();
	} catch (error){
		console.log(error)
	}
}

Utilities.prototype.setText = async function(){
	var _self = this;
	try{

	} catch(error){
		console.log(error);
	}
}

module.exports = Utilities;