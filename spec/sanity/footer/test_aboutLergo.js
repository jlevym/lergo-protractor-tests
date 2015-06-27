'use strict';

var components = require('../../../source/components');
var logger = require('log4js').getLogger('footer#test_aboutLergo.js');

describe('about lergo', function(){
    it('it should not prompt for unsaved changes LERGO-608', function( done ){
        components.loginPage.load();
        components.layout.footer.links.goTo('about lergo');
        components.aboutLergo.getSections().count().then(function( count ){


                function clickOnSectionByIndex(i){
                    components.aboutLergo.getSections().then(function( sections ){
                        logger.debug('visiting about lergo section',i);
                        sections[i].click();
                        browser.sleep(1000);

                    });
                }

                for ( var i = 0; i < count; i++){
                    clickOnSectionByIndex(i);
                }
            });
        browser.sleep(1000).then(function(){ done(); });
    });
});