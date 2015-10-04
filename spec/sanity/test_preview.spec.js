'use strict';


var logger = require('log4js').getLogger('preview');
var components = require('../../source/components/index');
//var _ = require('lodash');

describe('edit lesson', function(){

    /**
     * This test expects
     *   1. a user named 'test' and password 'test' to exist which is not admin
     *   2. user 'test' to own a lesson named 'test_continue_lesson'
     *
     *
     * it checks if the user is able to edit a lesson
     */

    it('should be able to edit a lesson without errors', function( done ){
        logger.info('starting testing preview lesson');
        browser.get('/');
        browser.sleep(1000);
        components.loginPage.load().login( components.conf.previewLesson.username, components.conf.previewLesson.password );
        components.homepage.startLesson({'name' : 'test_continue_lesson'});
        components.lessonIntro.previewLesson();
        expect(element.all(by.css('.lesson-step-title')).count()).toBe(1);

        components.layout.logout().then(done);
        browser.sleep(1000)
    });

});