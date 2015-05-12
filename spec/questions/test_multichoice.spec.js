'use strict';

var components = require('../../source/components');
var logger = require('log4js').getLogger('test_multichoice.spec');

describe('multichoice', function(){
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
            ],
            disableShuffle: true
        };

        editor.setDetails( quizItemDetails );


        editor.clickPreview();
        //browser.sleep(100);
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

        components.layout.logout().then(done);


    });
});