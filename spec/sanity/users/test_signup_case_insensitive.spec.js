'use strict';

var components = require('components');

describe('user signup', function(){

    // assume user exists
    it('should declare user exist in case insensitive manner', function( done ){

        components.signupPage.route();

        components.signupPage.details = {
            username : 'lergoTEST',
            password: 'lergotest',
            confirmPassword: 'lergotest',
            email : 'lergotest123456@yopmail.com',
            fullName: 'lergotest'
        };

        components.signupPage.submit();

        expect(components.signupPage.errorMessage).toContain('already exists'.toUpperCase());

        browser.sleep(1000).then(done);
    });
});
