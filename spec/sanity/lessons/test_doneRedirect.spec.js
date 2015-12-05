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

    it('should redirect differently for admin/user cases', function () {
        browser.get('/');


        components.loginPage.load().login(components.conf.doneRedirect.username, components.conf.doneRedirect.password);
        components.createLesson.click();
        components.lesson.editor.setDetails({name:'lesson_' + new Date().getTime()});
        components.lesson.editor.clickDone();
        expect(browser.getCurrentUrl()).toContain('/user/create', 'from create button we should return to user-->lessons');

        // should return to user section after edit
        components.mySection.lessons.goToLesson({ index : 0});
        components.lesson.intro.editLesson();
        components.lesson.editor.clickDone();
        expect(browser.getCurrentUrl()).toContain('/user/create', 'from my section should return to my section');

        // should return to admin section if edited someone else lesson
        components.layout.goToManageLessons();
        components.manage.lessons.index.filterLessons({ 'searchText' : 'disable'});
        components.manage.lessons.index.goToLesson({index:0});
        components.lesson.intro.editLesson();
        components.lesson.editor.clickDone();
        expect(browser.getCurrentUrl()).toContain('/admin/homepage', 'for admin should redirect to admin section');

        components.layout.logout();
        browser.sleep(1000);
    });
});
