'use strict';
/**
 *
 * expects a lesson with 2 open questions.
 * the first one should have explanation.
 *
 **/


var logger = browser.getLogger('test_openQuestion_nextButton.spec.js');
var components = require('../../../source/components');


describe('openQuestion with explanation', function () {

    beforeEach(function () { logger.info('running from ' + __filename); });

    it('not go to next question until next is pressed', function () {
        browser.get('/');
        components.homepage.startLesson({name: 'lesson_with_openQuestion'});
        components.lesson.intro.startLesson();
        components.questions.view.open.answer('this is my answer');
        components.questions.view.open.submit(); // send answer
        expect(components.questions.view.open.getExplanation()).toBe('this is explanation'); // verify explanation exists
        components.questions.view.open.continue(); // test that continue is required
        expect(components.questions.view.open.getQuestion()).toBe('question_2'); // verify we moved to next question
        browser.sleep(1000);

    });
});
