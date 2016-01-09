'use strict';

var logger = require('log4js').getLogger('LoginPage');

exports.load = function(){
    browser.get('#!/public/session/login');
    browser.sleep(1000);
    return this;
};

exports.login = function( username, password ){
    browser.sleep(1000); // after browser.get, protractor is more stable with some sleep time
    logger.info('logging in as ', username, password );
    element(by.model('form.username')).sendKeys(username);
    element(by.model('form.password')).sendKeys(password);
    return element(by.css('[type="submit"]')).click().then(function(){
        logger.info('submitted');
    });


};
