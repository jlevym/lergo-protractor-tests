'use strict';


var logger = browser.getLogger('test_profile.spec');
var components = require('../../../source/components');
//var _ = require('lodash');

describe('profile page', function(){

    it('should username in original casing', function( done ){

        var usernameWithCase = 'lergotestadmin';

        browser.get('/#!/public/lergotestadmin/profile');
        expect($('.profile-username').getText()).toBe(usernameWithCase);

        logger.info('starting testing preview lesson');
        browser.get('/');
        browser.sleep(1000);
        components.loginPage.load().login( components.conf.profilePage.username, components.conf.profilePage.password );

        browser.get('/#!/user/lergotestadmin/profile');
        browser.sleep(1000);
        expect($('.profile-username').getText()).toBe(usernameWithCase);

        browser.get('/#!/user/create/profile');
        browser.sleep(1000); // required due to our implementation to tabs
        expect($('.profile-username').getText()).toBe(usernameWithCase);

        browser.sleep(1000).then(done);

    });

});
