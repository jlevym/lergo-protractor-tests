'use strict';

var _ = require('lodash');
exports.lessonIsSavedDialog = require('./LessonIsSavedDialog');

exports.setDetails = function( details ){
    _.each(details, function(value,key){
        var setter = 'set' + _.capitalize(key);
        if ( exports.hasOwnProperty( setter )){
            exports[setter](value);
        }
    });
};

exports.setName = function( name ){
    return element(by.model('lesson.name')).sendKeys(name);

    //element(by.model('lesson.subject')).sendKeys('test lesson description');
    //element(by.model('lesson.age')).sendKeys('test lesson description');
    //element(by.model('lesson.tags')).sendKeys('test lesson description');
};

exports.setDescription = function(description){
    return element(by.model('lesson.description')).sendKeys(description);
};

exports.setLanguage = function( language ){
    return selectOptionByText($m('lesson.language'), language );
};


exports.setAge = function( age ){
    return $m('lesson.age').sendKeys(age);
};

exports.setSubject = function( subject ){
    return selectOptionByText($m('lesson.subject'), subject);
};

exports.setTags = function( tag ){
    $m('newTag').sendKeys(tag);
    return enter();
};

exports.clickDone = function(){
    return $click('done()').click();
};

exports.clickDoneAndGotIt = function(){
    exports.clickDone();
    return exports.lessonIsSavedDialog.clickOkGotIt();
};

/**
 *
 * @param {object} opts
 * @param {string} opts.name - the name of the question
 */
exports.clickQuestionInStep = function(opts){
    if ( opts && opts.name ){
        $$('[ng-repeat="item in step.quizItems"] a[ng-click="openUpdateQuestion(step,item)"]').filter(function(item){
            return item.getText().then(function(text){
                return text.toLowerCase() === opts.name.toLowerCase();
            });
        }).first().click();
    }
    return browser.sleep(3000); // dialog is opening
};
