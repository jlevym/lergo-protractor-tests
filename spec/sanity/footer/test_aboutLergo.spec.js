'use strict';

var components = require('components');
var logger = browser.getLogger('footer#test_about.js');

describe('about lergo', function(){

    beforeEach(function(){ logger.info('running from ' + __filename); });

    it('it should not prompt for unsaved changes LERGO-608', function( done ){
        components.loginPage.load();
        components.layout.footer.links.goTo( components.layout.footer.FOOTER_LINKS.ABOUT_LERGO );
        components.about.getSections().count().then(function( count ){


                function clickOnSectionByIndex(i){
                    components.about.getSections().then(function( sections ){
                        logger.debug('visiting about lergo section',i);
                        sections[i].click();
                        browser.sleep(1000);

                    });
                }

                for ( var i = 0; i < count; i++){
                    clickOnSectionByIndex(i);
                }
            });
        browser.sleep(1000).then(done);
    });
});
