'use strict';


/**
 *
 * @typedef {string} FILTER_LANGUAGE
 */
exports.FILTER_LANGUAGES = {
    ENGLISH: 'English',
    RUSSIAN: 'Russian'
};

/**
 *
 * @typedef {string} FILTER_SUBJECTS
 */
exports.FILTER_SUBJECTS = {
    MATH: 'Math'
};

exports.filterFields = {
    age: {
        min :  $m('ageFilter.min'),
        max: $m('ageFilter.max')
    },
    role: $m('role'),
    language: $m('filterLanguage'),
    subject: $m('model.subject'),
    text: $m('model.searchText')
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
    field.element(by.cssContainingText('option', value )).click();
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
/**
 *
 * @param {object} value
 * @param {number} value.min
 * @param {number} value.max
 */
exports.setAge = function( value ){
     setMinMaxValues( value, exports.filterFields.age  );
};

/**
 *
 * @param {FILTER_SUBJECTS} value
 */
exports.setSubject = function( value ){
    setSelectValue( value, exports.filterFields.subject );
};

exports.setText = function(value){
    setFieldValue( value, exports.filterFields.text);
};

exports.setLanguage = function( value ){
    setSelectValue(value, exports.filterFields.language);
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



