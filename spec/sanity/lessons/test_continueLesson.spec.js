'use strict';

var logger = browser.getLogger('continueLesson.spec');
var components = require('components');
var _ = require('lodash');
//
describe('lergo continue lesson', function () {

    beforeEach(function(){ logger.info('running from ' + __filename); });

    /**
     *
     *
     *
     * This test expects a public lesson named "test-continueWithShuffle"
     *
     * It should have 5 true/false questions with shuffle enabled.
     * It will:
     *    1. Log in as user X
     *    2. Search the lesson on homepage - expects only 1
     *    3. Start the lesson
     *    4. Do one question (Q1)
     *    5. Go to reports
     *    6. See that lesson is incomplete and "continue" option is available
     *    7. Continue the lesson
     *    8. Make sure Q1 does not repeat itself
     *
     */
    it('should continue lesson', function (done) {

        //browser.ignoresynchronisation = true;
        logger.info('starting test');
        browser.get('/');


        // 1. login as user X
        components.loginPage.load().login(components.conf.continueLesson.username, components.conf.continueLesson.password);
        // 2. search lesson on homepage
        components.homepage.startLesson({'name': 'test_continue_lesson'});
        browser.sleep(1000);

        components.lesson.view.questions.trueFalse.answer({answer: true});


        components.layout.goToMySection();
        components.mySection.goToMyReports();
        components.mySection.reports.seeLessonsDoneByMe();
        components.mySection.reports.goToFirstReport();

        components.lessonReport.getIdFromUrl().then(function (_reportId) {
            components.conf.reportId = _reportId;

        });
        components.lessonReport.continueLesson();

        components.lesson.view.questions.trueFalse.answer({answer: false});
        components.lesson.view.nextQuestion();
        components.lesson.view.questions.trueFalse.answer({answer: true});
        components.lesson.view.questions.trueFalse.answer({answer: true});
        components.lesson.view.questions.trueFalse.answer({answer: true});

        components.lesson.view.nextStep();
        components.lesson.view.showReport();

        components.lessonReport.get(components.conf).then(function (report) {
            expect(_.filter(report.answers, {'checkAnswer': {'correct': true}}).length).toBe(4,'there should be 4 correct answers');
            expect(_.filter(report.answers, {'checkAnswer': {'correct': false}}).length).toBe(1, 'there should be 1 wrong answer');

        });

        components.layout.logout();
        browser.sleep(1000).then(done);

    });

});
