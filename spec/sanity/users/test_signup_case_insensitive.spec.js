'use strict';

var components = require('components');
var logger = browser.getLogger('test_signup_case_insensitive.spec');

describe('user signup', function(){
    beforeEach(function(){ logger.info('running from ' + __filename); });
    // assume user exists
    it('should declare user exist in case insensitive manner', function( done ){

        components.signupPage.route();

        components.signupPage.details = {
            username : 'lergoTEST',
            password: 'lergotest',
            confirmPassword: 'lergotest',
            email : 'lergotest123456@yopmail.com',
            confirmEmail: 'lergotest123456@yopmail.com',
            fullName: 'lergotest'
        };

        components.signupPage.submit();

        expect(components.signupPage.errorMessage).toContain('already exists'.toUpperCase());

        browser.sleep(4000).then(done);
    });
});
