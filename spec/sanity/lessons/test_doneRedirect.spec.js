'use strict';
/**
 *
 * expects an admin user
 *
 * also, implicit expectation, that all lessons with string 'disable' will belong to an other user.
 *
 **/


var logger = browser.getLogger('test_doneRedirect.spec.js');
var components = require('../../../source/components');


describe('update lesson', function () {

    beforeEach(function () { logger.info('running from ' + __filename); });

    beforeEach(function(){
        components.loginPage.load().login(components.conf.doneRedirect.username, components.conf.doneRedirect.password);
        browser.executeScript('window.sessionStorage.clear();');
        browser.executeScript('window.localStorage.clear();');
    });

    afterEach(function(){
        components.layout.logout();
    });

    it('should show users that their lesson is saved and enable them to "not show it again"', function(){
        components.layout.goToLessons();
        components.mySection.lessons.goToLesson({ index : 0});
        components.lesson.intro.editLesson();
        components.lesson.editor.clickDone();
        browser.sleep(1000); // fade in
        var dialog = components.lesson.editor.lessonIsSavedDialog;
        expect(dialog.element.isDisplayed()).toBe(true);
        dialog.dontShowAgain.click();

        // see that message does not appear again
        components.layout.goToLessons();
        components.mySection.lessons.goToLesson({ index : 0});
        components.lesson.intro.editLesson();
        components.lesson.editor.clickDone();
        components.mySection.lessons.goToLesson({ index : 0}); // if this works, it means we got back to my lessons..
    });



    it('should redirect differently for admin/user cases', function () {
        components.createLesson.click();
        components.lesson.editor.setDetails({name:'lesson_' + new Date().getTime()});
        components.lesson.editor.clickDoneAndGotIt();
        expect(browser.getCurrentUrl()).toContain('/user/create', 'from create button we should return to user-->lessons');

        // should return to user section after edit
        components.mySection.lessons.goToLesson({ index : 0});
        components.lesson.intro.editLesson();

        components.lesson.editor.clickDoneAndGotIt();
        expect(browser.getCurrentUrl()).toContain('/user/create', 'from my section should return to my section');
        //
        //should return to admin section if edited someone else lesson
        components.layout.goToManageLessons();
        components.manage.lessons.index.filterLessons({ 'searchText' : 'disable'});
        components.manage.lessons.index.goToLesson({index:0});
        components.lesson.intro.editLesson();
        components.lesson.editor.clickDoneAndGotIt();
        expect(browser.getCurrentUrl()).toContain('/admin/homepage', 'for admin should redirect to admin section');
        browser.sleep(1000);
    });
});
