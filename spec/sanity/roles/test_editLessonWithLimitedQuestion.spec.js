/***
 *
 *
 * This test will ensure that limited editors that are able to edit lesson X, are prohibited from editing restricted questions.
 *
 *
 ***/


'use strict';


var logger = browser.getLogger('editLessonWithLimitedQuestion');
var components = require('components');

describe('limited roles editing lesson with restricted questions', function(){

    beforeEach(function(){ logger.info('running from ' + __filename); });

    it('should not be able to open the edit dialog', function( done ){
        logger.info('starting testing edit lesson with copy and override question');
        browser.get('/');

        components.loginPage.load().login( components.conf.editLessonCopyAndOverrideQuestion.editor.username, components.conf.editLessonCopyAndOverrideQuestion.editor.password );



        components.layout.goToManageLessons();
        components.manage.lessons.index.goToLesson({name: 'simple_lesson'});
        components.lesson.intro.editLesson();
        components.lesson.editor.clickQuestionInStep({'name' : 'open_with_media_explanation_only'});

        expect(components.questions.editorFromLessonDialog.getCopyAndOverrideMessage().isPresent()).toBe(false,'dialog should not have opened');
        // components.questions.editorFromLessonDialog.close();
        components.lesson.editor.clickDoneAndGotIt();
        components.layout.logout();
        browser.sleep(5000).then(done);
    });

});



