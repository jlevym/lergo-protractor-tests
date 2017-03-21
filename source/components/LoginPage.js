'use strict';

var logger = require('log4js').getLogger('LoginPage');

exports.load = function(){

    browser.ignoreSynchronization = true;
    browser.get('#!/public/session/login');
    browser.sleep(1000);
    return this;
};

/**
 *
 * @param  {object|string} username - if object then (username:username, password:password)
 * @param password
 * @returns {*|webdriver.promise.Promise}
 */
exports.login = function( username, password ){
    if ( typeof(username) === 'object'){
        password = username.password;
        username = username.username;
    }
    browser.sleep(1000); // after browser.get, protractor is more stable with some sleep time
    logger.info('logging in as ', username, password );
    element(by.model('form.username')).sendKeys(username);
    element(by.model('form.password')).sendKeys(password);
    element(by.css('[type="submit"]')).click().then(function(){
        logger.info('submitted');
    });
    return browser.sleep(2000);


};
