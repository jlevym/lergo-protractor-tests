'use strict';

var components = require('../../../source/components');
var logger = browser.getLogger('filter#test_resetFilter');

describe('filter reset', function(){

    beforeEach(function(){ logger.info('running from ' + __filename); });

    it('should set website language as default', function(done){
        components.homepage.route();
        browser.executeScript('window.sessionStorage.clear();');
        browser.executeScript('window.localStorage.clear();');
        components.homepage.route();
        expect(components.filter.filterFields.language.$('option:checked').getText()).not.toBe('');
        browser.sleep(1000).then(done);
    });

    it('it remove all values except for language and refresh page', function( done ){
        components.homepage.route();

        var language = components.filter.FILTER_LANGUAGES.RUSSIAN;
        components.filter.setLanguage( language );

        components.filter.setAge({ min : 6, max : 20 } );
        expect(components.filter.filterFields.age.min.getAttribute('value')).toBe('6');
        expect(components.filter.filterFields.age.max.getAttribute('value')).toBe('20');
        expect(components.filter.filterFields.language.$('option:checked').getText()).toBe(language);

        components.filter.reset();
        expect(components.filter.filterFields.age.min.getAttribute('value')).toBe('');
        expect(components.filter.filterFields.age.max.getAttribute('value')).toBe('');
        expect(components.filter.filterFields.language.$('option:checked').getText()).toBe(language);


        // now lets see it refreshes the page by counting the lessons
        components.filter.setAge({ min : 90, max : 100 } ); // no lesson should be in this age.
        components.filter.setLanguage( components.filter.FILTER_LANGUAGES.ENGLISH );

        var lessonsCount = 0; // some initialization
        components.homepage.getLessons().count().then(function(c){ // lets keep the value just in case I was wrong
            lessonsCount = c;
        });
        components.filter.reset();
        expect(components.homepage.getLessons().count()).not.toBe(lessonsCount); // it should be different..


        browser.sleep(1000).then(done);
    });
});
