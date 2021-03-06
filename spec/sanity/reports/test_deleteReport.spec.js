'use strict';


var logger = browser.getLogger('delete_report');
var components = require('components');
var _ = require('lodash');

describe('delete reports', function(){

    beforeEach(function(){ logger.info('running from ' + __filename); });
    /**
     * This test expects
     *   1. a user X
     *   2. lesson named 'lesson_with_edit_summary' with 1 quiz step and 2 True/False questions with True as answer

     * the tests runs through the lesson, then goes to delete the report
     */

    it('should be able to delete report', function( done ){
        logger.info('starting delete report');
        browser.get('/');
        //browser.sleep(1000);
        components.loginPage.load().login( components.conf.deleteReport.username, components.conf.deleteReport.password );
        components.homepage.startLesson({'name' : 'lesson_with_edit_summary'});
        components.lesson.view.questions.trueFalse.answer({ answer : true });
        components.lesson.view.questions.trueFalse.answer({ answer : true });
        components.lesson.view.nextStep();

        components.lesson.view.showReport(); // just make sure we have a report..

        // run the lesson again to get a second one for comparison - jeff
        browser.sleep(3000);
        components.homepage.startLesson({'name' : 'lesson_with_edit_summary'});
        components.lesson.view.questions.trueFalse.answer({ answer : true });
        components.lesson.view.questions.trueFalse.answer({ answer : true });
        components.lesson.view.nextStep();

        components.lesson.view.showReport(); // just make sure we have 2 reports..


        components.layout.goToMySection();
        components.mySection.goToMyReports();

        components.mySection.reports.seeLessonsDoneByMe();
        browser.sleep(3000);

        var firstReport = null;
        components.mySection.reports.tableToJson().then(function(result){
            firstReport = _.first(result);
        });

        components.mySection.reports.selectFirstReport();
        browser.sleep(3000);



        components.mySection.reports.getTableAction( components.mySection.reports.TABLE_ACTIONS.DELETE_REPORT).click();
        browser.sleep(3000);
        browser.switchTo().alert().accept();
        browser.sleep(3000);

        components.mySection.reports.tableToJson().then(function(result){
            var takenAt = components.mySection.reports.TABLE_COLUMN.TAKEN_AT;
            console.log('this is first report',_.first(result)[takenAt],firstReport[takenAt]);
            expect(_.first(result)[takenAt]).not.toBe(firstReport[takenAt],' should have deleted first report ');
        });

        // realstaging; delete the second report to keep everything tidy!

        components.mySection.reports.selectFirstReport();
        browser.sleep(3000);

        components.mySection.reports.getTableAction( components.mySection.reports.TABLE_ACTIONS.DELETE_REPORT).click();
        browser.sleep(3000);
        browser.switchTo().alert().accept();
        browser.sleep(3000);


        components.layout.logout().then(done);
        browser.sleep(1000);
    });

});
