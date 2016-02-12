'use strict';

var components = require('components');
var flows = require('flows');
var logger = browser.getLogger('test_trueFalse.spec.js');


describe('trueFalse', function(){

    beforeEach(function(){ logger.info('running from ' + __filename); });

    /**
     * expects:
     *  - user
     *  - lesson named "disable_trueFalse" in my private section with single quiz step without retry
     *  - one question of type true-false with true as answer.
     */
    it('should disable controls once there is an answer', function( done ){
        //browser.get('/#!/public/lessons/invitations/56344cf8ae82354414addbe5/display?lessonId=56334026ae82354414addbb7&lergoLanguage=en&reportId=56344cf8ae82354414addbe6&currentStepIndex=0');
        flows.loginAndStartLesson({
            username: components.conf.trueFalse.username,
            password: components.conf.trueFalse.password,
            lesson: { name : 'disable_trueFalse'}
        });
        components.questions.view.trueFalse.answer({answer:false});
        expect(components.questions.view.trueFalse.getOption({label:'true'}).isEnabled()).toBe(false,'true should be disabled');
        components.layout.logout();
        browser.sleep(1000).then(done);
    });
});
