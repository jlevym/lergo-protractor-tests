'use strict';


var logger = browser.getLogger('quizTestMode');
var components = require('components');
//var _ = require('lodash');

describe('test mode vs. quiz mode', function(){

    beforeEach(function(){ logger.info('running from ' + __filename); });


    it('test mode goes automatically to next question, quiz mode only if answer is correct', function( done ){
        logger.info('starting testing preview lesson');
        browser.get('/');
        browser.sleep(1000);
        components.homepage.startLesson({'name' : 'my_test'});
        expect(components.lesson.view.questions.trueFalse.getQuestion()).toBe('question_1');
        components.lesson.view.questions.trueFalse.answer({answer: false});
        expect(components.lesson.view.questions.trueFalse.getQuestion()).toBe('question_2');
        components.lesson.view.questions.trueFalse.answer({answer: true});
        expect(components.lesson.view.questions.trueFalse.getQuestion()).toBe('question_3');

        // now lets
        browser.get('/');
        browser.sleep(1000);
        components.homepage.startLesson({'name' : 'my_practice'});
        expect(components.lesson.view.questions.trueFalse.getQuestion()).toBe('question_1');
        components.lesson.view.questions.trueFalse.answer({answer: false});
        expect(components.lesson.view.questions.trueFalse.getQuestion()).toBe('question_1'); // should not go to next question
        components.lesson.view.questions.trueFalse.continue();
        expect(components.lesson.view.questions.trueFalse.getQuestion()).toBe('question_2');
        components.lesson.view.questions.trueFalse.answer({answer: true});
        expect(components.lesson.view.questions.trueFalse.getQuestion()).toBe('question_3');

        browser.sleep(1000).then(done);
    });



});
