'use strict';
/**
 *
 * expects a lesson with 2 open questions.
 * so there's an open question right before the report.
 * both should have explanation.
 *
 **/


var logger = browser.getLogger('test_openQuestion_nextButton.spec.js');
var components = require('../../../source/components');


describe('openQuestion with explanation', function () {

    beforeEach(function () { logger.info('running from ' + __filename); });

    it('not go to next question until next is pressed but not for last question in lesson', function () {
        browser.get('/');
        components.homepage.startLesson({name: 'lesson_with_openQuestion'});
        components.lesson.intro.startLesson();
        components.questions.view.open.answer('this is my answer');
        components.questions.view.open.submit(); // send answer
        expect(components.questions.view.open.getExplanation()).toBe('this is explanation'); // verify explanation exists
        components.questions.view.open.continue(); // test that continue is required
        expect(components.questions.view.open.getQuestion()).toBe('question_2'); // verify we moved to next question
        components.questions.view.open.answer('this is my answer');
        components.questions.view.open.submit(); // send answer
        browser.sleep(1000);
        expect(components.questions.view.open.countButtons()).toBe(1);
        components.questions.view.open.letsContinue(); // this should fail

        browser.sleep(1000);

    });


});
