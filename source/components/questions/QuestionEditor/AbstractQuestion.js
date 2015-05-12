'use strict';

var _ = require('lodash');

function AbstractQuestionEditor(){

}

AbstractQuestionEditor.prototype.setDetails = function( details ){
    this.setType();
    var me= this;
    var lastPromise = null;
    _.each( details, function(value, key){
        var setter = 'set' + _.capitalize(key);
        if ( !!me[setter]){
            lastPromise =  me[setter](value);
        }
    });
    return lastPromise;
};

AbstractQuestionEditor.prototype.setQuestion = function( question ){
    console.log('setting question');
    return $m('quizItem.question').sendKeys(question);
};

AbstractQuestionEditor.prototype.setHelpText = function( helpText ){
    return $m('quizItem.helpText').sendKeys(helpText);
};

/**
 *
 * @param {LERGO_QUESTION_TYPE} questionType
 */
AbstractQuestionEditor.prototype.setType = function( questionType ){
    return selectOptionByText($m('quizItem.type'), questionType.label);

};


/**
 *
 * @param {LERGO_LANGUAGE} language
 */
AbstractQuestionEditor.prototype.setLanguage = function( language ){
    return selectOptionByText($m('quizItem.language'), language.label );
};

/**
 *
 * @param {LERGO_SUBJECT} subject
 */
AbstractQuestionEditor.prototype.setSubject = function( subject ){
    return selectOptionByText($m('quizItem.subject'), subject.label);
};

AbstractQuestionEditor.prototype.setFromAge = function( age ){
    return $m('quizItem.age').sendKeys(age);
};

AbstractQuestionEditor.prototype.clickPreview = function( ){
    return $('a.update-question-preview').click();
};


module.exports = AbstractQuestionEditor;