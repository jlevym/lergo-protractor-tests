'use strict';
exports.loginPage = require('./LoginPage');
exports.layout = require('./Layout');
exports.homepage = require('./Homepage');
exports.lessonIntro = require('./LessonIntro');
exports.lessonView = require('./lessonView');
exports.lessonEdit = require('./lessonEdit');
exports.mySection = require('./MySection');
exports.lessonReport = require('./LessonReport');
exports.conf = require('./Conf');
exports.questions=require('./questions');
exports.aboutLergo = require('./AboutLergo');

/*******************************************************************
 *
 *              Additions over protractor
 *
 *******************************************************************/


global.selectOptionByText = function(selectElement, optionText) {
    return selectElement.element(by.cssContainingText('option',optionText)).click();
};

global.selectOptionByIndex = function(selectElement, optionIndex){
    return selectElement.all(by.css('option'))
        .then(function (options) {
            return options[optionIndex].click();
        });
};

global.$m = function( model ){
    return element( by.model(model) );
};

global.$r = function( repeater ){
    return element.all(by.repeater(repeater));
};

global.$click = function( click ){
    return $('[ng-click="' + click + '"]');
};

global.enter = function( element ){
    if ( !element ) {
        return browser.actions().sendKeys(protractor.Key.ENTER).perform();
    }else{
        return element.sendKeys(protractor.Key.ENTER);
    }
};

global.LERGO_LANGUAGES = {
    'english' : { 'label' : 'English','id' : 'en'}
};

global.LERGO_SUBJECT = {
    'math' : { 'label' : 'Math','id' : 'math'}
};