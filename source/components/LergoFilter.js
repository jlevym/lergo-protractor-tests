'use strict';

var logger = browser.getLogger('LergoFilter.js');

/**
 *
 * @typedef {string} FILTER_LANGUAGE
 */
exports.FILTER_LANGUAGES = {
    ENGLISH: 'english',
    RUSSIAN: 'russian'
};

/**
 *
 * @typedef {string} FILTER_SUBJECTS
 */
exports.FILTER_SUBJECTS = {
    MATH: 'math'
};

exports.filterFields = {
    age: {
        min :  $('[lergo-filter] [min="1"][ng-model="ageFilter.min"]'),
        max: $('[lergo-filter] [min="1"][ng-model="ageFilter.max"]')
    },
    limitedAge:{
        min: $('[lergo-filter] .limited-age [ng-model="ageFilter.min"]'),
        max: $('[lergo-filter] .limited-age [ng-model="ageFilter.max"]')
    },
    role: $('[lergo-filter] [ng-model="role"]'),
    language: $('[lergo-filter] [ng-options*="languages track by"][ng-model="filterLanguage"]'),
    subject: $('[lergo-filter] [ng-options*="subjects track by"][ng-model="model.subject"]'),
    text: $('[lergo-filter] [ng-model="model.searchText"]'),
    limitedSubject: $('[lergo-filter] [ng-options*="limitedSubjects"]'),
    limitedLanguage: $('[lergo-filter] [ng-options*="limitedLanguages"]')
};

function setFieldValue( value , field ){
    field.clear();
    if ( value ){
        field.sendKeys( value );
    }
}

function setTypeaheadValue( value, field ){
    setFieldValue(value, field);
    browser.actions().sendKeys(protractor.Key.ENTER).perform();

}

function setSelectValue( value, field ){
    selectOptionByValue(field, value);
}


function getFieldValue( field ){
    return field.getAttribute('value');
}


/**
 * @typedef {object} WebElement
 * @description a protractor element. read api at: http://angular.github.io/protractor/#/api?view=ElementFinder
 */

/**
 * @typedef {object} MinMaxFilterFieldValue
 * @property {*} min
 * @property {*} max
 */

/**
 * @typedef {object} MinMaxFilterField
 * @property {WebElement} min
 * @property {WebElement} max
 */

/**
 *
 * @param {MinMaxFilterFieldValue} value
 * @param {MinMaxFilterField} field
 */
function setMinMaxValues( value, field ){
    setFieldValue( value.min, field.min );
    setFieldValue( value.max, field.max );

}

function getMinMaxValues( field ){
    var result = {};
    logger.info('getting min max values', field);
    return getFieldValue(field.min).then(function(value){
        result.min = value;
        return getFieldValue(field.max).then(function(value){
            result.max = value;
            return result;
        });
    });
}

/**
 *
 * @param {object} value
 * @param {number} value.min
 * @param {number} value.max
 */
exports.setAge = function( value ){
     setMinMaxValues( value, exports.filterFields.age  );
};

exports.getAge = function(){
    return getMinMaxValues( exports.filterFields.age );
};

exports.setLimitedAge = function(value){
    setMinMaxValues(value, exports.filterFields.limitedAge);
};

exports.getLimitedAge = function(){
    return getMinMaxValues(exports.filterFields.limitedAge);
};

/**
 *
 * @param {FILTER_SUBJECTS} value
 */
exports.setSubject = function( value ){
    setSelectValue( value, exports.filterFields.subject );
};

exports.getSubject = function(){
    return getSelectValue(exports.filterFields.subject);
};

exports.setText = function(value){
    setFieldValue( value, exports.filterFields.text);
};

exports.setLanguage = function( value ){
    setSelectValue(value, exports.filterFields.language);
};

exports.getLanguage = function(){
    return getSelectValue(exports.filterFields.language);
};


exports.setRole = function(value){
    setTypeaheadValue(value, exports.filterFields.role);
};

exports.reset =  $('[lergo-filter] [lergo-reset-filter]');

exports.resetIfDisplayed = function(){
    exports.reset.isDisplayed().then(function(displayed){
        if ( displayed){
            exports.reset.click();
        }
    });
};



