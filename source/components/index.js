'use strict';

/*******************************************************************
 *
 *              Additions over protractor
 *
 *******************************************************************/

var logger = require('log4js').getLogger('index');


global.selectOptionByText = function(selectElement, optionText) {
    return selectElement.element(by.cssContainingText('option',optionText)).click();
};

/**
 *
 * @param inputs the return value of element.all to get all checkbox inputs
 * @param values a map between the element.getText value and the desired outcome (true == checked, false == unchecked)
 *        non existence is ignored.
 */
global.checkboxesByLabel = function( inputs, values ){
    inputs.each(function(item){
        return item.getText().then(function(text){
            var label = text.toLowerCase().trim();
            if ( values.hasOwnProperty(label) ){
                var checked = values[label];
                item.element(by.css('input')).isSelected().then(function( selected ){
                    if ( selected !== checked ){
                        item.element(by.css('input')).click();
                    }
                });
            }
        });
    });
};

logger.info('adding locator text');

by.addLocator('text',

    /**
     *
     * @param text - will be lowercased
     * @param selector - to get list of children
     * @param parent - protractor will provide this..
     */
    function(text, selector, _parent) {
        return Array.prototype.filter.call( (_parent || document).querySelectorAll(selector), function(e){

            return e &&  !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length) && e.textContent && e.textContent.toLowerCase().trim() === text.toLowerCase().trim();
        });
    });

global.filterByText = function filterByText(text){
    return function filterByTextFilter(item){
        return item.getText().then(function( _text ){
            return _text.toLowerCase() === text.toLowerCase();
        });
    };

};

global.selectOptionByIndex = function(selectElement, optionIndex){
    return selectElement.$$('option').get(optionIndex).click();
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

global.$label = function(css, label, required ){
    return global.$label_gen(css)(label,required);
};

/**
 * generates a function that allows to get an item from a list of items by text
 * @param elements
 * @returns {Function}
 */
global.$label_gen = function (elements) {
    return function (label, required) {

        logger.info('finding element by label', label, required );
        if ( typeof(elements)==='string' ){ // support css selector as well
            elements = $$(elements);
        }
        var results = elements.filter(function (elem) {
            return elem.getText().then(function (text) {
                logger.info('testing ', text);
                var result = text.toLowerCase().trim() === label.toLowerCase().trim();
                //console.log('comparing',text,'to',label, 'result is',result);
                return result;
            });
        });

        if (!!required) {
            expect(results.count()).toBe(1,'expecting item [' + label + '] to exist and be single');
        }

        return results.first();
    };
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




exports.loginPage = require('./LoginPage');
exports.signupPage = require('./SignupPage');
exports.layout = require('./Layout');
exports.homepage = require('./Homepage');
exports.lesson = require('./lesson');
exports.mySection = require('./MySection');
exports.lessonReport = require('./lesson/LessonReport');
exports.conf = require('./Conf');
exports.questions=require('./questions');
exports.manage=require('./manage');
exports.about = require('./about');
