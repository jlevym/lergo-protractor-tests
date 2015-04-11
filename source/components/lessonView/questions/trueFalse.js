'use strict';


exports.getQuestion = function(){
    return element(by.css('.question')).getText();
};

/**
 *
 * @param {object} opts true/false
 * @param {boolean} opts.answer true/false
 */
exports.answer = function( opts ){
    element(by.css('.lergo-question-option-' + opts.answer )).click();
};