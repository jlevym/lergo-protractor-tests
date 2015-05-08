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

/*******************************************************************
 *
 *              Additions over protractor
 *
 *******************************************************************/


global.selectOptionByText = function(selectElement, optionText) {
    selectElement.click();
    return selectElement.all(by.css('option'))
        .filter(function (option) {
            return option.getText().then(function (text) {
                return text === optionText;
            });
        }).click();
};

global.$m = function( model ){
    return element( by.model(model) );
};

global.$r = function( repeater ){
    return element.all(by.repeater(repeater));
};

global.enter = function( element ){
    if ( !element ) {
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
    }else{
        element.sendKeys(protractor.Key.ENTER);
    }
};