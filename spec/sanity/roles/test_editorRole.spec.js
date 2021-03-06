'use strict';

/**
* This test is for the "editor" role which is important role in the production environment.
*
* The role is described by Nava to have the following permissions:
*
* <pre>
* "permissions" : [
*     "lessons.userCanEdit",
*     "lessons.userCanCopy",
*     "lessons.userCanPublish",
*     "lessons.userCanSeePrivateLessons",
*     "lessons.userCanPreview",
*     "questions.userCanEdit",
*     "questions.userCanCopy",
*     "abuseReports.userCanRead",
*     "faqs.userCanCreate",
*     "faqs.userCanEdit"
* ],
* </pre>
*
* @type {exports}
*/

var components = require('components');
var logger = browser.getLogger('test_roles.spec');
//var logger = require('log4js').getLogger('test_roles.spec');

describe('editor role', function(){

    beforeEach(function(){ logger.info('running from ' + __filename); });

    beforeEach(function(){
        browser.get('/');
        browser.sleep(2000);
        components.loginPage.load().login( components.conf.roles.editorUser, components.conf.roles.editorPassword );
        browser.sleep(2000);
    });

    afterEach(function(){
        logger.info('logging out');
        components.layout.logout();
    });

    describe('navigation', function() {


        it('should see manage only specific navigation items', function (done) {
            expect(components.layout.getNavigationItem(components.layout.NAV_ITEMS.MANAGE_USERS)).not.toBePresent();
            expect(components.layout.getNavigationItem(components.layout.NAV_ITEMS.MANAGE_ROLES)).not.toBePresent();
            expect(components.layout.getNavigationItem(components.layout.NAV_ITEMS.MANAGE_LESSONS)).toBePresent();
            expect(components.layout.getNavigationItem(components.layout.NAV_ITEMS.MANAGE_ABUSE_REPORTS)).toBePresent();
            browser.sleep(100).then(done);


        });


        it('should see only specific tabs in management', function () {

            components.layout.goToManageLessons();
            expect(components.manage.getNavTab(components.manage.TAB.MANAGE_ABUSE_REPORTS)).toBePresent();
            expect(components.manage.getNavTab(components.manage.TAB.MANAGE_LESSONS)).toBePresent();
            expect(components.manage.getNavTab(components.manage.TAB.MANAGE_USERS)).not.toBePresent();
            expect(components.manage.getNavTab(components.manage.TAB.MANAGE_ROLES)).not.toBePresent();
        });
    });

    describe('allowed actions', function(){


        it('should not see delete lesson', function(){
            var indexPage = components.manage.lessons.index;
            components.layout.goToManageLessons();
            browser.sleep(1000).then(function(){
                expect(indexPage.getTableAction( indexPage.TABLE_ACTIONS.PUBLISH_LESSON)).toBePresent('should see publish lesson');
                expect(indexPage.getTableAction( indexPage.TABLE_ACTIONS.UNPUBLISH_LESSON)).toBePresent('should see unpublish lesson');
                expect(indexPage.getTableAction( indexPage.TABLE_ACTIONS.DELETE_LESSON)).not.toBePresent('should see delete lesson');
            });

        });


    });

    describe('faqs', function(){
        it('should be able to edit faqs', function(){
            var origLength = null;
            components.layout.footer.links.goTo( components.layout.footer.FOOTER_LINKS.ABOUT_LERGO );
            logger.info('going to FAQ section');
            components.about.goToSection( components.about.SECTIONS.FAQ );
            logger.info('editor should see add item');
            expect(components.about.faq.getAddFaqItem().isDisplayed()).toBe(true,'editor should see add item');
            browser.sleep(2000);
            logger.info('refreshing');
            browser.refresh();
            browser.sleep(2000);
            logger.info('refreshing');
            browser.refresh();
            logger.info('count original length');
            components.about.faq.getContents().count().then(function(count){
                origLength = count;
            });
            logger.info('add FAQ');
            components.about.faq.addFaq();
            logger.info('sleep for 2 sec');
            browser.sleep(2000);
            logger.info('set faq details');
            components.about.faq.setDetails({'question' : 'foo?' , 'answer' : 'bar', index:0});
            logger.info('sleep for another 2 sec');
            browser.sleep(2000);
            logger.info('refreshing');
            browser.refresh();

            logger.info('count again and assert new item added');
            components.about.faq.getContents().count().then(function(count){
                expect(count).toBe(origLength+1);
                logger.info('deleting items. count is ' + count);
                for ( var i = 0; i < count ; i++ ){ // remove all faq
                    components.about.faq.removeFaq(0);
                }
            });

        });


    });

});
