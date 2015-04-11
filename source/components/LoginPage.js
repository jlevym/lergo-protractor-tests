'use strict';

var logger = require('log4js').getLogger('LoginPage');

exports.load = function(){
    browser.get('#!/public/session/login');
    return this;
};

exports.login = function( username, password ){
    element(by.model('form.username')).sendKeys(username);
    element(by.model('form.password')).sendKeys(password);
    return element(by.css('[type="submit"]')).click().then(function(){
        logger.info('submitted');
    });


};