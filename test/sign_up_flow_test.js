describe("Sign up workflow tests", function () {
    var {
        assert
    } = require("chai");
    var TestDriver = require("../src/lib/TestDriver");
    var test_driver;

    before(async function () {
        test_driver = new TestDriver();
        test_driver.loadSelectors();
    });

    it("loads the signin page", async function () {
        await test_driver.loadPage();
        var page_title = await test_driver.getPageTitle();
        assert.strictEqual(page_title, "Hive: Home for busy teams", "page title does not match");
    });

    it("loads the join hive page", async function () {
        var url = await test_driver.openJoinPage();
        assert.strictEqual(url, "https://staging.hive.com/join", "join hive url does not match");
    });

    it("loads onboarding info page", async function () {
        var onboarding_header = await test_driver.openOnBoardingInfoCard();
        assert.strictEqual(onboarding_header, "Tell us about yourself", "onboarding header text does not match");
    });

    it("checks form submission with incorrect email", async function () {
        var attr_value = await test_driver.fillIncorrectEmail();
        assert.strictEqual(attr_value, "input__field not-empty", "email field error did not occur");
    });

    it("loads create a workspace card", async function () {
        var create_workspace_card_header = await test_driver.loadWorspaceInfoCard();
        assert.strictEqual(create_workspace_card_header, "Create a workspace", "onboarding header text does not match");
    });

    it("checks workspace creation without organization name", async function(){
        var is_element_visible = await test_driver.continueWithoutOrgName();
        assert.strictEqual(is_element_visible, "true", "able to create workspace without organization name");
    });

    it("creates workspace", async function(){
        var sample_task_header = await test_driver.createWorkspace();
        assert.strictEqual(sample_task_header, "What do you need to do today?", "workspace not created");
    });


    it("loads coworker info card", async function(){
        var coworker_card_header = await test_driver.loadCoworkerInfoCard();
        assert.strictEqual(coworker_card_header, "Hive is better with coworkers", "workspace not created");
    });

    it("adds 1 coworker to the workspace", async function(){
        var file_storage_card_header = await test_driver.addCoworker();
        assert.strictEqual(file_storage_card_header, "Connect your file storage", "unable to add coworker successfully");
    });

    it("checks workspace dashboad", async function(){
        var workspace_header = await test_driver.completeSignUp();
        assert.strictEqual(workspace_header, "Welcome to Hive", "sign up incomplete as the welcome message is incorrect");
    });

    after(async function () {
        await test_driver.close();
        console.log("chrome driver closed successfully...");
    });
});