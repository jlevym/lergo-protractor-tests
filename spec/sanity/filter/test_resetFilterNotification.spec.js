'use strict';

var components = require('../../../source/components');
var logger = browser.getLogger('filter#test_resetFilter');

describe('filter reset notifications', function(){

    beforeEach(function(){ logger.info('running from ' + __filename); });

    it('should display notification in manage lessons', function(done){
        browser.get('/');
        var opts = components.conf.resetFilterNotification;
        components.loginPage.load().login( opts.username, opts.password  );
        components.layout.goToUserSection();
        components.mySection.goToMyLessons();
        expect(components.mySection.lessons.filterIsActiveNotification.rootElement.isDisplayed()).toBeFalsy();
        components.filter.setText('foo');
        expect(components.mySection.lessons.filterIsActiveNotification.rootElement.isDisplayed()).toBeTruthy();
        components.mySection.lessons.filterIsActiveNotification.resetFilter();
        expect(components.mySection.lessons.filterIsActiveNotification.rootElement.isDisplayed()).toBeFalsy();
        components.filter.setText('foo');
        expect(components.mySection.lessons.filterIsActiveNotification.rootElement.isDisplayed()).toBeTruthy();
        components.mySection.lessons.filterIsActiveNotification.hideNotification();
        expect(components.mySection.lessons.filterIsActiveNotification.rootElement.isDisplayed()).toBeFalsy();
        browser.refresh();
        expect(components.mySection.lessons.filterIsActiveNotification.rootElement.isDisplayed()).toBeTruthy();

        browser.sleep(1000).then(done);
    });

    //it('it remove all values except for language and refresh page', function( done ){
    //    browser.sleep(1000).then(done);
    //});
});
