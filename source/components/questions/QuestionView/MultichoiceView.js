'use strict';

var util = require('util');
var _super = require('./AbstractView');


var _   ;
function Viewer(){

}

util.inherits( Viewer, _super );

Viewer.prototype.getOptions = function(){
    browser.wait(function(){return element(by.css('[multi-choice]')).isPresent();});
    return browser.controlFlow().execute(function(){
        //browser.pause();

        var result =  browser.executeScript(function(){return _.map($('[multi-choice] tr:visible td.ng-binding'), function(e){ return { value : $(e).text() }; });});
        return result;
    });
};


module.exports = new Viewer();