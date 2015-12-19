'use strict';

exports.FILTER_LANGUAGES = {
    ENGLISH: 'English',
    RUSSIAN: 'Russian'
};

exports.filterFields = {
    age: {
        min :  $m('ageFilter.min'),
        max: $m('ageFilter.max')
    },
    language: $m('filterLanguage')
};

function setFieldValue( value , field ){
    field.clear();
    if ( value ){
        field.sendKeys( value );
    }
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

exports.setLanguage = function( value ){
    setSelectValue(value, exports.filterFields.language);
};

exports.reset =  $('[lergo-filter] [lergo-reset-filter]');



