'use strict';


var logger = browser.getLogger('test_profile.spec');
var components = require('../../../source/components');
//var _ = require('lodash');

describe('profile page', function(){

    var profile = components.mySection.profile;
    var usernameWithCase = null;

    beforeEach(function(){ logger.info('running from ' + __filename); });

    beforeEach(function(){
        usernameWithCase = components.conf.profilePage.username;
    });

    function login(){
        components.loginPage.load().login( components.conf.profilePage.username, components.conf.profilePage.password );
    }

    function logout(){
        components.layout.logout();
    }

    it('should username in original casing', function( done ){

        profile.route(usernameWithCase);
        expect($('.profile-username').getText()).toBe(usernameWithCase);

        logger.info('starting testing preview lesson');
        login();


        profile.route(usernameWithCase);
        expect(profile.getUsername()).toBe(usernameWithCase);

        profile.route();
        expect(profile.getUsername()).toBe(usernameWithCase);

        logout();
        browser.sleep(1000).then(done);

    });

    it('should show different number whether for questions/lessons whether I am logged in or not', function(){
        var publicStats = null;
        profile.route(usernameWithCase);
        profile.getProfileStats().then(function(stats){
            logger.info('got profile stats ' +  JSON.stringify(stats) );
            publicStats = stats;
            expect(stats.lessonsCount>0).toBe(true, 'lessons count should be bigger than 0');
            expect(stats.questionsCount>0).toBe(true,'questions count should be bigger than 0');
        });

        login();
        profile.route(usernameWithCase);
        profile.getProfileStats().then(function(stats){
            expect(stats.lessonsCount).not.toBe(publicStats.lessonsCount,'lessons should be different');
            expect(stats.questionsCount).not.toBe(publicStats.questionsCount,'questions should be different');
        });
        logout();
    });

    it('should be able to edit data', function(){
        login();
        profile.route(usernameWithCase);
        var details = {
            'externalLink' : 'http://localhost.com',
            'intro' : 'this is intro',
            'details' : 'this is details'
        };
        profile.editDetailsAndSave( details );

        profile.getProfileData().then(function(data){
           logger.info('got profile data', JSON.stringify(data));
            expect(data.externalLink).toBe(details.externalLink,'external link should be the same');
            expect(data.intro).toBe(details.intro,'external link should be the same');
            expect(data.details).toBe(details.details,'external link should be the same');
        });

        logout();
        browser.sleep(1000);
    });

});
