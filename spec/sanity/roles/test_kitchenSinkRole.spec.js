'use strict';

var components = require('components');
var logger = browser.getLogger('test_kitchenSinkRole.spec');
//var logger = require('log4js').getLogger('test_roles.spec');

describe('kitchen sink role', function(){

    beforeEach(function(){ logger.info('running from ' + __filename); });

    beforeEach(function(){
        browser.get('/');
        components.loginPage.load().login( components.conf.roles.kitchenSinkUser, components.conf.roles.kitchenSinkUser );
        browser.sleep(2000);
    });

    afterEach(function(){
        logger.info('logging out');
        components.layout.logout();
    });

    describe('navigation', function() {


        it('should see kitchen sink link', function (done) {
            components.layout.footer.links.goTo( components.layout.footer.FOOTER_LINKS.KITCHEN_SINK ); // no need to assert anything.
            browser.sleep(100).then(done);

        });
    });

});
