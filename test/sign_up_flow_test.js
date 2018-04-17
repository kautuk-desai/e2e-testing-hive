var utilities = require("./utilities")
var {By} = require("selenium-webdriver")

const join_hive = By.css("#join-hive");
const button_continue = By.css("#onboardingCardVideo > div > div.card-buttons > button");
const first_name = By.css("#firstName");
const last_name = By.css("#last_name");
const input_phone = By.css("#phone");
const input_email = By.css("#email");
const input_password = By.css("#password");

var utilities = new utilities();
utilities.loadPage();
utilities.clickElement(join_hive);
utilities.clickElement(button_continue);