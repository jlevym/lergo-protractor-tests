'use strict';


exports.getQuestion = function(){
    return element(by.css('.question')).getText();
};

/**
 *
 * @param {object} opts true/false
 * @param {boolean} opts.answer true/false - DEPRECATED. USE LABEL INSTEAD
 * @param {string} opts.label true/false
 */
exports.answer = function( opts ){
    if ( typeof(opts.answer) !== 'undefined' ){ //backwards
        opts.label = '' + opts.answer;
        opts.answer = undefined;
    }
    exports.getOption(opts).click();
};

/**
 *
 * @param opts
 */
exports.getOption = function( opts ){
    return $('.lergo-question-option-' +   opts.label  );
};
