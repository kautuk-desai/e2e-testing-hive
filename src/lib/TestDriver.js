function TestDriver() {
    this.utilities = require("./Utilities");
    this.utility = new this.utilities();
    this.config = require("./Config");
}

TestDriver.prototype.loadSelectors = function () {
    var {
        By
    } = require("selenium-webdriver");
    this.join_hive_selector = By.css("#join-hive");
    this.button_continue_to_onboarding_selector = By.css("#onboardingCardVideo > div > div.card-buttons > button");
    this.onboarding_info_card_header_selector = By.css("#onboardingCardInfo > div.card-main > h1");

    this.first_name_selector = By.css("#firstName");
    this.last_name_selector = By.css("#lastName");
    this.input_phone_selector = By.css("#phone");
    this.input_email_selector = By.css("#email");
    this.input_password_selector = By.css("#password");
    this.submit_form_selector = By.css("#joinForm > div.card-buttons > button");

    this.create_workspace_card_header_selector = By.css("#onboardingCardCreateWorkspace > div.card-main > h1");
    this.org_name_selector = By.css("#onboardingCardCreateWorkspaceForm > div:nth-child(1) > label > input");
    this.org_size_selector = By.css("#onboardingCardCreateWorkspaceForm > div:nth-child(2) > label > div > span:nth-child(2)");
    this.button_continue_to_sample_task_selector = By.css("#onboardingCardCreateWorkspaceForm > div.card-buttons > button");

    this.sample_task_card_header_selector = By.css("#onboardingCardActions > div.card-main > h1");
    this.button_continue_to_coworkers_selector = By.css("#onboardingCardActionsForm > div.card-buttons > button");

    this.coworker_card_header_selector = By.css("#onboardingCardTeammates > div.card-main > h1");
    this.input_coworker1_selector = By.css("#onboardingCardTeammatesForm > div:nth-child(1) > input");
    this.button_continue_to_file_storage_selector = By.css("#onboardingCardTeammatesForm > div.card-buttons > button.hv.btn.btn-primary.ob-team-continue");

    this.file_storage_card_header_selector = By.css("#onboardingCardFiles > div.card-main > h1");

    this.complete_signup_button_selector = By.css("#onboardingCardFiles > div.card-main > div.card-buttons > button.hv.btn.btn-default.js-complete-step");
    this.welcome_header_selector = By.css("#welcomeModal > div > div > div.hive-modal__header > div > span");
}

TestDriver.prototype.loadPage = async function () {
    var _self = this;
    try {
        return await _self.utility.loadHomePage();
    } catch (error) {
        console.log(error);
    }
}

TestDriver.prototype.getPageTitle = async function () {
    var _self = this;
    try {
        return await _self.utility.driver.getTitle();
    } catch (error) {
        console.log(error);
    }
}

TestDriver.prototype.close = async function () {
    var _self = this;
    try {
        _self.utility.driver.sleep(2000);
        return await _self.utility.driver.quit();
    } catch (error) {
        console.log(error);
    }
}

TestDriver.prototype.openJoinPage = async function () {
    var _self = this;
    try {
        await _self.utility.clickElement(_self.join_hive_selector);
        var url = await _self.utility.driver.getCurrentUrl();
        return url;
    } catch (error) {
        console.log(error);
    }
}

TestDriver.prototype.openOnBoardingInfoCard = async function () {
    var _self = this;
    try {
        await _self.utility.clickElement(_self.button_continue_to_onboarding_selector);
        var text = await _self.utility.getText(_self.onboarding_info_card_header_selector);
        return text;
    } catch (error) {
        console.log(error);
    }
}

async function fillUserInfo(utility, _self) {
    try {
        await utility.insertText(_self.first_name_selector, _self.config.first_name);
        await utility.insertText(_self.last_name_selector, _self.config.last_name);
        return await utility.insertText(_self.input_phone_selector, _self.config.phone);
    } catch (error) {
        throw new Error("failed while filling user info: " + error.message.toString());
    }
}

TestDriver.prototype.fillIncorrectEmail = async function () {
    var _self = this;
    try {
        await fillUserInfo(_self.utility, _self);
        console.log("user info inserted...");
        await _self.utility.insertText(_self.input_email_selector, _self.config.incorrect_email);
        console.log("email inserted...");

        var attr_value = await _self.utility.getAttributeValue(_self.input_email_selector, "class");
        return attr_value;
    } catch (error) {
        console.log(error);
    }
}

TestDriver.prototype.fillIncorrectPassword = async function(){
    var _self = this;
    try{
        await fillUserInfo(_self.utility, _self);
        await _self.utility.insertText(_self.input_password_selector, _self.config.incorrect_password);
        var attr_value = await _self.utility.getAttributeValue(_self.input_password_selector, "class");
        return attr_value;
    } catch(error){
        console.log(error);
    }
}

TestDriver.prototype.formSubmissionWithoutUserInfo = async function(){
    var _self = this;
    try{

        await _self.utility.insertText(_self.input_email_selector, _self.config.email);
        await _self.utility.insertText(_self.input_password_selector, _self.config.password);
        var attr_value = await _self.utility.getAttributeValue(_self.submit_form_selector, "class");
        return attr_value;
    } catch(error){
        console.log(error);
    }
}

TestDriver.prototype.loadWorspaceInfoCard = async function () {
    var _self = this;
    try {
        await fillUserInfo(_self.utility, _self);
        console.log("user info inserted...");

        await _self.utility.insertText(_self.input_email_selector, _self.config.email);
        await _self.utility.insertText(_self.input_password_selector, _self.config.password);

        await _self.utility.clickElement(_self.submit_form_selector);
        return await _self.utility.getText(_self.create_workspace_card_header_selector);
    } catch (error) {
        console.log(error);
    }
}

TestDriver.prototype.continueWithoutOrgName = async function () {
    var _self = this;
    try {
        await _self.utility.clickElement(_self.org_size_selector);
        var attr_value = await _self.utility.getAttributeValue(_self.button_continue_to_sample_task_selector, "disabled");
        return attr_value;
    } catch (error) {
        console.log(error);
    }
}

TestDriver.prototype.createWorkspace = async function(){
    var _self = this;
    try {
        await _self.utility.clickElement(_self.org_size_selector);
        await _self.utility.insertText(_self.org_name_selector, _self.config.organization_name);
        await _self.utility.clickElement(_self.button_continue_to_sample_task_selector);
        return await _self.utility.getText(_self.sample_task_card_header_selector);
    } catch(error){
        console.log(error);
    }
}


TestDriver.prototype.loadCoworkerInfoCard = async function(){
    var _self = this;
    try {
        await _self.utility.clickElement(_self.button_continue_to_coworkers_selector);
        return await _self.utility.getText(_self.coworker_card_header_selector);
    } catch (error){
        console.log(error);
    }
}

TestDriver.prototype.addCoworker = async function(){
    var _self = this;
    try{
        await _self.utility.insertText(_self.input_coworker1_selector, _self.config.coworker);
        await _self.utility.clickElement(_self.button_continue_to_file_storage_selector);
        return await _self.utility.getText(_self.file_storage_card_header_selector);
    } catch(error){
        console.log(error);
    }
}

TestDriver.prototype.completeSignUp = async function(){
    var _self = this;
    try{
        await _self.utility.clickElement(_self.complete_signup_button_selector);
        return await _self.utility.getText(_self.welcome_header_selector);
    } catch (error){
        console.log(error);
    }
}

module.exports = TestDriver;