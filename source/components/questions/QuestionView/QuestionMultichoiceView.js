'use strict';

var util = require('util');
var _super = require('./AbstractView');


var _   ;
function Viewer(){

}

util.inherits( Viewer, _super );

Viewer.prototype.getOptions = function(){
    browser.wait(function(){return $('[multi-choice]').isPresent();});
    return browser.controlFlow().execute(function(){
        //browser.pause();

        var result =  browser.executeScript(function(){return _.map($('[multi-choice] tr:visible td.ng-binding'), function(e){ return { value : $(e).text() }; });});
        return result;
    });
};

/**
 *
 * @param {object} options a map between the option and its desired value for example { option1: true, option2: false }
 */
Viewer.prototype.answer = function(options){
    browser.wait(function(){return $('[multi-choice]').isPresent();});
    return checkboxesByLabel($$('[multi-choice] tr'), options);
};

// by.addLocator('text',function(text,selector,parent){return _.filter($(parent).find(selector), function(item){ return $(item).text().toLowerCase() === text.toLowerCase(); }) })
// $$('div').first().all(by.text('report abuse','a')).first().getText();
Viewer.prototype.getOption = function(opts){
    //return $('[multi-choice]').getText().then(function(text){
    //    console.log(text);
    //});
    return $('[multi-choice]').element(by.text(opts.label, 'tr'));
};


module.exports = new Viewer();
