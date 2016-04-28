'use strict';

/**
 *
 * @type {exports}
 */

var components = require('components');
var logger = browser.getLogger('test_adminUserRoleFilter.spec');

describe('manage users', function(){

    beforeEach(function(){ logger.info('running from ' + __filename); });

    beforeEach(function(){
        browser.get('/');
        components.loginPage.load().login( components.conf.roles.adminUser, components.conf.roles.adminPassword );
        browser.sleep(2000);
    });

    afterEach(function(){
        components.layout.logout();
    });

    describe('role filter', function() {

        it('should filter users by role', function (done) {
            components.layout.goToManageUsers();
            components.filter.setRole('kitchen_sink_role');
            expect(components.manage.users.index.countUsers()).toEqual(1);
            components.filter.resetIfDisplayed();
            browser.sleep(1000).then(done);
        });

    });

});
