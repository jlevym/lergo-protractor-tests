'use strict';

var components = require('components');
var logger = browser.getLogger('filter#test_resetFilter');
var _ = require('lodash');

describe('filter reset notifications', function(){

    beforeEach(function(){
        logger.info('running from ' + __filename);
        var opts = components.conf.resetFilterNotification;
        components.loginPage.load().login( opts.username, opts.password  );
    });

    afterEach(function(){
        components.layout.logout();
    });

    it('should display notification in manage lessons', function(done){
        browser.get('/');

        components.layout.goToUserSection();
        components.mySection.goToMyLessons();
        expect(components.mySection.lessons.filterIsActiveNotification.displayElement.isDisplayed()).toBeFalsy('should not display on first load');
        components.filter.setText('foo');
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        expect(components.mySection.lessons.filterIsActiveNotification.displayElement.isDisplayed()).toBeTruthy('should display due to text');
        components.mySection.lessons.filterIsActiveNotification.resetFilter();
        expect(components.mySection.lessons.filterIsActiveNotification.displayElement.isDisplayed()).toBeFalsy('should not display after reset');
        components.filter.setText('foo');
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        expect(components.mySection.lessons.filterIsActiveNotification.displayElement.isDisplayed()).toBeTruthy('should display again due to text 2');
        components.mySection.lessons.filterIsActiveNotification.hideNotification();
        expect(components.mySection.lessons.filterIsActiveNotification.displayElement.isDisplayed()).toBeFalsy('should not display due to hide click');
        browser.refresh();
        expect(components.mySection.lessons.filterIsActiveNotification.displayElement.isDisplayed()).toBeTruthy('should display after refresh');
        browser.sleep(1000).then(done);
    });

    it('should display in all pages', function(){
        _.each(
            [
                { url : '/#!/user/create/lessons', page: components.mySection.lessons },
                { url : '/#!/user/create/questions', page: components.mySection.questions },
                { url : '/#!/user/create/reports', page: components.mySection.reports },
                { url : '/#!/user/create/invites', page: components.mySection.invites }

            ],
            function( location ){
                console.log('testing ', location);
                browser.get(location.url);
                logger.info('testing :: ' + location.url);
                browser.sleep(1000);
                components.filter.setSubject(components.filter.FILTER_SUBJECTS.MATH);
                expect(location.page.filterIsActiveNotification.rootElement.isDisplayed()).toBeTruthy();

            }
        );
    });

    //it('it remove all values except for language and refresh page', function( done ){
    //    browser.sleep(1000).then(done);
    //});
});
