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


describe('explanation media display rules', function () {

    var conf;

    beforeEach(function () {
        logger.info('running from ' + __filename);
        browser.get('/');
        browser.sleep(1000);
        conf = components.conf.explanationMediaDisplay;
    });

    afterEach(function(){
    });

    it('should not show if in test mode', function(){

        components.homepage.startLesson(conf.testMode);
        components.lesson.intro.startLesson();
        // see it does not appear in test mode
        var q = components.questions.view.trueFalse;
        q.answer({answer:false});
        browser.sleep(1000);
        expect(q.explanation().isDisplayed()).toBeFalsy();

    });

    it('should show iff answer is incorrect', function(){
        components.homepage.startLesson(conf.showIffWrong);
        components.lesson.intro.startLesson();
        var q = components.questions.view.trueFalse;
        // see it does not appear if no answer
        expect(q.explanation().isDisplayed()).toBeFalsy();
        // see it does not appear if right answer
        q.answer({answer:true});
        expect(q.explanation().isDisplayed()).toBeFalsy();

        // again..
        components.homepage.startLesson(conf.showIffWrong);
        components.lesson.intro.startLesson();
        // see it does appear if wrong answer
        q.answer({answer:false});
        expect(q.explanation().isDisplayed()).toBeTruthy();

    });


    it('should always show in open question in quiz mode', function () {
        var q = components.questions.view.open;
        components.homepage.startLesson(conf.showOpenQuestionTestMode);
        components.lesson.intro.startLesson();
        components.questions.view.open.answer('foo');
        components.questions.view.open.submit();
        expect(q.explanation().isDisplayed()).toBeFalsy();

        components.homepage.startLesson(conf.showOpenQuestionQuizMode);
        components.lesson.intro.startLesson();
        components.questions.view.open.answer('foo');
        components.questions.view.open.submit();
        expect(q.explanation().isDisplayed()).toBeTruthy();

    });


});
