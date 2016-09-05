'use strict';


var logger = browser.getLogger('preview');
var components = require('components');

describe('preview lesson', function(){

    beforeEach(function(){ logger.info('running from ' + __filename); });


    it('should show the lesson', function( done ){
        logger.info('starting testing preview lesson');
        browser.get('/');
        browser.sleep(1000);
        components.loginPage.load().login( components.conf.previewLesson.username, components.conf.previewLesson.password );
        components.homepage.goToLessonIntro({'name' : 'test_continue_lesson'});
        components.lesson.intro.previewLesson();

        expect(element.all(by.css('.lesson-preview')).count()).toBe(1);
        element(by.css('.btn-close-preview')).click()
        components.layout.logout().then(done);
        browser.sleep(1000);
    });

});
