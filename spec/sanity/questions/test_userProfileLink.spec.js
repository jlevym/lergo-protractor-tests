'use strict';

var components = require('components');
var logger = browser.getLogger('test_userProfileLink.spec.js');



describe('question preview', function(){

    beforeEach(function(){ logger.info('running from ' + __filename); });

    it('should have a working profile link', function( done ){

        components.loginPage.load().login( components.conf.previewQuestion.username, components.conf.previewQuestion.password );

        components.layout.goToUserSection();
        components.mySection.goToMyQuestions();

        components.mySection.questions.goToQuestion({question: components.conf.previewQuestion.question});

        components.questions.view.getByType().getUserLink().click();

        components.mySection.profile.getUsername().then(function(text){
            expect(text).toBe(components.conf.previewQuestion.username );
        });

        components.layout.logout();
        browser.sleep(1000).then(done);
    });
});
