var config = {}
config.timeout = 50000;
config.hive_url = 'https://staging.hive.com/signin'
config.first_name = "first_name";
config.last_name = "last_name";
config.phone = 9999999999;
config.incorrect_email = "test";
config.organization_name = "test2" + new Date().getTime().toString();
config.email = "test@" + config.organization_name + ".com";
config.password = "password123";
config.incorrect_password = "pass";
config.coworker = "coworker1@" + config.organization_name + ".com";

module.exports = config;