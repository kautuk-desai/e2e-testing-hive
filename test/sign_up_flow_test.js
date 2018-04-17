var utilities = require("../src/lib/Utilities")
var config = require("../src/lib/Config");
var {
    By
} = require("selenium-webdriver");

var {
    assert
} = require("chai");


const title = By.css("title");
const join_hive = By.css("#join-hive");
const button_continue = By.css("#onboardingCardVideo > div > div.card-buttons > button");
const first_name = By.css("#firstName");
const last_name = By.css("#lastName");
const input_phone = By.css("#phone");
const input_email = By.css("#email");
const input_password = By.css("#password");
const submit_form = By.css("#joinForm > div.card-buttons > button");
const org_name = By.css("#onboardingCardCreateWorkspaceForm > div:nth-child(1) > label > input");
const org_size = By.css("#onboardingCardCreateWorkspaceForm > div:nth-child(2) > label > div > span:nth-child(2)");
const button_continue_to_sample_task = By.css("#onboardingCardCreateWorkspaceForm > div.card-buttons > button");
const button_continue_to_coworkers = By.css("#onboardingCardActionsForm > div.card-buttons > button")

const input_coworker1 = By.css("#onboardingCardTeammatesForm > div:nth-child(1) > input");
const button_continue_to_file_storage = By.css("#onboardingCardTeammatesForm > div.card-buttons > button.hv.btn.btn-primary.ob-team-continue");
const complete_signup_button = By.css("#onboardingCardFiles > div.card-main > div.card-buttons > button.hv.btn.btn-default.js-complete-step");
const welcome_header = By.css("#welcomeModal > div > div > div.hive-modal__header > div > span");


async function loadVariables() {
    try {

    } catch (error) {

    }
}

describe("Sign up workflow tests", function () {
    var utility, _By;
    var title;

    before(async function () {
        var {By} = require("selenium-webdriver");
        _By = By;
        title = _By.css("title");
        var utilities = require("../src/lib/Utilities")
        var config = require("../src/lib/Config");
        utility = new utilities();
    });

    it("loads the signin page", async function () {
        await utility.loadHomePage();
        var page_title = await utility.driver.getTitle();
        assert.strictEqual(page_title, "Hive: Home for busy teams", "page title does not match");
    });

    it("loads the join hive page", async function(){
        const join_hive = _By.css("#join-hive");
        await utility.clickElement(join_hive);
        var url = await utility.driver.getCurrentUrl();
        assert.strictEqual(url, "https://staging.hive.com/join", "join hive url does not match");
    });

    after(async function () {
        await utility.close();
        console.log("chrome driver closed successfully...");
    });

});


// utilities.clickElement(join_hive);
// utilities.clickElement(button_continue);

// async function fillForm() {
//     await utilities.insertText(first_name, config.first_name);
//     console.log("first name inserted...");
//     await utilities.insertText(last_name, config.last_name);
//     console.log("last name inserted...");
//     await utilities.insertText(input_phone, config.phone);
//     console.log("phone number inserted...");
//     await utilities.insertText(input_email, config.email);
//     console.log("email inserted...");
//     await utilities.insertText(input_password, config.password);
//     console.log("password inserted...");

//     utilities.clickElement(submit_form);

//     await utilities.insertText(org_name, config.organization_name);
//     console.log("organization name inserted");

//     utilities.clickElement(org_size);

//     utilities.clickElement(button_continue_to_sample_task);
//     console.log("organization details filled...");

//     utilities.clickElement(button_continue_to_coworkers);

//     await utilities.insertText(input_coworker1, config.coworker);


//     utilities.clickElement(button_continue_to_file_storage);

//     utilities.clickElement(complete_signup_button);

//     let welcome_text = await utilities.getText(welcome_header);
//     assert.strictEqual(welcome_text, "Welcome to Hive", "sign up incomplete as the welcome message is incorrect");
// }

// fillForm();