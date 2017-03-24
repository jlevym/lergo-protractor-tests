'use strict';

var components = require('components');
var flows = require('flows');
var logger = browser.getLogger('test_multichoice.spec');

describe('multichoice', function(){

    beforeEach(function(){ logger.info('running from ' + __filename); });

    it('should disable shuffling', function( done ){
        browser.get('/');
        components.loginPage.load().login( components.conf.multichoice.username, components.conf.multichoice.password );

        components.layout.goToUserSection();
        components.mySection.goToMyQuestions();
        components.mySection.questions.createNewQuestion();
        var editor = components.questions.editor.getByType(LERGO_QUESTION_TYPE.multichoice);

        var quizItemDetails = {
            'question' : 'my question test',
            'helpText' : 'help text test',
            options: [
                { value : 'option 1', checked: true} ,
                { value: 'option 2' },
                { value: 'option 3' },
                { value: 'option 4' }
            ]
        };
        // using disableShuffle: true failed in the jasmine 2.0 upgrade and jeff
        // could not find a solution so implemented the element(by.model) method below
        editor.setDetails( quizItemDetails );
        element(by.model('quizItem.shuffleDisabled')).click();

        editor.clickPreview();
        browser.sleep(100);
        var shuffled = false;
        var checkIfShuffled = function(options){
            console.log('options= ', options);
            shuffled = shuffled || options[0].value !== quizItemDetails.options[0].value;
            //if ( shuffled ){
            //    logger.trace('options[0].value', options[0].value);
            //    logger.trace('quizItemDetails.options[0].value', quizItemDetails.options[0].value);
            //}
        };

        var viewer = components.questions.view.getByType(LERGO_QUESTION_TYPE.multichoice);
        for ( var i = 0; i < 10 ; i ++ ){
            viewer.getOptions().then(checkIfShuffled);
            browser.refresh();
            //browser.sleep(1000);

        }

        browser.controlFlow().execute(function(){
            logger.trace('checking if shuffled = false');
            expect(shuffled).toBe(false , 'the options should not shuffle');
        });
        browser.sleep(1000);

        components.layout.logout();
        browser.sleep(1000).then(done);

    });

    /**
     * expects:
     *  - user
     *  - lesson named "disable_multichoice" in my private section with single quiz step without retry
     *  - one question of type multichoice with option1 as answer and option2 available
     *  - one question of type multichoice with option1 and option2 as answers, and option3 available
     */
    it('should disable controls once there is an answer', function( done ){
        //browser.get('/#!/public/lessons/invitations/56344cf8ae82354414addbe5/display?lessonId=56334026ae82354414addbb7&lergoLanguage=en&reportId=56344cf8ae82354414addbe6&currentStepIndex=0');

        flows.loginAndStartLesson({
            username: components.conf.multichoice.username,
            password: components.conf.multichoice.password,
            lesson:{'name' : 'disable_multichoice'}
        });

        components.questions.view.multichoice.answer({'option2':true});
        //components.questions.view.multichoice.answer({'option1':true});
        expect(components.questions.view.multichoice.getOption({label:'option1'}).$('input').isEnabled()).toBe(false,'option 1 should be disabled in singlechoice');
        components.lesson.view.nextQuestion();
        // now second question with option1 and option2, but not option3
        components.questions.view.multichoice.answer({'option3':true});
        components.questions.view.submit();
        expect(components.questions.view.multichoice.getOption({label:'option1'}).$('input').isEnabled()).toBe(false,'option 1 should be disabled in multichoice');
        components.layout.logout();
        browser.sleep(1000).then(done);

    });
});
