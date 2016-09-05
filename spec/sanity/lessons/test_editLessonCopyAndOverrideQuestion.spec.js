/***
 *
 *
 * This test ensures that lesson owners are offered to copy a question if they cannot edit it..
 *
 */

'use strict';


var logger = browser.getLogger('editLessonCopyAndOverrideQuestion');
var components = require('components');

describe('edit lesson with copy and override question', function(){

    beforeEach(function(){ logger.info('running from ' + __filename); });

    it('should be offered to copy question and override', function( done ){
        logger.info('starting testing edit lesson with copy and override question');
        browser.get('/');

        components.loginPage.load().login( components.conf.editLessonCopyAndOverrideQuestion.owner.username, components.conf.editLessonCopyAndOverrideQuestion.owner.password );

        components.layout.goToUserSection();
        components.mySection.goToMyLessons();

        components.mySection.lessons.goToLesson({'name' : 'simple_lesson'});
        components.lesson.intro.editLesson();
        components.lesson.editor.clickQuestionInStep({'name' : 'open_with_media_explanation_only'});


        expect(components.questions.editorFromLessonDialog.getCopyAndOverrideMessage().isDisplayed()).toBe(true,'message about copy and override should exist');
        components.questions.editorFromLessonDialog.close();
        components.lesson.editor.clickDoneAndGotIt();
        components.layout.logout();
        browser.sleep(5000).then(done);
    });

});


