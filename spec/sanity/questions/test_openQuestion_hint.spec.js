'use strict';
/**
 *
 *   expects a lesson named "lesson_with_openQuestion"
 *   that has 2 open questions with hint
 *
 **/


var logger = browser.getLogger('test_openQuestion_hint.spec.js');
var components = require('../../../source/components');


describe('openQuestion', function () {

    beforeEach(function () { logger.info('running from ' + __filename); });

    it('should display a hint', function () {
        browser.get('/');
        components.homepage.startLesson({name: 'lesson_with_openQuestion'});
        components.questions.view.open.clickHint();
        expect(components.questions.view.open.getHintText()).toBe('this is hint');
    });
});
