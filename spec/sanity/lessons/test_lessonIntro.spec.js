'use strict';

var logger = require('log4js').getLogger('preview');
var components = require('../../../source/components');

describe('lesson intro', function () {

    /**
     * This test expects
     *   1. lesson `lesson_with_edit_summary` to exist
     *   2. lesson should :
     *     2.a. be copied from another lesson
     *     2.b. have questions from other users
     *     2.c. have questions copied from other users
     *
     * it displayed that edit summary in intro contains the correct info
     */

    it('should give creadit to original lesson and question', function (done) {
        logger.info('starting testing preview lesson');
        browser.get('/');
        browser.sleep(1000);

        components.homepage.startLesson({'name': 'lesson_with_edit_summary'});

        components.lesson.intro.descriptionReadMore(true);
        components.lesson.intro.getEditSummaryText().then(function(text){
            expect(new RegExp('q_from_other_1\nQuestion created by lergotestadmin').test(text)).toBe(true, 'q_from_other_1 should have credit for lergotestadmin');
            expect(new RegExp('Copy of : q_to_copy_1\nCopied from q_to_copy_1 by lergotestadmin').test(text)).toBe(true, 'q_to_copy_1 should have creadit for lergotestadmin');
        });
        browser.sleep(1000);



        components.homepage.startLesson({'name' : 'Copy of : lesson_to_copy_1'});
        components.lesson.intro.descriptionReadMore(true);
        components.lesson.intro.getEditSummaryText().then(function(text){
            expect(new RegExp('Lesson was originally copied from lesson lesson_to_copy_1 by lergotestadmin').test(text)).toBe(true,'original lesson should have credit');
            expect(new RegExp('Question created by lergotestadmin').test(text)).toBe(true, 'questions from copied lesson should give credit to creator');
        });

        browser.sleep(1000).then(done);


    });



});
