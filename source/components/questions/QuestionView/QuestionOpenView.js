'use strict';

var util = require('util');
var AbstractView = require('./AbstractView');

function Viewer(){
    AbstractView.call(this);
}

util.inherits(Viewer, AbstractView);


/**
 *
 * @param {string} str
 */
Viewer.prototype.answer = function( str ){
    // guy - not sure why, but filter is required..
    $('.answers').$$('input,textarea').filter(function(e){ return e.isDisplayed();}).first().clear().sendKeys(str);
};


module.exports = new Viewer();
