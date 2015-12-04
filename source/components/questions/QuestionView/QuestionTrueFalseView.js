'use strict';

var util = require('util');
var AbstractView = require('./AbstractView');

function Viewer(){
    AbstractView.call(this);
}

util.inherits(Viewer, AbstractView);

/**
 *
 * @param {object} opts true/false
 * @param {boolean} opts.answer true/false - DEPRECATED. USE LABEL INSTEAD
 * @param {string} opts.label true/false
 */
Viewer.prototype.answer = function( opts ){
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
Viewer.prototype.getOption = function( opts ){
    return $('.lergo-question-option-' +   opts.label  );
};

module.exports = new Viewer();
