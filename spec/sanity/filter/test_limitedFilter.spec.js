'use strict';

var components = require('components');
var logger = browser.getLogger('filter#test_limitedFilter');

describe('filter reset', function(){

    beforeEach(function(){ logger.info('running from ' + __filename); });



    it('should be configurable from role panel', function(done){
        // log in as admin
        components.loginPage.load().login(components.conf.availableUsers.admin);
        components.layout.goToManageRoles();
        components.manage.roles.index.createNewRole();
        components.manage.roles.edit.setAgeLimitation('3','8');
        components.manage.roles.edit.restrictToUnpublishedContent(true);
        components.manage.roles.edit.selectLanguageLimitations({'english':true,'hebrew':true});
        components.manage.roles.edit.selectSubjectLimitations({'math':true,'english':true});
        // assign limitations on role

        browser.sleep(2000);
        components.layout.logout();
        browser.sleep(2000).then(done);

    });


    describe('limited editor', function(){
        beforeEach(function(){
            components.loginPage.load().login(components.conf.availableUsers.limitedEditor);
            components.filter.resetIfDisplayed();
        });

        afterEach(function(){
            components.layout.logout();
        });

        it('should limit user filtering options', function(done){
            // log in as limited role
            components.layout.goToManageLessons();
            expect(countSelectOptions(components.filter.filterFields.limitedLanguage)).toBe(1,'there should be only 2 languages');
            expect(countSelectOptions(components.filter.filterFields.limitedSubject)).toBe(2,'there should be only 2 subjects');
            browser.sleep(2000).then(done);
            // see you have limited subjects, language and age
        });

        it('should default filter to limited options - subjects ', function(){
            // given a user that is limited to manage subject A
            // filter lessons to subject B
            // and go to manage lessons to see it resets to subject A
            components.filter.setSubject('literature');
            components.layout.goToManageLessons();
            expect(components.filter.getSubject()).toBe('english');
        });

        it('should default filter to limited options - languages', function(){
            // given a user that is limited to manage language A
            // filter lessons to language B
            // and go to manage lessons to see it resets to language A
            components.filter.setLanguage('hebrew');
            components.layout.goToManageLessons();
            expect(components.filter.getLanguage()).toBe('english');
        });

        it('should not show publish/unpublish and delete actions', function(done){
            // restrict
            var indexPage = components.manage.lessons.index;
            components.layout.goToManageLessons();
            expect(indexPage.table.getCaretElement().isDisplayed()).toBeFalsy('should not see table actions');
            browser.sleep(1000).then(done);
        });

        it('should not show published lessons', function(done){
            components.layout.goToManageLessons();
            components.filter.setText('test_continue_lesson');
            browser.sleep(1000);
            expect(components.manage.lessons.index.countLessons()).toBe(0);
            components.filter.setText('');
            browser.sleep(1000).then(done);
        });

        it('should default filter to limited values - age', function(done){
            components.layout.goToManageLessons();
            components.filter.getLimitedAge().then(function(age){
                expect(age.min).toBe('5');
                expect(age.max).toBe('10');
            });
            browser.sleep(1000).then(done);
        });

    });




});
